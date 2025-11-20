require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const checkRuleWithLLM = async (rule, pdfText) => {
  try {
    const prompt = `You are an AI that checks if a document meets a rule.

Rule: ${rule}
PDF Text: ${pdfText}

Respond ONLY in the following JSON format:
{
  "rule": "...",
  "status": "pass" or "fail",
  "evidence": "...",
  "reasoning": "...",
  "confidence": number
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 500
    });

    const content = response.choices[0].message.content.trim();
    
    // Parse JSON response
    const result = JSON.parse(content);
    
    // Validate required fields
    if (!result.rule || !result.status || !result.evidence || !result.reasoning || typeof result.confidence !== 'number') {
      throw new Error('Invalid LLM response format');
    }

    // Convert confidence to 0-100 scale if it's a decimal
    if (result.confidence <= 1) {
      result.confidence = Math.round(result.confidence * 100);
    }

    return result;
  } catch (error) {
    console.error('LLM check error:', error);
    // Return fallback response
    return {
      rule: rule,
      status: "fail",
      evidence: "Unable to analyze",
      reasoning: "Error occurred during analysis",
      confidence: 0
    };
  }
};

module.exports = { checkRuleWithLLM };
