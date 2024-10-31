export enum StudyLevel {
  Certificate = 'Certificate',
  Diploma = 'Diploma',
  AdvancedDiploma = 'Advanced Diploma',
  Bachelor = 'Bachelor',
  Master = 'Master',
  PhD = 'PhD',
}

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
    workExperience: 5, // Points per year of relevant work experience
    professionalCert: 3, // Additional points for professional certifications
  },
};

export const studyFields = {
  businessManagement: {
    name: 'Business and Management',
    relatedFields: [
      'business administration',
      'marketing',
      'accounting',
      'finance',
      'economics',
    ],
    description: 'Business administration, management, and related disciplines',
  },
  education: {
    name: 'Education and Teaching',
    relatedFields: [
      'early childhood education',
      'primary education',
      'secondary education',
      'special education',
      'TESOL',
    ],
    description: 'Teaching and education-related studies at all levels',
  },
};
