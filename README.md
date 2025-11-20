# NIYAMR AI - PDF Rule Checker

A  full-stack web application that uploads PDFs and checks them against user-defined rules using AI.

## 🚀 Features

- **PDF Upload & Analysis** - Upload PDF documents (2-10 pages)
- **Custom Rule Definition** - Define 3 natural language rules to check
- **AI-Powered Analysis** - Uses OpenAI GPT-4o-mini for intelligent document analysis
- **Structured Results** - Get pass/fail status, evidence, reasoning, and confidence scores
- **Premium Dark UI** - Modern, responsive interface with smooth animations
- **Real-time Feedback** - Loading states, progress indicators, and visual feedback

## 📁 Project Structure

```
niyamr-assignment/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx          # Main application component
│   │   ├── index.css        # Premium dark theme styles
│   │   └── main.jsx         # React entry point
│   ├── index.html           # HTML template
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
├── backend/                 # Node.js + Express backend
│   ├── controllers/
│   │   └── checkController.js # Main API logic
│   ├── utils/
│   │   ├── pdfExtract.js    # PDF text extraction
│   │   └── llmCheck.js      # OpenAI integration
│   ├── server.js            # Express server setup
│   ├── package.json         # Backend dependencies
│   └── .env.example         # Environment template
└── README.md               # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- OpenAI API key

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Add your OpenAI API key to `.env`:
```
OPENAI_API_KEY=your_openai_key_here
PORT=3001
```

5. Start backend server:
```bash
npm start
```
Backend runs on http://localhost:3001

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```
Frontend runs on http://localhost:5173

## 🎯 Usage

1. **Open Application** - Navigate to http://localhost:5173
2. **Upload PDF** - Click the upload area and select a PDF file (2-10 pages)
3. **Define Rules** - Enter 3 natural language rules in the input fields
4. **Analyze Document** - Click "Check Document" to start AI analysis
5. **View Results** - Review pass/fail status, evidence, reasoning, and confidence scores

### Example Rules
- "Document must mention who is responsible"
- "Document must list any requirements"
- "Document must have a purpose section"
- "Document must mention at least one date"
- "Document must define at least one term"

## 📊 API Example

**POST** `/check`

**Request:**
```bash
curl -X POST http://localhost:3001/check \
  -F "pdf=@document.pdf" \
  -F "rules=[\"Document must mention a date\", \"Must contain contact info\", \"Should have conclusion\"]"
```

**Response:**
```json
[
  {
    "rule": "Document must mention a date",
    "status": "pass",
    "evidence": "Published 2024",
    "reasoning": "Document includes a publication year",
    "confidence": 95
  },
  {
    "rule": "Must contain contact info",
    "status": "fail",
    "evidence": "No contact information found",
    "reasoning": "Document lacks email, phone, or address details",
    "confidence": 88
  },
  {
    "rule": "Should have conclusion",
    "status": "pass",
    "evidence": "Section 5: Conclusion summarizes key findings",
    "reasoning": "Document has a dedicated conclusion section",
    "confidence": 92
  }
]
```

## 🎨 UI Features

- **Premium Dark Theme** - Modern black theme with gradient accents
- **Smooth Animations** - Fade-in effects, hover states, and loading spinners
- **Responsive Design** - Works on desktop and mobile devices
- **Visual Feedback** - Progress indicators, file upload confirmation, and status badges
- **Auto-scroll** - Automatically focuses on results when analysis starts

## 🔧 Tech Stack

**Frontend:**
- React 18
- Vite
- Axios for API calls
- CSS3 with animations and gradients

**Backend:**
- Node.js
- Express.js
- Multer for file uploads
- pdf-parse for text extraction
- OpenAI API for AI analysis

## 🚀 Deployment

**Frontend:**
```bash
cd frontend
npm run build
# Deploy dist/ folder to your hosting service
```

**Backend:**
```bash
cd backend
# Deploy to your Node.js hosting service
# Ensure environment variables are set
```

## 📝 Environment Variables

Create `.env` file in backend directory:

```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
```

## 🔍 Troubleshooting

**Common Issues:**

1. **API Key Issues** - Ensure OpenAI API key is valid and has sufficient credits
2. **CORS Errors** - Backend includes CORS middleware for cross-origin requests
3. **PDF Upload Fails** - Check file size (max 10MB) and ensure it's a valid PDF
4. **Rate Limits** - OpenAI free tier has usage limits, consider upgrading for production

## 📄 License

This project is for demonstration purposes as part of the NIYAMR AI assignment.

## 🤝 Contributing

This is an assignment project. For questions or improvements, please contact the development team.

---

**Built with ❤️ for NIYAMR **
