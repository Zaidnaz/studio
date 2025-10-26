# Dilemma Dynamics

![Dilemma Dynamics Hero Image](https://picsum.photos/seed/dilemma-hero/1200/600)

**An interactive, AI-powered game where you debate complex dilemmas with a challenging AI opponent.**

---

Dilemma Dynamics is a web application that challenges your critical thinking and argumentation skills. You are presented with a difficult scenario and must debate the best course of action with an AI player. Can you reach a consensus, or will you agree to disagree?

## ✨ Features

- **Dynamic Dilemma Generation**: Every game starts with a unique, AI-generated dilemma. Choose from **Easy**, **Medium**, or **Hard** difficulty levels.
- **AI Debate Partner**: Engage in a text-based debate with an AI opponent designed to be a thoughtful and challenging conversationalist.
- **AI Expert Consultation**: Feeling stuck? Use the integrated AI Expert tool to ask for strategic insights and get a concise, one-sentence tip to strengthen your argument.
- **Speech-to-Text Input**: Go hands-free! Use your voice to dictate your arguments with the optional speech-to-text feature.
- **Resolution Summary**: Conclude your debate to receive an AI-generated summary of the key arguments and the final outcome.
- **Light & Dark Mode**: Toggle between themes for your preferred viewing experience.
- **Responsive Design**: Play on any device, with a layout that adapts to both desktop and mobile screens.

## 🚀 Getting Started

This project is built with Next.js and can be run locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd dilemma-dynamics
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add your Generative AI API key:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```
5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🎮 How to Play

1.  **Select Difficulty**: Choose 'Easy', 'Medium', or 'Hard' to set the complexity of the dilemma.
2.  **Start Session**: A unique dilemma will be generated for you.
3.  **Debate**: Use the input field (or the microphone) to present your arguments. The AI opponent will respond, building a conversational debate.
4.  **Consult the Expert**: If you need a hint, type a question into the AI Expert tool and receive a strategic insight.
5.  **Resolve**: Once you feel the debate has reached a conclusion, click "Resolve Dilemma" to get a summary of the discussion.
6.  **New Game**: Start over at any time by clicking "New Game".

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Generative AI**: [Google AI & Genkit](https://firebase.google.com/docs/genkit)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Speech Recognition**: Web Speech API
