import { TistoryApiCreateRequest } from '../../../../../../src/repository/tistory/request/post/TistoryApiCreateRequest';

describe('TistoryApiCreateRequest', () => {
  it('FormData로 변환된다', () => {
    const sut = new TistoryApiCreateRequest(
      'testTitle',
      'testContent',
      'testAccessToken',
      'jojoldu',
    );

    const result = sut.getFormBody();

    expect(result).toBeDefined();
  });
});
