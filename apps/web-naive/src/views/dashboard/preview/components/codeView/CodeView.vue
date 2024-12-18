<script setup lang="ts">
import { ref, type Ref } from 'vue';

import * as monaco from 'monaco-editor';
import { NButton, NDrawer, NDrawerContent, NSpace, NTooltip } from 'naive-ui';

import CodeIcon from '#/views/dashboard/preview/components/codeIcon/CodeIcon.vue';

const props = withDefaults(
  defineProps<{
    code: string;
  }>(),
  {
    code: '',
  },
);
const emit = defineEmits<{
  (e: 'runCode', code: string);
}>();

const lastCode: Ref<string> = ref('');
const active: Ref<boolean> = ref(false);

const container: Ref<HTMLDivElement | null> = ref(null);

function openDrawer() {
  active.value = true;
}

let myEditor: monaco.editor.IStandaloneCodeEditor | null = null;

function drawerEnter() {
  if (container.value) {
    myEditor = monaco.editor.create(container.value, {
      value: lastCode.value || props.code,
      language: 'javascript',
      automaticLayout: true,
    });
  }
}

function closeDrawer() {
  active.value = false;
}

function drawerLeave() {
  if (myEditor?.getValue()) {
    lastCode.value = myEditor.getValue();
  }
  myEditor?.dispose();
}

function runCode() {
  emit('runCode', myEditor?.getValue() || '');
  closeDrawer();
}
</script>

<template>
  <NTooltip trigger="hover">
    <template #trigger>
      <NButton circle @click="openDrawer">
        <template #icon>
          <CodeIcon />
        </template>
      </NButton>
    </template>
    查看代码
  </NTooltip>
  <NDrawer
    v-model:show="active"
    :on-after-enter="drawerEnter"
    :on-after-leave="drawerLeave"
    placement="right"
    width="60%"
  >
    <NDrawerContent>
      <div ref="container" class="h-full w-full"></div>
      <template #footer>
        <div class="flex justify-end">
          <NSpace gap="8">
            <NButton @click="closeDrawer">关闭</NButton>
            <NButton type="primary" @click="runCode">运行</NButton>
          </NSpace>
        </div>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
