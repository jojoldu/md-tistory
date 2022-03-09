import { Type } from 'class-transformer';
import { Tistory } from './Tistory';

export class TistoryApiResponse {
    @Type(() => Tistory)
    tistory: Tistory;

    isOk(): boolean {
        return this.tistory?.status === 200;
    }

    get errorMessage(): string {
        return this.tistory?.errorMessage;
    }
}

