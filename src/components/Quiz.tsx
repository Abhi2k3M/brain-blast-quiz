
import { useState } from "react";
import Question from "./Question";
import Results from "./Results";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, History, School } from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  category: string;
}

const quizData: Record<string, QuizQuestion[]> = {
  science: [
    {
      id: 1,
      question: "Who is known as the father of the Indian Space Program?",
      options: ["Dr. APJ Abdul Kalam", "Dr. Vikram Sarabhai", "Dr. CV Raman", "Dr. Homi Bhabha"],
      correctAnswer: 1,
      explanation: "Dr. Vikram Sarabhai is widely regarded as the father of the Indian Space Program and founded ISRO.",
      category: "science"
    },
    {
      id: 2,
      question: "Which Indian scientist won the Nobel Prize in Physics in 1930?",
      options: ["Dr. Homi Bhabha", "Dr. CV Raman", "Dr. Satyendra Nath Bose", "Dr. Meghnad Saha"],
      correctAnswer: 1,
      explanation: "Dr. CV Raman won the Nobel Prize in Physics in 1930 for his work on the scattering of light (Raman Effect).",
      category: "science"
    },
    {
      id: 3,
      question: "What is the largest organ in the human body?",
      options: ["Liver", "Brain", "Skin", "Lungs"],
      correctAnswer: 2,
      explanation: "The skin is the largest organ in the human body, covering the entire surface.",
      category: "science"
    },
    {
      id: 4,
      question: "Which gas makes up about 78% of Earth's atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"],
      correctAnswer: 1,
      explanation: "Nitrogen makes up approximately 78% of Earth's atmosphere.",
      category: "science"
    },
    {
      id: 5,
      question: "What is the chemical formula for water?",
      options: ["CO2", "H2O", "O2", "CH4"],
      correctAnswer: 1,
      explanation: "Water's chemical formula is H2O, consisting of two hydrogen atoms and one oxygen atom.",
      category: "science"
    }
  ],
  history: [
    {
      id: 6,
      question: "In which year did India gain independence?",
      options: ["1946", "1947", "1948", "1949"],
      correctAnswer: 1,
      explanation: "India gained independence from British rule on August 15, 1947.",
      category: "history"
    },
    {
      id: 7,
      question: "Who was the first Prime Minister of India?",
      options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "Dr. Rajendra Prasad"],
      correctAnswer: 1,
      explanation: "Jawaharlal Nehru was India's first Prime Minister, serving from 1947 to 1964.",
      category: "history"
    },
    {
      id: 8,
      question: "The Quit India Movement was launched in which year?",
      options: ["1940", "1941", "1942", "1943"],
      correctAnswer: 2,
      explanation: "The Quit India Movement was launched by Mahatma Gandhi on August 8, 1942.",
      category: "history"
    },
    {
      id: 9,
      question: "Who built the Red Fort in Delhi?",
      options: ["Akbar", "Shah Jahan", "Aurangzeb", "Humayun"],
      correctAnswer: 1,
      explanation: "The Red Fort was built by Mughal Emperor Shah Jahan in 1648.",
      category: "history"
    },
    {
      id: 10,
      question: "The Battle of Plassey was fought in which year?",
      options: ["1757", "1764", "1761", "1767"],
      correctAnswer: 0,
      explanation: "The Battle of Plassey was fought on June 23, 1757, marking the beginning of British rule in India.",
      category: "history"
    }
  ],
  gk: [
    {
      id: 11,
      question: "What is the national bird of India?",
      options: ["Eagle", "Peacock", "Parrot", "Crane"],
      correctAnswer: 1,
      explanation: "The Indian Peacock (Pavo cristatus) is the national bird of India.",
      category: "gk"
    },
    {
      id: 12,
      question: "Which is the longest river in India?",
      options: ["Yamuna", "Narmada", "Ganga", "Godavari"],
      correctAnswer: 2,
      explanation: "The Ganga (Ganges) is the longest river in India, flowing for about 2,525 km.",
      category: "gk"
    },
    {
      id: 13,
      question: "What is the currency of India?",
      options: ["Dollar", "Pound", "Rupee", "Euro"],
      correctAnswer: 2,
      explanation: "The Indian Rupee (INR) is the official currency of India.",
      category: "gk"
    },
    {
      id: 14,
      question: "Which state is known as the 'Land of Five Rivers'?",
      options: ["Haryana", "Punjab", "Rajasthan", "Gujarat"],
      correctAnswer: 1,
      explanation: "Punjab is known as the 'Land of Five Rivers' referring to the five rivers: Sutlej, Beas, Ravi, Chenab, and Jhelum.",
      category: "gk"
    },
    {
      id: 15,
      question: "What is the capital of Maharashtra?",
      options: ["Pune", "Nagpur", "Mumbai", "Nashik"],
      correctAnswer: 2,
      explanation: "Mumbai is the capital city of Maharashtra and the financial capital of India.",
      category: "gk"
    }
  ]
};

