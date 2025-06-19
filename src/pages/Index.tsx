
import Quiz from "@/components/Quiz";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Quiz Master
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your knowledge with our interactive quiz! Answer questions, track your progress, and see how well you perform.
          </p>
        </div>
        <Quiz />
      </div>
    </div>
  );
};

export default Index;
