// Mock service for demonstration
export const analyzeMedicalImage = async (imageFile) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        condition: "Pneumonia",
        confidence: 0.89,
        severity: "Moderate",
        recommendations: [
          "Consult a pulmonologist",
          "Complete course of prescribed antibiotics",
          "Rest and hydration",
          "Follow-up scan in 2 weeks"
        ]
      });
    }, 2000);
  });
};

export const analyzeSymptoms = async (symptoms) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        conditions: [
          {
            name: "Upper Respiratory Infection",
            probability: 0.75,
            severity: "Mild"
          },
          {
            name: "Bronchitis",
            probability: 0.45,
            severity: "Moderate"
          },
          {
            name: "COVID-19",
            probability: 0.30,
            severity: "Moderate to Severe"
          }
        ]
      });
    }, 1500);
  });
}; 