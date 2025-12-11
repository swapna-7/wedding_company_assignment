"use client";

// React hooks for managing component state and side effects
import { useState, useEffect } from "react";

// Framer Motion library for smooth animations and transitions
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

// Navigation arrow icons from React Icons library
import { IoArrowBackSharp } from "react-icons/io5";
import { IoArrowForwardSharp } from "react-icons/io5";

// Next.js optimized image component for better performance
import Image from "next/image";

/**
 * Quiz Questions Database
 * Contains all questions with their multiple choice options and correct answers
 * Each question has a unique ID for tracking purposes
 */
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

/**
 * Main Quiz Component
 * Manages the interactive quiz experience with animations and score tracking
 */
export default function Home() {
  // State Management:
  // Track which question (by index) the user is currently viewing
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  // Store user's selected answers for each question
  // Format: { questionIndex: selectedAnswer }
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  
  // Toggle between quiz view and results view
  const [showResults, setShowResults] = useState(false);
  
  // Track animation direction for slide transitions (1 = forward, -1 = backward)
  const [direction, setDirection] = useState(0);

  /**
   * Handle Answer Selection
   * Updates the selected answer for the current question
   * @param answer - The answer option selected by the user
   */
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answer,
    });
  };

  /**
   * Navigate to Next Question
   * Moves forward in the quiz if not on the last question
   */
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setDirection(1); // Set forward animation direction
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  /**
   * Navigate to Previous Question
   * Moves backward in the quiz if not on the first question
   */
  const handlePrev = () => {
    if (currentQuestion > 0) {
      setDirection(-1); // Set backward animation direction
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  /**
   * Submit Quiz
   * Shows the results screen with the user's score
   */
  const handleSubmit = () => {
    setShowResults(true);
  };

  /**
   * Restart Quiz
   * Resets all state to initial values for a fresh start
   */
  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  /**
   * Calculate Final Score
   * Compares user's answers with correct answers and returns percentage
   * @returns Percentage score (0-100)
   */
  const calculateScore = () => {
    let correctAnswersCount = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswersCount++;
      }
    });
    // Convert to percentage and round to nearest whole number
    return Math.round((correctAnswersCount / questions.length) * 100);
  };

  /**
   * Animation Variants for Question Transitions
   * Defines how questions slide in and out based on navigation direction
   * - enter: Initial state when question appears
   * - center: Final resting state of visible question
   * - exit: State when question leaves the screen
   * 
   * Motion blur is applied during movement for a smoother, more natural feel
   */
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000, // Slide from right if forward, left if backward
      opacity: 0, // Start invisible
      filter: "blur(10px)", // Motion blur during entry
    }),
    center: {
      x: 0, // Center position
      opacity: 1, // Fully visible
      filter: "blur(0px)", // Clear and sharp when at rest
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000, // Slide to opposite side when exiting
      opacity: 0, // Fade out
      filter: "blur(10px)", // Motion blur during exit
    }),
  };

  /**
   * Animated Score Display Component
   * Smoothly animates the score from 0 to the final percentage
   * Creates an engaging counting-up effect on the results screen
   */
  const AnimatedScore = () => {
    // Track the currently displayed score during animation
    const [displayScore, setDisplayScore] = useState(0);
    const finalScore = calculateScore();

    useEffect(() => {
      // Variables for animation timing
      let startTime: number;
      let animationFrame: number;

      /**
       * Animation Loop Function
       * Called repeatedly by requestAnimationFrame to update the score
       * @param currentTime - Current timestamp from requestAnimationFrame
       */
      const animateScore = (currentTime: number) => {
        // Initialize start time on first frame
        if (!startTime) startTime = currentTime;
        
        const elapsed = currentTime - startTime;
        const duration = 2000; // Total animation duration: 2 seconds
        const progress = Math.min(elapsed / duration, 1); // Progress from 0 to 1
        
        /**
         * Easing Function: Ease Out Cubic
         * Creates a smooth deceleration effect (fast start, slow end)
         * Formula: 1 - (1 - t)³
         */
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOutCubic(progress);
        
        // Update displayed score based on eased progress
        setDisplayScore(Math.round(easedProgress * finalScore));

        // Continue animation if not complete
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animateScore);
        }
      };

      // Start the animation
      animationFrame = requestAnimationFrame(animateScore);

      // Cleanup function: Cancel animation if component unmounts
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

  /**
   * Results Screen
   * Displayed after user completes all questions
   * Shows animated score and option to restart quiz
   */
  if (showResults) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 2xl:p-12"
        style={{
          background: "#F4FDFF", // Soft blue background
        }}
      >
        {/* Animated container with fade-in, scale effect, and motion blur */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }} // Start small, invisible with blur
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} // Grow to full size and sharpen
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 lg:gap-14 px-4"
        >
          {/* Encouragement Badge */}
          <div className="bg-white px-4 sm:px-6 md:px-8 py-2 rounded-lg">
            <p
              className="text-xs sm:text-sm md:text-base lg:text-base font-semibold text-gray-600"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Keep Learning!
            </p>
          </div>
          
          {/* Score Display Section */}
          <div className="flex flex-col items-center">
            {/* Results Heading with gradient text */}
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-7xl italic px-4"
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
            {/* Animated Score Counter */}
            <AnimatedScore />
          </div>
          
          {/* Restart Button */}
          <button
            onClick={handleRestart}
            className="rounded-lg font-semibold transition-all hover:scale-105 text-sm sm:text-base md:text-lg lg:text-lg px-6 sm:px-8 md:px-10 lg:px-10 py-2.5 sm:py-3"
            style={{
              background: "linear-gradient(90deg, #C6E9F7 0%, #E5F8FF 100%)",
              fontFamily: "var(--font-manrope)",
              color: "#15313D",
            }}
          >
            Start Again
          </button>
        </motion.div>
      </div>
    );
  }

  /**
   * Main Quiz Interface
   * Displayed when user is actively taking the quiz
   */
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-8 xl:p-10 2xl:p-12"
      style={{
        background:
          "linear-gradient(110deg, #BECFEE 0%, #71C6E2 33%, #D9F4FA 66%, #BECFEE 100%)",
      }}
    >
      {/* Outer Glass Container - Creates frosted glass effect */}
      <div
        className="relative w-[95%] sm:w-[90%] md:w-[85%] lg:w-[90%] xl:w-[90%] 2xl:w-[92%] max-w-[1520px] min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:h-[640px] xl:h-[640px] 2xl:h-[700px] rounded-2xl md:rounded-4xl"
        style={{
          background: "rgba(255, 255, 255, 0.2)", // Semi-transparent white
          backdropFilter: "blur(10px)", // Blur effect for glassmorphism
          WebkitBackdropFilter: "blur(10px)", // Safari support
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 50px 0 rgba(0, 0, 0, 0.45)",
        }}
      >
        {/* Decorative Paw Animation - Bottom Left Corner */}
        <div className="absolute bottom-4 left-[3.75rem] sm:bottom-6 sm:left-[4.75rem] md:bottom-8 md:left-[5.75rem] lg:bottom-10 lg:left-[6.75rem] z-10">
          <Image
            src="/paw.gif"
            alt="Paw animation"
            width={200}
            height={200}
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
            unoptimized // Allows GIF to animate
          />
        </div>

        {/* "Best of Luck" Image - Positioned above the paw, front of all layers */}
        <div className="absolute bottom-28 -left-28 sm:bottom-32 sm:-left-28 md:bottom-36 md:-left-24 lg:bottom-[10.5rem] lg:-left-12 z-[9999]">
          <Image
            src="/bol.png"
            alt="Best of Luck"
            width={250}
            height={180}
            className="w-32 h-auto sm:w-36 md:w-40 lg:w-44"
          />
        </div>

        {/* Inner Content Container */}
        <div
          className="absolute inset-4 sm:inset-6 md:inset-8 lg:inset-10 rounded-xl md:rounded-3xl flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8 overflow-hidden"
          style={{
            backgroundColor: "#F4FDFF", // Light blue-white background
            boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.1)",
          }}
        >

          {/* Main Quiz Content Area */}
          <div className="w-full max-w-4xl flex flex-col items-center gap-3 sm:gap-4 md:gap-5">
            {/* Quiz Title - Large gradient text */}
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl italic text-center pb-1 sm:pb-2 md:pb-3 lg:pb-4 px-2"
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
            
            {/* Instructions Subtitle */}
            <div className="bg-white rounded px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2">
              <p
                className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg text-gray-700 text-center whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-manrope)",
                }}
              >
                Answer all questions to see your results
              </p>
            </div>
            
            {/* Progress Indicator - Shows completion status for each question */}
            <div className="w-full max-w-xl lg:max-w-2xl flex gap-1.5 sm:gap-2 px-2 sm:px-0">
              {questions.map((_, questionIndex) => (
                <div
                  key={questionIndex}
                  className="h-2 flex-1 rounded-full overflow-hidden"
                  style={{
                    backgroundColor: "#E5E5E5", // Light gray for incomplete
                  }}
                >
                  {/* Animated fill bar - fills when question is reached or passed */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: questionIndex <= currentQuestion ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: "#15313D", // Dark blue for completed
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Question and Answer Display Area */}
            <div className="w-full relative flex justify-center mt-1 sm:mt-2 overflow-hidden">
            {/* AnimatePresence enables exit animations when questions change */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
              {/* Animated Container - Slides in/out based on navigation direction */}
              <motion.div
                key={currentQuestion} // Key changes trigger animation
                custom={direction} // Pass direction to variants
                variants={slideVariants}
                initial="enter" // Start from off-screen
                animate="center" // Move to center
                exit="exit" // Exit to opposite side
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 }, // Springy horizontal movement
                  opacity: { duration: 0.2 }, // Quick fade
                  filter: { duration: 0.2 }, // Smooth blur transition
                }}
                className="w-full flex flex-col items-center gap-2 sm:gap-2.5 md:gap-3"
              >
                {/* Question Display Box - Highlighted with gradient background */}
                <div
                  className="w-[92%] sm:w-[85%] md:w-[80%] lg:w-3/4 xl:w-3/4 px-3 sm:px-5 md:px-6 lg:px-8 py-3 sm:py-3.5 md:py-4 lg:py-5 rounded-lg md:rounded-xl border-2 flex items-center justify-center min-h-[56px] sm:min-h-[60px] md:min-h-[64px] lg:min-h-16"
                  style={{
                    background: "linear-gradient(90deg, #C6E9F7 0%, #E5F8FF 100%)",
                    borderColor: "#C6E9F5",
                    fontFamily: "var(--font-manrope)",
                  }}
                >
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl font-semibold text-gray-800 text-center">
                    {currentQuestion + 1}. {questions[currentQuestion].question}
                  </p>
                </div>

                {/* Answer Options List */}
                <div className="w-full flex flex-col items-center gap-2 sm:gap-2.5 md:gap-3">
                  {questions[currentQuestion].options.map((option, optionIndex) => (
                    <motion.div
                      key={optionIndex}
                      whileHover={{ scale: 1.01 }} // Slight grow on hover
                      whileTap={{ scale: 0.99 }} // Slight shrink on click
                      onClick={() => handleAnswerSelect(option)}
                      className="px-3 sm:px-5 md:px-6 lg:px-8 py-3 sm:py-3.5 md:py-4 lg:py-5 rounded-lg md:rounded-xl cursor-pointer transition-all border-2 flex items-center justify-center min-h-[56px] sm:min-h-[60px] md:min-h-[64px] lg:min-h-16 w-[92%] sm:w-[85%] md:w-[80%] lg:w-3/4 xl:w-3/4"
                      style={{
                        // Highlight selected answer with gradient
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
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl text-gray-800 text-center font-semibold">
                        {option}
                      </p>
                    </motion.div>
                  ))}
                </div>
                
                {/* Navigation Controls - Previous/Next or Submit */}
                <div className="w-[92%] sm:w-[85%] md:w-[80%] lg:w-3/4 xl:w-3/4 flex justify-end gap-2 sm:gap-3 mt-1 sm:mt-2">
                {/* Previous Button - Only show when not on last question */}
                {currentQuestion < questions.length - 1 && (
                  <motion.button
                    whileHover={{ scale: currentQuestion > 0 ? 1.05 : 1 }}
                    whileTap={{ scale: currentQuestion > 0 ? 0.95 : 1 }}
                    onClick={handlePrev}
                    disabled={currentQuestion === 0} // Disable on first question
                    className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center rounded-lg border-[#C6E9F7] border transition-all"
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

                {/* Conditional Rendering: Next button OR Submit button */}
                {currentQuestion < questions.length - 1 ? (
                  /* Next Button - Navigate to next question */
                  <motion.button
                    whileHover={{ scale: selectedAnswers[currentQuestion] ? 1.05 : 1 }}
                    whileTap={{ scale: selectedAnswers[currentQuestion] ? 0.95 : 1 }}
                    onClick={handleNext}
                    disabled={!selectedAnswers[currentQuestion]} // Require answer selection
                    className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center rounded-lg border-[#C6E9F7] border transition-all"
                    style={{
                      background: selectedAnswers[currentQuestion] ? "linear-gradient(90deg, #C6E9F7 0%, #E5F8FF 100%)" : "#F0F0F0",
                      cursor: selectedAnswers[currentQuestion] ? "pointer" : "not-allowed",
                      opacity: selectedAnswers[currentQuestion] ? 1 : 0.5,
                    }}
                  >
                    <IoArrowForwardSharp
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      style={{
                        color: selectedAnswers[currentQuestion] ? "#15313D" : "#A0AEC0",
                      }}
                    />
                  </motion.button>
                ) : (
                  /* Submit Button - Shown on last question to complete quiz */
                  <motion.button
                    whileHover={{ scale: selectedAnswers[currentQuestion] ? 1.05 : 1 }}
                    whileTap={{ scale: selectedAnswers[currentQuestion] ? 0.95 : 1 }}
                    onClick={handleSubmit}
                    disabled={!selectedAnswers[currentQuestion]} // Require answer selection
                    className="rounded-lg font-semibold transition-all text-sm sm:text-base md:text-lg lg:text-lg px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 border-[#C6E9F7] border"
                    style={{
                      background: selectedAnswers[currentQuestion] ? "linear-gradient(90deg, #C6E9F7 0%, #E5F8FF 100%)" : "#F0F0F0",
                      fontFamily: "var(--font-manrope)",
                      color: selectedAnswers[currentQuestion] ? "#15313D" : "#A0AEC0",
                      cursor: selectedAnswers[currentQuestion] ? "pointer" : "not-allowed",
                      opacity: selectedAnswers[currentQuestion] ? 1 : 0.5,
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
