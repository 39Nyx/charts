export function chartHtml() {
  return `<div id="chart" style="width: 100%; height: 100%;"></div>`;
}

export function drawChart(codeValue: string) {
  return innerScripts(`
  (() => {
    const div = document.querySelector('#chart');
    if (div) {
      var option;
      const chart = echarts.init(div);
      const myChart = chart;
      ${codeValue};
      if (option) {
        chart.setOption(option);
      }
      window.onresize = () => {
        chart.resize();
      };
    }
  })()`);
}

export function externalScripts() {
  const urls = [
    'https://registry.npmmirror.com/echarts/5.5.1/files/dist/echarts.min.js',
    'https://registry.npmmirror.com/jquery/3.7.1/files/dist/jquery.min.js',
    'https://registry.npmmirror.com/echarts-liquidfill/3.1.0/files/dist/echarts-liquidfill.min.js',
    'https://39nyx.github.io/mock-charts/echarts/registryMap.js',
  ];
  return urls.map((url) => `<script src="${url}"></script>`).join('');
}

export function innerScripts(value: string) {
  return `<script>${value}</script>`;
}

function changeLoadGeoUrl(codeValue: string) {
  let index = 0;
  let result = '';
  const regexp = /^\/asset\/get\/s\/data-\d+-([0-9A-Za-z]+\.json)/;
  while (index < codeValue.length) {
    const remaining = codeValue.slice(Math.max(0, index));
    if (regexp.test(remaining)) {
      const match = remaining.match(regexp);
      if (match) {
        const fileName: string = match[1] || '';
        const first: string = fileName.slice(0, 1);
        result += `/mock-charts/map/${first.toLowerCase()}/${fileName}`;
        index += match[0].length - 1;
      }
    } else {
      result += remaining.slice(0, 1);
    }
    index++;
  }
  return result;
}

export function iframeValue(codeValue: string) {
  const result = [
    externalScripts(),
    chartHtml(),
    drawChart(changeLoadGeoUrl(codeValue)),
  ];
  return result.join('');
}
