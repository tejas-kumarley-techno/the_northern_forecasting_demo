import { getImageSrc } from "@/utils/base46FnUtils";
import React from "react";

const AnalysisResultWindow: React.FC<any> = ({ analysisPlotArray }) => {
  return (
    <>
      <div className="p-8 bg-[#f9f9fb] rounded-xl max-w-[1200px] mx-auto">
        <h3 className="text-2xl mb-6 text-center text-gray-800">
          Analysis Plots
        </h3>
        <div className="flex flex-col items-center gap-5">
          {analysisPlotArray.map((base64Img: string, index: number) => {
            return (
              <div
                className="max-w-4xl bg-white border border-gray-300 rounded-xl p-4 shadow-md transition-transform hover:-translate-y-1"
                key={index}
              >
                <div className="relative w-full overflow-hidden rounded-lg">
                  <img
                    src={getImageSrc(base64Img)}
                    alt="Chromatogram"
                    className="w-full h-auto block rounded-lg object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.nextElementSibling!.textContent =
                        "Failed to load chromatogram";
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AnalysisResultWindow;
