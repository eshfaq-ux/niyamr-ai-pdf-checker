const pdf = require('pdf-parse');

const extractPdfText = async (pdfBuffer) => {
  try {
    const data = await pdf(pdfBuffer);
    return data.text;
  } catch (error) {
    throw new Error('Failed to extract text from PDF: ' + error.message);
  }
};

module.exports = { extractPdfText };
