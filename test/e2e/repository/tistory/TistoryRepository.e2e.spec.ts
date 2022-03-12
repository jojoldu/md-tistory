import 'reflect-metadata';

import { Container } from 'typedi';
import { TistoryRepository } from '../../../../src/repository/tistory/TistoryRepository';
import { TistoryApiCreateRequest } from '../../../../src/repository/tistory/request/post/TistoryApiCreateRequest';
import { TokenRepository } from '../../../../src/repository/token/TokenRepository';
import { FileManager } from '../../../../src/libs/file-manager/FileManager';
import { FileMetadata } from '../../../../src/libs/file-manager/dto/FileMetadata';
import path from 'path';
import { MarkdownParser } from '../../../../src/libs/markdown-parser/MarkdownParser';

describe('TistoryRepository(e2e)', () => {
  const sut: TistoryRepository = Container.get(TistoryRepository);
  const tokenRepository: TokenRepository = Container.get(TokenRepository);
  const markdownParser: MarkdownParser = Container.get(MarkdownParser);
  const fileManager: FileManager = Container.get(FileManager);
  let markdownFile: FileMetadata;

  beforeAll(async () => {
    markdownFile = await fileManager.findMarkdown(
      path.join(__dirname, '../../../file/code.md'),
    );
  });

  it('글 등록', async () => {
    const { accessToken } = await tokenRepository.findToken();
    const blogName = 'jojoldu';
    const content = markdownParser.parse(markdownFile.content);

    const result: string = await sut.create(
      new TistoryApiCreateRequest('test', content, accessToken, blogName),
    );

    expect(result).toContain('https');
  });
});
