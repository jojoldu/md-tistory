export class TistoryCreateResponse {
  private readonly _url: string;
  private readonly _filePath: string;

  constructor(url: string, filePath: string) {
    this._url = url;
    this._filePath = filePath;
  }

  get url(): string {
    return this._url;
  }

  get fileFullPath(): string {
    return `${this._filePath}`;
  }
}
