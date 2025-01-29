import React from 'react';
import { format } from 'date-fns';

export default function Template1({ data }) {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="max-w-[21cm] mx-auto bg-white p-8 shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{personalInfo.fullName}</h1>
        <div className="text-gray-600 mt-2">
          <p>{personalInfo.email} | {personalInfo.phone}</p>
          <p>{personalInfo.location}</p>
          {personalInfo.linkedIn && (
            <p className="text-blue-600">
              <a href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer">
                LinkedIn Profile
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 mb-3">
          Professional Experience
        </h2>
        {experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800">{exp.position}</h3>
                <p className="text-gray-600">{exp.company}</p>
              </div>
              <p className="text-gray-600 text-sm">
                {format(new Date(exp.startDate), 'MMM yyyy')} - 
                {exp.endDate ? format(new Date(exp.endDate), 'MMM yyyy') : 'Present'}
              </p>
            </div>
            <p className="text-gray-700 mt-2">{exp.description}</p>
            {exp.achievements.length > 0 && (
              <ul className="list-disc list-inside mt-2">
                {exp.achievements.map((achievement, i) => (
                  achievement && <li key={i} className="text-gray-700">{achievement}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 mb-3">
          Education
        </h2>
        {education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800">{edu.degree} in {edu.field}</h3>
                <p className="text-gray-600">{edu.institution}</p>
              </div>
              <p className="text-gray-600 text-sm">
                {format(new Date(edu.graduationDate), 'yyyy')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 mb-3">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}