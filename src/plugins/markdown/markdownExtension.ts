import { Extension, type ExtensionContext, type ExtensionManifest } from '@core/extension';

export const manifest: ExtensionManifest = {
  id: 'markdown-viewer',
  name: 'Markdown Viewer',
  version: '0.0.1',
  description: 'Render markdown files (.md) in a sandbox (skeleton)',
  author: 'emux',
};

/**
 * Markdown Viewer Extension (skeleton)
 * - 목적: .md 파일 렌더링을 제공하는 플러그인
 * - 현재: 등록 로직만, 실제 렌더링/로더/샌드박스는 미구현
 */
export class MarkdownViewerExtension extends Extension {
  readonly manifest = manifest;

  async activate(_ctx: ExtensionContext): Promise<void> {
    // TODO: 뷰어 레지스트리에 마크다운 렌더러 등록
    // 예: ctx.viewers.register({ id: 'md', test: (f)=>/\.md$/i.test(f), render: ... })
  }

  async deactivate(): Promise<void> {
    // TODO: 등록 해제/정리
  }
}


