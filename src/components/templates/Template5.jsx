import React from 'react';
import { format } from 'date-fns';

export default function Template5({ data }) {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="max-w-[21cm] mx-auto bg-white shadow-lg">
      {/* Modern Tech Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-8">
        <h1 className="text-4xl font-bold mb-4">{personalInfo.fullName}</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="flex items-center space-x-2">
              <span>📧</span>
              <span>{personalInfo.email}</span>
            </p>
            <p className="flex items-center space-x-2">
              <span>📱</span>
              <span>{personalInfo.phone}</span>
            </p>
          </div>
          <div>
            <p className="flex items-center space-x-2">
              <span>📍</span>
              <span>{personalInfo.location}</span>
            </p>
            {personalInfo.linkedIn && (
              <p className="flex items-center space-x-2">
                <span>💼</span>
                <a href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer">
                  LinkedIn Profile
                </a>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Tech Summary */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-cyan-600 mb-4">Technical Profile</h2>
          <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
            {summary}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-cyan-600 mb-4">Technical Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Experience with Modern Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-cyan-600 mb-4">Professional Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                    <p className="text-cyan-600 font-medium">{exp.company}</p>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {format(new Date(exp.startDate), 'MMM yyyy')} - 
                    {exp.endDate ? format(new Date(exp.endDate), 'MMM yyyy') : 'Present'}
                  </p>
                </div>
                <p className="text-gray-700 mb-4">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      achievement && (
                        <div key={i} className="flex items-center space-x-2">
                          <span className="text-cyan-500">▹</span>
                          <span className="text-gray-700">{achievement}</span>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-2xl font-bold text-cyan-600 mb-4">Education</h2>
          <div className="grid gap-4">
            {education.map((edu, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-cyan-600">{edu.institution}</p>
                <p className="text-gray-700">{edu.field}</p>
                <p className="text-gray-600 text-sm">
                  {format(new Date(edu.graduationDate), 'yyyy')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}