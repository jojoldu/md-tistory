import { TistoryApiRequest } from '../TistoryApiRequest';
import { Exclude } from 'class-transformer';
import FormData from 'form-data';
import { ReadStream } from 'fs';

export class TistoryApiFileRequest extends TistoryApiRequest {
  @Exclude() private readonly _uploadedFile: ReadStream;
  @Exclude() private readonly _filePath: string;

  constructor(
    accessToken: string,
    blogName: string,
    uploadedFile: ReadStream,
    filePath: string,
  ) {
    super(accessToken, blogName);
    this._uploadedFile = uploadedFile;
    this._filePath = filePath;
  }

  getFormBody(): FormData {
    const form = new FormData();
    form.append('uploadedfile', this._uploadedFile);
    return form;
  }

  get filePath(): string {
    return this._filePath;
  }
}
