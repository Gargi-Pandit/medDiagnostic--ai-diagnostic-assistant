export const symptoms = {
  general: [
    { id: 'fever', label: 'Fever', severity: ['mild', 'moderate', 'high'] },
    { id: 'fatigue', label: 'Fatigue', severity: ['mild', 'moderate', 'severe'] },
    { id: 'chills', label: 'Chills' },
    { id: 'weightLoss', label: 'Weight Loss' },
    { id: 'malaise', label: 'General Weakness' }
  ],
  respiratory: [
    { id: 'cough', label: 'Cough', type: ['dry', 'productive'] },
    { id: 'shortness_of_breath', label: 'Shortness of Breath' },
    { id: 'chest_pain', label: 'Chest Pain' },
    { id: 'runny_nose', label: 'Runny Nose' },
    { id: 'sore_throat', label: 'Sore Throat' }
  ],
  gastrointestinal: [
    { id: 'nausea', label: 'Nausea' },
    { id: 'vomiting', label: 'Vomiting' },
    { id: 'diarrhea', label: 'Diarrhea' },
    { id: 'abdominal_pain', label: 'Abdominal Pain', location: ['upper', 'lower', 'diffuse'] },
    { id: 'loss_of_appetite', label: 'Loss of Appetite' }
  ],
  neurological: [
    { id: 'headache', label: 'Headache', type: ['tension', 'migraine', 'cluster'] },
    { id: 'dizziness', label: 'Dizziness' },
    { id: 'confusion', label: 'Confusion' },
    { id: 'memory_loss', label: 'Memory Loss' },
    { id: 'numbness', label: 'Numbness or Tingling' }
  ],
  musculoskeletal: [
    { id: 'joint_pain', label: 'Joint Pain' },
    { id: 'muscle_pain', label: 'Muscle Pain' },
    { id: 'back_pain', label: 'Back Pain' },
    { id: 'stiffness', label: 'Joint Stiffness' },
    { id: 'weakness', label: 'Muscle Weakness' }
  ]
};

export const conditions = {
  respiratory: {
    bronchitis: {
      name: "Bronchitis",
      primarySymptoms: ['cough', 'shortness_of_breath', 'chest_pain'],
      secondarySymptoms: ['fatigue', 'fever', 'sore_throat'],
      severity: "Moderate",
      urgency: "Urgent",
      description: "Inflammation of the bronchial tubes that carry air to and from the lungs",
      recommendations: [
        "Rest and hydration",
        "Over-the-counter cough medicine",
        "Humidifier use",
        "Consult healthcare provider if symptoms worsen"
      ],
      riskFactors: [
        "Smoking",
        "Recent respiratory infection",
        "Exposure to lung irritants"
      ]
    },
    pneumonia: {
      name: "Pneumonia",
      primarySymptoms: ['fever', 'cough', 'chest_pain'],
      secondarySymptoms: ['shortness_of_breath', 'fatigue', 'chills'],
      severity: "High",
      urgency: "Urgent",
      description: "Infection causing inflammation of the air sacs in the lungs",
      recommendations: [
        "Seek medical attention",
        "Chest X-ray may be needed",
        "Antibiotics if bacterial"
      ],
      riskFactors: [
        "Recent respiratory infection",
        "Smoking",
        "Weakened immune system"
      ]
    }
  },
  gastrointestinal: {
    gastroenteritis: {
      name: "Gastroenteritis",
      primarySymptoms: ['nausea', 'vomiting', 'diarrhea'],
      secondarySymptoms: ['abdominal_pain', 'fever', 'malaise'],
      severity: "Moderate",
      urgency: "Non-urgent",
      description: "Inflammation of the stomach and intestines",
      recommendations: [
        "Stay hydrated",
        "Rest",
        "BRAT diet",
        "Seek care if severe dehydration occurs"
      ],
      riskFactors: [
        "Recent food poisoning",
        "Contact with infected person",
        "Poor hand hygiene"
      ]
    },
    appendicitis: {
      name: "Appendicitis",
      primarySymptoms: ['abdominal_pain', 'nausea', 'fever'],
      secondarySymptoms: ['loss_of_appetite', 'vomiting'],
      severity: "High",
      urgency: "Emergency",
      description: "Inflammation of the appendix requiring immediate attention",
      recommendations: [
        "Emergency medical evaluation",
        "Surgical consultation",
        "Do not eat or drink"
      ],
      riskFactors: [
        "Age 10-30 years",
        "Family history",
        "Recent gastrointestinal infection"
      ]
    }
  },
  neurological: {
    migraine: {
      name: "Migraine",
      primarySymptoms: ['headache', 'nausea', 'sensitivity_to_light'],
      secondarySymptoms: ['dizziness', 'vomiting'],
      severity: "Moderate",
      urgency: "Non-urgent",
      description: "Severe recurring headache with associated symptoms",
      recommendations: [
        "Rest in dark quiet room",
        "Over-the-counter pain medication",
        "Stay hydrated",
        "Track triggers"
      ],
      riskFactors: [
        "Family history",
        "Hormonal changes",
        "Stress"
      ]
    },
    meningitis: {
      name: "Meningitis",
      primarySymptoms: ['fever', 'headache', 'stiff_neck'],
      secondarySymptoms: ['confusion', 'nausea', 'sensitivity_to_light'],
      severity: "Critical",
      urgency: "Emergency",
      description: "Inflammation of the protective membranes covering the brain and spinal cord",
      recommendations: [
        "Immediate emergency care",
        "Hospitalization required",
        "Early antibiotic treatment if bacterial"
      ],
      riskFactors: [
        "Age under 5 or over 65",
        "Living in community settings",
        "Weakened immune system"
      ]
    }
  }
};

