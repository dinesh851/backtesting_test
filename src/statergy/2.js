// Trading strategy parameters
const buyThreshold = 10; // Buy when price falls below 10%
const sellThreshold = 5; // Sell when price goes up or down by 5%

// Trading strategy function
const executeStrategy2 = (data) => {
    let tradeCount = 0;
    let positiveTrades = 0;
    let negativeTrades = 0;
    let tradePointsCaptured = 0;
    let isBought = false;
    let buyPrice = 200;
    // const t =data[10].time; 

    
    let markers = [];
    

    for (let i = 0; i < data.length; i++) {
    const candle = data[i];

    // Calculate price thresholds
    const buyPriceThreshold = buyPrice * (1 - buyThreshold / 100);
    const sellPriceThreshold = buyPrice * (1 + sellThreshold / 100);
    // console.log(buyPriceThreshold)
    if (!isBought && candle.low <= buyPriceThreshold) {
        // Buy signal
        buyPrice = candle.close;
        markers.push({ time: candle.time, position: 'belowBar', color: 'green', shape: 'circle', text: `Buy: ${buyPrice.toFixed(2)}` });
        isBought = true;
        tradeCount++;
    } else if (isBought) {
        if (candle.high >= sellPriceThreshold || candle.close <= buyPriceThreshold) {
        // Sell signal or stop loss
        markers.push({ time: candle.time, position: 'aboveBar', color: 'red', shape: 'circle', text:  `Sell: ${candle.close.toFixed(2)}` });
        isBought = false;
    
        const tradeResult = (candle.close - buyPrice) / buyPrice * 100;
        tradePointsCaptured += tradeResult;
        if (tradeResult > 0) {
            positiveTrades++;
        } else {
            negativeTrades++;
        }
        } 
        // else {
        //   // Continue holding position
        //   markers.push({ time: candle.time, position: 'belowBar', color: 'blue', shape: 'circle', text: 'Hold' });
        // }
    }
    }

    return {
        markers:markers,
        tradeCount: tradeCount,
        positiveTrades: positiveTrades,
        negativeTrades: negativeTrades,
        tradePointsCaptured: tradePointsCaptured
    };
};

