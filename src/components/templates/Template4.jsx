import React from 'react';
import { format } from 'date-fns';

export default function Template4({ data }) {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="max-w-[21cm] mx-auto bg-white shadow-lg">
      {/* Executive Header */}
      <div className="bg-gray-900 text-white p-8">
        <h1 className="text-4xl font-bold tracking-wide mb-2">{personalInfo.fullName}</h1>
        <div className="grid grid-cols-2 gap-4 text-sm mt-4">
          <div className="space-y-1">
            <p className="flex items-center">
              <span className="w-5 h-5 mr-2">📧</span>
              {personalInfo.email}
            </p>
            <p className="flex items-center">
              <span className="w-5 h-5 mr-2">📱</span>
              {personalInfo.phone}
            </p>
          </div>
          <div className="space-y-1">
            <p className="flex items-center">
              <span className="w-5 h-5 mr-2">📍</span>
              {personalInfo.location}
            </p>
            {personalInfo.linkedIn && (
              <p className="flex items-center">
                <span className="w-5 h-5 mr-2">💼</span>
                <a href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer">
                  LinkedIn Profile
                </a>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Executive Summary */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 mb-4">
            Executive Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>

        {/* Professional Experience */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 mb-4">
            Professional Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                  <p className="text-gray-600 font-semibold">{exp.company}</p>
                </div>
                <p className="text-gray-600">
                  {format(new Date(exp.startDate), 'MMM yyyy')} - 
                  {exp.endDate ? format(new Date(exp.endDate), 'MMM yyyy') : 'Present'}
                </p>
              </div>
              <p className="text-gray-700 mb-2">{exp.description}</p>
              {exp.achievements.length > 0 && (
                <ul className="list-disc list-inside space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    achievement && (
                      <li key={i} className="text-gray-700">{achievement}</li>
                    )
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 mb-4">
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-gray-700">{edu.field}</p>
                <p className="text-gray-600">
                  {format(new Date(edu.graduationDate), 'yyyy')}
                </p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 mb-4">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}