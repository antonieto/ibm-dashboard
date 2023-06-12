export default async function fileToBase64(file: File): Promise<string> {
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

export const resizeImage = (base64: string, maxWidth = 400, maxHeight = 350): Promise<string> => new Promise((resolve) => {
  const img = new Image();
  img.src = base64;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    const MAX_WIDTH = maxWidth;
    const MAX_HEIGHT = maxHeight;
    let { width } = img;
    let { height } = img;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else if (height > MAX_HEIGHT) {
      width *= MAX_HEIGHT / height;
      height = MAX_HEIGHT;
    }
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to resize image');
    ctx.drawImage(img, 0, 0, width, height);
    return resolve(canvas.toDataURL());
  };
});
