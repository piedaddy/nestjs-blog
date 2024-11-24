import { FileTypes } from '../enums/file-types.enum';

export interface UploadFileInterface {
  name: string;
  path: string;
  type: FileTypes;
  mime: string;
  size: number;
}
