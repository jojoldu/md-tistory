import 'reflect-metadata';

import * as path from 'path';
import { Container } from 'typedi';
import { FileManager } from '../../../src/libs/file-manager/FileManager';
import { NotFoundFileError } from '../../../src/libs/file-manager/NotFoundFileError';
import { FileManagerMessages } from '../../../src/libs/file-manager/FileManagerMessages';

describe('FileManager', () => {
    const sut: FileManager = Container.get(FileManager);

    describe('findPathFromCurrent', () => {
        it('현재 위치에서 .md 파일 path를 찾는다', () => {
            const testPath = path.join(__dirname, 'file');

            const result = sut.findPathFromCurrent(testPath);

            expect(result).toContain('test.md');
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
                sut.findPathFromCurrent();
                fail('should not reach');
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundFileError);
                expect(e.message).toBe(FileManagerMessages.NOT_FOUND_MARKDOWN);
            }
        });
    });

    describe('find', () => {
        it('test.md의 이름, 내용, 위치가 반환된다', async () => {
            const testPath = path.join(__dirname, 'file', 'test.md');

            const result = await sut.findMarkdown(testPath);

            expect(result.name).toBe('test');
            expect(result.path).toBe(testPath);
            expect(result.content).toContain('테스트 마크다운');
        });
    });
});
