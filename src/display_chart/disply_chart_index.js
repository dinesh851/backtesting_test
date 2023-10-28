let mainChart;
let  tt
async function indexFunction(name) {

  let fileName1 = name;

  var data =await getData(name);

  let fileParts = fileName1.split('/');
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
    crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
    rightPriceScale: { scaleMargins: { top: 0.1, bottom: 0.05 }, borderVisible: true },
    timeScale: { timeVisible: true, secondsVisible: true },
  };

  const container = document.getElementById('index');
  if (mainChart){
    mainChart.unsubscribeCrosshairMove(tt);
    mainChart.timeScale().unsubscribeVisibleLogicalRangeChange()
    mainChart.unsubscribeCrosshairMove()
    mainChart.remove()
    resetVariables()
  }
  container.innerHTML="";
  var indexDiv = document.createElement('chart');
  container.appendChild(indexDiv);
  container.style.marginLeft = 10 +'px';
  container.style.marginTop= 20+ 'px';


  mainChart = LightweightCharts.createChart(indexDiv, chartProperties);
  
  var candleSeries = mainChart.addCandlestickSeries();
  candleSeries.applyOptions({
    upColor: 'rgb(8, 153, 129)',      
    downColor: 'rgb(242, 54, 69)',       
    borderUpColor: 'rgb(8, 153, 129)',  
    borderDownColor: 'rgb(242, 54, 69)'   
  });
  console.log(data);
  candleSeries.setData(data);
   
 
  var ohlcTooltip = document.createElement('div');
  ohlcTooltip.className = 'three-line-legend';
  container.appendChild(ohlcTooltip);
  var width = 250;
  var height = 500;

  ohlcTooltip.style.display = 'block';
  ohlcTooltip.style.left = 10 + 'px';
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

 
  
const statistics = [
  { key: 'newnoOfTradesTaken', value: 'No of Trades Taken:' },
  { key: 'newpositiveTrades', value: 'Positive Trades: ' },
  { key: 'newnegativeTrades', value: 'Negative Trades: ' },
  { key: 'newtradePoints', value: 'Trade Points : ' },
  { key: 'newCepositiveTrades', value: 'Ce Positive Trades:' },
  { key: 'newCenegativeTrades', value: 'Ce Negative Trades:' },
  { key: 'newCetradePoints', value: 'Ce Trade Points : ' },
  { key: 'newPepositiveTrades', value: 'Pe Positive Trades:' },
  { key: 'newPenegativeTrades', value: 'Pe Negative Trades:' },
  { key: 'newPetradePoints', value: 'Pe Trade Points : ' },
  { key: 'profit', value: 'Profit : ' },
  { key: 'turnover', value: 'Turnover :' },
  { key: 'brokerage', value: 'Brokerage :  ' },
 
];

// Create a div element with the class 'info-legend'
const info = document.createElement('info11');
info.className = 'info-legend';
info.id = 'info-legend';
info.style.height = '100px';
info.style.width = ' 1300px';
info.style.backgroundColor = 'black';

container.appendChild(info);
statistics.forEach((stat) => {
  const liElement = document.createElement('li');
  liElement.textContent = stat;
  liElement.innerHTML = `<span class="statistics-item">${stat.value}</span>`;
  liElement.setAttribute('id', stat.key); // Use the unique key as the element's ID
  // liElement.className = 'dd'; // Set the class for the list item
 
  info.appendChild(liElement);
});


if (data.length > 0) {
  renderOHLC(data[0]);
}  
mainChart.timeScale().setVisibleRange({
  from: data[0] ,  
  to: data[data.length - 1].time , 
});


mainChart.timeScale().subscribeVisibleLogicalRangeChange(range => {
  subChart.timeScale().setVisibleLogicalRange(range);
  cechart.timeScale().setVisibleLogicalRange(range);
  pechart.timeScale().setVisibleLogicalRange(range);
  pechartsArray.forEach((pechart) => {
    if (pechart) {
      pechart.timeScale().setVisibleLogicalRange(range);
    }
    });
  chartsArray.forEach((cechart) => {
    if (cechart) {
      cechart.timeScale().setVisibleLogicalRange(range);
    }
    });
    
  
});
 
mainChart.subscribeCrosshairMove(e => {
   
  if (e.time !== undefined) {
    var xx = subChart.timeScale().timeToCoordinate(e.time);
    subChart.setCrossHairXY(xx, e.point.y, true);
    pechartsArray.forEach((pechart) => {
      if (pechart) {
        var xx = pechart.timeScale().timeToCoordinate(e.time);
        pechart.setCrossHairXY(xx, e.point.y, true);
      }
    });
    chartsArray.forEach((cechart) => {
      if (cechart) {
        var xx = pechart.timeScale().timeToCoordinate(e.time);
        cechart.setCrossHairXY(xx, e.point.y, true);
      }
    });
    const ohlc = data.find(data => data.time === e.time);  
    if (ohlc) {
      renderOHLC(ohlc); 
    }

  }  
});


}