export enum StudyLevel {
  Certificate = 'Certificate',
  Diploma = 'Diploma',
  AdvancedDiploma = 'Advanced Diploma',
  Bachelor = 'Bachelor',
  Master = 'Master',
  PhD = 'PhD',
}

export interface StudyField {
  name: string;
  relatedFields: string[];
  description: string;
}

export const studyFields: Record<string, StudyField> = {
  businessManagement: {
    name: 'Business and Management',
    relatedFields: [
      'business administration',
      'marketing',
      'accounting',
      'finance',
      'economics',
      'international business',
      'human resources',
    ],
    description:
      'Includes business administration, management, marketing, and related business disciplines',
  },

  informationTechnology: {
    name: 'Information Technology',
    relatedFields: [
      'computer science',
      'software development',
      'networking',
      'cybersecurity',
      'data science',
      'web development',
      'systems analysis',
    ],
    description:
      'Covers all aspects of computing, programming, and digital technology',
  },

  engineering: {
    name: 'Engineering',
    relatedFields: [
      'mechanical engineering',
      'civil engineering',
      'electrical engineering',
      'chemical engineering',
      'aerospace engineering',
      'software engineering',
      'mechatronics',
    ],
    description: 'All branches of engineering and related technical fields',
  },

  nursing: {
    name: 'Nursing and Healthcare',
    relatedFields: [
      'healthcare',
      'aged care',
      'midwifery',
      'paramedic',
      'medical science',
      'pharmacy',
      'public health',
    ],
    description:
      'Healthcare-related studies including nursing, aged care, and allied health',
  },

  hospitality: {
    name: 'Hospitality and Tourism',
    relatedFields: [
      'hotel management',
      'tourism management',
      'culinary arts',
      'event management',
      'restaurant management',
      'travel services',
      'food and beverage',
    ],
    description:
      'Covers hospitality management, tourism, and related service industries',
  },

  accounting: {
    name: 'Accounting and Finance',
    relatedFields: [
      'financial accounting',
      'management accounting',
      'taxation',
      'auditing',
      'financial planning',
      'banking',
      'corporate finance',
    ],
    description:
      'Specialized focus on accounting, finance, and related financial services',
  },

  construction: {
    name: 'Construction and Building',
    relatedFields: [
      'building management',
      'construction management',
      'architecture',
      'carpentry',
      'civil construction',
      'building design',
      'quantity surveying',
    ],
    description:
      'Building, construction, and related architectural disciplines',
  },

  education: {
    name: 'Education and Teaching',
    relatedFields: [
      'early childhood education',
      'primary education',
      'secondary education',
      'special education',
      'TESOL',
      'educational psychology',
      'curriculum development',
    ],
    description: 'Teaching and education-related studies at all levels',
  },

  automotive: {
    name: 'Automotive',
    relatedFields: [
      'mechanical',
      'auto electrical',
      'vehicle body repair',
      'automotive engineering',
      'diesel mechanics',
      'automotive technology',
      'vehicle diagnostics',
    ],
    description:
      'Automotive repair, maintenance, and related mechanical studies',
  },

  cookery: {
    name: 'Commercial Cookery',
    relatedFields: [
      'culinary arts',
      'patisserie',
      'food science',
      'kitchen management',
      'food safety',
      'baking',
      'catering',
    ],
    description: 'Professional cooking, kitchen management, and food service',
  },

  design: {
    name: 'Design and Creative Arts',
    relatedFields: [
      'graphic design',
      'interior design',
      'digital media',
      'fashion design',
      'animation',
      'visual arts',
      'web design',
    ],
    description: 'Creative and digital design disciplines',
  },

  agriculture: {
    name: 'Agriculture and Environmental Science',
    relatedFields: [
      'horticulture',
      'agribusiness',
      'environmental management',
      'conservation',
      'sustainable agriculture',
      'forestry',
      'marine science',
    ],
    description: 'Agricultural studies and environmental sciences',
  },
};

// Points system with more granular scoring
export const pointsSystem = {
  basePoints: {
    [StudyLevel.Certificate]: 10,
    [StudyLevel.Diploma]: 15,
    [StudyLevel.AdvancedDiploma]: 20,
    [StudyLevel.Bachelor]: 25,
    [StudyLevel.Master]: 30,
    [StudyLevel.PhD]: 35,
  },
  relatedStudyBonus: {
    directlyRelated: 10, // Same field
    partiallyRelated: 5, // Related field
    noRelation: -3, // No related study
  },
  experienceBonus: {
    workExperience: 5, // Relevant work experience in the field
    professionalCert: 3, // Professional certifications
  },
};
