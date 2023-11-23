import { Service } from 'typedi';
import { marked } from 'marked';

@Service()
export class MarkdownParser {
  private parser;

  constructor() {
    marked.setOptions({
      gfm: true,
      breaks: true,
    });
    this.parser = marked;
  }

  parse(mdContent: string): string {
    return `${this.convert(mdContent)} `;
  }

  private convert(mdContent: string): string {
    return this.parser
      .parse(mdContent)
      .replace('<blockquote>', '<blockquote data-ke-style="style2">');
  }
}
