import { NextFunction, Request, RequestHandler, Response } from 'express'
import { Logger } from 'winston'
import { ConfigSchema } from '../shared/config'
import { AppError } from '../shared/errors'

export class Controllers {
  config: ConfigSchema
  log: Logger
  constructor(config: ConfigSchema, log: Logger) {
    this.config = config
    this.log = log
  }
}

export const asyncWrap =
  (routeHandler: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(routeHandler(req, res, next))
      .then((responseObj) => res.json(responseObj))
      .catch((err) => {
        if (err instanceof AppError) {
          throw err
        }
        throw new AppError(err)
      })
      .catch((err) => next(err))
