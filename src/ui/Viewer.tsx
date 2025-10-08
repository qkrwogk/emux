import { useDriveStore } from '@core/state/driveStore';

export function Viewer() {
  const { selectedFileHandle, content } = useDriveStore();
  if (!selectedFileHandle) {
    return <div className="p-4 text-zinc-400 text-sm">파일을 선택하세요.</div>;
  }
  return (
    <div className="h-full">
      <div className="px-3 py-2 border-b border-zinc-800 text-sm text-zinc-300">
        {selectedFileHandle.name}
      </div>
      <pre className="p-3 text-sm whitespace-pre-wrap font-mono">{content}</pre>
    </div>
  );
}


