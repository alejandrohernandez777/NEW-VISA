// src/utils/academicAssessment.ts

export interface AcademicLevel {
  level: number;
  name: string;
  requiredIELTS: number;
  requiredTOEFL: number;
  requiredPTE: number;
  financialRequirement: number;
}

export const ACADEMIC_LEVELS: Record<string, AcademicLevel> = {
  PHD: {
    level: 5,
    name: 'Doctorate',
    requiredIELTS: 6.5,
    requiredTOEFL: 79,
    requiredPTE: 58,
    financialRequirement: 25000,
  },
  MASTERS: {
    level: 4,
    name: 'Masters Degree',
    requiredIELTS: 6.5,
    requiredTOEFL: 79,
    requiredPTE: 58,
    financialRequirement: 25000,
  },
  BACHELOR: {
    level: 3,
    name: 'Bachelor Degree',
    requiredIELTS: 6.0,
    requiredTOEFL: 60,
    requiredPTE: 50,
    financialRequirement: 20000,
  },
  DIPLOMA: {
    level: 2,
    name: 'Diploma',
    requiredIELTS: 5.5,
    requiredTOEFL: 46,
    requiredPTE: 42,
    financialRequirement: 15000,
  },
  CERTIFICATE: {
    level: 1,
    name: 'Certificate',
    requiredIELTS: 5.5,
    requiredTOEFL: 46,
    requiredPTE: 42,
    financialRequirement: 15000,
  },
};

export const calculateAcademicTransition = (
  currentLevel: string,
  intendedLevel: string
): number => {
  const current = ACADEMIC_LEVELS[currentLevel];
  const intended = ACADEMIC_LEVELS[intendedLevel];

  if (!current || !intended) return 0;

  if (intended.level < current.level) {
    return -5; // Downgrade penalty
  }

  if (intended.level === current.level + 1) {
    return 5; // Natural progression bonus
  }

  return 0;
};
