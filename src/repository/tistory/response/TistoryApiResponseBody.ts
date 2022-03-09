import { Expose } from 'class-transformer';

export class TistoryApiResponseBody {
    status: string;
    item: any;
    @Expose({name: 'error_message'})
    errorMessage: string;
}
