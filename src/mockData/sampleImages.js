export const sampleImages = {
  skin: [
    {
      id: 'skin1',
      thumbnail: '/images/samples/skin-melanoma.jpg',
      analysis: {
        condition: "Melanoma",
        confidence: 0.92,
        description: "The image shows characteristics consistent with melanoma:",
        keyFindings: [
          "Asymmetrical shape",
          "Irregular borders",
          "Multiple colors present",
          "Diameter > 6mm"
        ],
        severity: "High",
        recommendedAction: "Immediate dermatologist consultation required",
        similarCases: 245,
        additionalNotes: "Early detection is crucial for melanoma. Please seek professional medical attention as soon as possible."
      }
    },
    {
      id: 'skin2',
      thumbnail: '/images/samples/skin-eczema.jpg',
      analysis: {
        condition: "Eczema",
        confidence: 0.88,
        description: "The image indicates eczema with typical characteristics:",
        keyFindings: [
          "Dry, scaly patches",
          "Redness and inflammation",
          "Typical distribution pattern",
          "Surface texture changes"
        ],
        severity: "Moderate",
        recommendedAction: "Schedule dermatologist appointment",
        similarCases: 567,
        additionalNotes: "Consider using moisturizers and avoiding known triggers until professional consultation."
      }
    },
    {
      id: 'skin3',
      thumbnail: '/images/samples/skin-psoriasis.jpg',
      analysis: {
        condition: "Psoriasis",
        confidence: 0.85,
        description: "Image shows signs consistent with plaque psoriasis:",
        keyFindings: [
          "Thick, silvery scales",
          "Well-defined patches",
          "Redness underneath plaques",
          "Typical distribution"
        ],
        severity: "Moderate",
        recommendedAction: "Dermatological evaluation recommended",
        similarCases: 432,
        additionalNotes: "Chronic condition requiring long-term management plan."
      }
    }
  ],
  xray: [
    {
      id: 'xray1',
      thumbnail: '/images/samples/chest-xray.jpg',
      analysis: {
        condition: "Pneumonia",
        confidence: 0.89,
        description: "Chest X-ray shows signs of bacterial pneumonia:",
        keyFindings: [
          "Consolidation in lower right lobe",
          "Increased opacity",
          "Air bronchograms",
          "No pleural effusion"
        ],
        severity: "Moderate",
        recommendedAction: "Clinical correlation and treatment initiation recommended",
        similarCases: 789,
        additionalNotes: "Follow-up X-ray recommended after treatment course."
      }
    },
    {
      id: 'xray2',
      thumbnail: '/images/samples/bone-xray.jpeg',
      analysis: {
        condition: "Fracture",
        confidence: 0.95,
        description: "X-ray reveals a transverse fracture:",
        keyFindings: [
          "Clear fracture line",
          "Minimal displacement",
          "No comminution",
          "Surrounding soft tissue swelling"
        ],
        severity: "Moderate",
        recommendedAction: "Orthopedic consultation required",
        similarCases: 654,
        additionalNotes: "Clean break with good prognosis for healing."
      }
    },
    {
      id: 'xray3',
      thumbnail: '/images/samples/joint-xray.jpg',
      analysis: {
        condition: "Osteoarthritis",
        confidence: 0.87,
        description: "X-ray shows degenerative joint changes:",
        keyFindings: [
          "Joint space narrowing",
          "Osteophyte formation",
          "Subchondral sclerosis",
          "Normal alignment"
        ],
        severity: "Moderate",
        recommendedAction: "Rheumatologist referral advised",
        similarCases: 876,
        additionalNotes: "Conservative management may be appropriate initially."
      }
    }
  ],
  ct: [
    {
      id: 'ct1',
      thumbnail: '/images/samples/brain-ct.jpg',
      analysis: {
        condition: "No Acute Abnormalities",
        confidence: 0.94,
        description: "CT scan of the brain appears normal:",
        keyFindings: [
          "Normal brain parenchyma",
          "No hemorrhage",
          "No mass effect",
          "Normal ventricles"
        ],
        severity: "Low",
        recommendedAction: "No immediate action required",
        similarCases: 1234,
        additionalNotes: "Baseline scan for future reference."
      }
    },
    {
      id: 'ct2',
      thumbnail: '/images/samples/chest-ct.jpg',
      analysis: {
        condition: "Pulmonary Nodule",
        confidence: 0.91,
        description: "CT shows solitary pulmonary nodule:",
        keyFindings: [
          "8mm nodule in right upper lobe",
          "Well-circumscribed",
          "No calcification",
          "No associated lymphadenopathy"
        ],
        severity: "Moderate",
        recommendedAction: "Follow-up CT in 3 months",
        similarCases: 567,
        additionalNotes: "Regular monitoring recommended due to size and characteristics."
      }
    },
    {
      id: 'ct3',
      thumbnail: '/images/samples/abdomen-ct.jpg',
      analysis: {
        condition: "Normal Study",
        confidence: 0.93,
        description: "Abdominal CT shows normal findings:",
        keyFindings: [
          "Normal liver appearance",
          "No free fluid",
          "Normal bowel pattern",
          "No lymphadenopathy"
        ],
        severity: "Low",
        recommendedAction: "No follow-up needed",
        similarCases: 890,
        additionalNotes: "All major organs appear normal."
      }
    }
  ],
  mri: [
    {
      id: 'mri1',
      thumbnail: '/images/samples/brain-mri.jpg',
      analysis: {
        condition: "Normal Brain MRI",
        confidence: 0.96,
        description: "MRI shows normal brain structures:",
        keyFindings: [
          "Normal gray-white differentiation",
          "No signal abnormalities",
          "Normal flow voids",
          "No mass effect"
        ],
        severity: "Low",
        recommendedAction: "No follow-up needed",
        similarCases: 789,
        additionalNotes: "All sequences demonstrate normal findings."
      }
    },
    {
      id: 'mri2',
      thumbnail: '/images/samples/knee-mri.jpg',
      analysis: {
        condition: "Meniscal Tear",
        confidence: 0.89,
        description: "MRI reveals medial meniscus tear:",
        keyFindings: [
          "Horizontal tear pattern",
          "No displacement",
          "Mild joint effusion",
          "Intact ligaments"
        ],
        severity: "Moderate",
        recommendedAction: "Orthopedic consultation recommended",
        similarCases: 654,
        additionalNotes: "Conservative treatment may be considered initially."
      }
    },
    {
      id: 'mri3',
      thumbnail: '/images/samples/spine-mri.jpg',
      analysis: {
        condition: "Disc Herniation",
        confidence: 0.92,
        description: "MRI shows L4-L5 disc herniation:",
        keyFindings: [
          "Posterior disc herniation",
          "Nerve root compression",
          "Mild canal stenosis",
          "Normal alignment"
        ],
        severity: "Moderate",
        recommendedAction: "Neurosurgical consultation advised",
        similarCases: 432,
        additionalNotes: "Consider conservative management before surgical options."
      }
    }
  ]
};

export const categories = [
  {
    id: 'skin',
    title: 'Skin Conditions',
    description: 'Analysis of various skin conditions and lesions',
    icon: '🔍'
  },
  {
    id: 'xray',
    title: 'X-Ray Images',
    description: 'Analysis of X-ray images from different body parts',
    icon: '📷'
  },
  {
    id: 'ct',
    title: 'CT Scans',
    description: 'Analysis of computed tomography scans of various body parts',
    icon: '🔄'
  },
  {
    id: 'mri',
    title: 'MRI Scans',
    description: 'Analysis of brain and body MRI scans',
    icon: '🧠'
  }
]; 