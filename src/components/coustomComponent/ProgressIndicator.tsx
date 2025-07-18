import { Upload, Brain, Database, TrendingUp } from "lucide-react";

interface ProgressIndicatorProps {
  currentState: "upload" | "training" | "ready" | "prediction";
}

const ProgressIndicator = ({ currentState }: ProgressIndicatorProps) => {
  const steps = ["upload", "training", "ready", "prediction"];
  const icons = [Upload, Brain, Database, TrendingUp];

  return (
    <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-center gap-4 mb-8">
        {steps.map((state, index) => {
          const isCompleted =
            steps.indexOf(currentState) > index ||
            currentState === "prediction";
          const isActive =
            currentState === state && currentState !== "prediction";

          const Icon = icons[index];

          return (
            <div key={state} className="flex items-center gap-4">
              <div
                className={`p-3 rounded-full transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 scale-110 shadow-lg"
                    : isCompleted
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-1 transition-all duration-500 ${
                    isCompleted ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
