import 'reflect-metadata';

import { plainToClass } from 'class-transformer';
import { TistoryApiResponse } from '../../../../../src/repository/tistory/response/TistoryApiResponse';

describe('TistoryApiResponse', () => {
  it('400 error json결과가 인스턴스로 전환된다', () => {
    const status = 400;
    const errorMessage = 'access_token 이 유효하지 않습니다.';
    const error = {
      tistory: { status: status, error_message: errorMessage },
    };

    const result = plainToClass(TistoryApiResponse, error);

    expect(result.tistory.status).toBe(status);
    expect(result.tistory.errorMessage).toBe(errorMessage);
  });
});
