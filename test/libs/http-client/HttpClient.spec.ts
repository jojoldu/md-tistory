import 'reflect-metadata';

import { Container } from 'typedi';
import { HttpClient } from '../../../src/libs/http-client/HttpClient';
import { ResponseEntity } from '../../../src/libs/http-client/ResponseEntity';
import * as nock from 'nock';
import { TistoryApiResponse } from '../../../src/repository/tistory/dto/TistoryApiResponse';

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
            const mockBody = tistoryList();
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

function tistoryList() {
    return {
        "tistory": {
            "status": "200",
            "item": {
                "id": "blog_oauth_test@daum.net",
                "userId": "12345",
                "blogs": [
                    {
                        "name": "oauth-test",
                        "url": "http://oauth-test.tistory.com",
                        "secondaryUrl": "http://",
                        "nickname": "티스토리 테스트",
                        "title": "테스트 블로그 1",
                        "description": "안녕하세요! 티스토리입니다.",
                        "default": "Y",
                        "blogIconUrl": "https://blog_icon_url",
                        "faviconUrl": "https://favicon_url",
                        "profileThumbnailImageUrl": "https://profile_image",
                        "profileImageUrl": "https://profile_image",
                        "role": "소유자",
                        "blogId": "123",
                        "statistics": {
                            "post": "182",
                            "comment": "146",
                            "trackback": "0",
                            "guestbook": "39",
                            "invitation": "0"
                        }
                    },
                ]
            }
        }
    };
}
