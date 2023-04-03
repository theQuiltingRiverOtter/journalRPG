Date.prototype.getJulian = function () {
    return Math.ceil((this / 86400000) - (this.getTimezoneOffset() / 1440) + 2440587.5);
}


function getFutureDate(date) {
    let hours = date.getHours();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let timeStart;
    if (hours >= 12) {
        timeStart = new Date(`${year}-${month + 1}-${day} 12:00:00`);

    } else {
        timeStart = new Date(`${year}-${month + 1}-${day - 1} 12:00:00`);
    }
    let time = (((date - timeStart) / 1000) / 86400)
    let future_date = new Date(`${year + 532}-${month}-${day}`);
    let future_julian = future_date.getJulian();
    return (future_julian + time).toFixed(3);

}

module.exports.getFutureDate = getFutureDate;

