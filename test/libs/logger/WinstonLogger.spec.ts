import 'reflect-metadata';
import { Container } from 'typedi';
import { Logger } from '../../../src/libs/logger/Logger';
import { WinstonLogger } from '../../../src/libs/logger/WinstonLogger';

describe('WinstonLogger', () => {
    const sut: Logger = Container.get(WinstonLogger);

    it('테스트환경에서 로그레벨은 debug이다', () => {
        expect(sut.level()).toBe('debug');
    });

    describe('color', () => {
        it('debug는 파란색', () => {
            sut.debug('debug');
        });

        it('error는 빨간색', () => {
            sut.error('error');
        });

        it('info는 녹색', () => {
            sut.info('info');
        });

        it('warn은 노란색', () => {
            sut.warn('warn');
        });
    });

});
