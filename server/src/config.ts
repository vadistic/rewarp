export const CONFIG = {
  JWT_SECRET: 'MySecret',
  JWT_ACCESS_EXPIRE: '30m',
  JWT_REFRESH_EXPIRE: '14d',
  SALT_ROUNDS: 12,

  DB_TYPE: 'postgres',
  DB_HOST: process.env.PGHOST || 'localhost',
  DB_PORT: process.env.PGPORT ? +process.env.PGPORT : 5432,
  DB_USERNAME: process.env.PGUSER || 'root',
  DB_PASSWORD: process.env.PGPASSWORD || 'root',
  DB_NAME: process.env.PGDATABASE || 'test',
  DB_SCHEMA: process.env.PGSCHEMA || 'public',
}
