import { create } from 'zustand';
import type { FileEntryMeta } from '@types/fs';
import type { DirectoryHandleLike, FileHandleLike } from '@core/provider';
import { LocalDriveProvider } from '@modules/local/localProvider';

interface DriveState {
  provider: LocalDriveProvider;
  currentDirectoryHandle: DirectoryHandleLike | null;
  entries: FileEntryMeta[];
  selectedFileHandle: FileHandleLike | null;
  content: string;
  pickRoot: () => Promise<void>;
  refresh: () => Promise<void>;
  selectFile: (name: string) => Promise<void>;
}

export const useDriveStore = create<DriveState>((set, get) => ({
  provider: new LocalDriveProvider(),
  currentDirectoryHandle: null,
  entries: [],
  selectedFileHandle: null,
  content: '',

  pickRoot: async () => {
    const { provider } = get();
    const dir = await provider.pickDirectory();
    set({ currentDirectoryHandle: dir, entries: [], selectedFileHandle: null, content: '' });
    if (dir) {
      await get().refresh();
    }
  },

  refresh: async () => {
    const { provider, currentDirectoryHandle } = get();
    if (!currentDirectoryHandle) return;
    const entries = await provider.list(currentDirectoryHandle);
    set({ entries });
  },

  selectFile: async (name: string) => {
    const { provider } = get();
    const fh: FileHandleLike = { kind: 'file', name };
    const text = await provider.readText(fh);
    set({ selectedFileHandle: fh, content: text });
  },
}));


