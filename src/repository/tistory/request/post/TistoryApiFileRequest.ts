import { TistoryApiRequest } from '../TistoryApiRequest';
import { Exclude, Expose } from 'class-transformer';

export class TistoryApiFileRequest extends TistoryApiRequest {
  @Exclude() private readonly _uploadedFile: string;

  constructor(accessToken: string, blogName: string, uploadedFile: string) {
    super(accessToken, blogName);
    this._uploadedFile = uploadedFile;
  }

  @Expose({ name: 'uploadedfile' })
  get uploadedFile(): string {
    return this._uploadedFile;
  }
}
