import { MarkdownImage } from '../../../../src/service/tistory/dto/MarkdownImage';

describe('MarkdownImage', () => {
  it('마크다운파일의 위치와 이미지 주소가 병합된다', () => {
    const mdPath = '/git/test/README.md';
    const imagePath = './images/티스토리클라이언트.png';

    const sut = new MarkdownImage(mdPath, imagePath);

    expect(sut.mdImageFullPath).toBe('/git/test/images/티스토리클라이언트.png');
  });

  it('마크다운 파일의 위치와 현재 이미지 주소가 병합된다', () => {
    const mdPath = '/git/test/README.md';
    const imagePath = '티스토리클라이언트.png';

    const sut = new MarkdownImage(mdPath, imagePath);

    expect(sut.mdImageFullPath).toBe('/git/test/티스토리클라이언트.png');
  });

  it('외부 이미지는 그대로 저장된다', () => {
    const imagePath =
      'https://blog.kakaocdn.net/dn/c9bAHz/btrpuubRo6U/LqGdZ64DnGbKKgWahVP0I0/img.jpg';

    const sut = new MarkdownImage('', imagePath);

    expect(sut.mdImagePath).toBe(imagePath);
    expect(sut.mdImageFullPath).toBe(imagePath);
  });
});
