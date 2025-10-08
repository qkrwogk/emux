import { useDriveStore } from '@core/state/driveStore';
import { useIsFSAccessSupported } from '@hooks/useIsFSAccessSupported';

export function Toolbar() {
  const supported = useIsFSAccessSupported();
  const { pickRoot, currentDirectoryHandle } = useDriveStore();
  return (
    <div className="p-2 border-b border-zinc-800 flex items-center gap-2">
      <button
        className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-900 disabled:text-zinc-500"
        onClick={() => void pickRoot()}
        disabled={!supported}
      >
        디렉터리 열기
      </button>
      <span className="text-sm text-zinc-400">
        {supported ? (currentDirectoryHandle ? `열린 루트: ${currentDirectoryHandle.name}` : '루트 미선택') : '이 브라우저는 File System Access API를 지원하지 않습니다.'}
      </span>
    </div>
  );
}


