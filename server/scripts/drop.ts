import { Pool } from 'pg'

const drop = async () => {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
    ssl: true,
  })

  const res = await pool.query(
    `
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
  `.trim(),
  )

  console.log(res)

  pool.end()

  console.log('Database schema dropped')
}

drop()
