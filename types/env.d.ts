declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    DB_USER: string
    DB_HOST: string
    DB_PASSWORD: string
    DB_DATABASE: string
    DB_PORT: string
    DB_SCHEMA: string
  }
}
