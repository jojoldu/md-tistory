import { Service } from 'typedi';
import { WinstonLogger } from '../logger/WinstonLogger';
import { ResponseEntity } from './ResponseEntity';
import { HttpError } from './HttpError';
import got, { Got, HTTPError } from 'got';
import { Method, Options } from 'got/dist/source/core';
import { MediaType } from './MediaType';
import { plainToInstance } from 'class-transformer';
import { TistoryApiResponseBody } from '../../repository/tistory/response/TistoryApiResponseBody';
import FormData from 'form-data';

@Service()
export class HttpClient {
  private static readonly DEFAULT_OPTION = {
    isStream: false,
    resolveBodyOnly: false,
    timeout: 5000,
  };

  private readonly client: Got;

  constructor(private readonly logger: WinstonLogger) {
    this.client = got;
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
    const options = {
      json: body,
    };

    return await this.request(url, 'POST', contentType, options);
  }

  async postFormData(url: string, form: FormData): Promise<ResponseEntity> {
    const options = {
      body: form,
      headers: form.getHeaders(),
    };

    return await this.request(
      url,
      'POST',
      MediaType.APPLICATION_FORM_URLENCODED,
      options,
    );
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
      if (e instanceof HTTPError && e.response) {
        const { tistory } = JSON.parse(e.response?.body as string);
        const { errorMessage } = plainToInstance(
          TistoryApiResponseBody,
          tistory,
        );

        this.logger.error(`message=${errorMessage}, url=${url}`, e);
        throw new HttpError(errorMessage);
      }

      this.logger.error(`message=${e.message}, url=${url}`, e);
      throw new HttpError(e.message);
    }
  }
}
