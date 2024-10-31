// src/components/Results.tsx

import React from 'react';
import {
  AlertCircle,
  CheckCircle,
  Info,
  DollarSign,
  HelpCircle,
  FileText,
  RefreshCw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getCountryRiskScore,
  getFinancialRequirements,
  countryAssessmentLevels,
} from '../utils/countryData';
import { getStudyFieldScore } from '../utils/studyFields';
import { getRequiredScoreForLevel } from '../utils/studyLevels';
import {
  ACADEMIC_LEVELS,
  calculateAcademicTransition,
} from '../utils/academicAssessment';

import type {
  VisaFormData,
  ResultsProps,
  ScoreDetail,
  CalculatedScore,
} from '../types';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

// Utility functions
const calculateScoreDetails = (data: VisaFormData): CalculatedScore => {
  let score = 0;
  const details: ScoreDetail[] = [];

  // 1. Country Assessment (max 15 points)
  const countryScore = Math.min(getCountryRiskScore(data.countryOfOrigin), 15);
  score += countryScore;
  details.push({
    category: 'Country Assessment',
    score: countryScore,
    maxScore: 15,
    notes: data.countryOfOrigin
      ? [
          `Country: ${
            countryAssessmentLevels[data.countryOfOrigin]?.name ?? 'Unknown'
          }`,
          `Assessment Level: ${
            countryAssessmentLevels[data.countryOfOrigin]?.level ?? 'Unknown'
          }`,
          `Current Education: ${data.educationLevel}`,
        ]
      : [],
    explanation:
      'Points based on country assessment level and education background',
    improvement:
      countryScore < 15
        ? [
            'Provide complete documentation of academic history',
            'Include certified translations of all documents',
            'Submit detailed explanation of study gaps (if any)',
          ]
        : undefined,
  });

  // 2. Academic Alignment (max 20 points)
  const academicScore = Math.max(
    0,
    15 + calculateAcademicTransition(data.educationLevel, data.intendedStudy)
  );

  score += academicScore;
  details.push({
    category: 'Academic Alignment',
    score: academicScore,
    maxScore: 20,
    notes: [
      `Current Level: ${
        ACADEMIC_LEVELS[data.educationLevel]?.name || data.educationLevel
      }`,
      `Intended Level: ${
        ACADEMIC_LEVELS[data.intendedStudy]?.name || data.intendedStudy
      }`,
      `Academic Progression: ${
        academicScore - 15 > 0
          ? 'Positive'
          : academicScore - 15 < 0
          ? 'Negative'
          : 'Neutral'
      }`,
      data.hasRelatedStudy
        ? 'Has relevant prior study'
        : 'No related prior study',
    ],
    explanation:
      'Points based on academic progression and study pathway relevance',
    improvement:
      academicScore < 20
        ? [
            'Demonstrate clear academic progression',
            'Provide detailed study plan',
            'Include statement of purpose explaining course selection',
          ]
        : undefined,
  });

  // 3. Study & Experience (max 25 points)
  let studyScore = 0;

  // Prior study in related field (max 15)
  if (data.hasRelatedStudy) {
    studyScore += 15;
  }

  // Relevant work experience (max 10)
  if (data.hasWorkExperience && data.workExperienceYears) {
    const workPoints = Math.min(data.workExperienceYears * 2, 10);
    studyScore += workPoints;
  }

  score += studyScore;
  details.push({
    category: 'Study & Experience',
    score: studyScore,
    maxScore: 25,
    notes: [
      `Selected Field: ${data.selectedField}`,
      `Prior Study: ${
        data.hasRelatedStudy ? `${data.priorStudyDetails} (+15 points)` : 'None'
      }`,
      `Work Experience: ${
        data.hasWorkExperience
          ? `${data.workExperienceYears} years (+${Math.min(
              data.workExperienceYears * 2,
              10
            )} points)`
          : 'None'
      }`,
    ],
    explanation:
      'Points awarded for relevant academic and professional background',
    improvement:
      studyScore < 25
        ? [
            'Document all relevant work experience',
            'Include professional certifications',
            'Provide detailed job descriptions for relevant roles',
          ]
        : undefined,
  });

  // 4. English Proficiency (max 20 points)
  let englishScore = 0;
  const requiredLevel = ACADEMIC_LEVELS[data.intendedStudy];

  if (data.englishProficiency === 'NATIVE') {
    englishScore = 20;
  } else {
    const numericScore = parseFloat(data.englishTestScore);
    if (!isNaN(numericScore)) {
      switch (data.englishProficiency) {
        case 'IELTS':
          englishScore =
            numericScore >= requiredLevel?.requiredIELTS + 1
              ? 20
              : numericScore >= requiredLevel?.requiredIELTS
              ? 15
              : numericScore >= requiredLevel?.requiredIELTS - 0.5
              ? 10
              : 5;
          break;
        case 'TOEFL':
          englishScore =
            numericScore >= requiredLevel?.requiredTOEFL + 10
              ? 20
              : numericScore >= requiredLevel?.requiredTOEFL
              ? 15
              : numericScore >= requiredLevel?.requiredTOEFL - 5
              ? 10
              : 5;
          break;
        case 'PTE':
          englishScore =
            numericScore >= requiredLevel?.requiredPTE + 10
              ? 20
              : numericScore >= requiredLevel?.requiredPTE
              ? 15
              : numericScore >= requiredLevel?.requiredPTE - 5
              ? 10
              : 5;
          break;
      }
    }
  }

  score += englishScore;
  details.push({
    category: 'English Proficiency',
    score: englishScore,
    maxScore: 20,
    notes: [
      `Test Type: ${data.englishProficiency}`,
      `Score: ${data.englishTestScore}`,
      `Required Level: IELTS ${requiredLevel?.requiredIELTS} or equivalent`,
      `Status: ${
        englishScore === 20 ? 'Exceeds' : englishScore >= 15 ? 'Meets' : 'Below'
      } requirements`,
    ],
    explanation:
      'Points based on English language proficiency relative to course requirements',
    improvement:
      englishScore < 20
        ? [
            `Aim for IELTS ${requiredLevel?.requiredIELTS + 0.5} or equivalent`,
            'Consider English preparation courses',
            'Practice academic writing and speaking',
          ]
        : undefined,
  });

  // 5. Financial Capacity (max 15 points)
  let financialScore = 0;
  switch (data.financialStatus.toUpperCase()) {
    case 'SUFFICIENT':
      financialScore = 15;
      break;
    case 'SCHOLARSHIP':
      financialScore = 15;
      break;
    case 'LOAN':
      financialScore = 10;
      break;
    case 'PARTIAL':
      financialScore = 5;
      break;
  }

  score += financialScore;
  details.push({
    category: 'Financial Capacity',
    score: financialScore,
    maxScore: 15,
    notes: [
      `Status: ${data.financialStatus}`,
      `Score Impact: +${financialScore} points`,
      'Required: 12 months of living costs + full tuition',
    ],
    explanation: 'Assessment of financial capacity to support study period',
    improvement:
      financialScore < 15
        ? [
            'Provide evidence of liquid assets',
            'Include sponsor documentation if applicable',
            'Show additional financial security',
          ]
        : undefined,
  });

  // 6. Visa Compliance (max 5 points)
  const visaScore = data.healthInsurance ? 5 : 0;
  score += visaScore;
  details.push({
    category: 'Visa Compliance',
    score: visaScore,
    maxScore: 5,
    notes: [
      `Health Insurance: ${data.healthInsurance ? 'Yes (+5 points)' : 'No'}`,
      `Previous Visa History: ${data.previousVisa || 'None'}`,
    ],
    explanation: 'Points for meeting visa requirements and compliance history',
    improvement: !data.healthInsurance
      ? [
          'Obtain OSHC coverage for full study period',
          'Ensure coverage meets minimum requirements',
        ]
      : undefined,
  });

  return {
    score: Math.min(score, 100),
    details,
  };
};

