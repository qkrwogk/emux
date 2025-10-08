import { useMemo } from 'react';

export function useIsFSAccessSupported(): boolean {
  return useMemo(() => typeof window !== 'undefined' && 'showDirectoryPicker' in window, []);
}


