<script setup lang="ts">
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import {
  NButton,
  NDataTable,
  NForm,
  NFormItem,
  NGi,
  NGrid,
  NInput,
  NSelect,
  NSpace,
} from 'naive-ui';

const columns = ref([
  {
    key: 'name',
    title: '姓名',
    search: true,
  },
  {
    key: 'id',
    title: '学号',
  },
  {
    title: '性别',
    key: 'sex',
  },
  {
    title: '年级',
    key: 'grade',
  },
  {
    title: '班级',
    key: 'class',
  },
]);

const data = [
  {
    name: '张三',
    id: '2021001',
    sex: '男',
    grade: '2024',
    class: '1班',
  },
  {
    name: '李四',
    id: '2021002',
    sex: '男',
    grade: '2024',
    class: '1班',
  },
  {
    name: '王小美',
    id: '2021003',
    sex: '女',
    grade: '2024',
    class: '1班',
  },
];

const formRef = ref(null);

const model = ref({
  name: null,
  id: null,
  sex: null,
  grade: null,
  class: null,
});

const sexOptions = ref([
  {
    label: '男',
    value: '男',
  },
  {
    label: '女',
    value: '女',
  },
]);

const classOptions = ref([
  {
    label: '1班',
    value: '1班',
  },
  {
    label: '2班',
    value: '2班',
  },
  {
    label: '3班',
    value: '3班',
  },
]);

const gradeOptions = ref([
  {
    label: '2021',
    value: '2021',
  },
  {
    label: '2022',
    value: '2022',
  },
  {
    label: '2023',
    value: '2023',
  },
  {
    label: '2024',
    value: '2024',
  },
]);
</script>

<template>
  <Page class="page-container">
    <NForm
      label-placement="left"
      label-width="auto"
      ref="formRef"
      :model="model"
    >
      <NGrid :span="24" x-gap="12">
        <NGi :span="6">
          <NFormItem path="name" label="姓名" :span="6">
            <NInput
              v-model:value="model.name"
              @keydown.enter.prevent
              placeholder="请输入学号"
            />
          </NFormItem>
        </NGi>
        <NGi :span="6">
          <NFormItem path="name" label="学号" :span="6">
            <NInput
              v-model:value="model.id"
              placeholder="请输入学号"
              @keydown.enter.prevent
            />
          </NFormItem>
        </NGi>
        <NGi :span="6">
          <NFormItem path="name" label="性别" :span="6">
            <NSelect
              v-model:value="model.sex"
              :options="sexOptions"
              placeholder="请选择性别"
            />
          </NFormItem>
        </NGi>
        <NGi :span="6">
          <NFormItem path="name" label="年级" :span="6">
            <NSelect
              v-model:value="model.grade"
              :options="gradeOptions"
              placeholder="请选择年级"
            />
          </NFormItem>
        </NGi>
        <NGi :span="6">
          <NFormItem path="name" label="班级" :span="6">
            <NSelect
              v-model:value="model.class"
              :options="classOptions"
              placeholder="请选择班级"
            />
          </NFormItem>
        </NGi>
        <NGi :span="6" :offset="12">
          <NSpace reverse>
            <NButton type="primary">查询</NButton>
            <NButton>重置</NButton>
          </NSpace>
        </NGi>
      </NGrid>
    </NForm>
    <NDataTable :columns="columns" :data="data" />
  </Page>
</template>

<style scoped>
.page-container {
  padding: 0;
  margin: 1rem;
  background-color: #fff;
}
</style>
