import { Service } from 'typedi';
import { WinstonLogger } from '../logger/WinstonLogger';
import { ResponseEntity } from './ResponseEntity';
import { HttpError } from './HttpError';
import got, { Got, HTTPError } from 'got';
import { Method, Options } from 'got/dist/source/core';

@Service()
export class HttpClient {
    private static readonly DEFAULT_OPTION = {
        headers: {
            'Content-Type': 'application/json'
        },
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

    async get(url: string, params?: Record<string, string>): Promise<ResponseEntity> {
        return await this.request(`${url}?${new URLSearchParams(params).toString()}`, 'GET');
    }

    private async request(url: string, method: Method, options?: Options): Promise<ResponseEntity> {
        try {
            const response = await this.client({
                responseType: 'text',
                method: method,
                url: url,
                ...options,
                ...HttpClient.DEFAULT_OPTION,
            });

            // @ts-ignore
            return new ResponseEntity(response.statusCode, response.body);
        } catch (e) {
            this.logger.error(`${e.message}, url=${url}, response=${e.response?.body}`, e);

            if (e instanceof HTTPError && e.response) {
                throw new HttpError(`${e.message}: ${e.response.body}`);
            }
            throw new HttpError(e.message);
        }
    }

}
