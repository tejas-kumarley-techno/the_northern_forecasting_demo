export const DEFAULT_PARAMS = {
  savgol_window: 15, // Window length for Savitzky-Golay filter (must be odd)
  savgol_polyorder: 3, // Polynomial order for Savitzky-Golay filter (must be < savgol_window)
  peak_height_fraction: 0.01, // Min height of detected peaks (fraction of max intensity)
  peak_distance: 10, // Min distance (in data points) between peaks
  peak_prominence_fraction: 0.01, // Prominence of peaks (fraction of max intensity)
  auc_window: 0.2, // Half-width of window (in minutes) for AUC calc
  baseline_poly_degree: 2, // Degree for polynomial baseline correction
  als_lam_general: 1e7, // Lambda for ALS baseline correction
  als_p_general: 0.001, // P for ALS baseline correction
} as const;

export const CONFIG = {
  blank_interference_threshold: 0.05,
  sse_lower: 80,
  sse_upper: 120,
  mrm_ratio_tolerance: 0.2,
  rt_tolerance: 0.2,
  snr_threshold: 10,
  carryover_threshold: 0.05,
  max_peak_width: 0.5,
} as const;
