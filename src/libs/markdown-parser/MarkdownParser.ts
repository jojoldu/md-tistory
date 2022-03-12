import { Service } from 'typedi';
import { marked } from 'marked';

@Service()
export class MarkdownParser {
  private parser;

  constructor() {
    this.parser = marked;
  }

  parse(mdContent: string): string {
    return `<article class="markdown-body entry-content" itemprop="text"> ${this.convert(
      mdContent,
    )} </article>`;
  }

  private convert(mdContent: string): string {
    return this.parser
      .parse(mdContent)
      .replace('<blockquote>', '<blockquote data-ke-style="style2">');
  }
}
