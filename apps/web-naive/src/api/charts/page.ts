import axios from 'axios';

export function getChartData(currentPage: number) {
  return axios({
    url: `/mock-charts/page/${Math.ceil(currentPage / 50)}/${currentPage}.json`,
    method: 'get',
  });
}

export function getChartOptions(cid: string) {
  return axios({
    url: `/mock-charts/code/${[...cid].slice(2, 4).join('/').toLowerCase()}/${cid}.js`,
    method: 'get',
  });
}
