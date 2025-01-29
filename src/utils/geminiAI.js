import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getResumeImprovement(resumeData) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      As an ATS expert, analyze this resume data and provide specific improvements to increase the ATS score:
      
      Personal Info: ${JSON.stringify(resumeData.personalInfo)}
      Summary: ${resumeData.summary}
      Experience: ${JSON.stringify(resumeData.experience)}
      Education: ${JSON.stringify(resumeData.education)}
      Skills: ${resumeData.skills.join(', ')}
      
      Please provide:
      1. Specific keyword suggestions for the industry
      2. Improvements for the summary
      3. Better action verbs for experience
      4. Skills that should be added
      5. Overall formatting suggestions
      
      Format the response in clear sections.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    return 'Unable to generate suggestions at this time. Please try again later.';
  }
}