// let subChart;
let subChart;
 

async function futFunction(name) {
     
  let fileName2 = name;

  var data =await getData(name);
  let fileParts = fileName2.split('/');
  let fileNameWithoutExtension = fileParts[fileParts.length - 1].split('.')[0];
  let dateP = fileParts[2];
  let dataParts = fileNameWithoutExtension.split('_');
  let instrumentName = dataParts[0];

  let instrumentNameWithSpaces = `${instrumentName.slice(0, 9)} ${instrumentName.slice(9, 16)} ${instrumentName.slice(16, 21)} ${instrumentName.slice(21)} ${dateP}`;
  let waterm =  instrumentNameWithSpaces;
  let output =  instrumentNameWithSpaces;
    
  const chartProperties = {
    width: 650,
    height: 400,
    layout: { background: { type: 'solid', color: '#000' }, textColor: 'rgba(255, 255, 255, 0.9)' },
    grid: { vertLines: { color: '#000' }, horzLines: { color: '#000' } },
    crosshair: { mode: LightweightCharts.CrosshairMode.Normal, vertLine: {style: LightweightCharts.LineStyle.Solid }, horzLine: { style: LightweightCharts.LineStyle.Solid } },
    rightPriceScale: { scaleMargins: { top: 0.1, bottom: 0.05 }, borderVisible: true },
    timeScale: { timeVisible: true, secondsVisible: true },
  };
  const container = document.getElementById('fut');
  if (subChart){
    subChart.unsubscribeCrosshairMove(tt);
    subChart.unsubscribeCrosshairMove();
    subChart.timeScale().unsubscribeVisibleLogicalRangeChange()
    subChart.remove()
  }
  container.innerHTML="";
  var indexDiv = document.createElement('chart');
  container.appendChild(indexDiv);
  container.style.marginLeft = 10 +'px';
  container.style.marginTop= 20+ 'px';
  subChart = LightweightCharts.createChart(indexDiv, chartProperties);
  
  var candleSeries = subChart.addCandlestickSeries();
  candleSeries.applyOptions({
    upColor: 'rgb(8, 153, 129)',      
    downColor: 'rgb(242, 54, 69)',       
    borderUpColor: 'rgb(8, 153, 129)',  
    borderDownColor: 'rgb(242, 54, 69)'   
  });
  candleSeries.setData(data);


  var vwapSeries = subChart.addLineSeries({color:'rgba(255, 0, 0, 0.7)',lineWidth: 2,title: 'VWAP',});
  var volumeSeries = subChart.addHistogramSeries({color: '#22a69a',priceFormat: {type: 'volume',},priceScaleId: '2',});
  volumeSeries.priceScale().applyOptions({scaleMargins: {top: 0.8,bottom: 0,},});  
  volumeSeries.setData(data.map(entry => ({ time: entry.time, value: entry.volume, color: entry.close > entry.open ? 'rgb(19, 83, 77)' : 'rgb(120, 42, 40)' })));
  vwapSeries.setData(data.map(entry => ({ time: entry.time, value: entry.vwap })));
  
  var ohlcTooltip = document.createElement('div');
  ohlcTooltip.className = 'three-line-legend';
  container.appendChild(ohlcTooltip);
  var width = 250;
  var height = 500;

  ohlcTooltip.style.display = 'block';
  ohlcTooltip.style.left = 740 + 'px';
  ohlcTooltip.style.top = 37 + 'px';
  ohlcTooltip.style.fontSize = 18 + 'px';
 
  const renderOHLC = (d) => {
    const { open, high, low, close, volume } = d;
    const openFixed = open.toFixed(2);
    const highFixed = high.toFixed(2);
    const lowFixed = low.toFixed(2);
    const closeFixed = close.toFixed(2);
    const difference = (close - open).toFixed(2).padStart(5, '0');
    const percentage = (((close - open) / open) * 100).toFixed(2);
    
    const markup = `
      <p>
        ${output}<br>
        O<span class="${open > close ? 'red' : 'green'}">${openFixed}</span>
        H<span class="${open > close ? 'red' : 'green'}">${highFixed}</span>
        L<span class="${open > close ? 'red' : 'green'}">${lowFixed}</span>
        C<span class="${open > close ? 'red' : 'green'}">${closeFixed}</span>
        V<span class="${open > close ? 'red' : 'green'}">${volume >= 1000 ? `${(volume / 1000).toFixed(2)}k` : volume.toString()}</span> 
        D<span class="${open > close ? 'red' : 'green'}">${difference} (${percentage}%)</span>&nbsp;&nbsp;
        T<span class="${open > close ? 'red' : 'green'}">${Math.abs(high - low).toFixed(2)}</span><br>
      </p>`;
    
    ohlcTooltip.innerHTML = markup;
  };
  
  
 
  if (data.length > 0) {
    renderOHLC(data[0]);  
  }
// const visibleRange = subChart.timeScale().getVisibleRange();

// setInterval(() => (visibleRange !== charttime && subChart.timeScale().setVisibleRange(charttime)), 500);

subChart.timeScale().setVisibleRange({
  from: data[0] ,  
  to: data[data.length - 1].time , 
});
subChart.timeScale().subscribeVisibleLogicalRangeChange(range => {
  mainChart.timeScale().setVisibleLogicalRange(range);
   
});






subChart.subscribeCrosshairMove(e => {
  if (e.time !== undefined) {
    mainChart.setCrossHairXY(e.point.x, e.point.y, true);
    pechartsArray.forEach((pechart) => {
      if (pechart) {
        pechart.setCrossHairXY(e.point.x, e.point.y, true);
      }
    });
    chartsArray.forEach((cechart) => {
      if (cechart) {
        cechart.setCrossHairXY(e.point.x, e.point.y, true);
      }
    });
  } 
  const ohlc = data.find(data => data.time === e.time); // Replace 'data' with your actual data array
  if (ohlc) {
    renderOHLC(ohlc); // Call your OHLC rendering function
  }

});
 





}