import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { databases } from '../lib/appwrite';
import { Query } from 'appwrite';
import { useAuth } from '../hooks/useAuth';
import { format } from 'date-fns';

export function Dashboard() {
  const { user } = useAuth();

  const { data: resumes, isLoading } = useQuery({
    queryKey: ['resumes'],
    queryFn: async () => {
      const response = await databases.listDocuments(
        'resumes',
        'resume_data',
        [Query.equal('userId', user?.$id || '')]
      );
      return response.documents;
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="section-title mb-2">My Resumes</h1>
          <p className="text-gray-600">Manage and track your resume portfolio</p>
        </div>
        <Link
          to="/resume/new"
          className="btn-primary inline-flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Resume
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes?.map((resume) => (
          <div key={resume.$id} className="card p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{resume.title}</h2>
                <p className="text-sm text-gray-500">
                  Updated {format(new Date(resume.$updatedAt), 'MMM d, yyyy')}
                </p>
              </div>
              {resume.isFavorite && (
                <span className="text-yellow-400 text-xl">★</span>
              )}
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                resume.atsScore >= 80 ? 'bg-green-100 text-green-800' :
                resume.atsScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                ATS Score: {resume.atsScore}
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Link
                to={`/resume/${resume.$id}`}
                className="btn-secondary inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit
              </Link>
            </div>
          </div>
        ))}

        {resumes?.length === 0 && (
          <div className="col-span-full card p-12 text-center">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes yet</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first resume</p>
            <Link
              to="/resume/new"
              className="btn-primary inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Resume
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}