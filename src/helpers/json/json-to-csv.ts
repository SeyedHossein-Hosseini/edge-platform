const JSONToCSVConvertor = (JSONData: Object, ReportTitle: string, ShowLabel?: boolean) => {
  // If JSONData is not an object then JSON.parse will parse the JSON string in an Object
  const arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
  let CSV = '';
  // This condition will generate the Label/Header
  if (ShowLabel) {
    let row = '';

    // This loop will extract the label from 1st index of on array
    Object.keys( arrData[0] ).forEach( (item: any, index: number) => {
      // Now convert each value to string and comma-seprated
      row += item + ',';
    });
    row = row.slice(0, -1);
    // append Label row with line break
    CSV += row + '\r\n';
  }

  // 1st loop is to extract each row
  for (let i = 0; i < arrData.length; i++) {
    let row = '';
    // 2nd loop will extract each column and convert it in string comma-seprated
    Object.keys( arrData[i] ).forEach( (item: string, index: number) => {
      // Now convert each value to string and comma-seprated
      row += '"' + arrData[i][item] + '",';
    });
    row.slice(0, row.length - 1);
    // add a line break after each row
    CSV += row + '\r\n';
  }

  const csv = CSV;
  const blob = new Blob([csv], { type: 'text/csv' });
  const csvUrl = window.webkitURL.createObjectURL(blob);
  const filename = (ReportTitle || 'UserExport') + '.csv';

  return { csvUrl, filename };
};

export { JSONToCSVConvertor };
