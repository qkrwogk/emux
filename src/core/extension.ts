export interface ExtensionManifest {
  id: string;
  name: string;
  version: string;
  description?: string;
  author?: string;
  // @todo contributions: viewers, editors, processors, drive adapters
}

export interface ExtensionContext {
  // @todo expose APIs to extensions (fs, events, commands)
}

export abstract class Extension {
  abstract readonly manifest: ExtensionManifest;
  abstract activate(ctx: ExtensionContext): Promise<void> | void;
  abstract deactivate(): Promise<void> | void;
}


