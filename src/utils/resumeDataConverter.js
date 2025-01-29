// Serialize resume data for Appwrite storage
export function serializeResumeData(resumeData) {
  return JSON.stringify({
    personalInfo: resumeData.personalInfo || {},
    summary: resumeData.summary || '',
    experience: resumeData.experience || [],
    education: resumeData.education || [],
    skills: resumeData.skills || []
  });
}

// Deserialize resume data from Appwrite
export function deserializeResumeData(storedData) {
  try {
    const parsedData = JSON.parse(storedData);
    return {
      personalInfo: parsedData.personalInfo || {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedIn: '',
        website: ''
      },
      summary: parsedData.summary || '',
      experience: parsedData.experience || [{
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        achievements: ['']
      }],
      education: parsedData.education || [{
        institution: '',
        degree: '',
        field: '',
        graduationDate: ''
      }],
      skills: parsedData.skills || []
    };
  } catch (error) {
    console.error('Error parsing resume data:', error);
    return getDefaultResumeData();
  }
}

// Default resume data structure
export function getDefaultResumeData() {
  return {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      website: ''
    },
    summary: '',
    experience: [{
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      achievements: ['']
    }],
    education: [{
      institution: '',
      degree: '',
      field: '',
      graduationDate: ''
    }],
    skills: []
  };
}