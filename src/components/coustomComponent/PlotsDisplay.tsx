import React from "react";

interface PlotsDisplayProps {
  plots: {
    chromatogram: string;
    calibrationCurve: string;
  };
}

const PlotsDisplay: React.FC<PlotsDisplayProps> = ({ plots }) => {
  const isBase64 = (str: string) =>
    str.startsWith("data:image/") || str.startsWith("iVBORw0KGgo");

  const getImageSrc = (plotData: string) => {
    if (isBase64(plotData)) {
      return plotData.startsWith("data:")
        ? plotData
        : `data:image/png;base64,${plotData}`;
    }
    return plotData;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Analysis Plots
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Chromatogram */}
        <div className="flex flex-col">
          <h4 className="text-base font-medium text-gray-700 mb-4">
            Chromatogram
          </h4>
          <div className="relative border border-gray-300 rounded overflow-hidden bg-gray-100 min-h-[300px] flex items-center justify-center">
            <img
              src={getImageSrc(plots.chromatogram)}
              alt="Chromatogram"
              className="max-w-full max-h-[400px] object-contain block"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.nextElementSibling!.textContent =
                  "Failed to load chromatogram";
              }}
            />
            <div className="text-gray-600 italic text-center p-8 hidden" />
          </div>
        </div>

        {/* Calibration Curve */}
        <div className="flex flex-col">
          <h4 className="text-base font-medium text-gray-700 mb-4">
            Calibration Curve
          </h4>
          <div className="relative border border-gray-300 rounded overflow-hidden bg-gray-100 min-h-[300px] flex items-center justify-center">
            <img
              src={getImageSrc(plots.calibrationCurve)}
              alt="Calibration Curve"
              className="max-w-full max-h-[400px] object-contain block"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.nextElementSibling!.textContent =
                  "Failed to load calibration curve";
              }}
            />
            <div className="text-gray-600 italic text-center p-8 hidden" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlotsDisplay;
