import 'reflect-metadata';

import tistoryItem from '../../json/tistoryItem.json';
import { Container } from 'typedi';
import nock from 'nock';
import { TistoryRepository } from '../../../../src/repository/tistory/TistoryRepository';
import { TistoryApiGetOneResponse } from '../../../../src/repository/tistory/response/get/TistoryApiGetOneResponse';
import { TistoryApiGetItemRequest } from '../../../../src/repository/tistory/request/get/TistoryApiGetItemRequest';

describe('TistoryRepository', () => {
  const sut: TistoryRepository = Container.get(TistoryRepository);

  afterEach(() => nock.cleanAll());

  it('글 정보를 가져온다', async () => {
    const mockBody = tistoryItem;
    nock('https://www.tistory.com')
      .get('/apis/post/read?access_token=&blogName=&output=json&postId=')
      .reply(200, mockBody);

    const result: TistoryApiGetOneResponse = await sut.getOne(
      new TistoryApiGetItemRequest('', '', ''),
    );

    expect(result.title).toBe('티스토리 OAuth2.0 API 오픈!');
    expect(result.categoryId).toBe('0');
    expect(result.tagNames).toStrictEqual(['open', 'api']);
  });
});