const categoryInfo = {
  science: {
    name: "Science",
    icon: School,
    description: "Test your knowledge of scientific concepts and famous Indian scientists",
    color: "from-blue-500 to-cyan-500"
  },
  history: {
    name: "History",
    icon: History,
    description: "Explore India's rich historical heritage and important events",
    color: "from-amber-500 to-orange-500"
  },
  gk: {
    name: "General Knowledge",
    icon: Book,
    description: "Test your knowledge about India's geography, culture, and current affairs",
    color: "from-green-500 to-emerald-500"
  }
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [answers, setAnswers] = useState<number[]>([]);

  const currentQuizData = selectedCategory ? quizData[selectedCategory] : [];

  const handleAnswer = (selectedAnswer: number) => {
    console.log('Answer selected:', selectedAnswer, 'for question:', currentQuestion);
    
    // Update answers array
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    console.log('Updated answers:', newAnswers);

    // Update score if correct
    if (selectedAnswer === currentQuizData[currentQuestion].correctAnswer) {
      setScore(prevScore => {
        const newScore = prevScore + 1;
        console.log('Score updated to:', newScore);
        return newScore;
      });
    }

    // Move to next question or show results
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      console.log('Moving to question:', nextQuestion, 'Total questions:', currentQuizData.length);
      
      if (nextQuestion < currentQuizData.length) {
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
    setCategorySelected(false);
    setSelectedCategory("");
    setAnswers([]);
  };

  const selectCategory = (category: string) => {
    console.log('Category selected:', category);
    setSelectedCategory(category);
    setCategorySelected(true);
  };

  const startQuiz = () => {
    console.log('Starting quiz');
    setQuizStarted(true);
  };

  // Category selection screen
  if (!categorySelected) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0 mb-8">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">🧠</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Quiz Category</h2>
              <p className="text-gray-600">
                Select a category to test your knowledge with questions tailored for Indian learners.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(categoryInfo).map(([key, info]) => {
            const IconComponent = info.icon;
            return (
              <Card key={key} className="backdrop-blur-sm bg-white/90 shadow-xl border-0 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                <CardContent className="p-6 text-center" onClick={() => selectCategory(key)}>
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{info.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{info.description}</p>
                  <p className="text-sm text-gray-500">{quizData[key].length} Questions</p>
                  <Button 
                    className={`mt-4 bg-gradient-to-r ${info.color} hover:opacity-90 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200`}
                  >
                    Select Category
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Quiz start screen
  if (!quizStarted) {
    const categoryData = categoryInfo[selectedCategory];
    const IconComponent = categoryData.icon;
    
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${categoryData.color} rounded-full flex items-center justify-center`}>
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{categoryData.name} Quiz</h2>
              <p className="text-gray-600">
                Ready to test your {categoryData.name.toLowerCase()} knowledge? 
                This quiz contains {currentQuizData.length} questions with immediate feedback!
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => setCategorySelected(false)}
                variant="outline"
                className="px-6 py-3"
              >
                Change Category
              </Button>
              <Button 
                onClick={startQuiz} 
                size="lg"
                className={`bg-gradient-to-r ${categoryData.color} hover:opacity-90 text-white px-8 py-3 rounded-xl font-semibold transform transition-all duration-200 hover:scale-105 shadow-lg`}
              >
                Start Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    return <Results score={score} total={currentQuizData.length} onRestart={restartQuiz} questions={currentQuizData} answers={answers} />;
  }

  const progress = ((currentQuestion + 1) / currentQuizData.length) * 100;

  console.log('Rendering question:', currentQuestion, 'Progress:', progress);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            {categoryInfo[selectedCategory].name} - Question {currentQuestion + 1} of {currentQuizData.length}
          </span>
          <span className="text-sm font-medium text-gray-600">
            Score: {score}/{answers.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Question
        question={currentQuizData[currentQuestion]}
        onAnswer={handleAnswer}
        questionNumber={currentQuestion + 1}
      />
    </div>
  );
};

export default Quiz;
