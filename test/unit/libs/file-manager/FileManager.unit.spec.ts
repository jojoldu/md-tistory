import 'reflect-metadata';

import * as path from 'path';
import { Container } from 'typedi';
import { FileManager } from '../../../../src/libs/file-manager/FileManager';
import { NotFoundFileError } from '../../../../src/libs/file-manager/NotFoundFileError';
import { FileManagerMessages } from '../../../../src/libs/file-manager/FileManagerMessages';
import { BlogMetadata } from '../../../../src/repository/token/dto/BlogMetadata';

describe('FileManager', () => {
  const sut: FileManager = Container.get(FileManager);
  const fileDir = path.join(__dirname, '../../../file');

  describe('findPathFromCurrent', () => {
    it('현재 위치에서 .md 파일 path를 찾는다', () => {
      const result = sut.findPathFromCurrent(fileDir);

      expect(result).toContain('.md');
    });

    it('존재하지 않는 위치를 지정하면 NotFoundFileError가 발생한다', () => {
      const testPath = './testPath';

      try {
        sut.findPathFromCurrent(testPath);
        fail('should not reach');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundFileError);
      }
    });

    it('존재하는 위치에서 .md파일이 없으면 NotFoundFileError가 발생한다', () => {
      try {
        sut.findPathFromCurrent(__dirname);
        fail('should not reach');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundFileError);
        expect(e.message).toBe(FileManagerMessages.NOT_FOUND_FILE);
      }
    });
  });

  describe('findMarkdown', () => {
    it('test.md의 이름, 내용, 위치가 반환된다', async () => {
      const testPath = path.join(fileDir, 'test.md');

      const result = await sut.findMarkdown(testPath);

      expect(result.name).toBe('test');
      expect(result.path).toBe(testPath);
      expect(result.content).toContain('테스트 마크다운');
    });
  });

  describe('findJson', () => {
    it('blog.json의 json 정보가 반환된다', async () => {
      const testPath = path.join(fileDir, 'blog.json');

      const result: BlogMetadata = await sut.findJson(testPath);

      expect(result.blogName).toBe('jojoldu');
      expect(result.clientId).toBe('clientId-test');
    });
  });

  describe('findImage', () => {
    it('test.png 조회', async () => {
      const testPath = path.join(fileDir, '/images/test.png');

      const result = await sut.findImage(testPath);

      expect(result.path).toBe(testPath);
    });
  });
});
