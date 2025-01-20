import axios from 'axios';

export function getChartData(currentPage: number) {
  return axios({
    url: `https://github.39nyx.cn/mock-charts/page/${Math.ceil(currentPage / 50)}/${currentPage}.json`,
    method: 'get',
  });
}

export function getChartOptions(cid: string) {
  return axios({
    url: `https://github.39nyx.cn/mock-charts/code/${[...cid].slice(2, 4).join('/').toLowerCase()}/${cid}.js`,
    method: 'get',
  });
}
