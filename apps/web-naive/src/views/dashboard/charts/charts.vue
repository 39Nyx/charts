<script setup lang="ts">
import type { Ref } from 'vue';

import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { NInfiniteScroll } from 'naive-ui';

import { getChartData } from '#/api/charts/page';

const loading = ref(false);

const chartList: Ref<any[]> = ref([]);

const currentPage: Ref<number> = ref(0);
const router = useRouter();

function query() {
  if (loading.value) {
    return;
  }
  currentPage.value++;
  if (currentPage.value > 358) {
    return;
  }
  loading.value = true;
  getChartData(currentPage.value)
    .then((res: any) => {
      const result = res.data.map((item: any) => {
        return {
          ...item,
          builtinTags: JSON.parse(item.builtinTags).map((tag: string) =>
            tag.replace('series-', ''),
          ),
        };
      });
      chartList.value.push(...result);
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
  return `https://github.39nyx.cn/mock-charts/thumbnail/${name}.png`;
}

function selectCharts(chart: any) {
  router.push({
    name: 'ChartsPreview',
    query: {
      cid: chart.cid,
    },
  });
}

const seriesTypes = [
  {
    name: '全部',
    value: '',
  },
  {
    name: '折线图',
    value: 'line',
  },
  {
    name: '柱状图',
    value: 'bar',
  },
  {
    name: '饼图',
    value: 'pie',
  },
  {
    name: '雷达图',
    value: 'radar',
  },
  {
    name: '散点图',
    value: 'scatter',
  },
  {
    name: '地图',
    value: 'map',
  },
  {
    name: '水球图',
    value: 'liquidFill',
  },
  {
    name: '关系图',
    value: 'graph',
  },
];

const selectedSeriesType: Ref<string[]> = ref(['']);

function seriesTypeClick(item: { name: string; value: string }) {
  const isSelected = !selectedSeriesType.value.includes(item.value);
  if (isSelected) {
    if (item.value === '') {
      selectedSeriesType.value = [''];
      return;
    }
    selectedSeriesType.value.push(item.value);
    if (selectedSeriesType.value.includes('')) {
      selectedSeriesType.value = selectedSeriesType.value.filter(
        (v) => v !== '',
      );
    }
  } else {
    if (item.value === '') {
      selectedSeriesType.value = [''];
      return;
    }
    selectedSeriesType.value = selectedSeriesType.value.filter(
      (v) => v !== item.value,
    );
    if (selectedSeriesType.value.length === 0) {
      selectedSeriesType.value.push('');
    }
  }
}

const showChartList = computed(() => {
  if (
    selectedSeriesType.value.length === 1 &&
    selectedSeriesType.value[0] === ''
  ) {
    return chartList.value;
  }
  return chartList.value.filter((item) =>
    selectedSeriesType.value.some((v) => item.builtinTags.includes(v)),
  );
});
</script>

<template>
  <div ref="container" class="my-app-container">
    <div class="chart-types">
      <div>图表分类:</div>
      <div
        v-for="item in seriesTypes"
        :key="item.value"
        :class="{ active: selectedSeriesType.includes(item.value) }"
        class="chart-type"
        @click="seriesTypeClick(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <NInfiniteScroll
      :distance="30"
      :style="{ height: 'calc(100vh - 164px)' }"
      @load="query"
    >
      <div class="chart-container">
        <div
          v-for="item in showChartList"
          :key="item.cid"
          class="chart-item"
          @click="selectCharts(item)"
        >
          <div class="chart-img-container">
            <img alt="chart" class="chart-img" v-lazy="imgUrl(item.cid)" />
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

.chart-types {
  display: flex;
  grid-gap: 8px;
  padding: 12px 8px;
  margin-bottom: 12px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0.0267rem 0.16rem 0 rgb(0 0 0 / 10%);

  .chart-type {
    margin-right: 8px;
    cursor: pointer;

    &.active {
      color: #f20d0d;
    }

    &:hover {
      color: #f20d0d;
    }
  }
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
