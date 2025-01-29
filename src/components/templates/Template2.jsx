import React from 'react';
import { format } from 'date-fns';

export default function Template2({ data }) {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="max-w-[21cm] mx-auto bg-white shadow-lg">
      {/* Modern Header with Background */}
      <div className="bg-blue-600 text-white p-8">
        <h1 className="text-4xl font-bold">{personalInfo.fullName}</h1>
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex items-center">
            <i className="fas fa-envelope mr-2"></i>
            {personalInfo.email}
          </div>
          <div className="flex items-center">
            <i className="fas fa-phone mr-2"></i>
            {personalInfo.phone}
          </div>
          <div className="flex items-center">
            <i className="fas fa-map-marker-alt mr-2"></i>
            {personalInfo.location}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">About Me</h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Experience</h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-gray-800">{exp.position}</h3>
                    <span className="text-gray-600 text-sm">
                      {format(new Date(exp.startDate), 'MMM yyyy')} - 
                      {exp.endDate ? format(new Date(exp.endDate), 'MMM yyyy') : 'Present'}
                    </span>
                  </div>
                  <p className="text-blue-600 font-medium">{exp.company}</p>
                  <p className="text-gray-700 mt-2">{exp.description}</p>
                  {exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      {exp.achievements.map((achievement, i) => (
                        achievement && <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Education</h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                  <p className="text-blue-600">{edu.institution}</p>
                  <p className="text-gray-600">{edu.field}</p>
                  <p className="text-gray-600 text-sm">
                    {format(new Date(edu.graduationDate), 'yyyy')}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}