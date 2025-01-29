import React from 'react';
import { templates } from './templates';

export function TemplateSelector({ selectedTemplate, onSelect }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Choose a Template</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              selectedTemplate === template.id
                ? 'border-purple-600 shadow-lg scale-105'
                : 'border-gray-200 hover:border-purple-400'
            }`}
            onClick={() => onSelect(template.id)}
          >
            <img
              src={template.thumbnail}
              alt={template.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-2 text-center">
              <p className="text-sm font-medium text-gray-900">{template.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}