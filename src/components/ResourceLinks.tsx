import React from 'react';
import { ExternalLink, Book, Languages, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResourceLink {
  title: string;
  description: string;
  url: string;
  category: 'english' | 'study' | 'financial';
}

const resources: ResourceLink[] = [
  {
    title: 'IELTS Practice Tests',
    description: 'Free IELTS practice tests and preparation materials',
    url: 'https://www.ielts.org/for-test-takers/sample-test-questions',
    category: 'english',
  },
  {
    title: 'PTE Academic Resources',
    description: 'Official PTE Academic test preparation resources',
    url: 'https://www.pearsonpte.com/preparation/resources',
    category: 'english',
  },
  {
    title: 'Study in Australia',
    description: 'Official guide for international students',
    url: 'https://www.studyinaustralia.gov.au',
    category: 'study',
  },
  {
    title: 'Australian Education System',
    description: 'Understanding the Australian education framework',
    url: 'https://www.studyinaustralia.gov.au/english/australian-education',
    category: 'study',
  },
  {
    title: 'Financial Requirements Calculator',
    description: 'Calculate your expected study and living costs',
    url: 'https://www.studyinaustralia.gov.au/english/live/living-costs',
    category: 'financial',
  },
];

const ResourceCard: React.FC<{ resource: ResourceLink }> = ({ resource }) => (
  <motion.a
    href={resource.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-start gap-3">
      <div className="mt-1">
        {resource.category === 'english' && (
          <Languages className="w-5 h-5 text-blue-500" />
        )}
        {resource.category === 'study' && (
          <Book className="w-5 h-5 text-green-500" />
        )}
        {resource.category === 'financial' && (
          <DollarSign className="w-5 h-5 text-yellow-500" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900">{resource.title}</h3>
          <ExternalLink className="w-4 h-4 text-gray-400" />
        </div>
        <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
      </div>
    </div>
  </motion.a>
);

export const ResourceLinks: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Useful Resources</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {resources.map((resource) => (
          <ResourceCard key={resource.title} resource={resource} />
        ))}
      </div>
    </div>
  );
};