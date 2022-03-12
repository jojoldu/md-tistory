import { Service } from 'typedi';
import { TistoryRepository } from '../../repository/tistory/TistoryRepository';
import { TokenRepository } from '../../repository/token/TokenRepository';
import { WinstonLogger } from '../../libs/logger/WinstonLogger';
import { FileManager } from '../../libs/file-manager/FileManager';
import { TistoryApiFileRequest } from '../../repository/tistory/request/post/TistoryApiFileRequest';
import { getImagePaths } from './getImagePaths';
import { MarkdownImage } from './dto/MarkdownImage';
import { MarkdownFile } from './dto/MarkdownFile';

@Service()
export class TistoryService {
  constructor(
    private readonly tistoryRepository: TistoryRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly fileManager: FileManager,
    private readonly logger: WinstonLogger,
  ) {}

  async convertImages(mdFile: MarkdownFile): Promise<MarkdownFile> {
    const markdownImages = getImagePaths(mdFile.content)
      .map((imagePath) => new MarkdownImage(mdFile.path, imagePath))
      .filter((markdownImage) => markdownImage.isNotWebImage);

    mdFile.updateUploadContent(
      await Promise.all(
        markdownImages.map(async (markdownImage) => {
          const url = await this.uploadImage(markdownImage.mdImageFullPath);
          if (url) {
            markdownImage.updateUrlPath(url);
          }

          return markdownImage;
        }),
      ),
    );
    return mdFile;
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
        `해당 파일은 이미지 URL 변환에 실패했습니다. imagePath=${dto.filePath}`,
        e,
      );
      return undefined;
    }
  }
}
