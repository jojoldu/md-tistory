import 'reflect-metadata';
import { Container } from 'typedi';
import * as path from 'path';
import { TistoryService } from '../../../src/service/TistoryService';

describe('TistoryService(e2e)', () => {
  const sut: TistoryService = Container.get(TistoryService);
  const fileDir = path.join(__dirname, '../../file');

  describe('uploadImage', () => {
    it('Tistory에 이미지가 업로드된다', async () => {
      const filePath = path.join(fileDir, '/images/test.png');

      const result = await sut.uploadImage(filePath);

      expect(result).toContain('http');
    });
  });
});
