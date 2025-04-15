function updateClock() {
    const now = new Date();
  
    const dateStr = now.toLocaleDateString();
  
    const timeStr = now.toLocaleTimeString();
  
    const timezoneOffset = -now.getTimezoneOffset() / 60;
    const sign = timezoneOffset >= 0 ? "+" : "-";
    const hoursOffset = Math.abs(timezoneOffset).toString().padStart(2, '0');
    const timezoneStr = `UTC${sign}${hoursOffset}`;
  
    document.getElementById('date').textContent = dateStr;
    document.getElementById('time').textContent = timeStr;
    document.getElementById('timezone').textContent = timezoneStr;
  }
  
  setInterval(updateClock, 1000);
  updateClock();