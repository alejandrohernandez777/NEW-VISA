import React, { useState } from 'react';
import { StudyLevel, studyFields, pointsSystem } from '../utils/studyLevels';

interface StudyAssessmentProps {
  onPointsCalculated: (points: number) => void;
}

export const StudyAssessment: React.FC<StudyAssessmentProps> = ({
  onPointsCalculated,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<StudyLevel | ''>('');
  const [selectedField, setSelectedField] = useState<string>('');
  const [hasRelatedStudy, setHasRelatedStudy] = useState<boolean | null>(null);
  const [priorStudyDetails, setPriorStudyDetails] = useState<string>('');

  const calculatePoints = () => {
    if (!selectedLevel || !selectedField) return 0;

    let points = pointsSystem.basePoints[selectedLevel];

    if (hasRelatedStudy) {
      points += pointsSystem.relatedStudyBonus;
    } else {
      points += pointsSystem.noRelatedStudyPenalty;
    }

    return points;
  };

  const handleSubmit = () => {
    const totalPoints = calculatePoints();
    onPointsCalculated(totalPoints);
  };

  return (
    <div className="study-assessment">
      {/* Intended Study Level */}
      <div className="form-group">
        <label>What level do you intend to study?</label>
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value as StudyLevel)}
        >
          <option value="">Select a level</option>
          {Object.values(StudyLevel).map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Study Field */}
      <div className="form-group">
        <label>What field do you intend to study?</label>
        <select
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
        >
          <option value="">Select a field</option>
          {Object.entries(studyFields).map(([key, field]) => (
            <option key={key} value={key}>
              {field.name}
            </option>
          ))}
        </select>
      </div>

      {/* Related Study Question */}
      {selectedField && (
        <div className="form-group">
          <label>
            Have you previously studied any of the following related fields?
            <ul className="related-fields">
              {studyFields[selectedField]?.relatedFields.map((field) => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          </label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="relatedStudy"
                checked={hasRelatedStudy === true}
                onChange={() => setHasRelatedStudy(true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="relatedStudy"
                checked={hasRelatedStudy === false}
                onChange={() => setHasRelatedStudy(false)}
              />
              No
            </label>
          </div>
        </div>
      )}

      {/* Prior Study Details */}
      {hasRelatedStudy && (
        <div className="form-group">
          <label>Please provide details of your related studies:</label>
          <textarea
            value={priorStudyDetails}
            onChange={(e) => setPriorStudyDetails(e.target.value)}
            placeholder="Include qualification name, institution, and year of completion"
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!selectedLevel || !selectedField || hasRelatedStudy === null}
      >
        Calculate Points
      </button>
    </div>
  );
};
