export class TistoryApiGetOneResponse {
  title: string;
  tags: any;
  categoryId: string;

  get tagNames(): string[] {
    return this.tags.tag;
  }
}
