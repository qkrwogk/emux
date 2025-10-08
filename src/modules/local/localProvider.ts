import { DriveProvider, type DirectoryHandleLike, type FileHandleLike } from '@core/provider';
import type { FileEntryMeta } from '@types/fs';

function supportsFSAccess(): boolean {
  return typeof window !== 'undefined' && 'showDirectoryPicker' in window;
}

export class LocalDriveProvider extends DriveProvider {
  readonly info = {
    id: 'local-fsa',
    displayName: 'Local Files',
    capabilities: { read: true, write: false, recursiveList: true },
  } as const;

  private root: FileSystemDirectoryHandle | null = null;

  async pickDirectory(): Promise<DirectoryHandleLike | null> {
    if (!supportsFSAccess()) return null;
    try {
      // Request directory; no write permission yet
      const handle = await (window as unknown as { showDirectoryPicker: () => Promise<FileSystemDirectoryHandle> }).showDirectoryPicker();
      this.root = handle;
      return { kind: 'directory', name: handle.name };
    } catch {
      return null;
    }
  }

  async list(_: DirectoryHandleLike): Promise<FileEntryMeta[]> {
    if (!this.root) return [];
    const entries: FileEntryMeta[] = [];
    for await (const [name, entry] of this.root.entries()) {
      if (entry.kind === 'file') {
        const file = await (entry as FileSystemFileHandle).getFile();
        entries.push({
          name,
          kind: 'file',
          size: file.size,
          lastModified: file.lastModified,
          mimeType: file.type || undefined,
          path: `/${name}`,
        });
      } else {
        entries.push({ name, kind: 'directory', path: `/${name}` });
      }
    }
    // simple sort: directories first, then files
    return entries.sort((a, b) => (a.kind === b.kind ? a.name.localeCompare(b.name) : a.kind === 'directory' ? -1 : 1));
  }

  async readText(fileHandleLike: FileHandleLike): Promise<string> {
    if (!this.root) return '';
    const handle = await this.root.getFileHandle(fileHandleLike.name);
    const file = await handle.getFile();
    return await file.text();
  }
}


