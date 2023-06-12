import xlsx from 'xlsx';
import { DataSourceRepository } from '../repositories/dataSource';
import { StorageService } from './storageService';

export default class DataSourceSerializer {
  private readonly storageService: StorageService;

  private readonly dataSourceRepository: DataSourceRepository;

  constructor(
    storageService: StorageService,
    dataSourceRepository: DataSourceRepository,
  ) {
    this.storageService = storageService;
    this.dataSourceRepository = dataSourceRepository;
  }

  async getDataById(dataSourceId: string): Promise<(string | number)[][] | null> {
    try {
      const dataSource = await this.dataSourceRepository.getById(dataSourceId);
      if (!dataSource) {
        return null;
      }
      const file = await this.storageService.readFile(dataSource.externalHandle);
      const workbook = xlsx.read(file, { type: 'buffer' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const asJson = xlsx.utils.sheet_to_json(firstSheet, { header: 1 }) as Array<Array<string | number>>;
      return asJson;
    } catch (e) {
      return null;
    }
  }
}
