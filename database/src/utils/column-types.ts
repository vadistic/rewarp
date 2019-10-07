// Column types for postgres/ sqlite
// https://github.com/typeorm/typeorm/blob/master/src/driver/types/ColumnTypes.ts

/**
 * Postgres column types used for @PrimaryGeneratedColumn() decorator.
 */
export type PostgresPrimaryGeneratedColumnType =
  | 'int2' // postgres, sqlite
  | 'int4' // postgres,
  | 'int8' // postgres, sqlite
  | 'integer' // postgres, sqlite
  | 'smallint' // postgres, sqlite
  | 'bigint' // postgres, sqlite
  | 'decimal' // postgres, sqlite
  | 'numeric' // postgres, sqlite
  | 'uuid' // postgres

/**
 * SQLite column types used for @PrimaryGeneratedColumn() decorator.
 */
export type SqlitePrimaryGeneratedColumnType =
  | 'int' // sqlite
  | 'int2' // postgres, sqlite
  | 'int8' // postgres, sqlite
  | 'integer' // postgres, sqlite
  | 'tinyint' // sqlite
  | 'smallint' // postgres, sqlite
  | 'mediumint' // sqlite
  | 'bigint' // postgres, sqlite
  | 'decimal' // postgres, sqlite
  | 'numeric' // postgres, sqlite
  | 'uuid' // postgres, ??? TODO: check

/**
 * Postgres & SQLite column types used for @PrimaryGeneratedColumn() decorator.
 */
export type UniversalPrimaryGeneratedColumnType = PostgresPrimaryGeneratedColumnType &
  SqlitePrimaryGeneratedColumnType

/**
 * Column types where spatial properties are used.
 */
export type PostgresSpatialColumnType =
  | 'geometry' // postgres
  | 'geography' // postgres

/**
 * Postgres column types where precision and scale properties are used.
 */
export type PostgresWithPrecisionColumnType =
  | 'decimal' // postgres, sqlite
  | 'numeric' // postgres, sqlite
  | 'real' // postgres, sqlite
  | 'double precision' // postgres, sqlite
  | 'time' // postgres
  | 'time with time zone' // postgres
  | 'time without time zone' // postgres
  | 'timestamp' // postgres
  | 'timestamp without time zone' // postgres
  | 'timestamp with time zone' // postgres

/**
 * SQLite column types where precision and scale properties are used.
 */
export type SqliteWithPrecisionColumnType =
  | 'float' // sqlite
  | 'double' // sqlite
  | 'decimal' // postgres, sqlite
  | 'numeric' // postgres, sqlite
  | 'real' // postgres, sqlite
  | 'double precision' // postgres, sqlite
  | 'datetime' // sqlite

/**
 * Postgres & SQLite column types where precision and scale properties are used.
 */
export type UniversalWithPrecisionColumnType = PostgresWithPrecisionColumnType &
  SqliteWithPrecisionColumnType

/**
 * Postgres column types where column length is used.
 */
export type PostgresWithLengthColumnType =
  | 'character varying' // postgres
  | 'character' // postgres, sqlite
  | 'varchar' // postgres, sqlite
  | 'char' // postgres

/**
 * SQLite column types where column length is used.
 */
export type SqliteWithLengthColumnType =
  | 'varying character' // sqlite
  | 'character' // postgres, sqlite
  | 'native character' // sqlite
  | 'varchar' // postgres, sqlite
  | 'nchar' // sqlite
  | 'nvarchar2' //sqlite

/**
 * Postgres & SQLite column types where column length is used.
 */
export type UniversalWithLengthColumnType = PostgresWithLengthColumnType &
  SqliteWithLengthColumnType

/**
 * All other postgres regular column types.
 */
export type PostgresSimpleColumnType =
  | 'simple-array' // typeorm-specific, automatically mapped to string
  | 'string' // typeorm-specific, automatically mapped to varchar depend on platform
  | 'simple-json' // typeorm-specific, automatically mapped to string
  | 'simple-enum' // typeorm-specific, automatically mapped to string

  // numeric types
  | 'int2' // postgres, sqlite
  | 'integer' // postgres, sqlite
  | 'int4' // postgres,
  | 'int8' // postgres, sqlite
  | 'unsigned big int' // sqlite
  | 'float4' // postgres,
  | 'float8' // postgres,
  | 'money' // postgres,

  // boolean types
  | 'boolean' // postgres, sqlite,
  | 'bool' // postgres,

  // text/binary types
  | 'text' // postgres, sqlite
  | 'citext' // postgres
  | 'hstore' // postgres
  | 'bytea' // postgres

  // date types
  | 'timetz' // postgres
  | 'timestamptz' // postgres
  | 'date' // postgres, sqlite
  | 'interval' // postgres

  // geometric types
  | 'point' // postgres
  | 'line' // postgres
  | 'lseg' // postgres
  | 'box' // postgres
  | 'circle' // postgres
  | 'path' // postgres
  | 'polygon' // postgres

  // range types
  | 'int4range' // postgres
  | 'int8range' // postgres
  | 'numrange' // postgres
  | 'tsrange' // postgres
  | 'tstzrange' // postgres
  | 'daterange' // postgres

  // other types
  | 'enum' //postgres
  | 'cidr' // postgres
  | 'inet' // postgres,
  | 'macaddr' // postgres
  | 'bit' // postgres
  | 'bit varying' // postgres
  | 'varbit' // postgres
  | 'tsvector' // postgres
  | 'tsquery' // postgres
  | 'uuid' // postgres
  | 'xml' //postgres
  | 'json' //postgres
  | 'jsonb' // postgres
  | 'cube' // postgres

/**
 * All other SQLite regular column types.
 */
export type SqliteSimpleColumnType =
  | 'simple-array' // typeorm-specific, automatically mapped to string
  | 'string' // typeorm-specific, automatically mapped to varchar depend on platform
  | 'simple-json' // typeorm-specific, automatically mapped to string
  | 'simple-enum' // typeorm-specific, automatically mapped to string

  // numeric types
  | 'int2' // postgres, sqlite
  | 'integer' // postgres, sqlite
  | 'int8' // postgres, sqlite
  | 'unsigned big int' // sqlite

  // boolean types
  | 'boolean' // postgres, sqlite,

  // text/binary types
  | 'blob' // sqlite,
  | 'text' // postgres, sqlite
  | 'clob' // sqlite

  // date types
  | 'date' // postgres, sqlite

/**
 * All other postgres & SQLite regular column types.
 */
export type UniversalSimpleColumnType = PostgresSimpleColumnType & SqliteSimpleColumnType

/**
 * Any column type postgres column can be.
 */
export type PostgresColumnType =
  | PostgresWithPrecisionColumnType
  | PostgresWithLengthColumnType
  | PostgresSpatialColumnType
  | PostgresSimpleColumnType
  | BooleanConstructor
  | DateConstructor
  | NumberConstructor
  | StringConstructor

/**
 * Any column type SQLite column can be.
 */
export type SqliteColumnType =
  | SqliteWithPrecisionColumnType
  | SqliteWithLengthColumnType
  | SqliteSimpleColumnType
  | BooleanConstructor
  | DateConstructor
  | NumberConstructor
  | StringConstructor

/**
 * Any column type postgres & SQLite column can be.
 */
export type UniversalColumnType =
  | UniversalWithPrecisionColumnType
  | UniversalWithLengthColumnType
  | UniversalSimpleColumnType
  | BooleanConstructor
  | DateConstructor
  | NumberConstructor
  | StringConstructor
