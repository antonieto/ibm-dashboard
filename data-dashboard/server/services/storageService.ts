import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

class StorageService {
  private readonly blobServiceClient: BlobServiceClient;

  private readonly containerClient: ContainerClient;

  constructor(containerName: string) {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      'https://ibmdashboard.blob.core.windows.net/data-sources?sp=racwl&st=2023-05-09T23:37:54Z&se=2023-05-10T07:37:54Z&sip=0.0.0.0-255.255.255.255&sv=2022-11-02&sr=c&sig=5Bvdv9zSRi0MQamLKWq%2F4a8EJvAKE3HwWHSURY%2FOHps%3D',
    );
    this.containerClient = this.blobServiceClient.getContainerClient(containerName);
  }

  async uploadFile(file: File) {
    const containerClient = this.blobServiceClient.getContainerClient('images');
    const blobClient = containerClient.getBlockBlobClient(file.name);
    await blobClient.uploadFile(file.webkitRelativePath);
  }

  async getFiles() {
    const blobs = this.containerClient.listBlobsFlat();
    for await (const blob of blobs) {
      console.log(`Blob: ${blob.name}`);
    }
  }
}

export default StorageService;
