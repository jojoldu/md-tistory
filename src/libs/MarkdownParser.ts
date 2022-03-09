import { Service } from 'typedi';
import { marked } from 'marked';

@Service()
export class MarkdownParser {
    private parser;

    constructor() {
        this.parser = marked;
    }

    parse(md: string): string {
        return this.parser.parse(md)
            .replace('<blockquote>', '<blockquote data-ke-style="style2">');
    }
}
