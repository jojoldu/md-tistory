import { ClassConstructor, plainToInstance, Type } from 'class-transformer';
import { TistoryApiResponseBody } from './TistoryApiResponseBody';

export class TistoryApiResponse {
  @Type(() => TistoryApiResponseBody)
  tistory: TistoryApiResponseBody;

  transform<T>(classType: ClassConstructor<T>): T {
    return plainToInstance(classType, JSON.parse(this.tistory.item));
  }

  isOk(): boolean {
    return this.tistory?.status === '200';
  }

  get url(): string {
    return this.tistory?.url;
  }

  get errorMessage(): string {
    return this.tistory?.errorMessage;
  }
}
