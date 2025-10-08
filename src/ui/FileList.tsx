import { useDriveStore } from '@core/state/driveStore';

export function FileList() {
  const { entries, selectFile } = useDriveStore();
  return (
    <div className="p-2">
      <ul className="text-sm">
        {entries.map((e) => (
          <li key={e.path} className="flex items-center gap-2 py-1">
            <span className="w-4 text-center">{e.kind === 'directory' ? '📁' : '📄'}</span>
            {e.kind === 'file' ? (
              <button className="hover:underline" onClick={() => void selectFile(e.name)}>{e.name}</button>
            ) : (
              <span className="text-zinc-400">{e.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}


