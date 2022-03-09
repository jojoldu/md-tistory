import { FileMetadata } from '../../../../src/libs/file-manager/FileMetadata';

describe('FileMetadata', () => {
    it('.md파일의 이름을 가져온다', () => {
        const filePath = '/Users/jojoldu/git/md-tistory/test/libs/file-manager/file/test.md';
        const result = FileMetadata.markdown(filePath, '');
        expect(result.name).toBe('test');
    });
});
