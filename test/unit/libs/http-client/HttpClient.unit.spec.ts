import 'reflect-metadata';

import { Container } from 'typedi';
import { HttpClient } from '../../../../src/libs/http-client/HttpClient';
import { ResponseEntity } from '../../../../src/libs/http-client/ResponseEntity';
import nock from 'nock';
import { TistoryApiResponse } from '../../../../src/repository/tistory/response/TistoryApiResponse';
import tistoryItems from '../../json/tistoryItems.json';

describe('HttpClient', () => {
    const sut: HttpClient = Container.get(HttpClient);

    it('URLSearchParams', () => {
        const json = {print: 'pretty'};

        const result = new URLSearchParams(json).toString();

        expect(result).toBe('print=pretty');
    });

    it('HackerNewsAPI를 조회한다', async () => {
        const url = 'https://hacker-news.firebaseio.com/v0/item/8863.json';

        const result:ResponseEntity = await sut.get(url, {print: 'pretty'});

        expect(result.statusCode).toBe(200);
    });

    describe('tistory API', () => {
        afterEach( () => nock.cleanAll())

        it('tistory get', async () => {
            const mockBody = tistoryItems;
            nock('https://www.tistory.com')
                .get('/apis/blog/info')
                .reply(200, mockBody);

            const result:ResponseEntity = await sut.get('https://www.tistory.com/apis/blog/info');

            const body: TistoryApiResponse = result.transform(TistoryApiResponse);
            expect(body.isOk()).toBe(true);
            expect(body.tistory.item.id).toBe('blog_oauth_test@daum.net');
        });
    });
});

