import { Service } from 'typedi';
import { XMLParser } from 'fast-xml-parser';

@Service()
export class XmlParser {
    private parser: XMLParser;

    constructor(parser?: XMLParser) {
        this.parser = parser? parser: new XMLParser();
    }

    parse(xml: string) {
        return this.parser.parse(xml);
    }
}
