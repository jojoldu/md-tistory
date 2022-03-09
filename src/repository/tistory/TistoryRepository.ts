import { Service } from 'typedi';
import { HttpClient } from '../../libs/http-client/HttpClient';
import { ResponseEntity } from '../../libs/http-client/ResponseEntity';
import { TistoryApiResponse } from './response/TistoryApiResponse';
import { TistoryApiGetItemResponse } from './response/get/TistoryApiGetItemResponse';
import { plainToInstance } from 'class-transformer';

@Service()
export class TistoryRepository {
    private static BASE_URL = 'https://www.tistory.com/apis';

    constructor(
        private readonly httpClient: HttpClient,
    ) {}

    async getItem(): Promise<TistoryApiGetItemResponse> {
        const response: ResponseEntity = await this.httpClient.get(`${TistoryRepository.BASE_URL}/post/read`);
        const body: TistoryApiResponse = response.transform(TistoryApiResponse);

        return plainToInstance(TistoryApiGetItemResponse, body.tistory.item);
    }
}
