<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue';

import { NInfiniteScroll } from 'naive-ui';

import { getChartData } from '#/api/charts/page';

const loading = ref(false);

const chartList: Ref<any[]> = ref([]);

const currentPage: Ref<number> = ref(0);

function query() {
  if (loading.value) {
    return;
  }
  currentPage.value++;
  loading.value = true;
  getChartData(currentPage.value)
    .then((res: any) => {
      chartList.value.push(...res.data);
    })
    .finally(() => {
      loading.value = false;
    });
}

const container = ref(null);

onMounted(() => {
  query();
});

function imgUrl(name: string) {
  return `/mock-charts/thumbnail/${name}.png`;
}
</script>

<template>
  <div ref="container" class="my-app-container">
    <NInfiniteScroll :style="{ height: 'calc(100vh - 112px)' }" @load="query">
      <div class="chart-container">
        <div v-for="item in chartList" :key="item.cid" class="chart-item">
          <div class="chart-img-container">
            <img :src="imgUrl(item.cid)" alt="chart" class="chart-img" />
          </div>
          <div class="chart-title">{{ item.title }}</div>
        </div>
      </div>
      <div v-if="loading" class="chart-loading-text">加载中...</div>
    </NInfiniteScroll>
  </div>
</template>

<style scoped lang="scss">
.my-app-container {
  padding: 12px;
}

.chart-container {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 8px;

  .chart-item {
    width: calc(20% - 7px);
    cursor: pointer;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0.0267rem 0.16rem 0 rgb(0 0 0 / 10%);
  }

  .chart-img {
    min-height: 200px;
  }

  .chart-title {
    padding: 8px;
    background-color: #fff;
  }
}

.chart-loading-text {
  padding: 16px;
  font-size: 16px;
  text-align: center;
}
</style>
