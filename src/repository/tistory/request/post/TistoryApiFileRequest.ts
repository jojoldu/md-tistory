import { TistoryApiRequest } from '../TistoryApiRequest';
import { Exclude } from 'class-transformer';
import FormData from 'form-data';
import { ReadStream } from 'fs';

export class TistoryApiFileRequest extends TistoryApiRequest {
  @Exclude() private readonly _uploadedFile: ReadStream;

  constructor(accessToken: string, blogName: string, uploadedFile: ReadStream) {
    super(accessToken, blogName);
    this._uploadedFile = uploadedFile;
  }

  getFormBody(): FormData {
    const form = new FormData();
    form.append('uploadedfile', this._uploadedFile);
    return form;
  }
}
