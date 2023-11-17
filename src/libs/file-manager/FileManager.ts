import { Service } from 'typedi';
import * as fs from 'fs-extra';
import * as path from 'path';
import { NotFoundFileError } from './NotFoundFileError';
import { FileMetadata } from './dto/FileMetadata';
import { FileManagerMessages } from './FileManagerMessages';
import { WinstonLogger } from '../logger/WinstonLogger';
import { ReadStream } from 'fs';

@Service()
export class FileManager {
  private fileManager;
  private readonly logger: WinstonLogger;

  constructor(logger: WinstonLogger) {
    this.fileManager = fs;
    this.logger = logger;
  }

  async findMarkdown(filePath: string | null): Promise<FileMetadata> {
    this.logger.debug(`findMarkdown filePath=${filePath}`);
    const markdownFilePath = filePath ?? this.findPathFromCurrent();
    const content = await this.fileManager.readFile(markdownFilePath, 'utf8');
    return FileMetadata.markdown(markdownFilePath, content);
  }

  async findJson(filePath: string) {
    try {
      const jsonData = await fs.readFile(filePath, 'utf8');
      return JSON.parse(jsonData);
    } catch (err) {
      this.logger.error(
        `${FileManagerMessages.NOT_FOUND_FILE} = ${filePath} \n`,
      );
      this.logger.warn('Please run md-tistory init');
      throw new NotFoundFileError(FileManagerMessages.NOT_FOUND_FILE);
    }
  }

  async findImage(filePath: string): Promise<ReadStream> {
    try {
      return await fs.createReadStream(filePath);
    } catch (err) {
      this.logger.error(
        `${FileManagerMessages.NOT_FOUND_FILE} = ${filePath} \n`,
      );
      throw new NotFoundFileError(FileManagerMessages.NOT_FOUND_FILE);
    }
  }

  findPathFromCurrent(currentPath = process.cwd()): string {
    const files = this.readPath(currentPath);
    const markdownFileName = files.find((file) => path.extname(file) === '.md');

    if (!markdownFileName) {
      this.logger.error(
        `${FileManagerMessages.NOT_FOUND_FILE} = ${currentPath}`,
      );
      throw new NotFoundFileError(FileManagerMessages.NOT_FOUND_FILE);
    }

    return `${currentPath}/${markdownFileName}`;
  }

  private readPath(currentPath: string) {
    try {
      return fs.readdirSync(currentPath);
    } catch (e) {
      this.logger.error(e.message, e);
      throw new NotFoundFileError(e.message);
    }
  }
}
