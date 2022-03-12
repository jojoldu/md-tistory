import { MarkdownImage } from './MarkdownImage';
import { FileMetadata } from '../../../libs/file-manager/dto/FileMetadata';

export class MarkdownFile {
  private readonly _title: string;
  private readonly _path: string;
  private readonly _content: string;
  private _uploadContent: string;

  constructor(title: string, path: string, content: string) {
    this._title = title;
    this._path = path;
    this._content = content;
    this._uploadContent = content;
  }

  static of(file: FileMetadata): MarkdownFile {
    return new MarkdownFile(file.name, file.path, file.content);
  }

  updateUploadContent(markdownImages: MarkdownImage[]): void {
    markdownImages.forEach((v) => {
      this._uploadContent = this._uploadContent.replace(
        v.mdImagePath,
        v.urlPath,
      );
    });
  }

  get title(): string {
    return this._title;
  }

  get path(): string {
    return this._path;
  }

  get content(): string {
    return this._content;
  }

  get uploadContent(): string {
    return this._uploadContent;
  }
}
