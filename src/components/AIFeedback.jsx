import React from 'react';
import { getResumeImprovement } from '../utils/geminiAI';

export function AIFeedback({ resumeData, onClose }) {
  const [feedback, setFeedback] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function getFeedback() {
      const suggestions = await getResumeImprovement(resumeData);
      setFeedback(suggestions);
      setLoading(false);
    }
    getFeedback();
  }, [resumeData]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">AI Resume Suggestions</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="prose max-w-none">
            {feedback.split('\n').map((line, index) => (
              <p key={index} className="mb-2">{line}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}