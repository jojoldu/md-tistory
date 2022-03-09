import { Expose } from 'class-transformer';

export abstract class TistoryApiRequest {
  @Expose({ name: 'access_token' })
  accessToken: string;
  blogName: string;
}
