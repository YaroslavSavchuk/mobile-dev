export interface FileItem {
  name: string;
  isDirectory: boolean;
}

export interface FileDetail {
  name: string;
  isDirectory: boolean;
  size: number;
  modificationTime?: number;
}