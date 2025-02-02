import { NextFunction, Request, Response } from 'express'
import { Logger } from 'winston'
import { AppError } from '../errors'

export const defaultAppErrorHandler =
  (log: Logger) =>
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    log.error({ err: err, stack: err.stack, req: req })
    res.status(500).json({ errorMessage: 'Something broke!' })
    next()
  }

export const appErrorHandler =
  (log: Logger) =>
  (err: AppError, req: Request, res: Response, next: NextFunction) => {
    log.error({ err: err, stack: err.stack, req: req })
    res
      .status(err.statusCode)
      .send(JSON.stringify({ errorMessage: err.message }))
    next()
  }
