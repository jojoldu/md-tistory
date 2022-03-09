import { Service } from 'typedi';
import * as fs from 'fs-extra';
import * as path from 'path';
import { NotFoundFileError } from './NotFoundFileError';
import { FileMetadata } from './dto/FileMetadata';
import { FileManagerMessages } from './FileManagerMessages';
import { WinstonLogger } from '../logger/WinstonLogger';

@Service()
export class FileManager {
    private fileManager;
    private readonly logger: WinstonLogger;

    constructor(logger: WinstonLogger) {
        this.fileManager = fs;
        this.logger = logger;
    }

    async findMarkdown(filePath = this.findPathFromCurrent()): Promise<FileMetadata> {
        const content = await this.fileManager.readFile(filePath, 'utf8');
        return FileMetadata.markdown(filePath, content);
    }

    findPathFromCurrent(currentPath = process.cwd()): string {
        const files = this.readPath(currentPath);
        const markdownFileName = files.find(file => path.extname(file) === '.md');

        if(!markdownFileName){
            this.logger.error(`${FileManagerMessages.NOT_FOUND_MARKDOWN} = ${currentPath}`);
            throw new NotFoundFileError(FileManagerMessages.NOT_FOUND_MARKDOWN);
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
