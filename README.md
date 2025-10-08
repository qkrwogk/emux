# emux

모듈러 웹 기반 드라이브 탐색기 (프론트엔드 0.1)

## 개요
- **목표**: 브라우저에서 동작하는 확장 가능(플러그인) 드라이브 탐색기
- **현재 단계**: 로컬 파일 보기(텍스트 프리뷰)만 지원. 아키텍처는 플러그인/어댑터 확장을 고려해 구성
- **스택**: React + TypeScript + Vite + TailwindCSS + Zustand

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

- File System Access API는 Chromium 기반 브라우저에서, `http://localhost` 또는 `https` 환경에서 동작합니다.

## 디렉터리 구조
```
src/
  core/        # 코어 API (provider, extension, state)
  modules/     # 기능 모듈 (local provider 등)
  plugins/     # 플러그인 엔트리 (향후 sandbox/wasm)
  ui/          # UI 컴포넌트 (Toolbar, FileList, Viewer)
  hooks/       # 커스텀 훅
  types/       # 공유 타입
```

## 현재 기능
- 디렉터리 선택(File System Access API)
- 1-depth 파일/폴더 리스트
- 텍스트 파일 미리보기

## 핵심 코드
- `src/core/extension.ts`: 플러그인 추상화 (ExtensionManifest/Extension)
- `src/core/provider.ts`: 드라이브 추상화 (DriveProvider, *-HandleLike)
- `src/modules/local/localProvider.ts`: 로컬 FSA Provider 구현
- `src/core/state/driveStore.ts`: Zustand 스토어 (pickRoot/refresh/selectFile)
- `src/ui/*`: 툴바/리스트/뷰어
- 경로 별칭: `@core`, `@modules`, `@plugins`, `@ui`, `@hooks`, `@types`

## 향후 확장 TODO
- 원격 드라이브 어댑터: WebDAV, S3 호환, IPFS 게이트웨이 등
- 플러그인: Web Worker/WASM 샌드박스, 매니페스트 기반 로딩
- 뷰어: 이미지/마크다운/PDF/오디오·비디오
- 에디터: 텍스트(예: Monaco), 이미지 주석
- 프로세서: 일괄 변경/해싱/압축
- 에뮬/게임: WASM 코어 연동
- 권한: 쓰기 권한 플로우/퍼시스턴스
- 라우팅/딥링크: 가상 경로, 선택 상태 반영
- 접근성/i18n: 키보드 내비/ARIA/번역
