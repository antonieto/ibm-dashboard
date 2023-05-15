import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import env from '@/lib/env';

export interface StorageService {
  uploadFile(file: File): Promise<void>;
  getFiles(): Promise<string[]>;
}

export class AzureStorageService implements StorageService {
  private readonly blobServiceClient: BlobServiceClient;

  private readonly containerClient: ContainerClient;

  constructor(containerName: string) {
    console.log({ env: env.AZURE_STORAGE_CONNECTION_STRING });
    this.blobServiceClient = BlobServiceClient.fromConnectionString(env.AZURE_STORAGE_CONNECTION_STRING);
    this.containerClient = this.blobServiceClient.getContainerClient(containerName);
  }

  async uploadFile(file: File) {
    const containerClient = this.blobServiceClient.getContainerClient('images');
    const blobClient = containerClient.getBlockBlobClient(file.name);
    await blobClient.uploadFile(file.webkitRelativePath);
  }

  async getFiles() {
    try {
      const blobs = this.containerClient.listBlobsFlat();
      const files = [];
      for await (const blob of blobs) {
        console.log(`Blob: ${blob.name}`);
        files.push(blob.name);
      }
      return files;
    } catch (e) {
      console.error('Error: ', e);
      return [];
    }
  }
}
