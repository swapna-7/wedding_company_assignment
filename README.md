# Wedding Company Quiz Assignment

Interactive quiz application built with Next.js, React, Framer Motion, and Tailwind CSS featuring smooth animations, glassmorphism effects, and a fully responsive design.

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/swapna-7/wedding_company_assignment.git
   cd wedding_company_asssignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   - Navigate to [http://localhost:3000](http://localhost:3000) in your browser

5. **Build for production** (optional)
   ```bash
   npm run build
   npm start
   ```

---

## 🛠️ Tech Stack Used

### Core Technologies
- **Next.js 16.0.8** - React framework with App Router
- **React 19.2.1** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework

### Animation & UI
- **Framer Motion 12.23.26** - Advanced animations and transitions
- **React Icons 5.5.0** - Icon library

### Fonts
- **DM Serif Display** - Elegant serif font for headings (Google Fonts)
- **Manrope** - Modern sans-serif font for body text (Google Fonts)

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

---

## ✨ Key Features Implemented

### 1. Interactive Quiz System
- 4 multiple-choice questions with dynamic question navigation
- Answer selection tracking with visual feedback
- Progress indicator showing completion status
- Disabled state handling for navigation buttons

### 2. Advanced Animations
- **Slide Transitions**: Questions slide horizontally with motion blur effect
- **Spring Physics**: Natural springy motion using Framer Motion
- **Motion Blur**: Applied during transitions (10px blur) for smooth, cinematic feel
- **Animated Score Counter**: Counting animation from 0 to final score with easing
- **Scale & Fade Effects**: Results screen entrance animation
- **Hover Effects**: Interactive button and option hover states

### 3. Visual Design
- **Glassmorphism**: Frosted glass effect on outer container with backdrop blur
- **Gradient Backgrounds**: Multi-stop gradient at 50° angle
- **Custom Typography**: Two complementary Google Fonts
- **Decorative Elements**: Animated paw GIF and "Best of Luck" PNG
- **Color Scheme**: Soft blues and whites with gradient accents

### 4. Responsive Design
- Fully responsive across all screen sizes (mobile to 4K)
- Adaptive font sizes and spacing
- Flexible layouts using Tailwind's responsive utilities
- Optimized for touch and mouse interactions

### 5. User Experience
- Clear instructions and feedback
- Smooth transitions between questions
- Encouraging messaging ("Keep Learning!")
- Restart functionality to retake quiz
- Disabled navigation until answer is selected

### 6. Code Quality
- **Comprehensive Documentation**: Detailed JSDoc comments explaining all functions
- **Type Safety**: Full TypeScript implementation
- **Clean Architecture**: Separation of concerns
- **Maintainable Code**: Well-commented and readable
- **Performance Optimized**: Next.js Image optimization

---

## 📋 Assumptions Made

- Nil
---

## ⏱️ Time Spent on Assignment

**Total Time: ~3 hours 15 min**

### Breakdown:
- **Initial Setup & Configuration** (15 min)
  - Next.js project setup
  - Tailwind CSS configuration
  - Font integration
  
- **Core Quiz Functionality** (0.5 hours)
  - Quiz logic implementation
  - State management
  - Question navigation
  - Score calculation

- **UI Design & Styling** (1 hour)
  - Layout design
  - Glassmorphism effects
  - Gradient backgrounds
  - Responsive design
  - Typography styling

- **Animation Implementation** (1 hour)
  - Framer Motion integration
  - Slide transitions with motion blur
  - Animated score counter
  - Hover and tap effects
  - Progress indicators

- **README & Final Touches** (0.5 hour)
  - Documentation
  - Final testing
  - Git repository setup

---

## 📁 Project Structure

```
wedding_company_asssignment/
├── app/
│   ├── layout.tsx      # Root layout with fonts and metadata
│   ├── page.tsx        # Main quiz component with animations
│   └── globals.css     # Global styles and Tailwind import
├── public/
│   ├── paw.gif         # Decorative paw animation
│   └── bol.png         # "Best of Luck" image
├── eslint.config.mjs   # ESLint configuration
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS customization
├── tsconfig.json       # TypeScript configuration
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation
```

---

