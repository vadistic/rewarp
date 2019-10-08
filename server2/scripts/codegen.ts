import { dirname, basename, join } from 'path'
import { promisify } from 'util'
import { writeFile } from 'fs'
import { codegen } from '@graphql-codegen/core'
import { Types } from '@graphql-codegen/plugin-helpers'
import * as typescriptPlugin from '@graphql-codegen/typescript'
import * as resolversPlugin from '@graphql-codegen/typescript-resolvers'
import globby from 'globby'
import { parse, DocumentNode, ASTNode, Kind, print } from 'graphql'

const writeFileP = promisify(writeFile)

const typescriptConfig: typescriptPlugin.TypeScriptPluginConfig = {
  skipTypename: true,
  declarationKind: 'interface',
  globalNamespace: true,
}

const resolverConfig: resolversPlugin.TypeScriptResolversPluginConfig = {
  defaultMapper: 'Partial<{T}>',
  scalars: {
    DateTime: 'Date',
    JSON: '{ [key: string]: any }',
  },
}

const getOptions = (typeDefs: DocumentNode): Types.GenerateOptions => ({
  schema: typeDefs,
  filename: '',
  plugins: [
    {
      typescript: typescriptConfig,
    },
    {
      resolvers: resolverConfig,
    },
  ],
  pluginMap: {
    typescript: typescriptPlugin,
    resolvers: resolversPlugin,
  },
  documents: [],
  config: {},
  skipDocumentsValidation: true,
})

interface File {
  dir: string
  dirname: string
  filename: string
  path: string
  typeDefs: DocumentNode
}

interface FilesGroup {
  dir: string
  dirname: string
  typeDefs: DocumentNode
  files: File[]
}

interface GroupedFiles {
  [dir: string]: FilesGroup
}

const mergeDocs = (docs: DocumentNode[]): DocumentNode => ({
  kind: Kind.DOCUMENT,
  definitions: docs.flatMap(doc => doc.definitions),
})

const loadFile = async (path: string): Promise<File> => {
  const exp = await import(path)

  const docArr = Object.entries(exp).map(([key, value]) => {
    if (typeof value === 'string') {
      try {
        return parse(value, { noLocation: true })
      } catch (e) {
        throw Error(`Could not parse string export ${key} in '${path}`)
      }
    }

    if (typeof value === 'object' && value !== null && (value as ASTNode).kind === Kind.DOCUMENT) {
      return value as DocumentNode
    }

    throw Error(`Could not parse export ${key} in '${path}`)
  })

  return {
    path,
    dir: dirname(path),
    filename: basename(path),
    dirname: basename(dirname(path)),
    typeDefs: mergeDocs(docArr),
  }
}

const groupAndMergeByDir = (files: File[]): GroupedFiles =>
  files.reduce(
    (acc, file) => {
      if (!acc[file.dir]) {
        acc[file.dir] = {
          dir: file.dir,
          dirname: file.dirname,
          files: [],
          typeDefs: { kind: Kind.DOCUMENT, definitions: [] },
        }
      }

      acc[file.dir].files.push(file)
      acc[file.dir].typeDefs = mergeDocs([acc[file.dir].typeDefs, file.typeDefs])

      return acc
    },
    {} as GroupedFiles,
  )

const main = async () => {
  const paths = await globby(['src/**/*.graphql.ts'], { onlyFiles: true, absolute: true })

  const files = await Promise.all(paths.map(loadFile))

  const groups = groupAndMergeByDir(files)

  const globalTypeDefs = mergeDocs(Object.values(groups).map(group => group.typeDefs))

  const globalCodegen = await codegen(getOptions(globalTypeDefs))

  const p = Object.values(groups).map(async group => {
    const codegenPath = join(group.dir, `${group.dirname}.gen.types.ts`)
    const schemaPath = join(group.dir, `${group.dirname}.gen.graphql`)

    // TODO: make scoped resolver (probably with mine `clientql`)
    const codegenData = `/* eslint-disable */\n\n` + globalCodegen

    const schemaData = print(group.typeDefs)

    const p1 = writeFileP(codegenPath, codegenData)
    const p2 = writeFileP(schemaPath, schemaData)

    return Promise.all([p1, p2])
  })

  await Promise.all(p)
}

main()
