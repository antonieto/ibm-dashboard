import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import env from '@/lib/env';
import {DataSourceHandle} from '../models';

interface AzureFileHandle {
  fileName: string;
  blobName: string;
}

export default class AzureStorageService {
  private readonly blobServiceClient: BlobServiceClient;

  private readonly containerClient: ContainerClient;

  constructor(containerName: string) {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(env.AZURE_STORAGE_CONNECTION_STRING);
    this.containerClient = this.blobServiceClient.getContainerClient(containerName);
  }

  async uploadFile(fileName: string, fileBuffer: Buffer): Promise<DataSourceHandle> {
    const blobName = this.generateBlobName(fileName)
    const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(fileBuffer, fileBuffer.length);
    console.log(blockBlobClient.name)
    return {
      resourceUri: blockBlobClient.url,
      fileName,
    }
  }

  async getFiles() {
    try {
      const blobs = this.containerClient.listBlobsFlat();
      const files = [];
      for await (const blob of blobs) {
        files.push(blob.name);
      }
      return files;
    } catch (e) {
      return [];
    }
  }

  private generateBlobName(fileName: string): string {
    return fileName;
  }
}
