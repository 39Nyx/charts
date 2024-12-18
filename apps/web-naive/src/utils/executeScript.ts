export function chartHtml() {
  return `<div id="chart" style="width: 100%; height: 100%;"></div>`;
}

export function drawChart(codeValue: string) {
  return innerScripts(`
  (() => {
    var option;
    ${codeValue};
    const div = document.querySelector('#chart');
    if (div) {
      const chart = echarts.init(div);
      chart.setOption(option);
      window.onresize = () => {
        chart.resize();
      };
    }
  })()`);
}

export function externalScripts() {
  const urls = [
    'https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js',
    'https://registry.npmmirror.com/jquery/3.7.1/files/dist/jquery.min.js',
    'https://registry.npmmirror.com/echarts-liquidfill/3.1.0/files/dist/echarts-liquidfill.min.js',
  ];
  return urls.map((url) => `<script src="${url}"></script>`).join('');
}

export function innerScripts(value: string) {
  return `<script>${value}</script>`;
}

export function iframeValue(codeValue: string) {
  const result = [externalScripts(), chartHtml(), drawChart(codeValue)];
  return result.join('');
}
