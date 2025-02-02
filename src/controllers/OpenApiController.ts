import { Router } from 'express'
import * as path from 'path'
import * as swaggerUi from 'swagger-ui-express'
import { Logger } from 'winston'
import * as YAML from 'yamljs'
import { ConfigSchema } from '../shared/config'
import { asyncWrap, Controllers } from './Controllers'
const envs = ['prod', 'staging']

class OpenApiController extends Controllers {
  swaggerDocument: JSON
  constructor(config: ConfigSchema, log: Logger) {
    super(config, log.child({ module: OpenApiController.name }))
    const swaggerDoc = path.resolve(
      __dirname,
      '../@typespec/openapi3/openapi.yaml'
    )
    this.swaggerDocument = YAML.load(swaggerDoc)
    this.log.info(this.swaggerDocument)
  }

  getOpenApi = async (): Promise<JSON> => {
    return Promise.resolve(this.swaggerDocument)
  }
}

export const _initializeRouter = (config: ConfigSchema, logger: Logger) => {
  const router = Router()

  if (!envs.includes(config.get('env'))) {
    const openApiController = new OpenApiController(config, logger)
    router.get('', asyncWrap(openApiController.getOpenApi))
    router.use(
      '/swagger',
      swaggerUi.serve,
      swaggerUi.setup(openApiController.swaggerDocument)
    )
  }
  return router
}
module.exports = {
  _initializeRouter,
}
