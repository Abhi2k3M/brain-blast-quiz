
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, CheckCircle, XCircle } from "lucide-react";

interface ResultsProps {
  score: number;
  total: number;
  onRestart: () => void;
  questions: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  }>;
  answers: number[];
}

const Results = ({ score, total, onRestart, questions, answers }: ResultsProps) => {
  const percentage = Math.round((score / total) * 100);
  
  const getScoreMessage = () => {
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 60) return "Good job! 👏";
    if (percentage >= 40) return "Not bad! 💪";
    return "Keep practicing! 📚";
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0 animate-fade-in">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div>
            <div className={`text-5xl font-bold ${getScoreColor()} mb-2`}>
              {score}/{total}
            </div>
            <div className={`text-2xl font-semibold ${getScoreColor()} mb-2`}>
              {percentage}%
            </div>
            <p className="text-xl text-gray-600">{getScoreMessage()}</p>
          </div>

          <Button 
            onClick={onRestart}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-semibold transform transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>

      <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">Review Your Answers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {questions.map((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <div key={question.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-start gap-3 mb-3">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {index + 1}. {question.question}
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Your answer:</span>{" "}
                        <span className={isCorrect ? "text-green-700" : "text-red-700"}>
                          {question.options[userAnswer]}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p>
                          <span className="font-medium">Correct answer:</span>{" "}
                          <span className="text-green-700">
                            {question.options[question.correctAnswer]}
                          </span>
                        </p>
                      )}
                      {question.explanation && (
                        <p className="text-gray-600 mt-2">
                          <span className="font-medium">Explanation:</span> {question.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;
