import * as originMonaco from 'monaco-editor';
// eslint-disable-next-line no-restricted-globals
self.MonacoEnvironment = {
  getWorker(_workerId: any, label: string) {
    const getWorkerModule = (moduleUrl: string, label: string) => {
      // eslint-disable-next-line no-restricted-globals
      const scriptURL = self.MonacoEnvironment?.getWorkerUrl?.(
        moduleUrl,
        label,
      ) as unknown as string;
      return new Worker(scriptURL || moduleUrl, {
        name: label,
        type: 'module',
      });
    };

    switch (label) {
      case 'css':
      case 'less':
      case 'scss': {
        return getWorkerModule(
          '/mock-charts/monaco-editor/esm/vs/language/css/css.worker.js?worker',
          label,
        );
      }
      case 'handlebars':
      case 'html':
      case 'razor': {
        return getWorkerModule(
          '/mock-charts/monaco-editor/esm/vs/language/html/html.worker.js?worker',
          label,
        );
      }
      case 'javascript':
      case 'typescript': {
        return getWorkerModule(
          '/mock-charts/monaco-editor/esm/vs/language/typescript/ts.worker.js?worker',
          label,
        );
      }
      case 'json': {
        return getWorkerModule(
          '/mock-charts/monaco-editor/esm/vs/language/json/json.worker.js?worker',
          label,
        );
      }
      default: {
        return getWorkerModule(
          '/mock-charts/monaco-editor/esm/vs/editor/editor.worker.js?worker',
          label,
        );
      }
    }
  },
};

const monaco: typeof originMonaco = originMonaco;

export { monaco };
