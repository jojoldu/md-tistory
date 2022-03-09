import 'reflect-metadata';
import { Container } from 'typedi';
import { TokenRepository } from '../../../../src/repository/token/TokenRepository';
import { Token } from '../../../../src/repository/token/dto/Token';
import { BlogMetadata } from '../../../../src/repository/token/dto/BlogMetadata';

describe('TokenRepository(e2e)', () => {
  const sut: TokenRepository = Container.get(TokenRepository);

  it('PC에 저장된 token.json을 가져온다', async () => {
    const token: Token = await sut.findToken();
    expect(token.accessToken).toBeDefined();
  });

  it('PC에 저장된 blog.json을 가져온다', async () => {
    const token: BlogMetadata = await sut.findBlogMetadata();
    expect(token.blogName).toBe('jojoldu');
  });
});
