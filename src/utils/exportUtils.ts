import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { AnalysisResult } from '../types';

export const exportToCSV = (data: AnalysisResult[], filename: string = 'analysis_results.csv') => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportToExcel = (data: AnalysisResult[], filename: string = 'analysis_results.xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Analysis Results');
  
  // Auto-size columns
  const columnWidths = Object.keys(data[0] || {}).map(key => ({
    wch: Math.max(key.length, ...data.map(row => String(row[key] || '').length))
  }));
  worksheet['!cols'] = columnWidths;
  
  XLSX.writeFile(workbook, filename);
}; 