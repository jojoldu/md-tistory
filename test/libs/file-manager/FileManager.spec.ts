import 'reflect-metadata';

import * as path from 'path';
import { Container } from 'typedi';
import { FileManager } from '../../../src/libs/file-manager/FileManager';

describe('FileManager', () => {
    const sut: FileManager = Container.get(FileManager);

    describe('findPathFromCurrent', () => {
        it('현재 위치에서 .md 파일 path를 찾는다', () => {
            const testPath = path.join(__dirname, 'file');

            const result = sut.findPathFromCurrent(testPath);

            expect(result).toContain('test.md');
        });
    });

    describe('find', () => {
        it('test.md의 이름, 내용, 위치가 반환된다', async () => {
            const testPath = path.join(__dirname, 'file', 'test.md');

            const result = await sut.find(testPath);

            expect(result.name).toBe('test');
            expect(result.path).toBe(testPath);
            expect(result.content).toContain('테스트 마크다운');
        });
    });
});
