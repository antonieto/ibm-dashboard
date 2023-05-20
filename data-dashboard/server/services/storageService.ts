import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import env from '@/lib/env';

export default class AzureStorageService {
  private readonly blobServiceClient: BlobServiceClient;

  private readonly containerClient: ContainerClient;

  constructor(containerName: string) {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      env.AZURE_STORAGE_CONNECTION_STRING,
    );
    this.containerClient = this.blobServiceClient.getContainerClient(containerName);
  }

  async uploadFile(fileName: string, fileBuffer: Buffer): Promise<string> {
    try {
      const blobName = AzureStorageService.generateBlobName(fileName);

      await this.containerClient
        .getBlockBlobClient(blobName)
        .upload(fileBuffer, fileBuffer.length);

      return blobName;
    } catch (err) {
      throw new Error('Failed to upload file');
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

  static generateBlobName(fileName: string): string {
    // Generate random string
    const randomString = Math.random().toString(36).substring(2, 15);
    return `${randomString}-${fileName}`;
  }
}
