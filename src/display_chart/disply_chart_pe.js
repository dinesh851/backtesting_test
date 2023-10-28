let newtopPosition = 580;
let previousSearchString = "/2018-01-01/";
let pechartsArray = [];
let pechart;
 
async function PEFunction(name) {
  let fileName = name;
  var data =await getData(name);
  let fileParts = fileName.split('/');
  let fileNameWithoutExtension = fileParts[fileParts.length - 1].split('.')[0];
  let dateP = fileParts[2];
  let dataParts = fileNameWithoutExtension.split('_');
  let instrumentName = dataParts[0];

  let instrumentNameWithSpaces = `${instrumentName.slice(0, 9)} ${instrumentName.slice(9, 16)} ${instrumentName.slice(16, 21)} ${instrumentName.slice(21)} ${dateP}`;
 
  let output =  instrumentNameWithSpaces;

  const chartProperties = {
  width: 650,
  height: 400,
  layout: { background: { type: 'solid', color: '#000' }, textColor: 'rgba(255, 255, 255, 0.9)' },
  grid: { vertLines: { color: '#000' }, horzLines: { color: '#000' } },
  crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
  rightPriceScale: { scaleMargins: { top: 0.07, bottom: 0.05 }, borderVisible: true },
  timeScale: { timeVisible: true, secondsVisible: true },
  
  };
   const container = document.getElementById('pe');
   
  let regex = /\/\d{4}-\d{2}-\d{2}\//;
  let searchString = fileName.match(regex);
   if (!searchString) {
    console.log("Invalid file name format.");
    return;
  }
  const optionMenu2 = document.getElementById('option-menu2');
  const selectedValue1 = optionMenu2.value;
  
  searchString = searchString[0];  
  if (searchString !== previousSearchString|| selectedValue1 !== previousOptionValue1) {
     pechartsArray.forEach(pechart => {
      pechart.unsubscribeCrosshairMove(tt);
      pechart.unsubscribeCrosshairMove();
      pechart.timeScale().unsubscribeVisibleLogicalRangeChange()
      pechart.remove();  
      
     });
    pechartsArray = [];
    const container = document.getElementById('pe');
    container.innerHTML="";
    newtopPosition = 580;
    previousOptionValue1 = selectedValue1;

  }
  previousSearchString = searchString; 


  
  var indexDiv = document.createElement('chart');
  container.appendChild(indexDiv);
  container.style.marginLeft = 10 +'px';
  container.style.marginTop= 20+ 'px';
  pechart= LightweightCharts.createChart(indexDiv, chartProperties);
  
  pechartsArray.push(pechart);
 
  var candleSeries = pechart.addCandlestickSeries();
  candleSeries.applyOptions({
     upColor: 'rgb(8, 153, 129)',      
    downColor: 'rgb(242, 54, 69)',       
    borderUpColor: 'rgb(8, 153, 129)',  
    borderDownColor: 'rgb(242, 54, 69)'   
  });


 
  var ohlcTooltip = document.createElement('div');
  ohlcTooltip.className = 'three-line-legend';
  container.appendChild(ohlcTooltip);
  var width = 250;
  var height = 500;

  ohlcTooltip.style.display = 'block';
  ohlcTooltip.style.left = 740 + 'px';
  ohlcTooltip.style.top = newtopPosition + 'px';
  ohlcTooltip.style.fontSize = 18 + 'px';
  newtopPosition += 500;
 
  var vwapSeries = pechart.addLineSeries({ color: 'rgba(255, 0, 0, 0.7)', lineWidth: 2, title: 'VWAP' });
  var volumeSeries = pechart.addHistogramSeries({ color: '#22a69a', priceFormat: { type: 'volume' }, priceScaleId: '2' });
  volumeSeries.priceScale().applyOptions({ scaleMargins: { top: 0.85, bottom: 0 } });
  volumeSeries.setData(data.map(entry => ({ time: entry.time, value: entry.volume, color: entry.close > entry.open ? 'rgb(19, 83, 77)' : 'rgb(120, 42, 40)' })));
  vwapSeries.setData(data.map(entry => ({ time: entry.time, value: entry.vwap })));
  
  const divElement = document.createElement('div');
  divElement.style.height = '100px';
  divElement.className = 'detail';
  divElement.style.width = '100%';
  

 
  container.appendChild(divElement);

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
    { key: 'noOfTradesTaken', value: 'No of Trades Taken : ∅ ' },
    { key: 'positiveTrades', value: 'Positive Trades : ∅  ' },
    { key: 'negativeTrades', value: 'Negative Trades :  ∅ ' },
    { key: 'tradePoints', value: 'Trade Points : ∅    ' },
    { key: 'brokerage', value: 'Brokerage :  ∅  ' },
    { key: 'profit', value: 'Profit : ∅  ' },
  ];
  // Initialize a counter variable to keep track of the unique ID
  counter++;
  statistics.forEach(stat => { 
    const liElement = document.createElement('li');
    liElement.textContent = stat;
    liElement.innerHTML = `<span class="statistics-item">${stat.value}</span>`;
    liElement.setAttribute('id', `${stat.key}-${counter}`); // Append the unique ID to the key
    divElement.appendChild(liElement);
  });


 

if (data.length > 0) {
  renderOHLC(data[0]);
} 
 
pechart.timeScale().setVisibleRange({
  from: data[0] ,  
  to: data[data.length - 1].time , 
});
pechart.timeScale().subscribeVisibleLogicalRangeChange(range => {
  mainChart.timeScale().setVisibleLogicalRange(range);
});

  
 

pechart.subscribeCrosshairMove(e => {
  if (e.time !== undefined) {
    var xx = mainChart.timeScale().timeToCoordinate(e.time);
    mainChart.setCrossHairXY(xx, e.point.y, true);
    subChart.setCrossHairXY(e.point.x, e.point.y, true);
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
    const ohlc = data.find(data => data.time === e.time); // Replace 'data' with your actual data array
    if (ohlc) {
      renderOHLC(ohlc); // Call your OHLC rendering function
    }
  } 
});
 

const optionMenu3 = document.getElementById('option-menu2');
 
const selectedValue = optionMenu3.value;

if (selectedValue === 'option1') {
  const datam = executeStrategy1(data);
  const markers = datam.markers;
  const tradeCount = datam.tradeCount;
  const positiveTrades = datam.positiveTrades;
  const negativeTrades = datam.negativeTrades;
  const tradePointsCaptured = datam.tradePointsCaptured;
  const turnover=datam.turnover;
  const brokerage = turnover/1000;
  const profit = tradePointsCaptured*15;
  newPepositiveTrades += positiveTrades;
  newPenegativeTrades += negativeTrades;
  newPetradePoints += tradePointsCaptured;
  
  
  candleSeries.setMarkers(markers);
  document.getElementById(`noOfTradesTaken-${counter}`).innerText = `No of Trades Taken: ${tradeCount}`;
  document.getElementById(`positiveTrades-${counter}`).innerText = `Positive Trades : ${positiveTrades}`;
  document.getElementById(`negativeTrades-${counter}`).innerText = `Negative Trades: ${negativeTrades}`;
  document.getElementById(`tradePoints-${counter}`).innerText = `Trade Points: ${tradePointsCaptured.toFixed(2)}`;
  document.getElementById(`brokerage-${counter}`).innerText = `brokerage : ${brokerage.toFixed(2)}`;
  document.getElementById(`profit-${counter}`).innerText = `profit: ${profit.toFixed(2)}`;
 
}else if (selectedValue === 'option2') {
  // Handle option 2
} else if (selectedValue === 'option3') {
  // Handle option 3
} 
candleSeries.setData(data);

}