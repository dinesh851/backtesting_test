function resetVariables() {
    newnoOfTradesTaken = 0;
    newpositiveTrades = 0;
    newnegativeTrades = 0;
    newtradePoints = 0;
    newCepositiveTrades = 0;
    newCenegativeTrades = 0;
    newCetradePoints = 0;
    newPepositiveTrades = 0;
    newPenegativeTrades = 0;
    newPetradePoints = 0;
    turnover = 0;   
    brokerage = 0;   
    newaverageTradeDuration = 0;
    newlargestWinning = 0;
    newlargestLosing = 0;
    newwinRate = 100;
    newprofitFactor = 0;
    newrrRatio = 0;
    newroi = 0;
    newaverageProfitPerTrade = 0;
    newaverageLossPerTrade = 0;
    newtotalbrokerage = 0;
    newmaximumDrawdown = 0;
    mark_ce = [];
    mark_pe = [];
  }
 
   

// let numTrades  = 0;
function setvalue(){
    // document.getElementById("newCepositiveTrades")
    newpositiveTrades = newCepositiveTrades+newPepositiveTrades;
    newnegativeTrades = newCenegativeTrades+newPenegativeTrades;
    newtradePoints = newCetradePoints+newPetradePoints;
   
    newnoOfTradesTaken =newpositiveTrades+newnegativeTrades;
    turnover = turnover*15;
    
    brokerage=turnover/1000;
    // ll =;
    profit = (newtradePoints*15)-brokerage
    console.log(brokerage);
    
    document.getElementById(`newCepositiveTrades`).innerText = `Ce Positive Trades: ${newCepositiveTrades}`;
    document.getElementById(`newCenegativeTrades`).innerText = `Ce Negative Trades: ${newCenegativeTrades}`;
    document.getElementById(`newCetradePoints`).innerText = `Ce Trade Points: ${newCetradePoints.toFixed(2)}`;
    document.getElementById(`newPepositiveTrades`).innerText = `Pe Positive Trades: ${newPepositiveTrades}`;
    document.getElementById(`newPenegativeTrades`).innerText = `Pe Negative Trades: ${newPenegativeTrades}`;
    document.getElementById(`newPetradePoints`).innerText = `Pe Trade Points: ${newPetradePoints.toFixed(2)}`;
    document.getElementById(`newnoOfTradesTaken`).innerText = `No of Trades Taken: ${newnoOfTradesTaken}`;
    document.getElementById(`newpositiveTrades`).innerText = `Positive Trades: ${newpositiveTrades}`;
    document.getElementById(`newnegativeTrades`).innerText = `Negative Trades: ${newnegativeTrades}`;
    document.getElementById(`newtradePoints`).innerText = `Trade Points : ${newtradePoints.toFixed(2)}`;
    document.getElementById(`turnover`).innerText = `Turnover : ${ turnover.toFixed(2)}`;
    document.getElementById(`brokerage`).innerText = `Brokerage : ${brokerage.toFixed(2)}`;
    document.getElementById(`profit`).innerText = `Profit : ${profit.toFixed(2)}`;

}
resetVariables()