import 'reflect-metadata';
import { Container } from 'typedi';
import * as path from 'path';
import { TistoryService } from '../../../../src/service/tistory/TistoryService';
import { WinstonLogger } from '../../../../src/libs/logger/WinstonLogger';

describe('TistoryService(e2e)', () => {
  const sut: TistoryService = Container.get(TistoryService);
  const logger: WinstonLogger = Container.get(WinstonLogger);
  const fileDir = path.join(__dirname, '../../../file');

  describe('create', () => {
    it('마크다운 내용이 포스팅된다', async () => {
      const fileName = 'test.md';

      const result = await sut.create(fileName, fileDir);

      expect(result.url).toContain('https');
    });

    it('파일명을 입력하지 않으면 가장 가까운 md 파일을 업로드 한다', async () => {
      const result = await sut.create(null, fileDir);

      expect(result.url).toContain('https');
    });
  });
  describe('uploadImage', () => {
    it('Tistory에 이미지가 업로드된다', async () => {
      const filePath = path.join(fileDir, '/images/test.png');

      const result = await sut.uploadImage(filePath);

      logger.debug(`result=${result}`);

      expect(result).toContain('http');
    });
  });
});
