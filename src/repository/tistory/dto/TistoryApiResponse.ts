import { Type } from 'class-transformer';
import { TistoryApiResponseBody } from './TistoryApiResponseBody';

export class TistoryApiResponse {
    @Type(() => TistoryApiResponseBody)
    tistory: TistoryApiResponseBody;

    isOk(): boolean {
        return this.tistory?.status === '200';
    }

    get errorMessage(): string {
        return this.tistory?.errorMessage;
    }
}

