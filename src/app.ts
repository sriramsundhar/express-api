import { json } from 'body-parser'
import * as express from 'express'
import { initializeClients } from './clients'
import { initializeControllers } from './controllers'
import { initializeManagers } from './managers'
import { initRepositories } from './repositories'
import { ConfigSchema, getConfig } from './shared/config'
import { getLogger } from './shared/log/index.js'
import {
  appErrorHandler,
  defaultAppErrorHandler,
  getCors,
  requestLogger,
} from './shared/middleware'

const config: ConfigSchema = getConfig()
const log = getLogger(config)
const port = config.get('port')
const app = express()

// Middlewares
app.use(json({ strict: true }), getCors(config, log), requestLogger(log))
const initializeApp = async () => {
  // Repositories
  const repositories = await initRepositories(config, log)

  //Clients
  const clients = initializeClients(config, log)

  //Managers
  const managers = initializeManagers(config, log, repositories, clients)

  //Controllers
  initializeControllers(config, log, managers).forEach((router, path) => {
    app.use(path, router)
  })
  log.info('Application initialized')
}

initializeApp().then(() => {
  // Error handling
  app.use(appErrorHandler(log), defaultAppErrorHandler(log))
  log.info(`Starting application on ${port}`)
  app.listen(port)
})
