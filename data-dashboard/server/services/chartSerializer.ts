import xlsx from 'xlsx';
import { Chart } from '../models';
import { StorageService } from './storageService';

export default class ChartSerializer {
  private readonly storageService: StorageService;

  constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  async buildChart(fileHandle: string): Promise<Chart> {
    const file = await this.storageService.readFile(fileHandle);
    const workbook = xlsx.read(file, { type: 'buffer' });
    for (const sheet of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheet];
      const asJson = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
      console.log({ asJson });
    }

    return Promise.resolve({
      boardId: '1',
      data_source_id: '2',
      height: 200,
      id: '3',
      title: 'someting',
      type: 'line',
      width: 200,
      x: 0,
      y: 9,
    });
  }
}
