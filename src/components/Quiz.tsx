
import { useState } from "react";
import Question from "./Question";
import Results from "./Results";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    explanation: "Paris is the capital and largest city of France."
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    explanation: "Mars is called the Red Planet due to iron oxide on its surface."
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
    explanation: "The Pacific Ocean covers about 46% of the world's water surface."
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2,
    explanation: "Leonardo da Vinci painted the Mona Lisa between 1503 and 1519."
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
    explanation: "Au comes from the Latin word 'aurum' meaning gold."
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (selectedAnswer: number) => {
    console.log('Answer selected:', selectedAnswer, 'for question:', currentQuestion);
    
    // Update answers array
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    console.log('Updated answers:', newAnswers);

    // Update score if correct
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(prevScore => {
        const newScore = prevScore + 1;
        console.log('Score updated to:', newScore);
        return newScore;
      });
    }

    // Move to next question or show results
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      console.log('Moving to question:', nextQuestion, 'Total questions:', quizData.length);
      
      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        console.log('Quiz completed, showing results');
        setShowResults(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    console.log('Restarting quiz');
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setQuizStarted(false);
    setAnswers([]);
  };

  const startQuiz = () => {
    console.log('Starting quiz');
    setQuizStarted(true);
  };

  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">🧠</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to Test Your Knowledge?</h2>
              <p className="text-gray-600">
                This quiz contains {quizData.length} questions covering various topics. 
                You'll get immediate feedback after each answer!
              </p>
            </div>
            <Button 
              onClick={startQuiz} 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-semibold transform transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    return <Results score={score} total={quizData.length} onRestart={restartQuiz} questions={quizData} answers={answers} />;
  }

  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  console.log('Rendering question:', currentQuestion, 'Progress:', progress);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestion + 1} of {quizData.length}
          </span>
          <span className="text-sm font-medium text-gray-600">
            Score: {score}/{answers.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Question
        question={quizData[currentQuestion]}
        onAnswer={handleAnswer}
        questionNumber={currentQuestion + 1}
      />
    </div>
  );
};

export default Quiz;
