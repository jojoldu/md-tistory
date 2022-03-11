import { TistoryApiRequest } from '../TistoryApiRequest';
import { Exclude } from 'class-transformer';
import FormData from 'form-data';

export class TistoryApiFileRequest extends TistoryApiRequest {
  @Exclude() private readonly _uploadedFile: Buffer;

  constructor(accessToken: string, blogName: string, uploadedFile: Buffer) {
    super(accessToken, blogName);
    this._uploadedFile = uploadedFile;
  }

  getFormBody(): FormData {
    const form = new FormData();
    form.append('file', this.uploadedFile);
    return form;
  }

  @Exclude()
  get uploadedFile(): Buffer {
    return this._uploadedFile;
  }
}
