export const conditions = {
  skin: {
    melanoma: {
      name: "Melanoma",
      description: "A serious form of skin cancer that begins in cells known as melanocytes.",
      symptoms: [
        "Asymmetrical moles",
        "Irregular borders",
        "Multiple colors",
        "Diameter larger than 6mm",
        "Evolution or changes over time"
      ],
      severity: "High",
      recommendedAction: "Immediate medical attention required",
      exampleImages: [
        "/images/skin/melanoma-1.jpg",
        "/images/skin/melanoma-2.jpg"
      ]
    },
    eczema: {
      name: "Eczema",
      description: "A condition that makes your skin red and itchy, common in children but can occur at any age.",
      symptoms: [
        "Dry, scaly skin",
        "Itching",
        "Red patches",
        "Small bumps",
        "Thickened skin"
      ],
      severity: "Moderate",
      recommendedAction: "Consult a dermatologist for treatment options",
      exampleImages: [
        "/images/skin/eczema-1.jpg",
        "/images/skin/eczema-2.jpg"
      ]
    },
    psoriasis: {
      name: "Psoriasis",
      description: "A chronic autoimmune condition that causes rapid buildup of skin cells.",
      symptoms: [
        "Red patches covered with thick silvery scales",
        "Dry, cracked skin that may bleed",
        "Itching or burning",
        "Thickened nails",
        "Swollen joints"
      ],
      severity: "Moderate",
      recommendedAction: "Schedule an appointment with a dermatologist",
      exampleImages: [
        "/images/skin/psoriasis-1.jpg",
        "/images/skin/psoriasis-2.jpg"
      ]
    }
  },
  
  xray: {
    pneumonia: {
      name: "Pneumonia",
      description: "An infection that inflames the air sacs in one or both lungs.",
      symptoms: [
        "White spots or infiltrates on chest X-ray",
        "Consolidation",
        "Pleural effusion",
        "Air bronchograms"
      ],
      severity: "High",
      recommendedAction: "Seek immediate medical attention",
      exampleImages: [
        "/images/xray/pneumonia-1.jpg",
        "/images/xray/pneumonia-2.jpg"
      ]
    },
    tuberculosis: {
      name: "Tuberculosis",
      description: "A bacterial infection that primarily affects the lungs.",
      symptoms: [
        "Cavities in upper lobes",
        "Miliary pattern",
        "Hilar lymphadenopathy",
        "Pleural effusion"
      ],
      severity: "High",
      recommendedAction: "Immediate medical evaluation required",
      exampleImages: [
        "/images/xray/tuberculosis-1.jpg",
        "/images/xray/tuberculosis-2.jpg"
      ]
    }
  },

  mri: {
    brainTumor: {
      name: "Brain Tumor",
      description: "An abnormal growth of cells in the brain.",
      symptoms: [
        "Mass effect",
        "Edema",
        "Enhancement patterns",
        "Infiltration"
      ],
      severity: "High",
      recommendedAction: "Urgent neurosurgical consultation required",
      exampleImages: [
        "/images/mri/brain-tumor-1.jpg",
        "/images/mri/brain-tumor-2.jpg"
      ]
    },
    stroke: {
      name: "Stroke",
      description: "A condition where blood supply to part of the brain is interrupted.",
      symptoms: [
        "Restricted diffusion",
        "Territory-specific changes",
        "Mass effect",
        "Hemorrhage"
      ],
      severity: "High",
      recommendedAction: "Emergency medical intervention needed",
      exampleImages: [
        "/images/mri/stroke-1.jpg",
        "/images/mri/stroke-2.jpg"
      ]
    }
  }
};

export const imageTypes = [
  {
    id: "skin",
    name: "Skin Conditions",
    description: "Analysis of skin lesions, rashes, and other dermatological conditions",
    acceptedFormats: ["jpg", "jpeg", "png"],
    maxSize: "10MB",
    recommendedResolution: "1920x1080 or higher"
  },
  {
    id: "xray",
    name: "X-Ray Analysis",
    description: "Chest X-rays and other radiological images",
    acceptedFormats: ["dicom", "jpg", "png"],
    maxSize: "20MB",
    recommendedResolution: "2048x2048 or higher"
  },
  {
    id: "mri",
    name: "MRI Scans",
    description: "Magnetic Resonance Imaging scans of various body parts",
    acceptedFormats: ["dicom", "nifti", "jpg"],
    maxSize: "50MB",
    recommendedResolution: "256x256x128 or higher"
  }
];

export const analysisResults = {
  confidence: {
    high: 0.9,
    medium: 0.7,
    low: 0.5
  },
  
  recommendationLevels: {
    urgent: "Seek immediate medical attention",
    soon: "Schedule a medical consultation within a week",
    routine: "Discuss during your next routine checkup"
  },

  similarCases: [
    {
      id: 1,
      condition: "Melanoma",
      matchPercentage: 92,
      description: "Similar pattern and color distribution",
      outcome: "Successfully treated with early intervention"
    },
    {
      id: 2,
      condition: "Pneumonia",
      matchPercentage: 88,
      description: "Comparable infiltrate pattern",
      outcome: "Resolved with appropriate antibiotic treatment"
    }
  ]
}; 