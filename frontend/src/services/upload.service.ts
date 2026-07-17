import { uploadFile } from "./api";

export const uploadService = {
  upload: (file: File, token: string) => uploadFile(file, token),
};
