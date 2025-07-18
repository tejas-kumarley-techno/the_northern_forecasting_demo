export const isBase64 = (str: string) => {
  return str.startsWith("data:image/") || str.startsWith("iVBORw0KGgo");
};

export const getImageSrc = (plotData: string) => {
  if (isBase64(plotData)) {
    return plotData.startsWith("data:")
      ? plotData
      : `data:image/png;base64,${plotData}`;
  }
  return plotData; // Assume it's a URL
};
