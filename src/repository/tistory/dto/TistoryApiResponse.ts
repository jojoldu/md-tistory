import { Type } from 'class-transformer';
import { TistoryBody } from './TistoryBody';

export class TistoryApiResponse {
    @Type(() => TistoryBody)
    tistory: TistoryBody;

    isOk(): boolean {
        return this.tistory?.status === '200';
    }

    get errorMessage(): string {
        return this.tistory?.errorMessage;
    }
}

