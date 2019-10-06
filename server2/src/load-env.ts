import { config } from 'dotenv'

const env = process.env.NODE_ENV || 'development'

config({ path: '.env' })

switch (env) {
  case 'development':
    config({ path: '.env.development' })
  case 'test':
    config({ path: '.env.testing' })
  case 'production':
    config({ path: '.env.production' })
}
