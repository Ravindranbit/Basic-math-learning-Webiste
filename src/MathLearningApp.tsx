
// React imports: useState, useEffect, useRef are React hooks for state, lifecycle, and DOM refs
import { useState, useEffect, useRef } from 'react';
// useNavigate and useLocation are React Router hooks for navigation and route info
import { useNavigate, useLocation } from 'react-router-dom';
// Lucide icons for UI visuals
import { Plus, Minus, X, Divide, Home, Book, Award, CheckCircle, XCircle, ArrowLeft, ArrowRight, Play } from 'lucide-react';

// Main functional component for the Math Learning App
const MathLearningApp = () => {

  // React Router hooks for navigation and current route
  const navigate = useNavigate();
  const location = useLocation();


  // Returns the current page name based on the URL path
  // Demonstrates use of React Router's location object
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/about') return 'about';
    if (path === '/completed') return 'completed';
    if (path === '/goodhabit') return 'goodhabit';
    if (path.startsWith('/')) return path.substring(1);
    return 'home';
  };


  // React state hooks for UI and logic state
  // useState: manages local state for component reactivity
  const [difficultyLevel, setDifficultyLevel] = useState(1); // Current difficulty level
  const [currentPhase, setCurrentPhase] = useState('learn'); // 'learn' or 'quiz'
  const [currentQuestion, setCurrentQuestion] = useState(0); // Index of current quiz question
  const [currentExample, setCurrentExample] = useState(0); // Index of current example
  const [answers, setAnswers] = useState({}); // User answers
  const [showResults, setShowResults] = useState(false); // Show quiz results
  const [inputValue, setInputValue] = useState(''); // User input for answer
  const [inputError, setInputError] = useState(''); // Error message for input
  const [currentFactIndex, setCurrentFactIndex] = useState(0); // Index for fun facts
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile nav menu state
  // useRef: reference to input element for focus management
  const inputRef = useRef<HTMLInputElement>(null);


  // Order of math modules for progression
  const moduleOrder = ['addition', 'subtraction', 'multiplication', 'division'];


  // Array of fun math facts for the home page
  const mathFunFacts = [
    "🌟 Did you know? Zero was invented in India around 628 AD!",
    "🦋 A butterfly has symmetrical wings - that's math in nature!",
    "🍕 Pizza teaches us fractions - half, quarter, eighth... yummy math!",
    "🌈 Rainbows always have the same 7 colors in the same order!",
    "🎵 Music and math are best friends - every song has mathematical patterns!"
  ];


  // Current page name (home, about, goodhabit, etc.)
  const currentPage = getCurrentPage();


  // useEffect: React hook for side effects (timers, subscriptions, etc.)
  // Rotates fun facts every 5 seconds on the home page
  useEffect(() => {
    if (currentPage === 'home') {
      const interval = setInterval(() => {
        setCurrentFactIndex((prev) => (prev + 1) % mathFunFacts.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [mathFunFacts.length, currentPage]);


  // Closes mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);


  // Handles closing mobile menu when clicking outside (demonstrates useEffect cleanup)
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Math module data: each operation has title, icon, color, learning content, and questions
  // Demonstrates use of objects for structured data in React
  const mathOperations = {
    addition: {
      title: 'Addition (+)',
      icon: <Plus className="w-12 h-12" />,
      color: 'bg-green-500',
      learningContent: {
        concept: "Addition means putting things together! When we add, we count all the items to find how many we have in total.",
        examples: [
          {
            visual: '🍎🍎 + 🍎🍎🍎',
            explanation: "We have 2 apples, then we add 3 more apples",
            calculation: '2 + 3 = 5',
            result: '🍎🍎🍎🍎🍎'
          },
          {
            visual: '⭐⭐⭐⭐ + ⭐⭐',
            explanation: "We have 4 stars, then we add 2 more stars",
            calculation: '4 + 2 = 6',
            result: '⭐⭐⭐⭐⭐⭐'
          },
          {
            visual: '🐶 + 🐶🐶🐶',
            explanation: "We have 1 dog, then 3 more dogs join them",
            calculation: '1 + 3 = 4',
            result: '🐶🐶🐶🐶'
          }
        ]
      },
      questions: [
        { question: '3 + 4', answer: 7, visual: '🍓🍓🍓 + 🍓🍓🍓🍓 = ?' },
        { question: '5 + 1', answer: 6, visual: '🎾🎾🎾🎾🎾 + 🎾 = ?' },
        { question: '2 + 4', answer: 6, visual: '🐱🐱 + 🐱🐱🐱🐱 = ?' }
      ]
    },
    subtraction: {
      title: 'Subtraction (-)',
      icon: <Minus className="w-12 h-12" />,
      color: 'bg-blue-500',
      learningContent: {
        concept: "Subtraction means taking away! When we subtract, we remove some items and count what's left.",
        examples: [
          {
            visual: '🍎🍎🍎🍎🍎🍎 - 🍎🍎',
            explanation: "We have 6 apples, then we take away 2 apples",
            calculation: '6 - 2 = 4',
            result: '🍎🍎🍎🍎'
          },
          {
            visual: '⭐⭐⭐⭐⭐ - ⭐⭐',
            explanation: "We have 5 stars, then we take away 2 stars",
            calculation: '5 - 2 = 3',
            result: '⭐⭐⭐'
          },
          {
            visual: '🐶🐶🐶🐶🐶🐶🐶 - 🐶🐶🐶🐶',
            explanation: "We have 7 dogs, then 4 dogs go away",
            calculation: '7 - 4 = 3',
            result: '🐶🐶🐶'
          }
        ]
      },
      questions: [
        { question: '8 - 3', answer: 5, visual: '🍒🍒🍒🍒🍒🍒🍒🍒 - 🍒🍒🍒 = ?' },
        { question: '6 - 1', answer: 5, visual: '🌺🌺🌺🌺🌺🌺 - 🌺 = ?' },
        { question: '9 - 4', answer: 5, visual: '🐸🐸🐸🐸🐸🐸🐸🐸🐸 - 🐸🐸🐸🐸 = ?' }
      ]
    },
    multiplication: {
      title: 'Multiplication (×)',
      icon: <X className="w-12 h-12" />,
      color: 'bg-purple-500',
      learningContent: {
        concept: "Multiplication is like adding the same number many times! It's a quick way to count groups.",
        examples: [
          {
            visual: '🍎🍎 🍎🍎 🍎🍎',
            explanation: "We have 3 groups, each with 2 apples",
            calculation: '2 × 3 = 6',
            result: '🍎🍎🍎🍎🍎🍎'
          },
          {
            visual: '⭐⭐⭐ ⭐⭐⭐ ⭐⭐⭐',
            explanation: "We have 3 groups, each with 3 stars",
            calculation: '3 × 3 = 9',
            result: '⭐⭐⭐⭐⭐⭐⭐⭐⭐'
          },
          {
            visual: '🐶🐶🐶🐶 🐶🐶🐶🐶',
            explanation: "We have 2 groups, each with 4 dogs",
            calculation: '4 × 2 = 8',
            result: '🐶🐶🐶🐶🐶🐶🐶🐶'
          }
        ]
      },
      questions: [
        { question: '3 × 2', answer: 6, visual: '🍊🍊🍊 × 2 groups = ?' },
        { question: '2 × 2', answer: 4, visual: '🏀🏀 × 2 groups = ?' },
        { question: '4 × 1', answer: 4, visual: '🦋🦋🦋🦋 × 1 group = ?' }
      ]
    },
    division: {
      title: 'Division (÷)',
      icon: <Divide className="w-12 h-12" />,
      color: 'bg-orange-500',
      learningContent: {
        concept: "Division means sharing equally! We split things into equal groups.",
        examples: [
          {
            visual: '🍎🍎🍎🍎🍎🍎🍎🍎 ÷ 2',
            explanation: "We have 8 apples to share equally between 2 groups",
            calculation: '8 ÷ 2 = 4',
            result: '🍎🍎🍎🍎 | 🍎🍎🍎🍎'
          },
          {
            visual: '⭐⭐⭐⭐⭐⭐⭐⭐⭐ ÷ 3',
            explanation: "We have 9 stars to share equally between 3 groups",
            calculation: '9 ÷ 3 = 3',
            result: '⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐'
          },
          {
            visual: '🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶 ÷ 5',
            explanation: "We have 10 dogs to share equally between 5 groups",
            calculation: '10 ÷ 5 = 2',
            result: '🐶🐶 | 🐶🐶 | 🐶🐶 | 🐶🐶 | 🐶🐶'
          }
        ]
      },
      questions: [
        { question: '8 ÷ 4', answer: 2, visual: '🎈🎈🎈🎈🎈🎈🎈🎈 ÷ 4 groups = ?' },
        { question: '6 ÷ 3', answer: 2, visual: '🌟🌟🌟🌟🌟🌟 ÷ 3 groups = ?' },
        { question: '15 ÷ 5', answer: 3, visual: '🐰🐰🐰🐰🐰🐰🐰🐰🐰🐰🐰🐰🐰🐰🐰 ÷ 5 groups = ?' }
      ]
    }
  };

  // GoodHabitPage: React component for the Good Habit info page
  const GoodHabitPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-blue-100 p-6">
      <div className="max-w-3xl mx-auto">
        <nav 
          className="flex justify-between items-center mb-10 bg-gray-50 px-8 py-4 rounded-full shadow-sm"
          onClick={e => e.stopPropagation()}
        >
           <div className="flex items-center space-x-2">
              <div className="text-2xl">🎓</div>
              <span className="text-xl font-bold text-gray-800">Explore Math</span>
            </div>
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => navigate('/')}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                currentPage === 'home'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('/goodhabit')}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                currentPage === 'goodhabit'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              Good Habit
            </button>
            <button
              onClick={() => navigate('/about')}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                currentPage === 'about'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              About
            </button>
          </div>
        </nav>
        <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Time Management for Kids</h1>
          <p className="text-lg text-gray-700 mb-6">
            Learning to manage your time is a superpower! ⏰<br />
            Here are some tips to help you use your time wisely:
          </p>
          <ul className="text-left space-y-4 mb-8">
            <li className="flex items-start">
              <span className="text-2xl mr-3">🗓️</span>
              <span>
                <span className="font-bold text-blue-600">Make a simple schedule:</span> 
                Plan when to study, play, and rest.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">⏰</span>
              <span>
                <span className="font-bold text-green-600">Set a timer:</span> 
                Work for 20 minutes, then take a short break!
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">✅</span>
              <span>
                <span className="font-bold text-purple-600">Finish one thing at a time:</span> 
                Focus on your math, then enjoy your games!
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">🌟</span>
              <span>
                <span className="font-bold text-orange-600">Celebrate your effort:</span> 
                Every time you finish your work, give yourself a high five!
              </span>
            </li>
          </ul>
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-700 mb-2">Why is Time Management Important?</h2>
            <p className="text-gray-700">
              When you manage your time, you have more fun and less stress! You can learn, play, and rest—just like a superhero!
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-2xl text-lg font-semibold transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  // --- VALIDATION & HANDLERS ---
  const validateInput = (value: string) => {
    setInputError('');
    if (!value.trim()) {
      setInputError('Please enter your answer! 😊');
      return false;
    }
    if (!/^\d+$/.test(value.trim())) {
      setInputError('Please enter only numbers! 🔢');
      return false;
    }
    return true;
  };

  const handleInputChange = (value: string) => {
    const cursorPosition = inputRef.current?.selectionStart || 0;
    setInputValue(value);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 0);
    if (inputError) {
      setInputError('');
    }
  };

  const submitAnswer = () => {
    if (!validateInput(inputValue)) {
      return;
    }
    const operation = mathOperations[currentPage as keyof typeof mathOperations];
    const question = operation.questions[currentQuestion];
    const userAnswer = parseInt(inputValue);
    setAnswers(prev => ({
      ...prev,
      [`${currentPage}-${currentQuestion}`]: {
        userAnswer,
        correct: userAnswer === question.answer,
        correctAnswer: question.answer
      }
    }));
    if (currentQuestion < operation.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setInputValue('');
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    } else {
      setShowResults(true);
    }
  };

  const goToNextModule = () => {
    const currentIndex = moduleOrder.indexOf(currentPage);
    if (currentIndex < moduleOrder.length - 1) {
      const nextModule = moduleOrder[currentIndex + 1];
      navigate(`/${nextModule}`);
      resetLearning();
    } else {
      navigate('/completed');
    }
  };

  const resetQuiz = () => {
    setCurrentPhase('learn');
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setInputValue('');
    setInputError('');
  };

  const resetLearning = () => {
    setCurrentPhase('learn');
    setCurrentQuestion(0);
    setCurrentExample(0);
    setAnswers({});
    setShowResults(false);
    setInputValue('');
    setInputError('');
  };

  const goHome = () => {
    navigate('/');
    resetLearning();
    setIsMobileMenuOpen(false);
  };

  const startModule = (module: string) => {
    navigate(`/${module}`);
    resetLearning();
    setIsMobileMenuOpen(false);
  };

  const startQuiz = () => {
    setCurrentPhase('quiz');
    setCurrentQuestion(0);
    setInputValue('');
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  // --- HOMEPAGE ---
  const HomePage = () => (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Container */}
        <div className="mb-12 max-w-5xl mx-auto">
          <nav 
            className="flex justify-between items-center bg-gray-50 px-6 py-4 rounded-full shadow-sm relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🎓</div>
              <span className="text-xl font-bold text-gray-800">Explore Math</span>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4">
              <button
                onClick={() => navigate('/')}
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                  currentPage === 'home' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigate('/goodhabit')}
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                  currentPage === 'goodhabit'
                    ? 'bg-yellow-400 text-white'
                    : 'text-gray-600 hover:text-yellow-500'
                }`}
              >
                Good Habit
              </button>
              <button
                onClick={() => navigate('/about')}
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                  currentPage === 'about' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                About
              </button>
            </div>
            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <span className="text-2xl">☰</span>
              </button>
            </div>
            {/* Mobile Dropdown Menu */}
            <div className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
              isMobileMenuOpen 
                ? 'opacity-100 visible transform translate-y-0' 
                : 'opacity-0 invisible transform -translate-y-2'
            }`}>
              <div className="py-2">
                <button
                  onClick={() => {
                    navigate('/');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-6 py-3 font-semibold transition-colors hover:bg-gray-50 ${
                    currentPage === 'home' 
                      ? 'text-blue-500 bg-blue-50' 
                      : 'text-gray-600'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    navigate('/goodhabit');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-6 py-3 font-semibold transition-colors hover:bg-gray-50 ${
                    currentPage === 'goodhabit'
                      ? 'text-yellow-600 bg-yellow-50'
                      : 'text-gray-600'
                  }`}
                >
                  Good Habit
                </button>
                <button
                  onClick={() => {
                    navigate('/about');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-6 py-3 font-semibold transition-colors hover:bg-gray-50 ${
                    currentPage === 'about' 
                      ? 'text-blue-500 bg-blue-50' 
                      : 'text-gray-600'
                  }`}
                >
                  About
                </button>
              </div>
            </div>
          </nav>
        </div>
        {/* Math Fun Fact Card */}
        <div className="bg-gray-50 rounded-3xl p-6 mb-8 shadow-sm border max-w-2xl mx-auto mt-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Math Fun Fact</h2>
            <p className="text-base text-gray-700 font-medium transition-all duration-500">
              {mathFunFacts[currentFactIndex]}
            </p>
          </div>
        </div>
        {/* Math Operations Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Choose Your Math Adventure! 🎯
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {Object.entries(mathOperations).map(([key, operation]) => (
              <div
                key={key}
                onClick={() => startModule(key)}
                className="group bg-white hover:bg-gray-50 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-gray-100 hover:border-blue-200"
              >
                <div className="text-center">
                  <div className={`${operation.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <div className="text-white">
                      {operation.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {operation.title}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    Learn {operation.title.toLowerCase()} with fun visual examples!
                  </p>
                  <div className={`${operation.color} text-white px-4 py-2 rounded-full inline-block font-semibold group-hover:shadow-lg transition-shadow text-sm`}>
                    Start Learning →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Why Learning Here is Special Section */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Why Learning Here is Special
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-2xl border-2 border-green-100">
              <Book className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Learn First</h3>
              <p className="text-gray-600 text-sm">Understand concepts with visual examples before testing!</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-2xl border-2 border-blue-100">
              <CheckCircle className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Practice Quiz</h3>
              <p className="text-gray-600 text-sm">Test your knowledge with fun interactive quizzes!</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-2xl border-2 border-purple-100">
              <Award className="w-10 h-10 text-purple-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Progress Forward</h3>
              <p className="text-gray-600 text-sm">Move to the next topic after mastering each one!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- ABOUT PAGE ---
  const AboutPage = () => (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <nav 
          className="flex justify-between items-center mb-4 bg-gray-50 px-8 py-4 rounded-full shadow-sm relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center space-x-2">
            <div className="text-2xl">🎓</div>
            <span className="text-xl font-bold text-gray-800">Explore Math</span>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <button
              onClick={() => {
                navigate('/');
                setIsMobileMenuOpen(false);
              }}
              className="text-gray-600 hover:text-blue-500 px-4 py-2 rounded-full font-semibold transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate('/goodhabit');
                setIsMobileMenuOpen(false);
              }}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                currentPage === 'goodhabit'
                  ? 'bg-yellow-400 text-white'
                  : 'text-gray-600 hover:text-yellow-500'
              }`}
            >
              Good Habit
            </button>
            <button
              onClick={() => {
                navigate('/about');
                setIsMobileMenuOpen(false);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold"
            >
              About
            </button>
          </div>
          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <span className="text-2xl">☰</span>
            </button>
          </div>
          {/* Mobile Dropdown Menu */}
          <div className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen 
              ? 'opacity-100 visible transform translate-y-0' 
              : 'opacity-0 invisible transform -translate-y-2'
          }`}>
            <div className="py-2">
              <button
                onClick={() => {
                  navigate('/');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-6 py-3 font-semibold transition-colors hover:bg-gray-50 text-gray-600"
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigate('/goodhabit');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-6 py-3 font-semibold transition-colors hover:bg-gray-50 ${
                  currentPage === 'goodhabit'
                    ? 'text-blue-500 bg-blue-50'
                    : 'text-gray-600'
                }`}
              >
                Good Habit
              </button>
              <button
                onClick={() => {
                  navigate('/about');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-6 py-3 font-semibold transition-colors hover:bg-gray-50 text-blue-500 bg-blue-50"
              >
                About
              </button>
            </div>
          </div>
        </nav>
  <div className="text-center mb-2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            About
          </h1>
        </div>
  <div className="bg-blue-50 rounded-3xl p-8 mb-4 border">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🎯 Our Mission</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              To create an inclusive, supportive learning environment where every child can discover 
              the joy of mathematics through visual learning, structured progression, and positive reinforcement.
            </p>
          </div>
        </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
          <div className="bg-green-50 p-8 rounded-3xl border-2 border-green-100">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Visual Learning</h3>
              <p className="text-gray-600">
                Every math concept is explained with colorful emojis, visual representations, 
                and step-by-step examples that make abstract concepts concrete and understandable.
              </p>
            </div>
          </div>
          <div className="bg-purple-50 p-8 rounded-3xl border-2 border-purple-100">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Structured Learning</h3>
              <p className="text-gray-600">
                Our learn-first approach ensures children understand concepts before testing. 
                Students must demonstrate mastery before progressing to the next topic.
              </p>
            </div>
          </div>
          <div className="bg-orange-50 p-8 rounded-3xl border-2 border-orange-100">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Autism-Friendly Design</h3>
              <p className="text-gray-600">
                High contrast colors, large buttons, clear navigation, and predictable layouts 
                create a comfortable learning environment for children with autism.
              </p>
            </div>
          </div>
          <div className="bg-pink-50 p-8 rounded-3xl border-2 border-pink-100">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Positive Reinforcement</h3>
              <p className="text-gray-600">
                Encouraging feedback, celebration of achievements, and supportive error messages 
                build confidence and maintain motivation throughout the learning journey.
              </p>
            </div>
          </div>
        </div>
  <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 mb-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Our Learning Path
          </h2>
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
              <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Addition (+)</h3>
                <p className="text-gray-600">Learn to put things together and count the total</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
              <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Subtraction (-)</h3>
                <p className="text-gray-600">Learn to take away and count what remains</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
              <div className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Multiplication (×)</h3>
                <p className="text-gray-600">Learn to count groups quickly and efficiently</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-xl">
              <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Division (÷)</h3>
                <p className="text-gray-600">Learn to share things equally between groups</p>
              </div>
            </div>
          </div>
          </div>
          {/* Good Habit Page Section */}
          <div className="bg-yellow-50 rounded-3xl p-8 mb-4 border-2 border-yellow-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-yellow-700 mb-4"> Good Habit Page</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                The Good Habit page is designed to encourage and teach children positive learning habits that help them succeed in math and beyond. Here, students will find tips on staying focused, practicing regularly, asking questions, and celebrating their progress. Building good habits early supports a lifetime of confident, joyful learning!
              </p>
            </div>
          </div>
        {/* Removed 'Ready to Start Learning' section as requested */}
      </div>
    </div>
  );

  // LearningPage, QuizPage, CompletionPage: React components for main app flow
  const LearningPage = () => {
    const operation = mathOperations[currentPage as keyof typeof mathOperations];

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={goHome}
              className="bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center space-x-3">
              <span className={`${operation.color} p-3 rounded-full text-white`}>
                {operation.icon}
              </span>
              <span>Learning {operation.title}</span>
            </h1>
            <div className="text-lg font-semibold text-gray-600 bg-white px-4 py-2 rounded-full shadow-lg">
              📚 Learn
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              What is {operation.title}? 🤔
            </h2>
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              {operation.learningContent.concept}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Let's See Some Examples!
            </h3>
            
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                {operation.learningContent.examples.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentExample(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentExample === index ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">
                {operation.learningContent.examples[currentExample].visual}
              </div>
              <p className="text-lg text-gray-700 mb-4">
                {operation.learningContent.examples[currentExample].explanation}
              </p>
              <div className="text-2xl font-bold text-blue-600 mb-4">
                {operation.learningContent.examples[currentExample].calculation}
              </div>
              <div className="text-3xl">
                {operation.learningContent.examples[currentExample].result}
              </div>
            </div>

            {currentExample < operation.learningContent.examples.length - 1 && (
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentExample(Math.max(0, currentExample - 1))}
                  disabled={currentExample === 0}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                    currentExample === 0 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  } transition-colors`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                
                <button
                  onClick={() => setCurrentExample(Math.min(operation.learningContent.examples.length - 1, currentExample + 1))}
                  className="bg-blue-500 text-white hover:bg-blue-600 flex items-center space-x-2 px-4 py-2 rounded-full transition-colors"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {currentExample === operation.learningContent.examples.length - 1 && (
            <div className="text-center mt-8">
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">🎉 Great Job!</h3>
                <p className="text-gray-600 mb-4">
                  You've learned all the examples! Ready to test your knowledge?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setCurrentExample(currentExample - 1)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center space-x-2 justify-center"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Review Examples</span>
                  </button>
                  <button
                    onClick={startQuiz}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2 justify-center"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start Quiz! 🚀</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Quiz results calculation and navigation
  const QuizPage = () => {
    const operation = mathOperations[currentPage as keyof typeof mathOperations];
    const question = operation.questions[currentQuestion];
    
    if (showResults) {
      const totalQuestions = operation.questions.length;
      const correctAnswers = Object.values(answers).filter((a: any) => a.correct).length;
      const score = Math.round((correctAnswers / totalQuestions) * 100);
      const passed = score >= 70;

      return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
              <div className="mb-6">
                {passed ? (
                  <div className="text-6xl mb-4">🎉</div>
                ) : (
                  <div className="text-6xl mb-4">💪</div>
                )}
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {passed ? 'Fantastic Job!' : 'Good Try! Keep Learning!'}
                </h2>
                <div className="text-5xl font-bold text-blue-600 mb-4">
                  {score}%
                </div>
                <p className="text-xl text-gray-600 mb-8">
                  You got {correctAnswers} out of {totalQuestions} questions right!
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {operation.questions.map((q: any, index: number) => {
                  const answerKey = `${currentPage}-${index}`;
                  const userAnswer = (answers as any)[answerKey];
                  return (
                    <div key={index} className={`p-4 rounded-xl ${userAnswer.correct ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">{q.question}</span>
                        <div className="flex items-center space-x-2">
                          {userAnswer.correct ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-500" />
                          )}
                          <span className={`font-bold ${userAnswer.correct ? 'text-green-600' : 'text-red-600'}`}>
                            {userAnswer.userAnswer} {!userAnswer.correct && `(correct: ${userAnswer.correctAnswer})`}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!passed && (
                  <button
                    onClick={resetLearning}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-2xl text-lg font-semibold transition-colors"
                  >
                    Learn Again 📚
                  </button>
                )}
                {passed && (
                  <button
                    onClick={goToNextModule}
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-2xl text-lg font-semibold transition-colors"
                  >
                    Next Topic! 🎯
                  </button>
                )}
                <button
                  onClick={goHome}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-2xl text-lg font-semibold transition-colors"
                >
                  Home 🏠
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setCurrentPhase('learn')}
              className="bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center space-x-3">
              <span className={`${operation.color} p-3 rounded-full text-white`}>
                {operation.icon}
              </span>
              <span>{operation.title} Quiz</span>
            </h1>
            <div className="text-lg font-semibold text-gray-600 bg-white px-4 py-2 rounded-full shadow-lg">
              {currentQuestion + 1}/{operation.questions.length}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">{question.visual}</div>
              <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                {question.question} = ?
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xl font-semibold text-gray-700 mb-3 text-center">
                  What's your answer? 🤔
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      submitAnswer();
                    }
                  }}
                  className={`w-full text-center text-2xl p-4 border-4 rounded-2xl focus:outline-none focus:ring-4 transition-all ${
                    inputError 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-blue-300 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                  placeholder="Type your answer here..."
                  autoFocus
                />
                {inputError && (
                  <div className="mt-3 p-3 bg-red-50 border-2 border-red-200 rounded-xl">
                    <p className="text-red-600 text-lg font-semibold text-center">{inputError}</p>
                  </div>
                )}
              </div>

              <button
                onClick={submitAnswer}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-xl font-bold py-4 rounded-2xl transition-all transform hover:scale-105 shadow-lg"
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CompletionPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-green-100 p-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="text-8xl mb-6">🏆</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Congratulations!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            You've mastered all four math operations! You're now a math champion!
          </p>
          <button
            onClick={goHome}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl font-bold py-4 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-lg"
          >
            Start Learning Again! 🎯
          </button>
        </div>
      </div>
    </div>
  );

  // Main render logic: conditionally renders pages based on current route and phase
  if (currentPage === 'home') {
    return <HomePage />;
  } else if (currentPage === 'about') {
    return <AboutPage />;
  } else if (currentPage === 'goodhabit') {
    return <GoodHabitPage />;
  } else if (currentPage === 'completed') {
    return <CompletionPage />;
  } else if (currentPhase === 'learn') {
    return <LearningPage />;
  } else {
    return <QuizPage />;
  }
};

export default MathLearningApp;