// Tooltip Component
const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [show, setShow] = React.useState(false);
  const timeoutRef = React.useRef<number>();

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => {
          if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
          setShow(true);
        }}
        onMouseLeave={() => {
          timeoutRef.current = window.setTimeout(() => setShow(false), 200);
        }}
        className="inline-flex items-center cursor-help"
      >
        {children}
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Score Detail Section Component
const ScoreDetailSection: React.FC<{ detail: ScoreDetail; index: number }> =
  React.memo(({ detail, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border-t pt-4 first:border-t-0 first:pt-0"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{detail.category}</span>
          <Tooltip content={detail.explanation}>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </Tooltip>
        </div>
        <span className="font-medium">
          {detail.score}/{detail.maxScore}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(detail.score / detail.maxScore) * 100}%` }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-blue-500 h-2 rounded-full"
        />
      </div>

      {detail.notes?.map((note, noteIndex) => (
        <div
          key={noteIndex}
          className="text-sm text-gray-600 flex items-center gap-2 mt-1"
        >
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
          {note}
        </div>
      ))}

      {detail.improvement && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-2 p-3 bg-blue-50 rounded-lg"
        >
          <p className="text-sm font-medium text-blue-800 mb-1">
            How to improve:
          </p>
          <ul className="space-y-1">
            {detail.improvement.map((tip, tipIndex) => (
              <li
                key={tipIndex}
                className="text-sm text-blue-700 flex items-center gap-2"
              >
                <Info className="w-4 h-4 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  ));

ScoreDetailSection.displayName = 'ScoreDetailSection';

// Main Results Component
export const Results: React.FC<ResultsProps> = ({ data }) => {
  const { score, details } = React.useMemo(
    () => calculateScoreDetails(data),
    [data]
  );
  const { baseAmount, additionalFunds } = React.useMemo(
    () => getFinancialRequirements(data.countryOfOrigin),
    [data.countryOfOrigin]
  );

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Visa Eligibility Score</h2>
          <div
            className={`flex items-center ${
              score >= 80
                ? 'text-green-500'
                : score >= 60
                ? 'text-yellow-500'
                : 'text-red-500'
            }`}
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            {score >= 80
              ? 'High Chance'
              : score >= 60
              ? 'Moderate Chance'
              : 'Low Chance'}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Overall Score</span>
            <span className="font-semibold">{score}/100 points</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-3 rounded-full ${
                score >= 80
                  ? 'bg-green-500'
                  : score >= 60
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
            />
          </div>
        </div>

        <div className="space-y-6">
          {details.map((detail, index) => (
            <ScoreDetailSection
              key={detail.category}
              detail={detail}
              index={index}
            />
          ))}
        </div>
      </motion.div>

      {/* Financial Requirements Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-blue-500" />
          Financial Requirements
        </h3>
        <div className="space-y-4">
          <ul className="space-y-3">
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center text-sm"
            >
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
              Base funds: AUD {baseAmount.toLocaleString()}
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center text-sm"
            >
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
              Living costs: AUD {additionalFunds.toLocaleString()} per year
            </motion.li>
          </ul>
        </div>
      </motion.div>

      {/* Start New Assessment Button */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="w-5 h-5" />
          Start New Assessment
        </motion.button>
      </motion.div>
    </div>
  );
};