export const symptomCombinations = {
  // Respiratory conditions
  "cough+shortness_of_breath+chest_pain": {
    possibleConditions: [
      {
        name: "Bronchitis",
        probability: 0.85,
        requiresAttention: "Urgent",
        differentialDiagnosis: ["Pneumonia", "Asthma"]
      }
    ]
  },
  "fever+cough+chest_pain": {
    possibleConditions: [
      {
        name: "Pneumonia",
        probability: 0.75,
        requiresAttention: "Urgent",
        differentialDiagnosis: ["Bronchitis", "Pleurisy"]
      }
    ]
  },

  // Gastrointestinal conditions
  "abdominal_pain+nausea+fever": {
    possibleConditions: [
      {
        name: "Appendicitis",
        probability: 0.80,
        requiresAttention: "Emergency",
        differentialDiagnosis: ["Gastroenteritis", "Diverticulitis"]
      }
    ]
  },
  "nausea+vomiting+diarrhea": {
    possibleConditions: [
      {
        name: "Gastroenteritis",
        probability: 0.90,
        requiresAttention: "Moderate",
        differentialDiagnosis: ["Food Poisoning", "Viral Infection"]
      }
    ]
  },

  // Neurological conditions
  "headache+dizziness+confusion": {
    possibleConditions: [
      {
        name: "Migraine",
        probability: 0.70,
        requiresAttention: "Moderate",
        differentialDiagnosis: ["Tension Headache", "Vertigo"]
      }
    ]
  },
  "fever+headache+stiff_neck": {
    possibleConditions: [
      {
        name: "Meningitis",
        probability: 0.85,
        requiresAttention: "Emergency",
        differentialDiagnosis: ["Severe Flu", "Neck Injury"]
      }
    ]
  }
};

export const severityLevels = {
  mild: {
    label: "Mild",
    description: "Symptoms are noticeable but not interfering with daily activities",
    recommendedAction: "Self-care and monitoring",
    followUpTime: "Within a week if not improving"
  },
  moderate: {
    label: "Moderate",
    description: "Symptoms are affecting daily activities but not severe",
    recommendedAction: "Consult healthcare provider",
    followUpTime: "Within 2-3 days"
  },
  severe: {
    label: "Severe",
    description: "Symptoms are significantly impacting daily life or concerning",
    recommendedAction: "Seek immediate medical attention",
    followUpTime: "Immediate"
  },
  critical: {
    label: "Critical",
    description: "Life-threatening symptoms requiring emergency care",
    recommendedAction: "Call emergency services/Go to ER",
    followUpTime: "Immediate emergency care"
  }
};

export const riskFactors = {
  age: ["Under 5", "Over 65"],
  conditions: [
    "Diabetes",
    "Heart Disease",
    "Respiratory Disease",
    "Immunocompromised",
    "Pregnancy"
  ],
  lifestyle: [
    "Smoking",
    "Excessive Alcohol",
    "Sedentary Lifestyle",
    "Poor Diet"
  ]
}; 