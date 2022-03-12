# 테스트

```ts
@Service()
export class TokenRepository {
  constructor(private readonly fileManager: FileManager) {}

  async findBlogMetadata(): Promise<BlogMetadata> {
    const json = await this.find(FileType.BLOG);
    return plainToInstance(BlogMetadata, json);
  }
}
```
