import { FileList } from '@ui/FileList';
import { Viewer } from '@ui/Viewer';
import { Toolbar } from '@ui/Toolbar';
import { useDriveStore } from '@core/state/driveStore';

export function App() {
  const { currentDirectoryHandle, selectedFileHandle } = useDriveStore();

  return (
    <div className="h-full grid grid-rows-[auto_1fr]">
      <Toolbar />
      <div className="grid grid-cols-2 gap-0 h-full">
        <div className="border-r border-zinc-800 overflow-auto">
          <FileList />
        </div>
        <div className="overflow-auto">
          <Viewer />
        </div>
      </div>
    </div>
  );
}


