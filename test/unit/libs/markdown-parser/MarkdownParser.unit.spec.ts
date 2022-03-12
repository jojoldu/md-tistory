import 'reflect-metadata';
import { MarkdownParser } from '../../../../src/libs/markdown-parser/MarkdownParser';
import { Container } from 'typedi';
import { FileManager } from '../../../../src/libs/file-manager/FileManager';
import { FileMetadata } from '../../../../src/libs/file-manager/dto/FileMetadata';
import path from 'path';

describe('MarkdownParser', () => {
  const sut: MarkdownParser = Container.get(MarkdownParser);
  const fileManager: FileManager = Container.get(FileManager);
  let markdownFile: FileMetadata;

  beforeAll(async () => {
    markdownFile = await fileManager.findMarkdown(
      path.join(__dirname, '../../../file/code.md'),
    );
  });

  it('문단 첫 코드도 변환된다', () => {
    const md = '`test` 는 **어렵네요**';
    const result = sut.parse(md);
    expect(result).toBe(
      '<article class="markdown-body entry-content" itemprop="text"> <p><code>test</code> 는 <strong>어렵네요</strong></p>\n </article>',
    );
  });

  it('blockquote는 data-ke-style="style2" 이 적용되어 변환된다', () => {
    const md = '> Slack Webhook 생성이 처음';
    const result = sut.parse(md);
    expect(result).toBe(
      '<article class="markdown-body entry-content" itemprop="text"> <blockquote data-ke-style="style2">\n' +
        '<p>Slack Webhook 생성이 처음</p>\n' +
        '</blockquote>\n </article>',
    );
  });

  it('code 문법도 치환된다', () => {
    const content = markdownFile.content;

    const result = sut.parse(content);

    expect(result).toContain('<h1 id="테스트">테스트</h1>');
    expect(result).toContain('<pre><code class');
  });
});
