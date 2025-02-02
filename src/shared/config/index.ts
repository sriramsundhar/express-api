import * as convict from 'convict'
import * as convict_format_with_validator from 'convict-format-with-validator'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})
convict.addFormats(convict_format_with_validator)

const configSchema = {
  app: {
    name: {
      default: 'express-api',
      doc: 'The name of the application',
      env: 'APP_NAME',
      format: String,
    },
  },
  env: {
    default: 'dev',
    doc: 'The current node.js environment',
    env: 'NODE_ENV',
    format: ['dev', 'docker', 'staging', 'prod'],
  },
  host: {
    default: '127.0.0.1',
    doc: 'The ip address the server should bind',
    env: 'IP_ADDRESS',
    format: 'ipaddress',
  },
  port: {
    default: 3000,
    doc: 'The port the server should bind',
    env: 'PORT',
    format: 'port',
  },
  mongo: {
    url: {
      default:
        'mongodb://dbUser:changeMe@localhost:27017/dw?authSource=admin&directConnection=true',
      doc: 'The url to connect to the mongo database',
      env: 'MONGO_URL',
      format: String,
    },
  },
  client: {
    phonesUrl: {
      doc: 'Api to get phone details',
      format: 'url',
      env: 'CLIENT_PHONES_URL',
      default: 'http://localhost:3001',
    },
  },
  log: {
    level: {
      default: 'info',
      env: 'LOG_LEVEL',
    },
  },
  allowedOrigins: {
    default: ['http://localhost:*'],
    doc: 'Allowed origins for CORS',
    env: 'ALLOWED_ORIGINS',
    format: Array,
  },
}

export const getConfig = () => {
  const config = convict(configSchema)
  // Load environment dependent configuration
  const envConfig = path.join(__dirname, `env/${config.get('env')}.json`)
  config.loadFile(envConfig)
  // Perform validation
  config.validate({ allowed: 'strict' })
  return config
}

export type ConfigSchema = ReturnType<typeof getConfig>

module.exports = {
  getConfig,
}
