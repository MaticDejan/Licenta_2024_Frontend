import { Injectable } from '@angular/core';
import { AnonymousCredential, BlobServiceClient, ContainerClient, StorageSharedKeyCredential } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root'
})
export class AzureBlobService {

  accountName="licenta0405dejan";
  alimente="alimente";
  pathStorage=`https://${this.accountName}.blob.core.windows.net/`;
  blobServiceClient: BlobServiceClient;
  sasToken="sp=racwdli&st=2024-05-20T22:05:38Z&se=2024-11-04T07:05:38Z&sv=2022-11-02&sr=c&sig=Mnhp7vb4KzYOLrU09W1Se7Oi56XYQOoymJwLq%2B73xHo%3D"

  constructor() {
    const anonymousCredential = new AnonymousCredential();
    this.blobServiceClient = new BlobServiceClient(`${this.pathStorage}?${this.sasToken}`, anonymousCredential);
  }

  public async getAlimente(): Promise<string[]> {
    let result: string[] = [];
    let blobs = this.containerClientAlimente().listBlobsFlat();
    for await (const blob of blobs) {
      result.push(blob.name);
    }
    return result;
  }

    uploadFile(containerName: string, file: File) {
    const containerClient = this.blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(file.name);
    blockBlobClient.uploadData(file);
  }

  containerClientAlimente(): ContainerClient {
    return this.blobServiceClient.getContainerClient(this.alimente);
  }

  getFileUrl(containerName: string, fileName: string): string {
    const containerClient = this.blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    return blockBlobClient.url;
  }

}
