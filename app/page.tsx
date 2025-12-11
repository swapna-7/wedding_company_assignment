"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { IoArrowBackSharp } from "react-icons/io5";
import { IoArrowForwardSharp } from "react-icons/io5";

const questions = [
  {
    id: 1,
    question: "What sound does a cat make?",
    options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
    correctAnswer: "Meow-Meow",
  },
  {
    id: 2,
    question: "What would you probably find in your fridge?",
    options: ["Shoes", "Ice Cream", "Books"],
    correctAnswer: "Ice Cream",
  },
  {
    id: 3,
    question: "What color are bananas?",
    options: ["Blue", "Yellow", "Red"],
    correctAnswer: "Yellow",
  },
  {
    id: 4,
    question: "How many stars are in the sky?",
    options: ["Two", "Infinite", "One Hundred"],
    correctAnswer: "Infinite",
  },
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [direction, setDirection] = useState(0);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setDirection(1);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const AnimatedScore = () => {
    const [displayScore, setDisplayScore] = useState(0);
    const finalScore = calculateScore();

    useEffect(() => {
      let startTime: number;
      let animationFrame: number;

      const animateScore = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const duration = 2000; // 2 seconds
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth deceleration
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOutCubic(progress);
        
        setDisplayScore(Math.round(easedProgress * finalScore));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animateScore);
        }
      };

      animationFrame = requestAnimationFrame(animateScore);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, [finalScore]);

    return (
      <div className="relative h-32 sm:h-40 md:h-48 flex items-center justify-center">
        <div className="text-7xl sm:text-8xl md:text-9xl font-bold">
          <span style={{ color: "#266580", fontFamily: "var(--font-dm-serif)" }}>
            {displayScore}
          </span>
          <span
            className="text-3xl sm:text-4xl md:text-5xl italic"
            style={{
              fontFamily: "var(--font-dm-serif)",
              background: "linear-gradient(90deg, #15313D 0%, #3CABDA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            %
          </span>
        </div>
      </div>
    );
  };

  if (showResults) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 2xl:p-12"
        style={{
          background: "#F4FDFF",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-14"
        >
          <div className="bg-white px-6 py-2 rounded-lg">
            <p
              className="text-sm sm:text-base font-semibold text-gray-600"
              style={{ fontFamily: "var(--font-manrope)" , padding: "5px 15px",}}
            >
              Keep Learning!
            </p>
          </div>
          
          <div className="flex flex-col items-center ">
            <h2
              className="text-4xl sm:text-5xl md:text-7xl italic"
              style={{
                fontFamily: "var(--font-dm-serif)",
                background: "linear-gradient(90deg, #15313D 0%, #3CABDA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Your Final score is
            </h2>
            <AnimatedScore />
          </div>
          
          <button
            onClick={handleRestart}
            className="rounded-lg font-semibold transition-all hover:scale-105"
            style={{
              background: "linear-gradient(90deg, #C6E9F7 0%, #E5F8FF 100%)",
              fontFamily: "var(--font-manrope)",
              color: "#15313D",
              padding: "10px 30px",
            }}
          >
            Start Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 2xl:p-12"
      style={{
        background:
          "linear-gradient(135deg, #BECFEE 0%, #71C6E2 33%, #D9F4FA 66%, #BECFEE 100%)",
      }}
    >
      <div
        className="relative w-[92%] xs:w-[90%] sm:w-[88%] md:w-[86%] lg:w-[88%] xl:w-[90%] 2xl:w-[92%] max-w-[1520px] h-[300px] xs:h-[350px] sm:h-[400px] md:h-[480px] lg:h-[560px] xl:h-[640px] 2xl:h-[700px] rounded-xl xs:rounded-2xl sm:rounded-2xl md:rounded-3xl"
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        }}
      >
        <div
          className="absolute inset-4 xs:inset-5 sm:inset-6 md:inset-8 lg:inset-10 rounded-lg xs:rounded-xl sm:rounded-2xl flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 overflow-hidden"
          style={{
            backgroundColor: "#F4FDFF",
            boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="w-full max-w-4xl flex flex-col items-center gap-5">
            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl italic text-center pb-4"
              style={{
                fontFamily: "var(--font-dm-serif)",
                background: "linear-gradient(90deg, #15313D 0%, #3CABDA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: "1.2",
              }}
            >
              Test Your Knowledge
            </h1>
            
            {/* Subtitle */}
            <div className="bg-white rounded-sm w-sm">
              <p
                className="text-sm sm:text-base md:text-lg text-gray-700 text-center"
                style={{
                  fontFamily: "var(--font-manrope)",
                }}
              >
                Answer all questions to see your results
              </p>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full max-w-2xl flex gap-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className="h-2 flex-1 rounded-full overflow-hidden"
                  style={{
                    backgroundColor: "#E5E5E5",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: index <= currentQuestion ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: "#15313D",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Questions and Answers */}
            <div className="w-full relative flex justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentQuestion}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="w-full flex flex-col items-center gap-3 sm:gap-3"
              >
                {/* Question Box */}
                <div
                  className="w-3/4 px-4 sm:px-8 py-3 sm:py-4 md:py-5 rounded-lg border-2 flex items-center justify-center min-h-16 sm:min-h-16"
                  style={{
                    background: "linear-gradient(90deg, #C6E9F7 0%, #E5F8FF 100%)",
                    borderColor: "#C6E9F5",
                    fontFamily: "var(--font-manrope)",
                  }}
                >
                  <p className="text-base sm:text-sm md:text-lg lg:text-lg font-semibold text-gray-800 text-center">
                    {currentQuestion + 1}. {questions[currentQuestion].question}
                  </p>
                </div>

                {/* Answer Options */}
                <div className="w-full flex flex-col items-center gap-3 sm:gap-3 md:gap-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswerSelect(option)}
                      className="px-4 sm:px-8 py-3 sm:py-4 md:py-5 rounded-lg cursor-pointer transition-all border-2 border-[#E5F8FF] flex items-center justify-center min-h-16 sm:min-h-16 w-3/4"
                      style={{
                        background:
                          selectedAnswers[currentQuestion] === option
                            ? "linear-gradient(90deg, #C6E9F7 0%, #E5F8FF 100%)"
                            : "#F8FCFD",
                        borderColor:
                          selectedAnswers[currentQuestion] === option
                            ? "#C6E9F5"
                            : "#E0F2F7",
                        fontFamily: "var(--font-manrope)",
                      }}
                    >
                      <p className="text-base sm:text-sm md:text-lg lg:text-lg text-gray-800 text-center font-semibold">
                        {option}
                      </p>
                    </motion.div>
                  ))}
                </div>
                
                {/* Navigation Buttons */}
                <div className="w-3/4 flex justify-end gap-3 mt-3">
                {currentQuestion < questions.length - 1 && (
                  <motion.button
                    whileHover={{ scale: currentQuestion > 0 ? 1.05 : 1 }}
                    whileTap={{ scale: currentQuestion > 0 ? 0.95 : 1 }}
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                    className="w-12 h-12 flex items-center justify-center rounded-sm transition-all"
                    style={{
                      background: currentQuestion > 0 ? "linear-gradient(90deg, #C6E9F7 0%, #E5F8FF 100%)" : "#F0F0F0",
                      cursor: currentQuestion > 0 ? "pointer" : "not-allowed",
                      opacity: currentQuestion > 0 ? 1 : 0.5,
                    }}
                  >
                    <IoArrowBackSharp
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      style={{ color: currentQuestion > 0 ? "#15313D" : "#A0AEC0" }}
                    />
                  </motion.button>
                )}

                {currentQuestion < questions.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: selectedAnswers[currentQuestion] ? 1.05 : 1 }}
                    whileTap={{ scale: selectedAnswers[currentQuestion] ? 0.95 : 1 }}
                    onClick={handleNext}
                    disabled={!selectedAnswers[currentQuestion]}
                    className="w-12 h-12 flex items-center justify-center rounded-sm transition-all"
                    style={{
                      background: selectedAnswers[currentQuestion] ? "linear-gradient(90deg, #C6E9F7 0%, #E5F8FF 100%)" : "#F0F0F0",
                      cursor: selectedAnswers[currentQuestion] ? "pointer" : "not-allowed",
                      opacity: selectedAnswers[currentQuestion] ? 1 : 0.5,
                    }}
                  >
                    <IoArrowForwardSharp
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      style={{
                        color: selectedAnswers[currentQuestion] ? "#15313D" : "#A0AEC0",
                      }}
                    />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: selectedAnswers[currentQuestion] ? 1.05 : 1 }}
                    whileTap={{ scale: selectedAnswers[currentQuestion] ? 0.95 : 1 }}
                    onClick={handleSubmit}
                    disabled={!selectedAnswers[currentQuestion]}
                    className="rounded-lg font-semibold transition-all text-base sm:text-lg"
                    style={{
                      background: selectedAnswers[currentQuestion] ? "linear-gradient(90deg, #C6E9F7 0%, #E5F8FF 100%)" : "#F0F0F0",
                      fontFamily: "var(--font-manrope)",
                      color: selectedAnswers[currentQuestion] ? "#15313D" : "#A0AEC0",
                      cursor: selectedAnswers[currentQuestion] ? "pointer" : "not-allowed",
                      opacity: selectedAnswers[currentQuestion] ? 1 : 0.5,
                      padding: "5px 25px",
                    }}
                  >
                    Submit
                  </motion.button>
                )}
                </div>
              </motion.div>
            </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
