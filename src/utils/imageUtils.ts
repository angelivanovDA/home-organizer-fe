/**
 * Generates a base64 string from an image file.
 * @param imageFile - The image file to generate a base64 string from.
 * @returns A promise that resolves to the base64 string.
 */
export const generateBase64FromImage = (
  imageFile: File,
): Promise<string | ArrayBuffer | null> => {
  const reader = new FileReader();
  const promise = new Promise<string | ArrayBuffer | null>(
    (resolve, reject) => {
      reader.onload = (e) => resolve(e.target?.result ?? null);
      reader.onerror = (err) => reject(err);
    },
  );

  reader.readAsDataURL(imageFile);
  return promise;
};
