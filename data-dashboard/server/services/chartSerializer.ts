import xlsx from 'xlsx';
import { Chart, ChartData, ChartSettings, TData } from '../models';
import { DataSourceRepository } from '../repositories/dataSource';
import { StorageService } from './storageService';

export default class ChartSerializer {
  private readonly storageService: StorageService;

  private readonly dataSourceRepository: DataSourceRepository;

  constructor(
    storageService: StorageService,
    dataSourceRepository: DataSourceRepository,
  ) {
    this.storageService = storageService;
    this.dataSourceRepository = dataSourceRepository;
  }

  async buildChartData(
    chart: Chart,
    settings: ChartSettings,
  ): Promise<ChartData> {
    const dataSource = await this.dataSourceRepository.getById(
      chart.data_source_id,
    );
    if (dataSource === null) {
      throw new Error('Data source not found');
    }

    const file = await this.storageService.readFile(dataSource.externalHandle);
    const workbook = xlsx.read(file, { type: 'buffer' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

    const asJson = xlsx.utils.sheet_to_json(firstSheet, { header: 1 });

    const index = String(
      (asJson[0] as Array<string | number>)[settings.xAxisColumn],
    );

    const categories = settings.yAxisColumns.map((column) => String((asJson[0] as Array<string | number>)[column]));

    // Excuse this mess it's 2am
    const data = asJson
      .slice(1)
      .map((row) => {
        const item = (row as Array<string | number>)[settings.xAxisColumn];
        const category = String(item);

        const resultObj: TData = {
          [index]: category,
        };

        settings.yAxisColumns.forEach((yAxisColumn) => {
          const value = (row as Array<string | number>)[yAxisColumn];
          const key = String(
            (asJson[0] as Array<string | number>)[yAxisColumn],
          );
          resultObj[key] = value;
        });

        return resultObj;
      }).filter((item) => item !== null);

    return {
      categories,
      chartId: '',
      data,
      index,
    };
  }
}
