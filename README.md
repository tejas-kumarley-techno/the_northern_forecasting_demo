# Chromatography Analyzer Frontend

A React-based frontend application for analyzing chromatography data. This application provides a user-friendly interface for uploading files, configuring analysis parameters, and viewing results with interactive plots and data tables.

## Features

### 🚀 Core Functionality
- **File Upload**: Support for `.txt` and `.zip` files with validation and preview
- **Parameter Configuration**: Adjustable analysis parameters (smoothing window, RT tolerance, reporting limits)
- **Real-time Analysis**: Submit data to FastAPI backend for processing
- **Interactive Results**: View chromatogram and calibration curve plots
- **Data Export**: Download results in CSV or Excel format

### 📊 Data Visualization
- **Responsive Plots**: Display chromatogram and calibration curve images
- **Sortable Table**: Interactive results table with sorting capabilities
- **Filtering**: Search and filter through analysis results
- **Pagination**: Handle large datasets efficiently
- **Warning Detection**: Highlight rows with warnings or errors

### 🎨 User Experience
- **Modern UI**: Clean, responsive design with gradient backgrounds
- **Loading States**: Visual feedback during analysis
- **Error Handling**: Comprehensive error messages and validation
- **Mobile Responsive**: Optimized for desktop and mobile devices

## Prerequisites

Before running this application, ensure you have:

- **Node.js** (version 14 or higher)
- **npm** or **yarn** package manager
- **FastAPI Backend** running on `http://localhost:8000`

## Installation

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Backend Requirements

The frontend expects a FastAPI backend with the following endpoint:

### POST `/api/analyze`

**Request Format**: `multipart/form-data`

**Required Fields**:
- `isFile`: Internal Standard file (`.txt` or `.zip`)
- `quantifierFile`: Quantifier file (`.txt` or `.zip`)
- `qualifierFile`: Qualifier file (`.txt` or `.zip`)
- `params`: JSON string containing analysis parameters

**Parameters Structure**:
```json
{
  "smoothingWindowSize": 5,
  "rtTolerance": 0.1,
  "reportingLimits": 0.01
}
```

**Response Format**:
```json
{
  "results": [
    {
      "column1": "value1",
      "column2": "value2",
      // ... additional columns
    }
  ],
  "plots": {
    "chromatogram": "base64_encoded_png_or_url",
    "calibrationCurve": "base64_encoded_png_or_url"
  }
}
```

## Usage Guide

### 1. File Upload
- Click "Choose File" for each required file type
- Supported formats: `.txt` and `.zip`
- Files are validated on selection
- Preview of file content is displayed

### 2. Parameter Configuration
- **Smoothing Window Size**: Integer value (minimum: 1)
- **RT Tolerance**: Decimal value (minimum: 0)
- **Reporting Limits**: Decimal value (minimum: 0)

### 3. Analysis
- Click "Analyze Data" to submit files and parameters
- Loading spinner indicates processing status
- Results appear automatically when complete

### 4. Viewing Results
- **Plots**: Chromatogram and calibration curve displayed side-by-side
- **Table**: Sortable and filterable results table
- **Export**: Download data as CSV or Excel file

### 5. Error Handling
- File validation errors are shown immediately
- Backend errors are displayed with details
- Network errors are handled gracefully

## Project Structure

```
src/
├── components/           # React components
│   ├── FileUpload.tsx   # File upload with validation
│   ├── LoadingSpinner.tsx # Loading indicator
│   ├── PlotsDisplay.tsx # Plot visualization
│   ├── ResultsTable.tsx # Interactive data table
│   └── *.css           # Component styles
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Utility functions
│   └── exportUtils.ts   # CSV/Excel export
├── App.tsx             # Main application component
├── App.css             # Main application styles
├── index.tsx           # Application entry point
└── index.css           # Global styles
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm eject` - Eject from Create React App (irreversible)

## Configuration

### Proxy Configuration
The application is configured to proxy API requests to `http://localhost:8000` (FastAPI backend). This is set in `package.json`:

```json
{
  "proxy": "http://localhost:8000"
}
```

### Environment Variables
Create a `.env` file in the root directory for environment-specific configuration:

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENVIRONMENT=development
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Common Issues

1. **Backend Connection Error**
   - Ensure FastAPI server is running on port 8000
   - Check CORS configuration on backend
   - Verify network connectivity

2. **File Upload Issues**
   - Ensure files are `.txt` or `.zip` format
   - Check file size limits
   - Verify file permissions

3. **Build Errors**
   - Clear `node_modules` and reinstall dependencies
   - Update Node.js to latest LTS version
   - Check TypeScript compilation errors

### Development Tips

- Use browser developer tools to inspect network requests
- Check console for JavaScript errors
- Verify API endpoint responses match expected format

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Verify backend API is functioning correctly
4. Create an issue with detailed error information 