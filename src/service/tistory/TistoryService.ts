import { Service } from 'typedi';
import { TistoryRepository } from '../../repository/tistory/TistoryRepository';
import { TokenRepository } from '../../repository/token/TokenRepository';
import { WinstonLogger } from '../../libs/logger/WinstonLogger';
import { FileManager } from '../../libs/file-manager/FileManager';
import { TistoryApiFileRequest } from '../../repository/tistory/request/post/TistoryApiFileRequest';
import { getImagePaths } from './getImagePaths';
import { MarkdownImage } from './dto/MarkdownImage';
import { MarkdownFile } from './dto/MarkdownFile';
import { TistoryApiCreateRequest } from '../../repository/tistory/request/post/TistoryApiCreateRequest';
import * as path from 'path';
import { MarkdownParser } from '../../libs/markdown-parser/MarkdownParser';

@Service()
export class TistoryService {
  constructor(
    private readonly tistoryRepository: TistoryRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly fileManager: FileManager,
    private readonly markdownParser: MarkdownParser,
    private readonly logger: WinstonLogger,
  ) {}

  async create(mdName: string, currentPath = process.cwd()): Promise<string> {
    const { accessToken } = await this.tokenRepository.findToken();
    const { blogName } = await this.tokenRepository.findBlogMetadata();
    const mdFile: MarkdownFile = MarkdownFile.of(
      await this.fileManager.findMarkdown(path.join(currentPath, `/${mdName}`)),
    );
    mdFile.updateUploadContent(await this.convertImages(mdFile));

    const content = this.markdownParser.parse(mdFile.uploadContent);

    this.logger.debug(content);

    return await this.tistoryRepository.create(
      new TistoryApiCreateRequest(mdFile.title, content, accessToken, blogName),
    );
  }

  async convertImages(mdFile: MarkdownFile): Promise<MarkdownImage[]> {
    const markdownImages = getImagePaths(mdFile.content)
      .map((imagePath) => new MarkdownImage(mdFile.path, imagePath))
      .filter((markdownImage) => markdownImage.isNotWebImage);

    return await Promise.all(
      markdownImages.map(async (markdownImage) => {
        const url = await this.uploadImage(markdownImage.mdImageFullPath);
        if (url) {
          markdownImage.updateUrlPath(url);
        }

        return markdownImage;
      }),
    );
  }

  async uploadImage(filePath: string): Promise<string | undefined> {
    this.logger.debug(`filePath=${filePath}`);
    const { accessToken } = await this.tokenRepository.findToken();
    const { blogName } = await this.tokenRepository.findBlogMetadata();
    const dto = new TistoryApiFileRequest(
      accessToken,
      blogName,
      await this.fileManager.findImage(filePath),
      filePath,
    );

    try {
      return await this.tistoryRepository.uploadImage(dto);
    } catch (e) {
      this.logger.error(
        `?????? ????????? ????????? URL ????????? ??????????????????. imagePath=${dto.filePath}`,
        e,
      );
      return undefined;
    }
  }
}
