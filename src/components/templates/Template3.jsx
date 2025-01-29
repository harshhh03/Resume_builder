import React from 'react';
import { format } from 'date-fns';

export default function Template3({ data }) {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="max-w-[21cm] mx-auto bg-white shadow-lg">
      {/* Creative Header with Gradient */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-10">
        <h1 className="text-5xl font-bold mb-4">{personalInfo.fullName}</h1>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p>{personalInfo.email}</p>
            <p>{personalInfo.phone}</p>
          </div>
          <div className="text-right">
            <p>{personalInfo.location}</p>
            {personalInfo.linkedIn && (
              <a href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer">
                LinkedIn Profile
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-10">
        {/* Summary with Creative Border */}
        <div className="mb-8 border-l-4 border-purple-500 pl-4">
          <h2 className="text-2xl font-bold text-purple-600 mb-3">Profile</h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>

        {/* Experience with Timeline Design */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-600 mb-6">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-purple-200">
                <div className="absolute left-0 top-0 w-2 h-2 bg-purple-500 rounded-full -translate-x-[3px]"></div>
                <div className="mb-1">
                  <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                  <p className="text-purple-600">{exp.company}</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(exp.startDate), 'MMM yyyy')} - 
                    {exp.endDate ? format(new Date(exp.endDate), 'MMM yyyy') : 'Present'}
                  </p>
                </div>
                <p className="text-gray-700 mt-2">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      achievement && (
                        <li key={i} className="text-gray-700 flex items-center">
                          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                          {achievement}
                        </li>
                      )
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout for Education and Skills */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-purple-600">{edu.institution}</p>
                <p className="text-gray-700">{edu.field}</p>
                <p className="text-sm text-gray-600">
                  {format(new Date(edu.graduationDate), 'yyyy')}
                </p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
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