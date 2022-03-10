import { Expose } from 'class-transformer';

export class TistoryApiResponseBody {
  status: string;
  item: any;
  postId: string; // 글작성 & 글수정
  url: string; // 글작성 & 글수정 & 파일첨부
  @Expose({ name: 'error_message' })
  errorMessage: string; // 에러일때만
}
