import React from 'react';
import type { StepProps } from '../types';
import { motion } from 'framer-motion';
import { Shield, DollarSign, HelpCircle } from 'lucide-react';

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
      {show && (
        <div className="absolute z-10 w-64 p-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -right-2 top-full mt-1">
          {content}
        </div>
      )}
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

export function FormStep3({ data, updateFields }: StepProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <FormField
        label="Health Insurance"
        icon={<Shield className="w-4 h-4 text-blue-500" />}
        tooltip="Overseas Student Health Cover (OSHC) is mandatory for international students"
      >
        <div className="space-y-4">
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="healthInsurance"
                checked={data.healthInsurance === true}
                onChange={() => updateFields({ healthInsurance: true })}
                className="form-radio"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="healthInsurance"
                checked={data.healthInsurance === false}
                onChange={() => updateFields({ healthInsurance: false })}
                className="form-radio"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg"
          >
            <p>
              OSHC helps international students meet the costs of medical and hospital
              care they may need while in Australia.
            </p>
          </motion.div>
        </div>
      </FormField>

      <FormField
        label="Financial Status"
        icon={<DollarSign className="w-4 h-4 text-blue-500" />}
        tooltip="Your ability to support yourself during your studies"
      >
        <motion.select
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          value={data.financialStatus || ''}
          onChange={(e) => updateFields({ financialStatus: e.target.value })}
          className="form-select w-full"
        >
          <option value="">Select your financial status</option>
          <option value="SUFFICIENT">Sufficient funds available</option>
          <option value="SCHOLARSHIP">Full scholarship</option>
          <option value="LOAN">Education loan approved</option>
          <option value="PARTIAL">Partial funds available</option>
        </motion.select>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg"
        >
          <h4 className="text-sm font-medium text-blue-800 mb-2">
            Financial Requirements
          </h4>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              Living costs: Approximately AUD 21,041 per year
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              Course fees: Vary by institution and program
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              Travel costs: Approximately AUD 2,000-4,000
            </li>
          </ul>
        </motion.div>
      </FormField>
    </motion.div>
  );
}