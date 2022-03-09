import 'reflect-metadata';
import { Container } from 'typedi';
import { Logger } from '../../../../src/libs/logger/Logger';
import { WinstonLogger } from '../../../../src/libs/logger/WinstonLogger';

describe('WinstonLogger', () => {
  const sut: Logger = Container.get(WinstonLogger);

  it('테스트환경에서 로그레벨은 debug이다', () => {
    expect(sut.level()).toBe('debug');
  });

  it('logger 레벨별로 color가 다르다', () => {
    sut.debug('debug');
    sut.error('error');
    sut.info('info');
    sut.warn('warn');
  });
});
