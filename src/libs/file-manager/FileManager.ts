import { Service } from 'typedi';
import * as fs from 'fs-extra';
import * as path from 'path';
import { Logger } from '../logger/Logger';
import { NotFoundFileError } from './NotFoundFileError';
import { FileMetadata } from './FileMetadata';

const NOT_FOUND_FILE = 'There are no .md files in the current folder.';

@Service()
export class FileManager {
    private fileManager;
    private readonly logger: Logger;

    constructor(logger: Logger) {
        this.fileManager = fs;
        this.logger = logger;
    }

    async find(filePath = this.findPathFromCurrent()): Promise<FileMetadata> {
        const content = await this.fileManager.readFile(filePath, 'utf8');
        return FileMetadata.markdown(filePath, content);
    }

    findPathFromCurrent(currentPath = process.cwd()): string {
        const files = fs.readdirSync(currentPath);
        const markdownFileName = files.find(file => path.extname(file) === '.md');

        if(!markdownFileName){
            this.logger.error(NOT_FOUND_FILE);
            throw new NotFoundFileError(NOT_FOUND_FILE);
        }

        return `${currentPath}/${markdownFileName}`;
    }
}
