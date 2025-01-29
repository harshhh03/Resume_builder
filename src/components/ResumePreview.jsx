import React from 'react';
import { templates } from './templates';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export function ResumePreview({ templateId = 1, resumeData }) {
  const previewRef = React.useRef(null);
  const selectedTemplate = templates.find(t => t.id === templateId) || templates[0];
  const Template = selectedTemplate?.component;

  const downloadPDF = async () => {
    if (!previewRef.current) return;

    try {
      const dataUrl = await toPng(previewRef.current, { quality: 1 });
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (!Template || !resumeData) return null;

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="mb-4 flex justify-end">
        <button
          onClick={downloadPDF}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Download PDF
        </button>
      </div>
      <div ref={previewRef} className="bg-white shadow-lg">
        <Template data={resumeData} />
      </div>
    </div>
  );
}