import 'reflect-metadata';
import { Container } from 'typedi';
import { Logger } from '../../../src/libs/logger/Logger';
import { WinstonLogger } from '../../../src/libs/logger/WinstonLogger';

describe('WinstonLogger', () => {
    const sut: Logger = Container.get(WinstonLogger);

    it('테스트환경에서 로그레벨은 debug이다', () => {
        expect(sut.level()).toBe('debug');
    });

    it('debug는 파란색이 출력된다', () => {
        sut.debug('디버그모드');
    });
});
