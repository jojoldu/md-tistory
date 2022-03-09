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
});
