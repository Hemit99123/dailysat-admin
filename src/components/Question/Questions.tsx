import React, { useState } from 'react';
import Header from '../common/Header';
import axios from 'axios'; // Import axios

const QuestionForm: React.FC = () => {
  // State to hold all form data
  const [question, setQuestion] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [explanation, setExplanation] = useState<string>('');
  const [skill, setSkill] = useState<string>('');

  // Handle changes for question text
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  // Handle changes for option text inputs
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  // Handle correct answer selection
  const handleCorrectAnswerChange = (index: number) => {
    setCorrectAnswer(index);
  };

  // Handle explanation text
  const handleExplanationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExplanation(e.target.value);
  };

  // Handle skill text input
  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkill(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Format the options to match MongoDB schema (optionA, optionB, ...)
    const questionData = {
      question,
      optionA: options[0],
      optionB: options[1],
      optionC: options[2],
      optionD: options[3],
      correctAnswer,
      explanation,
      skill,
    };

    try {
      // Send the question data to the API using axios
      const response = await axios.post('/api/create-question', questionData);

      // Handle the response (for example, show a success message)
      console.log('Question submitted successfully:', response.data);
      alert('Question submitted successfully!');
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error submitting question:', error);
      alert('There was an error submitting the question. Please try again.');
    }
  };

  return (
    <div className="p-5">
      <Header />

      {/* Question Input */}
      <div className="mt-5">
        <label htmlFor="question" className="block text-lg text-gray-700">Question</label>
        <input
          id="question"
          className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mt-2"
          placeholder="Type your question here..."
          value={question}
          onChange={handleQuestionChange}
        />
      </div>

      {/* Options */}
      <div className="mt-5 space-y-4">
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Correct Answer Selection */}
      <div className="mt-5">
        <label className="block text-lg text-gray-700">Correct Answer</label>
        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                id={`correctOption-${index}`}
                name="correctAnswer"
                checked={correctAnswer === index}
                onChange={() => handleCorrectAnswerChange(index)}
                className="h-5 w-5 text-blue-500 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor={`correctOption-${index}`} className="ml-2 text-lg text-gray-700">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Explanation Textarea */}
      <div className="mt-5">
        <label htmlFor="explanation" className="block text-lg text-gray-700">Explanation</label>
        <textarea
          id="explanation"
          className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mt-2"
          placeholder="Explain why you chose your option..."
          value={explanation}
          onChange={handleExplanationChange}
          rows={4}
        />
      </div>

      {/* Skill Input */}
      <div className="mt-5">
        <label htmlFor="skill" className="block text-lg text-gray-700">Skill</label>
        <input
          id="skill"
          className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mt-2"
          value={skill}
          onChange={handleSkillChange}
          placeholder="Skill name..."
        />
      </div>

      {/* Submit Button */}
      <button
        className="bg-blue-500 py-2 px-6 rounded-lg text-white font-bold text-lg mt-6 w-full"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default QuestionForm;
