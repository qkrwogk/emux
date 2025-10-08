# emux

모듈러 웹 기반 드라이브 탐색기 (Frontend v0.1)

## 개요
- **목표**: 브라우저에서 동작하는 확장 가능한 드라이브 탐색기. 뷰어/에디터/원격 드라이브/프로세서/게임 클라이언트 등을 플러그인으로 확장.
- **현재 단계**: 로컬 파일 보기(텍스트 프리뷰) 구현. 아키텍처는 플러그인/어댑터 기반 확장을 고려해 분리.

## 기술 스택
- **React 18** + **TypeScript 5**
- **Vite 5** (개발/번들)
- **TailwindCSS 3** (스타일)
- **Zustand 4** (상태 관리)
- 경로 별칭: `@core`, `@modules`, `@plugins`, `@ui`, `@hooks`, `@types`

## 실행
```bash
# 패키지 설치
npm i   # 또는 pnpm i / yarn

# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 타입 검사
npm run typecheck
```

- File System Access API는 일반적으로 Chromium 기반 브라우저에서, `http://localhost` 또는 `https` 환경에서 동작합니다.

## 디렉터리 구조(요약)
```
src/
  core/        # 코어 API (provider, extension, state)
  modules/     # 기능 모듈 (예: local/webdav providers)
  plugins/     # 플러그인 엔트리 (향후 sandbox/wasm)
  ui/          # UI 컴포넌트 (Toolbar, FileList, Viewer)
  hooks/       # 커스텀 훅
  types/       # 공유 타입
```

## 현재 동작
- 디렉터리 선택(File System Access API)
- 1-depth 파일/폴더 리스트
- 텍스트 파일 미리보기

## 아키텍처 개요
- **DriveProvider(어댑터) 추상화**: `@core/provider.ts`
  - `DriveProvider.info`: id, displayName, capabilities(read/write 등)
  - `pickDirectory()`: 루트 선택(로컬의 경우 디렉터리 피커)
  - `list(dir)`: 항목 나열 (메타: 이름/종류/경로 등)
  - `readText(file)`: 텍스트 읽기 (향후 read/write/stat 등 확장)
  - UI/상태는 이 인터페이스만 의존하므로 공급자 교체가 용이

- **Extension(플러그인) 추상화**: `@core/extension.ts`
  - `Extension.manifest`: id/name/version/description 등
  - `activate(ctx)`, `deactivate()`: 뷰어/에디터/프로세서/드라이브 어댑터 등록 진입점
  - 향후 Web Worker/WASM 기반 샌드박스로 격리 및 제한된 API 노출 예정

- **상태 관리(Zustand)**: `@core/state/driveStore.ts`
  - `pickRoot()`, `refresh()`, `selectFile(name)`
  - `entries`, `selectedFileHandle`, `content` 등 보관

## 구현 현황(주요 파일)
- `src/modules/local/localProvider.ts`: Local File System Access 기반 Provider 구현
- `src/ui/Toolbar.tsx`: 디렉터리 열기, 지원 여부 표시, 현재 루트 안내
- `src/ui/FileList.tsx`: 1-depth 리스트 + 파일 선택
- `src/ui/Viewer.tsx`: 텍스트 프리뷰

## 추가된 스켈레톤
- `src/modules/webdav/webdavProvider.ts`: **WebDAVProvider 스켈레톤**
  - 네트워크 호출 없음. `DriveProvider` 시그니처 충족을 위한 형태만 정의
  - `connect(info)`로 연결정보 설정, `list`/`readText`는 TODO

- `src/plugins/markdown/markdownExtension.ts`: **MarkdownViewer 플러그인 스켈레톤**
  - `manifest` + `Extension` 구현, `activate/deactivate` 스텁
  - 실제 렌더러 등록/샌드박스 로딩은 TODO

## 로드맵(TODO)
- 원격 드라이브 어댑터: WebDAV, S3 호환, IPFS 게이트웨이
- 플러그인: Worker/WASM 샌드박스, 매니페스트 기반 동적 로딩
- 뷰어: 이미지/마크다운/PDF/오디오·비디오
- 에디터: 텍스트(예: Monaco), 이미지 주석
- 프로세서: 일괄 변경/해싱/압축
- 에뮬/게임: WASM 코어 연동
- 권한: 쓰기 권한 플로우/퍼시스턴스
- 라우팅/딥링크: 가상 경로, 선택 상태 반영
- 접근성/i18n: 키보드 내비/ARIA/번역
