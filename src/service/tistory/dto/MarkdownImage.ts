import path from 'path';

export class MarkdownImage {
  private static WEB_IMAGE_REGEX = new RegExp('(http|https)://', 'i');

  private readonly _mdImagePath: string;
  private readonly _mdImageFullPath: string;
  private _urlPath: string;

  constructor(mdPath: string, mdImagePath: string) {
    this._mdImagePath = mdImagePath;
    this._mdImageFullPath = this.mergePath(mdPath, mdImagePath);
  }

  private mergePath(mdPath: string, mdImagePath: string): string {
    if (this.isWebImage) {
      return mdImagePath;
    }

    const isAbsolutePath = mdImagePath.startsWith('/');
    if (isAbsolutePath) {
      return mdImagePath;
    }

    const prefixPath = mdPath.split('/').slice(0, -1).join('/') + '/';

    return path.join(prefixPath, mdImagePath);
  }

  get mdImagePath(): string {
    return this._mdImagePath;
  }

  get mdImageFullPath(): string {
    return this._mdImageFullPath;
  }

  get urlPath(): string {
    return this._urlPath;
  }

  get isWebImage(): boolean {
    return MarkdownImage.WEB_IMAGE_REGEX.test(this._mdImagePath);
  }
}
