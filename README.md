# 🧠 Bester (Brain Tester)

**An intelligent quiz application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that leverages AI to generate multiple-choice questions from uploaded documents (PDFs, images, etc.). The platform offers a personalized learning experience by allowing users to specify the number of questions, evaluate their answers, and receive AI-generated feedback and suggestions based on their performance.**


##  Features
 - 📄 **Document Upload**: Upload PDFs or images containing learning content.
 - 🤖 **AI-Powered Question Extraction**: Automatically extract text and generate relevant quiz questions using an AI model.
 -  🔢 **Custom Question Count**: Users decide how many questions they want in a quiz session.
- 🎯 **Interactive Quiz Engine**:
  - Track correct and incorrect answers in real-time.
  - Visual cues (green/red cards) for correct and incorrect responses.
- 🧠 **AI Feedback**: Get personalized performance reviews and suggestions powered by AI.
- 🔐 **User Authentication**: Register and log in to save quizzes and track progress.
- 📊 **Performance Tracking**: Store quiz scores, questions, and feedback for each user.


## 🛠️ Tech Stack
  ### Frontend
  - HTML
  - CSS
  - React.js
  - Axios
  - Tailwind CSS
  - React Router DOM

## Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- Multer (file upload)
- JWT (authentication)
- OpenAI API (question and feedback generation)
- Tesseract.js or Google Cloud Vision (OCR for images)

### Additional Services
- Cloudinary (document uploads)
- Dotenv for environment variables


## 🧪 Getting Started Locally

### Prerequisites
- Node.js
- MongoDB
- Cloudinary credentials
- OpenAI API key

### Clone the Repository

```bash
git clone https://github.com/yourusername/Bester.git
cd Bester
```

## Install Dependencies

#### **Backend**
```bash
cd server
npm install
```

#### **Frontend**

```bash
cd client
npm install
```

## Run the App

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd client
npm start
```

## 📌 Roadmap

-  User authentication system
-  File upload and OCR integration
-  AI question generation
-  Quiz engine with visual feedback
- Performance review & AI suggestions
-  Dashboard for quiz history
-  Deployment (Vercel + MongoDB Atlas)


## Contributing

**Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change or add.**

## 📝 License
This project is licensed under the MIT License.