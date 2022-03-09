import { Service } from 'typedi';
import { XMLParser } from 'fast-xml-parser';

@Service()
export class XmlParser {
  private parser: XMLParser;

  constructor() {
    this.parser = new XMLParser();
  }

  parse(xml: string) {
    return this.parser.parse(xml);
  }
}
