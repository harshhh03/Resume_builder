import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { databases, RESUME_DATABASE_ID, RESUME_COLLECTION_ID } from '../lib/appwrite';
import { ID } from 'appwrite';
import { useAuth } from '../hooks/useAuth';
import { TemplateSelector } from '../components/TemplateSelector';
import { ResumePreview } from '../components/ResumePreview';
import { AIFeedback } from '../components/AIFeedback';

export function ResumeEditor() {
  const { id } = useParams();
  const { user } = useAuth();
  console.log(user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isNewResume = !id;
  const [selectedTemplate, setSelectedTemplate] = useState(1); // Default to first template
  const [showAIFeedback, setShowAIFeedback] = useState(false);

  const { data: resume, isLoading } = useQuery({
    queryKey: ['resume', id],
    queryFn: async () => {
      if (isNewResume) return null;
      const response = await databases.getDocument(
        RESUME_DATABASE_ID,
        RESUME_COLLECTION_ID,
        id
      );
      return response;
    },
    enabled: !isNewResume,
  });

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: resume?.content || {
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedIn: '',
        website: '',
      },
      summary: '',
      experience: [{
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        achievements: [''],
      }],
      education: [{
        institution: '',
        degree: '',
        field: '',
        graduationDate: '',
      }],
      skills: [],
    },
  });

  const formData = watch(); // Get current form values for preview

  const saveResume = useMutation({
    mutationFn: async (data) => {
      const resumeData = {
        userId: user?.$id,
        title: data.personalInfo.fullName + "'s Resume",
        content: data,
        templateId: selectedTemplate,
        atsScore: calculateATSScore(data),
        isFavorite: false,
      };

      if (isNewResume) {
        return await databases.createDocument(
          RESUME_DATABASE_ID,
          RESUME_COLLECTION_ID,
          ID.unique(),
          resumeData
        );
      } else {
        return await databases.updateDocument(
          RESUME_DATABASE_ID,
          RESUME_COLLECTION_ID,
          id,
          resumeData
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      navigate('/dashboard');
    },
  });

  const calculateATSScore = (data) => {
    let score = 0;
    const maxScore = 100;
    
    // Personal Info completeness (20 points)
    const personalInfoFields = Object.values(data.personalInfo).filter(Boolean).length;
    score += (personalInfoFields / 6) * 20;
    
    // Summary length and quality (15 points)
    if (data.summary) {
      const words = data.summary.split(' ').length;
      score += Math.min((words / 100) * 15, 15);
    }
    
    // Experience details (30 points)
    const experienceScore = data.experience.reduce((acc, exp) => {
      let expScore = 0;
      if (exp.company && exp.position) expScore += 5;
      if (exp.description) expScore += 5;
      if (exp.achievements.filter(Boolean).length > 0) expScore += 5;
      return acc + expScore;
    }, 0);
    score += Math.min(experienceScore, 30);
    
    // Education completeness (20 points)
    const educationScore = data.education.reduce((acc, edu) => {
      let eduScore = 0;
      if (edu.institution && edu.degree) eduScore += 10;
      if (edu.field && edu.graduationDate) eduScore += 10;
      return acc + eduScore;
    }, 0);
    score += Math.min(educationScore, 20);
    
    // Skills (15 points)
    if (data.skills.length > 0) {
      score += Math.min((data.skills.length / 10) * 15, 15);
    }
    
    return Math.round(Math.min(score, maxScore));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit(saveResume.mutate)} className="space-y-6">
            {/* Template Selection */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Choose Template</h2>
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelect={setSelectedTemplate}
              />
            </div>

            {/* Personal Information */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    {...register('personalInfo.fullName', { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    {...register('personalInfo.email', { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    {...register('personalInfo.phone', { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    {...register('personalInfo.location', { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Professional Summary</h2>
              <textarea
                {...register('summary', { required: true })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowAIFeedback(true)}
                className="btn-secondary"
              >
                Get AI Feedback
              </button>
              <button
                type="submit"
                disabled={saveResume.isPending}
                className="btn-primary"
              >
                {saveResume.isPending ? 'Saving...' : 'Save Resume'}
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="sticky top-8">
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Preview</h2>
            <ResumePreview
              templateId={selectedTemplate}
              resumeData={formData}
            />
          </div>
        </div>
      </div>

      {/* AI Feedback Modal */}
      {showAIFeedback && (
        <AIFeedback
          resumeData={formData}
          onClose={() => setShowAIFeedback(false)}
        />
      )}
    </div>
  );
}