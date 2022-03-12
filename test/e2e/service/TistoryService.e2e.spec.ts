import 'reflect-metadata';
import { Container } from 'typedi';
import * as path from 'path';
import { TistoryService } from '../../../src/service/TistoryService';
import { WinstonLogger } from '../../../src/libs/logger/WinstonLogger';

describe('TistoryService(e2e)', () => {
  const sut: TistoryService = Container.get(TistoryService);
  const logger: WinstonLogger = Container.get(WinstonLogger);
  const fileDir = path.join(__dirname, '../../file');

  describe('uploadImage', () => {
    it('Tistory에 이미지가 업로드된다', async () => {
      const filePath = path.join(fileDir, '/images/test.png');

      const result = await sut.uploadImage(filePath);

      logger.debug(`result=${result}`);

      expect(result).toContain('http');
    });
  });
});
