import { Exclude, Expose } from 'class-transformer';

export abstract class TistoryApiRequest {
  @Exclude() private readonly _accessToken: string;
  @Exclude() private readonly _blogName: string;
  @Exclude() private readonly _output = 'json';

  protected constructor(accessToken: string, blogName: string) {
    this._accessToken = accessToken;
    this._blogName = blogName;
  }

  @Expose({ name: 'access_token' })
  get accessToken(): string {
    return this._accessToken;
  }

  @Expose()
  get blogName(): string {
    return this._blogName;
  }

  @Expose()
  get output(): string {
    return this._output;
  }
}
