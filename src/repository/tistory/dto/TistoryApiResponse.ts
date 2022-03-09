import { Type } from 'class-transformer';
import { Tistory } from './Tistory';

export class TistoryApiResponse {
    @Type(() => Tistory)
    tistory: Tistory;
}

