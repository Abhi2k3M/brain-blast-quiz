
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface QuestionProps {
  question: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  };
  onAnswer: (selectedAnswer: number) => void;
  questionNumber: number;
}

const Question = ({ question, onAnswer, questionNumber }: QuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    console.log('Question changed, resetting state for question:', questionNumber);
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, [question.id, questionNumber]);

  const handleAnswerClick = (answerIndex: number) => {
    if (showFeedback) return;

    console.log('Answer clicked:', answerIndex);
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    onAnswer(answerIndex);
  };

  const getButtonStyle = (index: number) => {
    if (!showFeedback) {
      return "bg-white hover:bg-blue-50 text-gray-700 border-gray-200 hover:border-blue-300 transform transition-all duration-200 hover:scale-[1.02]";
    }

    if (index === question.correctAnswer) {
      return "bg-green-100 text-green-800 border-green-300";
    }

    if (index === selectedAnswer && index !== question.correctAnswer) {
      return "bg-red-100 text-red-800 border-red-300";
    }

    return "bg-gray-100 text-gray-500 border-gray-200";
  };

  const getIcon = (index: number) => {
    if (!showFeedback) return null;

    if (index === question.correctAnswer) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }

    if (index === selectedAnswer && index !== question.correctAnswer) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }

    return null;
  };

  return (
    <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0 animate-fade-in">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-800 leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswerClick(index)}
            variant="outline"
            className={`w-full p-4 h-auto text-left justify-start text-wrap ${getButtonStyle(index)}`}
            disabled={showFeedback}
          >
            <div className="flex items-center justify-between w-full">
              <span className="flex-1 text-left">{option}</span>
              {getIcon(index)}
            </div>
          </Button>
        ))}

        {showFeedback && question.explanation && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 animate-fade-in">
            <p className="text-sm text-blue-800">
              <strong>Explanation:</strong> {question.explanation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Question;
