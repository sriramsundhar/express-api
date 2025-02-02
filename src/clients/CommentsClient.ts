import axios, { AxiosInstance } from 'axios'
import { Logger } from 'winston'
import { ConfigSchema } from '../shared/config'

export class CommentsClient {
  config: ConfigSchema
  log: Logger
  axiosClient: AxiosInstance
  constructor(config: ConfigSchema, log: Logger) {
    this.config = config
    this.log = log.child({ module: this.constructor.name })
    this.axiosClient = axios.create({ baseURL: config.get('client.phonesUrl') })
  }

  async getPhones(): Promise<string[]> {
    interface Comments {
      id: string
      text: string
      postId: string
    }
    const response = await this.axiosClient.get('/comments')
    const comments: Comments[] = response.data
    this.log.info(response.data)
    return Promise.resolve(comments.map((comment) => comment.text))
  }
}
