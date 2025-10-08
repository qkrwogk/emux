import type { FileEntryMeta, ReadTextOptions } from '@types/fs';

export interface DirectoryHandleLike {
  kind: 'directory';
  name: string;
}

export interface FileHandleLike {
  kind: 'file';
  name: string;
  // optional native handle for providers that support it
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _native?: any;
}

export type EntryHandleLike = DirectoryHandleLike | FileHandleLike;

export interface DriveProviderInfo {
  id: string;
  displayName: string;
  capabilities: {
    read: boolean;
    write: boolean;
    recursiveList: boolean;
  };
}

export abstract class DriveProvider {
  abstract readonly info: DriveProviderInfo;
  abstract pickDirectory(): Promise<DirectoryHandleLike | null>;
  abstract list(dir: DirectoryHandleLike): Promise<FileEntryMeta[]>;
  abstract readText(file: FileHandleLike, options?: ReadTextOptions): Promise<string>;
}


