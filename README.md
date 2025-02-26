# MedDiagnostic

A web-based medical diagnostic application that provides analysis for medical images and symptoms. This tool offers preliminary medical assessments through image analysis and symptom evaluation.

![App Screenshot](/medical-diagnostic/readme.png)

## Features
- Medical Image Analysis (X-rays, MRIs, CT scans, skin conditions)
- Symptom-based Analysis
- User Authentication
- Responsive Design

## Technologies Used (for the prototype)
- React
- Material-UI

## Setup
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
## Running the Application
1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`
3. Use the sample images provided in the application for testing

## Project Structure
- `/src/components` - Reusable UI components
- `/src/pages` - Main page components
- `/src/mockData` - Sample data for testing
- `/public/images/samples` - Sample medical images

## Important Notes
- This is a demonstration project
- Not intended for actual medical diagnosis

## Development
### Image Analysis
- Supported formats: JPEG, PNG, DICOM
- Maximum file size: 10MB
- Sample images included for testing

### Symptom Analysis
- Text-based input system
- Mock data for development
- Structured analysis output