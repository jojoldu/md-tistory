import { TistoryApiRequest } from '../TistoryApiRequest';
import { Exclude } from 'class-transformer';
import { ReadStream } from 'fs';

export class TistoryApiFileRequest extends TistoryApiRequest {
  @Exclude() private readonly _uploadedFile: ReadStream;

  constructor(accessToken: string, blogName: string, uploadedFile: ReadStream) {
    super(accessToken, blogName);
    this._uploadedFile = uploadedFile;
  }

  getRequestBody(): Record<string, ReadStream> {
    return {
      uploadedfile: this.uploadedFile,
    };
  }

  @Exclude()
  get uploadedFile(): ReadStream {
    return this._uploadedFile;
  }
}
