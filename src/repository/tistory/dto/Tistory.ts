import { Expose } from 'class-transformer';

export class Tistory {
    status: number;
    item: any;
    @Expose({name: 'error_message'})
    errorMessage: string;
}
