import * as path from 'path';

export class FileMetadata {
    private readonly _name: string;
    private readonly _location: string;
    private readonly _content: string;

    constructor(name: string, location: string, content: string) {
        this._name = name;
        this._location = location;
        this._content = content;
    }

    static markdown(filePath: string, content: string): FileMetadata {
        const fileName = path.parse(filePath).name
        return new FileMetadata(fileName, filePath, content);
    }

    get name(): string {
        return this._name;
    }

    get location(): string {
        return this._location;
    }

    get content(): string {
        return this._content;
    }
}
