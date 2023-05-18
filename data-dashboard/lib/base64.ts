
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      reject(new Error('Failed to convert file to base64'));
    };
    reader.onerror = reject;
  });
}

export class Base64File {
  public buffer: Buffer;
  constructor(public base64encoded: string, public filename: string) {
    this.buffer = Buffer.from(base64encoded.split(',')[1], 'base64');
  }


}
