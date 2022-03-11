import { Service } from 'typedi';
import { TistoryRepository } from '../repository/tistory/TistoryRepository';
import { TokenRepository } from '../repository/token/TokenRepository';
import { WinstonLogger } from '../libs/logger/WinstonLogger';
import { FileManager } from '../libs/file-manager/FileManager';
import { TistoryApiFileRequest } from '../repository/tistory/request/post/TistoryApiFileRequest';

@Service()
export class TistoryService {
  constructor(
    private readonly tistoryRepository: TistoryRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly fileManager: FileManager,
    private readonly logger: WinstonLogger,
  ) {}

  async uploadImage(filePath: string): Promise<string> {
    this.logger.debug(`filePath=${filePath}`);
    const file = await this.fileManager.findImage(filePath);
    const { accessToken } = await this.tokenRepository.findToken();
    const { blogName } = await this.tokenRepository.findBlogMetadata();
    const dto = new TistoryApiFileRequest(accessToken, blogName, file);
    return await this.tistoryRepository.uploadImage(dto);
  }
}
