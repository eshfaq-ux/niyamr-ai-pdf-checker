import { useState, useRef } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [rules, setRules] = useState(['', '', '']);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const resultsRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setError('');
    } else {
      setError('Please select a valid PDF file');
      setPdfFile(null);
    }
  };

  const handleRuleChange = (index, value) => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const validateInputs = () => {
    if (!pdfFile) {
      setError('Please upload a PDF file');
      return false;
    }
    
    const filledRules = rules.filter(rule => rule.trim() !== '');
    if (filledRules.length !== 3) {
      setError('Please provide exactly 3 rules');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setError('');
    setResults([]);

    // Scroll to results section
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);

    try {
      const formData = new FormData();
      formData.append('pdf', pdfFile);
      formData.append('rules', JSON.stringify(rules));

      const response = await axios.post(`${API_BASE_URL}/check`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process document');
    } finally {
      setLoading(false);
    }
  };

  const handleFileAreaClick = () => {
    document.getElementById('file-input').click();
  };

  return (
    <div className="container">
      <div className="header">
        <h1>NIYAMR AI Assignment</h1>
        <p>Intelligent PDF Rule Checker</p>
      </div>

      <div className="main-content">
        <div className="upload-section">
          <div className="section-header">
            <h2 className="section-title">Document Analysis</h2>
            <p className="section-subtitle">Upload your PDF and define rules to check</p>
          </div>

          <div 
            className={`file-upload-area ${pdfFile ? 'has-file' : ''}`}
            onClick={handleFileAreaClick}
          >
            <div className="upload-icon">📄</div>
            <div className="upload-text">
              {pdfFile ? 'File selected' : 'Click to upload PDF'}
            </div>
            <div className="upload-text">
              Supports PDF files (2-10 pages)
            </div>
            <input
              id="file-input"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              disabled={loading}
              className="file-input"
            />
          </div>

          {pdfFile && (
            <div className="file-selected">
              <span>✅</span>
              <span>{pdfFile.name}</span>
              <span style={{marginLeft: 'auto', fontSize: '0.8rem', opacity: 0.7}}>
                {(pdfFile.size / 1024 / 1024).toFixed(1)} MB
              </span>
            </div>
          )}

          {loading && (
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          )}

          <div className="rules-section">
            <h3 className="section-title">Rules to Check</h3>
            {rules.map((rule, index) => (
              <div key={index} className="rule-input">
                <label className="rule-label">Rule {index + 1}</label>
                <input
                  type="text"
                  value={rule}
                  onChange={(e) => handleRuleChange(index, e.target.value)}
                  placeholder={`e.g., "Document must mention who is responsible"`}
                  disabled={loading}
                  className={`rule-field ${rule.trim() ? 'filled' : ''}`}
                />
              </div>
            ))}
          </div>

          <button
            className="check-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Checking Document...' : 'Check Document'}
          </button>

          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="results-section" ref={resultsRef}>
          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p className="loading-text">AI is analyzing your document...</p>
              <p style={{fontSize: '0.85rem', opacity: 0.7, marginTop: '0.5rem'}}>
                Processing {rules.filter(r => r.trim()).length} rules
              </p>
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">📊</div>
              <p className="empty-state-text">
                Analysis results will appear here after processing your document
              </p>
            </div>
          )}

          {results.length > 0 && (
            <>
              <div className="results-header">
                <h2 className="results-title">Analysis Results</h2>
              </div>
              
              {results.map((result, index) => (
                <div key={index} className="result-card">
                  <div className="result-header">
                    <span className="rule-text">{result.rule}</span>
                    <span className={`status-badge ${result.status}`}>
                      {result.status}
                    </span>
                  </div>
                  
                  <div className="result-content">
                    <div className="evidence-section">
                      <div className="evidence-label">Evidence</div>
                      <div className="evidence-text">{result.evidence}</div>
                    </div>
                    
                    <div className="reasoning-section">
                      <div className="reasoning-label">Reasoning</div>
                      <div className="reasoning-text">{result.reasoning}</div>
                    </div>
                    
                    <div className="confidence-section">
                      <span className="confidence-label">Confidence</span>
                      <span className="confidence-value">{result.confidence}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
