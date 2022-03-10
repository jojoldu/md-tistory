import { Service } from 'typedi';
import { WinstonLogger } from '../logger/WinstonLogger';
import { ResponseEntity } from './ResponseEntity';
import { HttpError } from './HttpError';
import got, { Got, HTTPError } from 'got';
import { Method, Options } from 'got/dist/source/core';
import { MediaType } from './MediaType';

@Service()
export class HttpClient {
  private static readonly DEFAULT_OPTION = {
    isStream: false,
    resolveBodyOnly: false,
    timeout: 5000,
  };

  private readonly client: Got;
  private readonly logger: WinstonLogger;

  constructor(logger: WinstonLogger) {
    this.client = got;
    this.logger = logger;
  }

  async get(
    url: string,
    params?: Record<string, string>,
  ): Promise<ResponseEntity> {
    return await this.request(
      `${url}?${new URLSearchParams(params).toString()}`,
      'GET',
    );
  }

  async post(
    url: string,
    contentType = MediaType.APPLICATION_JSON,
    body: Record<string, any>,
  ): Promise<ResponseEntity> {
    const options = { form: {}, json: {} };

    if (contentType === MediaType.MULTIPART_FORM_DATA) {
      options.form = body;
    } else {
      options.json = body;
    }

    return await this.request(url, 'POST', contentType, options);
  }

  private async request(
    url: string,
    method: Method,
    contentType = MediaType.APPLICATION_JSON,
    options?: Options,
  ): Promise<ResponseEntity> {
    try {
      const response: any = await this.client({
        responseType: 'text',
        method: method,
        url: url,
        headers: {
          'Content-Type': contentType,
        },
        ...options,
        ...HttpClient.DEFAULT_OPTION,
      });

      return new ResponseEntity(response.statusCode, response.body);
    } catch (e) {
      this.logger.error(
        `${e.message}, url=${url}, response=${e.response?.body}`,
        e,
      );

      if (e instanceof HTTPError && e.response) {
        throw new HttpError(`${e.message}: ${e.response.body}`);
      }
      throw new HttpError(e.message);
    }
  }
}
