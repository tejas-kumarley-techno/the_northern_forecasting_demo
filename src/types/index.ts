export interface AnalysisParams {
  smoothingWindowSize: number;
  rtTolerance: number;
  reportingLimits: number;
}

export interface AnalysisResult {
  [key: string]: any;
}

export interface AnalysisResponse {
  results: AnalysisResult[];
  plots: {
    chromatogram: string;
    calibrationCurve: string;
  };
}

export interface FileUpload {
  file: File | null;
  preview?: string;
  error?: string;
}

export interface FileUploads {
  isFile: FileUpload | null;
  quantifierFile: FileUpload | null;
  qualifierFile: FileUpload | null;
}
//
export interface AnalysisFileUpload {
  file: FileUpload | null;
}

export interface CalibrationCurveResultEntry {
  "File Name": string;
  "Sample Type": string;
  "Concentration (Expected)": number | null;
  "Calculated Concentration (ppb)": number;
  "Calculated Qualifier Concentration": number;
  IS_Area: number;
  Analyte_Quantifier_Area: number;
  Analyte_Qualifier_Area: number;
  Response_Ratio: number;
  Qualifier_Response_Ratio: number;
  "MRM Ratio (Analyte 2 / Analyte 1)": number;
  Target_MRM_Ratio: number;
  MRM_Ratio_Difference_Percent: number;
  Coelution_Flag: boolean;
  Coelution_Reasons: string;
  Flag_Reporting_Limit_Pass: boolean;
  Flag_MRM_Ratio_Pass: boolean;
  Flag_IS_Area_Pass: boolean;
  Overall_Pass: boolean;
  Failure_Reasons: string;
}

export interface CalibrationCurveResponse {
  calibration_curve_images: string[]; // base64 strings
  calibration_curve_result: CalibrationCurveResultEntry[];
}

export interface CalibrationDataTableProps {
  data: CalibrationCurveResultEntry[];
}

export interface CalibrationData {
  "File Name": Record<number, string>;
  "Sample Type": Record<number, "Unknown" | "Standard" | "CCV">;
  "Concentration (Expected)": Record<number, number | null>;
  "Calculated Concentration (ppb)": Record<number, number>;
  Overall_Pass: Record<number, boolean>;
  Failure_Reasons: Record<number, string>;
}

export interface AnalyticalData {
  id: string;
  fileName: string;
  sampleType: string;
  expectedConcentration: number | null;
  calculatedConcentration: number;
  overallPass: boolean;
  failureReasons: string;
}

export interface RawAnalyticalData {
  dataframe: string;
  images: string[];
}

export enum Step {
  Upload = "upload",
  Training = "training",
  Ready = "ready",
  Prediction = "prediction",
}

export interface WeeklyProduct extends Record<string, unknown> {
  week_start: string;
  product_item: string;
}

type ModelType = "Linear" | "Ridge" | "Lasso" | "GradientBoosting" | "XGBoost";

export interface PredictionsData {
  predictions: Record<ModelType, number>;
  message: string;
  graph_image_base64: string;
  line_chart_base64: string;
}
