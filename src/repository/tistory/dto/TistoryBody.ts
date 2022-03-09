import { Expose } from 'class-transformer';

export class TistoryBody {
    status: string;
    item: any;
    @Expose({name: 'error_message'})
    errorMessage: string;
}
