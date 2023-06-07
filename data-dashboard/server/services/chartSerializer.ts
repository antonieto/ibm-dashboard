import xlsx from 'xlsx';
import { z } from 'zod';
import { Chart, ChartData, ChartSettings, TData } from '../models';
import { DataSourceRepository } from '../repositories/dataSource';
import { StorageService } from './storageService';
import CacheService from './cacheService';

const ChartDataSchema = z.object({
  chartId: z.string(),
  index: z.string(),
  categories: z.array(z.string()),
  data: z.array(z.record(z.string(), z.string().or(z.number()))),
});

export default class ChartSerializer {
  private readonly storageService: StorageService;

  private readonly dataSourceRepository: DataSourceRepository;

  private readonly cacheService: CacheService;

  constructor(
    storageService: StorageService,
    dataSourceRepository: DataSourceRepository,
    cacheService: CacheService,
  ) {
    this.storageService = storageService;
    this.dataSourceRepository = dataSourceRepository;
    this.cacheService = cacheService;
  }

  async getData(chart: Chart): Promise<ChartData> {
    const cacheKey = `chart-data-${chart.id}`;
    const fromCache = await this.cacheService.get(cacheKey, ChartDataSchema);
    if (fromCache !== null) {
      return fromCache;
    }
    const serialized = await this.buildChartData(chart);
    await this.cacheService.set(cacheKey, serialized);
    return serialized;
  }

  private async buildChartData(
    chart: Chart,
  ): Promise<ChartData> {
    const { settings } = chart;
    if (settings === undefined) {
      throw new Error('Chart settings not found');
    }
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
    const data = ChartSerializer.buildDataFromJson(index, settings, asJson);

    return {
      categories,
      chartId: '',
      data,
      index,
    };
  }

  private static buildDataFromJson(
    index: string,
    settings: ChartSettings,
    data: any,
  ): TData[] {
    const { yAxisColumns } = settings;
    return data
      .slice(1)
      .map((row: Array<string | number>) => {
        const item = row[settings.xAxisColumn];
        const category = String(item);

        const resultObj: TData = {
          [index]: category,
        };

        yAxisColumns.forEach((yAxisColumn) => {
          const value = (row as Array<string | number>)[yAxisColumn];
          const key = String((data[0] as Array<string | number>)[yAxisColumn]);
          resultObj[key] = value;
        });

        return resultObj;
      })
      .filter((item) => item !== null);
  }
}
