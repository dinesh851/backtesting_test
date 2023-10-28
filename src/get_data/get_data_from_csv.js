const getData = async (selectedValue) => {
    const res = await fetch(selectedValue);
    const resp = await res.text();
    const lines = resp.split('\n');
    const headers = lines[0].split(',');
  
    const cdata = lines
      .slice(1)
      .map((line) => {
        const values = line.split(',');
  
        if (values.length === headers.length) {
          const entry = {};
          headers.forEach((header, index) => {
            entry[header.trim()] = values[index].trim();
          });
          return entry;
        }
      })
      .filter(Boolean); // Filter out any undefined or empty entries
  
    const data = cdata.map((entry) => {
      let [hour, minute, second] = entry.time.split(':');
      let [year, month, day] = entry.date.split('-');
  
      let date = new Date(year, parseInt(month) - 1, day, hour, minute, second);
  
      // Convert to IST
      date.setHours(date.getHours() + 5); // Add 5 hours for IST
      date.setMinutes(date.getMinutes() + 30); // Add 30 minutes for IST
  
      // Add date and time fields
      entry.date = date;
      entry.time = date.getTime() / 1000; // Convert to Unix timestamp
  
      return {
        time: entry.time,
        open: parseFloat(entry.open),
        high: parseFloat(entry.high),
        low: parseFloat(entry.low),
        close: parseFloat(entry.close),
        volume: parseFloat(entry.volume),
        vwap: parseFloat(entry.VWAP)
      };
    });
  
    return data; // Return the processed data
  };
  