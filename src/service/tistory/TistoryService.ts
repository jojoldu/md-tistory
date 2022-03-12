import { Service } from 'typedi';
import { TistoryRepository } from '../../repository/tistory/TistoryRepository';
import { TokenRepository } from '../../repository/token/TokenRepository';
import { WinstonLogger } from '../../libs/logger/WinstonLogger';
import { FileManager } from '../../libs/file-manager/FileManager';
import { TistoryApiFileRequest } from '../../repository/tistory/request/post/TistoryApiFileRequest';
import { getImagePaths } from './getImagePaths';

@Service()
export class TistoryService {
  constructor(
    private readonly tistoryRepository: TistoryRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly fileManager: FileManager,
    private readonly logger: WinstonLogger,
  ) {}

  async convertImages(mdPath: string, mdContent: string) {
    const imagePaths = getImagePaths(mdContent);
  }

  async uploadImage(filePath: string): Promise<string> {
    this.logger.debug(`filePath=${filePath}`);
    const { accessToken } = await this.tokenRepository.findToken();
    const { blogName } = await this.tokenRepository.findBlogMetadata();
    const dto = new TistoryApiFileRequest(
      accessToken,
      blogName,
      await this.fileManager.findImage(filePath),
    );
    return await this.tistoryRepository.uploadImage(dto);
  }
}
