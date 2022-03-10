import { TistoryApiRequest } from '../TistoryApiRequest';
import { Exclude, Expose } from 'class-transformer';

export class TistoryApiGetItemRequest extends TistoryApiRequest {
  @Exclude() private readonly _postId: string;

  constructor(accessToken: string, blogName: string, postId: string) {
    super(accessToken, blogName);
    this._postId = postId;
  }

  @Expose()
  get postId(): string {
    return this._postId;
  }
}
