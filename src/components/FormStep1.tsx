import React from 'react';
import { getDocumentRequirements, countryAssessmentLevels } from '../utils/countryData';
import type { StepProps } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Calendar, GraduationCap, FileText, HelpCircle } from 'lucide-react';

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

export function FormStep1({ data, updateFields }: StepProps) {
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const age = parseInt(value);
    if (!isNaN(age) && age >= 15 && age <= 99) {
      updateFields({ age });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <FormField
        label="Age"
        icon={<Calendar className="w-4 h-4 text-blue-500" />}
        tooltip="You must be at least 15 years old to apply for a student visa"
      >
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <input
            type="number"
            value={data.age || ''}
            onChange={handleAgeChange}
            onBlur={(e) => {
              const value = parseInt(e.target.value);
              if (isNaN(value) || value < 15) {
                updateFields({ age: 15 });
              } else if (value > 99) {
                updateFields({ age: 99 });
              }
            }}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
            min="15"
            max="99"
            placeholder="Enter your age"
          />
        </motion.div>
        {data.age > 0 && (data.age < 15 || data.age > 99) && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1 text-sm text-red-500"
          >
            Age must be between 15 and 99 years
          </motion.p>
        )}
      </FormField>

      <FormField
        label="Country of Origin"
        icon={<Globe className="w-4 h-4 text-blue-500" />}
        tooltip="Your country of citizenship affects visa assessment levels"
      >
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <select
            value={data.countryOfOrigin}
            onChange={(e) => updateFields({ countryOfOrigin: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
          >
            <option value="">Select a country</option>
            {Object.entries(countryAssessmentLevels)
              .sort((a, b) => a[1].name.localeCompare(b[1].name))
              .map(([code, { name, level }]) => (
                <option key={code} value={code}>
                  {name} (Assessment Level {level})
                </option>
              ))}
          </select>
        </motion.div>
      </FormField>

      <FormField
        label="Current Education Level"
        icon={<GraduationCap className="w-4 h-4 text-blue-500" />}
        tooltip="Your highest completed level of education"
      >
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <select
            value={data.educationLevel}
            onChange={(e) => updateFields({ educationLevel: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
          >
            <option value="">Select education level</option>
            <option value="HIGH_SCHOOL">High School</option>
            <option value="BACHELORS">Bachelor's Degree</option>
            <option value="MASTERS">Master's Degree</option>
            <option value="PHD">PhD</option>
          </select>
        </motion.div>
      </FormField>

      {data.countryOfOrigin && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-sm"
        >
          <h4 className="flex items-center gap-2 text-sm font-medium text-blue-800 mb-4">
            <FileText className="w-4 h-4" />
            Required Documents for {countryAssessmentLevels[data.countryOfOrigin]?.name}
          </h4>
          <motion.ul className="space-y-3">
            {getDocumentRequirements(data.countryOfOrigin).map((req, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 text-sm text-blue-700"
              >
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                <span className="flex-1">{req}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </motion.div>
  );
}