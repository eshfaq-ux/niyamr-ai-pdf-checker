const { extractPdfText } = require('../utils/pdfExtract');
const { checkRuleWithLLM } = require('../utils/llmCheck');

const checkDocument = async (req, res) => {
  try {
    // Validate inputs
    if (!req.file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const rules = JSON.parse(req.body.rules || '[]');
    if (!Array.isArray(rules) || rules.length !== 3) {
      return res.status(400).json({ error: 'Exactly 3 rules are required' });
    }

    // Extract PDF text
    const pdfText = await extractPdfText(req.file.buffer);
    
    // Check each rule with LLM
    const results = await Promise.all(
      rules.map(rule => checkRuleWithLLM(rule, pdfText))
    );

    res.json(results);
  } catch (error) {
    console.error('Error processing document:', error);
    res.status(500).json({ error: 'Failed to process document' });
  }
};

module.exports = { checkDocument };
