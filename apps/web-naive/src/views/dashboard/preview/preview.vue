<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';

import { getChartOptions } from '#/api/charts/page';
import { iframeValue } from '#/utils/executeScript';
import CodeView from '#/views/dashboard/preview/components/codeView/CodeView.vue';

const props = withDefaults(
  defineProps<{
    cid: string;
  }>(),
  {
    cid: '',
  },
);

const iframe: Ref<HTMLIFrameElement | null> = ref(null);

const code: Ref<string> = ref('');

onMounted(() => {
  getChartOptions(props.cid).then((res) => {
    code.value = res.data.code;
    if (iframe.value) {
      const contentDocument = iframe.value.contentDocument;
      if (contentDocument) {
        contentDocument.open();
        contentDocument.write(`${iframeValue(res.data.code, true)}`);
        contentDocument.close();
        window.addEventListener('message', (event) => {
          if (event.origin !== window.origin) {
            window.console.error(
              'Received message from untrusted origin:',
              event.origin,
            );
            return;
          }
          window.console.log(event.data);
        });
      }
    }
  });
});

function runCode(value: string) {
  if (iframe.value) {
    const contentDocument = iframe.value.contentDocument;
    if (contentDocument) {
      contentDocument.open();
      contentDocument.write(`${iframeValue(value)}`);
      contentDocument.close();
    }
  }
}
</script>

<template>
  <div class="my-app-container h-full bg-white">
    <div class="pr-4px pl-4px flex items-center justify-between">
      <div></div>
      <div>
        <CodeView :code="code" @run-code="runCode" />
      </div>
    </div>
    <iframe
      ref="iframe"
      class="iframe-container w-full"
      sandbox="allow-pointer-lock allow-scripts allow-same-origin allow-downloads allow-popups allow-popups-to-escape-sandbox allow-modals"
    ></iframe>
  </div>
</template>

<style scoped lang="scss">
.my-app-container {
  padding: 12px;
}

.iframe-container {
  height: calc(100% - 34px);
}
</style>
