import { Service } from 'typedi';
import { TistoryService } from '../service/tistory/TistoryService';

@Service()
export class TistoryController {
  constructor(private readonly tistoryService: TistoryService) {}

  async create(mdName: string, currentPath = process.cwd()): Promise<string> {
    return await this.tistoryService.create(mdName, currentPath);
  }
}
