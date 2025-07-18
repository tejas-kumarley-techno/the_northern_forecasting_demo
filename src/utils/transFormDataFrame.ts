// export const transformedDataFrame = (rawData: any) => {
//   const transFormedArray = [];
//   const columns = Object.keys(rawData);
//   const lengthOfArray = Object.keys(rawData[columns[0].trim()]).length;
//   for (let index = 0; index < lengthOfArray; index++) {
//     const tempObj: any = {};
//     for (let columnIndex = 0; columns.length; columnIndex++) {
//       tempObj[columns[columnIndex]] = "";
//     }
//   }
//   return Object.keys(rawData["File Name"]).map((key) => ({
//     id: key,
//     fileName: rawData["File Name"][key],
//     sampleType: rawData["Sample Type"][key],
//     expectedConcentration: rawData["Concentration (Expected)"][key],
//     calculatedConcentration: rawData["Calculated Concentration (ppb)"][key],
//     overallPass: rawData["Overall_Pass"][key],
//     failureReasons: rawData["Failure_Reasons"][key],
//   }));
// };

export const transformedDataFrame = (rawData: any) => {
  const columnNames = Object.keys(rawData);
  const rowKeys = Object.keys(rawData[columnNames[0]]);

  return rowKeys.map((rowKey) => {
    const row: any = { id: rowKey };

    columnNames.forEach((col) => {
      row[col] = rawData[col][rowKey];
    });

    return row;
  });
};
