export type FileKind = 'file' | 'directory';

export interface FileEntryMeta {
  name: string;
  kind: FileKind;
  size?: number;
  lastModified?: number;
  mimeType?: string;
  path: string; // logical path from provider root
}

export interface OpenDirectoryOptions {
  /** @todo Add permission modes when we support write */
}

export interface ReadTextOptions {
  encoding?: string; // for future
}


