import 'reflect-metadata';

import { XmlParser } from '../../src/libs/XmlParser';

describe('XmlParser', () => {

    it('400 Error의 응답이 Parse된다', () => {
        const xml = '<?xml version="1.0" encoding="utf-8"?>\n<tistory><status>400</status><error_message>access_token 이 유효하지 않습니다.</error_message></tistory>\n';
        const sut = new XmlParser();
        const result = sut.parse(xml).tistory;

        expect(result.status).toBe(400);
        expect(result.error_message).toBe('access_token 이 유효하지 않습니다.');
    });
});
