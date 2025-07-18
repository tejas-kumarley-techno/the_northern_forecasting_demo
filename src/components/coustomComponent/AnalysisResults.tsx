import { PredictionsData } from "@/types";
import { Trophy, Zap } from "lucide-react";
import React from "react";
import AnalysisResultWindow from "./AnalysisResutlWindow";

const MLPredictionsDashboard: React.FC<PredictionsData> = (data) => {
  const sortedPredictions = data?.predictions
    ? Object.entries(data?.predictions)
        .map(([model, prediction]) => ({
          model,
          prediction,
        }))
        .sort((a, b) => a.prediction - b.prediction)
    : [];

  return (
    <div className="border border-dashed rounded-md px-4 py-6 text-center">
      {data && (
        <>
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Trophy className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-emerald-700 mt-1">{data.message}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-blue-600" />
                  Model Performance
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {sortedPredictions.map(({ model, prediction }, index) => (
                    <div
                      key={model}
                      className="group p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-white ${
                              index === 0
                                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                : index === 1
                                ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                                : index === 2
                                ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                : "bg-gradient-to-r from-gray-400 to-gray-500"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                              {model}
                            </h3>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-mono font-bold text-gray-800">
                            {prediction}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {data?.graph_image_base64 && data?.line_chart_base64 && (
            <AnalysisResultWindow
              analysisPlotArray={[
                data?.graph_image_base64,
                data?.line_chart_base64,
              ]}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MLPredictionsDashboard;
