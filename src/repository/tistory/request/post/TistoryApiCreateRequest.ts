import { TistoryApiRequest } from '../TistoryApiRequest';
import { Exclude, Expose, instanceToPlain } from 'class-transformer';
import FormData from 'form-data';

export class TistoryApiCreateRequest extends TistoryApiRequest {
  @Exclude() private readonly _title: string;
  @Exclude() private readonly _content: string;
  @Exclude() private readonly _visibility = 0;

  constructor(
    title: string,
    content: string,
    accessToken: string,
    blogName: string,
  ) {
    super(accessToken, blogName);
    this._title = title;
    this._content = content;
  }

  @Exclude()
  getFormBody(): FormData {
    const formData = new FormData();
    for (const [key, value] of Object.entries(instanceToPlain(this))) {
      formData.append(key, value);
    }

    return formData;
  }

  @Expose()
  get title(): string {
    return this._title;
  }

  @Expose()
  get content(): string {
    return this._content;
  }

  @Expose()
  get visibility(): number {
    return this._visibility;
  }
}
