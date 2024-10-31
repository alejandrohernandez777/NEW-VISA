import React from 'react';
import type { StepProps } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Briefcase, Languages, History, HelpCircle } from 'lucide-react';
import { studyFields } from '../utils/studyFields';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
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
            className="absolute z-10 w-64 p-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -right-2 top-full mt-1"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FormField: React.FC<{
  label: string;
  icon: React.ReactNode;
  tooltip?: string;
  children: React.ReactNode;
}> = ({ label, icon, tooltip, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-2"
  >
    <div className="flex items-center justify-between">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        {icon}
        {label}
      </label>
      {tooltip && (
        <Tooltip content={tooltip}>
          <HelpCircle className="w-4 h-4 text-gray-400" />
        </Tooltip>
      )}
    </div>
    {children}
  </motion.div>
);

export function FormStep2({ data, updateFields }: StepProps) {
  const handleWorkExperienceChange = (value: boolean) => {
    updateFields({ hasWorkExperience: value });
    if (!value) {
      updateFields({ workExperienceYears: 0 });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <FormField
        label="Intended Program"
        icon={<Book className="w-4 h-4 text-blue-500" />}
        tooltip="Select the level of study you plan to undertake"
      >
        <motion.select
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          value={data.intendedStudy}
          onChange={(e) => updateFields({ intendedStudy: e.target.value })}
          className="form-select w-full"
        >
          <option value="">Select a program</option>
          <option value="Certificate">Certificate</option>
          <option value="Diploma">Diploma</option>
          <option value="Advanced Diploma">Advanced Diploma</option>
          <option value="Bachelor">Bachelor's Degree</option>
          <option value="Master">Master's Degree</option>
          <option value="PhD">PhD</option>
        </motion.select>
      </FormField>

      <FormField
        label="Field of Study"
        icon={<Book className="w-4 h-4 text-blue-500" />}
        tooltip="Choose your intended area of study"
      >
        <motion.select
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          value={data.selectedField}
          onChange={(e) => updateFields({ selectedField: e.target.value })}
          className="form-select w-full"
        >
          <option value="">Select a field</option>
          {Object.entries(studyFields).map(([key, field]) => (
            <option key={key} value={key}>
              {field.name}
            </option>
          ))}
        </motion.select>

        {data.selectedField && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-700"
          >
            {studyFields[data.selectedField].description}
          </motion.div>
        )}
      </FormField>

      <FormField
        label="Previous Related Study"
        icon={<Briefcase className="w-4 h-4 text-blue-500" />}
        tooltip="Indicate if you have completed studies in a related field"
      >
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={data.hasRelatedStudy === true}
              onChange={() => updateFields({ hasRelatedStudy: true })}
              className="form-radio"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={data.hasRelatedStudy === false}
              onChange={() => updateFields({ hasRelatedStudy: false })}
              className="form-radio"
            />
            <span className="ml-2">No</span>
          </label>
        </div>

        <AnimatePresence>
          {data.hasRelatedStudy && (
            <motion.textarea
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              value={data.priorStudyDetails}
              onChange={(e) => updateFields({ priorStudyDetails: e.target.value })}
              placeholder="Please describe your previous study experience..."
              className="form-textarea w-full mt-2"
              rows={3}
            />
          )}
        </AnimatePresence>
      </FormField>

      <FormField
        label="Relevant Work Experience"
        icon={<Briefcase className="w-4 h-4 text-blue-500" />}
        tooltip="Indicate if you have work experience related to your intended field of study"
      >
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={data.hasWorkExperience === true}
              onChange={() => handleWorkExperienceChange(true)}
              className="form-radio"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={data.hasWorkExperience === false}
              onChange={() => handleWorkExperienceChange(false)}
              className="form-radio"
            />
            <span className="ml-2">No</span>
          </label>
        </div>

        <AnimatePresence>
          {data.hasWorkExperience && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2"
            >
              <label className="block text-sm text-gray-600">Years of Experience</label>
              <input
                type="number"
                value={data.workExperienceYears || ''}
                onChange={(e) =>
                  updateFields({ workExperienceYears: parseInt(e.target.value) || 0 })
                }
                min="0"
                max="50"
                className="form-input w-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </FormField>

      <FormField
        label="English Proficiency"
        icon={<Languages className="w-4 h-4 text-blue-500" />}
        tooltip="Select your English language qualification"
      >
        <motion.select
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          value={data.englishProficiency}
          onChange={(e) => {
            updateFields({
              englishProficiency: e.target.value,
              englishTestScore: e.target.value === 'NATIVE' ? 'NATIVE' : '',
            });
          }}
          className="form-select w-full"
        >
          <option value="">Select proficiency level</option>
          <option value="NATIVE">Native English Speaker</option>
          <option value="IELTS">IELTS</option>
          <option value="TOEFL">TOEFL</option>
          <option value="PTE">PTE Academic</option>
        </motion.select>

        <AnimatePresence>
          {data.englishProficiency && data.englishProficiency !== 'NATIVE' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2 space-y-2"
            >
              <label className="block text-sm text-gray-600">Test Score</label>
              <input
                type="number"
                step="0.5"
                value={data.englishTestScore || ''}
                onChange={(e) => updateFields({ englishTestScore: e.target.value })}
                className="form-input w-full"
                placeholder={`Enter your ${data.englishProficiency} score`}
              />
              <motion.p className="text-sm text-gray-500">
                {data.englishProficiency === 'IELTS' && 'Score range: 0-9'}
                {data.englishProficiency === 'TOEFL' && 'Score range: 0-120'}
                {data.englishProficiency === 'PTE' && 'Score range: 10-90'}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </FormField>

      <FormField
        label="Previous Visa History"
        icon={<History className="w-4 h-4 text-blue-500" />}
        tooltip="Select your previous Australian visa history"
      >
        <motion.select
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          value={data.previousVisa}
          onChange={(e) => updateFields({ previousVisa: e.target.value })}
          className="form-select w-full"
        >
          <option value="">Select visa history</option>
          <option value="NO_VISA">No previous visa</option>
          <option value="STUDENT_VISA">Previous student visa</option>
          <option value="TOURIST_VISA">Previous tourist visa</option>
          <option value="WORKING_VISA">Previous working visa</option>
          <option value="VISA_REFUSED">Previous visa refused</option>
        </motion.select>
      </FormField>
    </motion.div>
  );
}