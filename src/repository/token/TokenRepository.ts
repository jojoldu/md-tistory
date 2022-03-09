import { Service } from 'typedi';
import { FileManager } from '../../libs/file-manager/FileManager';
import { FileType } from '../../libs/file-manager/dto/FileType';
import { plainToInstance } from 'class-transformer';
import { BlogMetadata } from './dto/BlogMetadata';
import { Token } from './dto/Token';
import { getConfigRootPath } from '../../libs/file-manager/getConfigRootPath';

@Service()
export class TokenRepository {
  constructor(private readonly fileManager: FileManager) {}

  async findBlogMetadata(): Promise<BlogMetadata> {
    const json = await this.find(FileType.BLOG);
    return plainToInstance(BlogMetadata, json);
  }

  async findToken(): Promise<Token> {
    const json = await this.find(FileType.TOKEN);
    return plainToInstance(Token, json);
  }

  private async find(fileType: FileType) {
    const filePath = `${getConfigRootPath()}/${fileType}.json`;
    return this.fileManager.findJson(filePath);
  }
}
