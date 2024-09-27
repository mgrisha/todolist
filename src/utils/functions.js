function getUID() {
  return Date.now().toString(36);
}

function returnDateFormat (date) {
  const day = (date.getDate() < 9 ? '0' : '') + date.getDate();
  const month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
  const year = date.getFullYear();
  const newDate = year + '-' + month + '-' + day;
  return newDate;
}

export { getUID, returnDateFormat }
