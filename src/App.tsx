import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MathLearningApp from './MathLearningApp';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MathLearningApp />} />
        <Route path="/about" element={<MathLearningApp />} />
        <Route path="/goodhabit" element={<MathLearningApp />} />
        <Route path="/addition" element={<MathLearningApp />} />
        <Route path="/subtraction" element={<MathLearningApp />} />
        <Route path="/multiplication" element={<MathLearningApp />} />
        <Route path="/division" element={<MathLearningApp />} />
        <Route path="/completed" element={<MathLearningApp />} />
        {/* Add any other routes you need */}
      </Routes>
    </Router>
  );
}

export default App;
