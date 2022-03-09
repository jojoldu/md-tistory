import 'reflect-metadata';

import tistoryItem from '../../json/tistoryItem.json';
import { Container } from 'typedi';
import nock from 'nock';
import { TistoryRepository } from '../../../../src/repository/tistory/TistoryRepository';
import { TistoryApiGetItemResponse } from '../../../../src/repository/tistory/response/get/TistoryApiGetItemResponse';

describe('TistoryRepository', () => {
  const sut: TistoryRepository = Container.get(TistoryRepository);

  afterEach(() => nock.cleanAll());

  it('글 정보를 가져온다', async () => {
    const mockBody = tistoryItem;
    nock('https://www.tistory.com').get('/apis/post/read').reply(200, mockBody);

    const result: TistoryApiGetItemResponse = await sut.getItem();

    expect(result.title).toBe('티스토리 OAuth2.0 API 오픈!');
    expect(result.categoryId).toBe('0');
    expect(result.tagNames).toStrictEqual(['open', 'api']);
  });
});
