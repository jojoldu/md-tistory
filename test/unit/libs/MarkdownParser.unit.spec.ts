import 'reflect-metadata';
import { MarkdownParser } from '../../../src/libs/MarkdownParser';
import { Container } from 'typedi';

describe('MarkdownParser', () => {
  const sut: MarkdownParser = Container.get(MarkdownParser);

  it('문단 첫 코드도 변환된다', () => {
    const md = '`test` 는 **어렵네요**';
    const result = sut.parse(md);
    expect(result).toBe(
      '<p><code>test</code> 는 <strong>어렵네요</strong></p>\n',
    );
  });

  it('blockquote는 data-ke-style="style2" 이 적용되어 변환된다', () => {
    const md = '> Slack Webhook 생성이 처음';
    const result = sut.parse(md);
    expect(result).toBe(
      '<blockquote data-ke-style="style2">\n' +
        '<p>Slack Webhook 생성이 처음</p>\n' +
        '</blockquote>\n',
    );
  });
});
