import { Service } from 'typedi';
import { TistoryService } from '../service/tistory/TistoryService';
import { WinstonLogger } from '../libs/logger/WinstonLogger';
import { TistoryCreateResponse } from '../service/tistory/dto/create/TistoryCreateResponse';

@Service()
export class TistoryController {
  constructor(
    private readonly tistoryService: TistoryService,
    private readonly logger: WinstonLogger,
  ) {}

  async create(
    mdName: string | null,
    currentPath = process.cwd(),
  ): Promise<TistoryCreateResponse> {
    try {
      return await this.tistoryService.create(mdName, currentPath);
    } catch (e) {
      this.logger.error(
        `create exception: mdName=${mdName}, currentPath=${currentPath}\n`,
        e,
      );
      throw e;
    }
  }
}
