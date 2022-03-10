import { Service } from 'typedi';
import { HttpClient } from '../../libs/http-client/HttpClient';
import { ResponseEntity } from '../../libs/http-client/ResponseEntity';
import { TistoryApiResponse } from './response/TistoryApiResponse';
import { TistoryApiGetItemResponse } from './response/get/TistoryApiGetItemResponse';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { TistoryApiGetItemRequest } from './request/get/TistoryApiGetItemRequest';
import { TistoryApiFileRequest } from './request/post/TistoryApiFileRequest';
import { MediaType } from '../../libs/http-client/MediaType';

@Service()
export class TistoryRepository {
  private static BASE_URL = 'https://www.tistory.com/apis';

  constructor(private readonly httpClient: HttpClient) {}

  async getItem(
    dto: TistoryApiGetItemRequest,
  ): Promise<TistoryApiGetItemResponse> {
    const response: ResponseEntity = await this.httpClient.get(
      `${TistoryRepository.BASE_URL}/post/read`,
      instanceToPlain(dto),
    );
    const body: TistoryApiResponse = response.transform(TistoryApiResponse);

    return plainToInstance(TistoryApiGetItemResponse, body.tistory.item);
  }

  async uploadImage(dto: TistoryApiFileRequest): Promise<string> {
    const response: ResponseEntity = await this.httpClient.post(
      `${TistoryRepository.BASE_URL}/post/attach`,
      MediaType.MULTIPART_FORM_DATA,
      instanceToPlain(dto),
    );

    const body: TistoryApiResponse = response.transform(TistoryApiResponse);

    return body.url;
  }
}
