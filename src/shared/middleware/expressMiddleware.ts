import * as cors from 'cors'
import { NextFunction, Request, Response } from 'express'
import { Logger } from 'winston'
import { ConfigSchema } from '../config'

export const getCors = (config: ConfigSchema, log: Logger) => {
  const allowedOrigins = config
    .get('allowedOrigins')
    .filter((domain) => typeof domain === 'string' && domain.length > 0)
    .map((origin) => {
      if (origin.indexOf('*') >= 0) {
        return new RegExp(origin.replace(/:/g, '\\:'))
      }
      return origin
    })
  log.info('Allowed origins:', allowedOrigins)
  return cors({
    credentials: true,
    origin: allowedOrigins,
  })
}

export const requestLogger =
  (log: Logger) => (req: Request, res: Response, next: NextFunction) => {
    const start = new Date()
    log.info('Received incoming request', {
      method: req.method,
      path: req.path,
      clientIp: req.ip,
      forwardedFor: req.headers['x-forwarded-for'],
    })
    res.once('finish', () => {
      const end = new Date()
      const time = end.getTime() - start.getTime()
      log.info('Handled request', {
        status: res.statusCode,
        method: req.method,
        path: req.path,
        timeMs: time,
      })
    })
    next()
  }
