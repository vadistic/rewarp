export const ESLINT_IGNORE = '.eslintignore'
export const NOW_IGNORE = '.nowignore'
export const ESLINTRC = '.eslintrc'
export const GIT_IGNORE = '.gitignore'
export const JEST_CONFIG = 'jest.config.js'
export const PACKAGE_JSON = 'package.json'
export const PRETTIER_CONFIG = 'prettier.config.js'
export const TSCONFIG = 'tsconfig.json'
export const TSCONFIG_BUILD = 'tsconfig.build.json'
export const TSCONFIG_COMP = 'tsconfig.comp.json'

export const TEMPLATES = {
  PACKAGE_JSON,
  //
  GIT_IGNORE,
  ESLINT_IGNORE,
  //
  TSCONFIG,
  ESLINTRC,
  PRETTIER_CONFIG,
  JEST_CONFIG,
  //
  TSCONFIG_BUILD,
  TSCONFIG_COMP,
}

export const TEMPLATES_PASTE = [
  JEST_CONFIG,
  NOW_IGNORE,
  TSCONFIG_BUILD,
  ESLINTRC,
  ESLINT_IGNORE,
  PRETTIER_CONFIG,
  GIT_IGNORE,
]

//  this is only for tiny optimisation to not scan for useless files
export const TEMPLATES_INHERITABLE = [TSCONFIG, PRETTIER_CONFIG, ESLINTRC, JEST_CONFIG]
