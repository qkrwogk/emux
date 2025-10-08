import { DriveProvider, type DirectoryHandleLike, type FileHandleLike } from '@core/provider';
import type { FileEntryMeta } from '@types/fs';

export interface WebDAVConnectionInfo {
  baseUrl: string; // e.g., https://example.com/dav
  username?: string;
  password?: string;
}

/**
 * WebDAVProvider (skeleton)
 * - 목적: 추후 WebDAV 서버에 연결해 디렉터리/파일을 탐색/읽기
 * - 현재는 네트워크 호출 없이 타입/형태만 정의
 * - UI/상태는 DriveProvider 인터페이스에 의존하므로 교체 가능
 */
export class WebDAVProvider extends DriveProvider {
  readonly info = {
    id: 'webdav',
    displayName: 'WebDAV',
    capabilities: { read: true, write: false, recursiveList: true },
  } as const;

  private connection: WebDAVConnectionInfo | null = null;

  /**
   * WebDAV는 로컬 디렉터리 선택이 없으므로, 연결 정보를 설정하는 메서드로 대체합니다.
   * 실제 구현에서는 인증/토큰/프록시 설정 등 추가 예정.
   */
  async connect(info: WebDAVConnectionInfo): Promise<void> {
    this.connection = info;
  }

  /**
   * DriveProvider 시그니처를 충족하기 위한 placeholder.
   * WebDAV에서는 의미가 없으므로 null을 반환합니다.
   */
  async pickDirectory(): Promise<DirectoryHandleLike | null> {
    return null;
  }

  /**
   * 디렉터리 목록 조회 (스켈레톤)
   * TODO: PROPFIND 호출로 항목 수집, depth 옵션 처리, 컬렉션/리소스 구분
   */
  async list(_: DirectoryHandleLike): Promise<FileEntryMeta[]> {
    if (!this.connection) return [];
    // 스켈레톤: 빈 배열 반환
    return [];
  }

  /**
   * 파일 텍스트 읽기 (스켈레톤)
   * TODO: GET으로 파일 다운로드, 적절한 인코딩 처리
   */
  async readText(_file: FileHandleLike): Promise<string> {
    if (!this.connection) return '';
    return '';
  }
}


