import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import env from '@/lib/env';
import * as fs from 'fs';

export default class AzureStorageService {
  private readonly blobServiceClient: BlobServiceClient;

  private readonly containerClient: ContainerClient;

  constructor(containerName: string) {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(env.AZURE_STORAGE_CONNECTION_STRING);
    this.containerClient = this.blobServiceClient.getContainerClient(containerName);
  }

  async uploadFile(filePath: string) {
    const file = fs.readFileSync(filePath);

    console.log(file.toString());

    const blobName = filePath;

    const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(file, file.length);
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
}
