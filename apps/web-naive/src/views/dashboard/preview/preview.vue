<script setup lang="ts">
import { onActivated, onMounted, ref, type Ref } from 'vue';

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
    code.value = res.data;
    if (iframe.value) {
      const contentDocument = iframe.value.contentDocument;
      if (contentDocument) {
        contentDocument.open();
        contentDocument.write(`${iframeValue(res.data)}`);
        contentDocument.close();
      }
    }
  });
});

function codeChanged(newCode: string) {
  code.value = newCode;
  runCode();
}

function runCode() {
  if (iframe.value) {
    const contentDocument = iframe.value.contentDocument;
    if (contentDocument) {
      contentDocument.open();
      contentDocument.write(`${iframeValue(code.value)}`);
      contentDocument.close();
    }
  }
}

onActivated(() => {
  if (code.value) {
    runCode();
  }
});
</script>

<template>
  <div class="my-app-container h-full bg-white">
    <div class="pr-4px pl-4px flex items-center justify-between">
      <div></div>
      <div>
        <CodeView :code="code" @run-code="codeChanged" />
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
