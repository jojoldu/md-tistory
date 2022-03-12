import { getImagePaths } from '../../../src/service/tistory/getImagePaths';

describe('getImagePaths', () => {
  it('image path만 골라낸다', () => {
    const mdContent = '![티스토리클라이언트](../images/티스토리클라이언트.png)';

    const result = getImagePaths(mdContent);

    expect(result).toHaveLength(1);
    expect(result[0]).toBe('../images/티스토리클라이언트.png');
  });

  it('파일명이 없는 경우에도 image path만 골라낸다', () => {
    const mdContent = 'aaa![](../images/티스토리클라이언트.png)aaa';

    const result = getImagePaths(mdContent);

    expect(result).toHaveLength(1);
    expect(result[0]).toBe('../images/티스토리클라이언트.png');
  });

  it('여러 image path를 골라낸다', () => {
    const mdContent =
      'aaa![](../images/티스토리클라이언트.png)aaa' +
      '![](../images/티스토리클라이언트.png) #asd' +
      '![](../images/티스토리클라이언트.png) ## asd';

    const result = getImagePaths(mdContent);

    expect(result).toHaveLength(3);
    expect(result[0]).toBe('../images/티스토리클라이언트.png');
    expect(result[1]).toBe('../images/티스토리클라이언트.png');
    expect(result[2]).toBe('../images/티스토리클라이언트.png');
  });
});
