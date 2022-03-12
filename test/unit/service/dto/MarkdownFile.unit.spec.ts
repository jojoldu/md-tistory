import { MarkdownFile } from '../../../../src/service/tistory/dto/MarkdownFile';
import { MarkdownImage } from '../../../../src/service/tistory/dto/MarkdownImage';

describe('MarkdownFile', () => {
  it('markdownImage의 url주소로 image path가 교체된다', () => {
    const imagePath = `../images/티스토리.png`;
    const content = `![티스토리](${imagePath})`;
    const url = 'https://t1.daumcdn.net/cfile/tistory/9975AC495E9CEA2F26';
    const markdownImages = [MarkdownImage.testOf('', imagePath, url)];
    const sut = new MarkdownFile('', '', content);

    sut.updateUploadContent(markdownImages);

    expect(sut.uploadContent).toBe(
      '![티스토리](https://t1.daumcdn.net/cfile/tistory/9975AC495E9CEA2F26)',
    );
  });
});
