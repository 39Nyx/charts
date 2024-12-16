import axios from 'axios';

export function getChartData(currentPage: number) {
  return axios({
    url: `/mock-charts/page/${currentPage}.json`,
    method: 'get',
  });
}
