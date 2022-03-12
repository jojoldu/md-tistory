import { Service } from 'typedi';
import { HttpClient } from '../../libs/http-client/HttpClient';
import { ResponseEntity } from '../../libs/http-client/ResponseEntity';
import { TistoryApiResponse } from './response/TistoryApiResponse';
import { TistoryApiGetOneResponse } from './response/get/TistoryApiGetOneResponse';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { TistoryApiGetItemRequest } from './request/get/TistoryApiGetItemRequest';
import { TistoryApiFileRequest } from './request/post/TistoryApiFileRequest';
import { TistoryApiCreateRequest } from './request/post/TistoryApiCreateRequest';

@Service()
export class TistoryRepository {
  private static BASE_URL = 'https://www.tistory.com/apis';

  constructor(private readonly httpClient: HttpClient) {}

  async getOne(
    dto: TistoryApiGetItemRequest,
  ): Promise<TistoryApiGetOneResponse> {
    const response: ResponseEntity = await this.httpClient.get(
      `${TistoryRepository.BASE_URL}/post/read`,
      instanceToPlain(dto),
    );
    const body: TistoryApiResponse = response.transform(TistoryApiResponse);

    return plainToInstance(TistoryApiGetOneResponse, body.tistory.item);
  }

  async create(dto: TistoryApiCreateRequest): Promise<string> {
    const form = dto.getFormBody();
    const response: ResponseEntity = await this.httpClient.postFormData(
      `${TistoryRepository.BASE_URL}/post/write`,
      form,
    );

    const body: TistoryApiResponse = response.transform(TistoryApiResponse);

    return body.url;
  }

  async uploadImage(dto: TistoryApiFileRequest): Promise<string> {
    const form = dto.getFormBody();
    const response: ResponseEntity = await this.httpClient.postFormData(
      `${TistoryRepository.BASE_URL}/post/attach?${dto.queryParams()}`,
      form,
    );

    const body: TistoryApiResponse = response.transform(TistoryApiResponse);

    return body.url;
  }
}
