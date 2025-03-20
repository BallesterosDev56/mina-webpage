import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const navigate = useNavigate()
  
  const sentences = [
    "경민아, 안녕!",
    "너한테 보여줄 게 있어 :)"
  ];
  
  // Typewriter effect for the current sentence
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  
  useEffect(() => {
    if (visibleCount === 0) {
      setTimeout(() => setVisibleCount(1), 1000)
      return
    }
    
    if (visibleCount <= sentences.length) {
      const currentSentence = sentences[visibleCount - 1]
      let i = 0
      setIsTyping(true)
      setDisplayText("")
      
      const typeInterval = setInterval(() => {
        if (i < currentSentence.length) {
          setDisplayText(prev => prev + currentSentence.charAt(i))
          i++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)
        }
      }, 100)
      
      return () => clearInterval(typeInterval)
    }
  }, [visibleCount])
  
  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    
    return () => clearInterval(cursorInterval)
  }, [])
  
  const handleClick = () => {
    if (isTyping) {
      return // Prevent advancing while typing animation is in progress
    }
    
    if (visibleCount < sentences.length) {
      setVisibleCount(visibleCount + 1)
    } else {
      // Add a heartbeat effect before navigation
      const element = document.getElementById('container')
      element.classList.add('heartbeat')
      
      setTimeout(() => {
        navigate('/pictures')
      }, 800)
    }
  }
  
  return (
    <div 
      id="container"
      className="flex flex-col min-h-screen w-full items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-100 cursor-pointer overflow-hidden p-4"
      onClick={handleClick}
    >
      <motion.div 
        className="w-full max-w-md px-4 sm:px-6 md:px-8 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Decorative elements */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-pink-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -bottom-20 -right-16 w-40 h-40 bg-pink-300 rounded-full opacity-20 blur-xl"></div>
        
        {/* Previous sentences */}
        {visibleCount > 1 && sentences.slice(0, visibleCount - 1).map((sentence, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-korean text-pink-300 mb-6 text-center"
          >
            {sentence}
          </motion.p>
        ))}
        
        {/* Current sentence with typewriter effect */}
        {visibleCount > 0 && visibleCount <= sentences.length && (
          <motion.div
            className="text-3xl sm:text-4xl md:text-5xl font-korean text-pink-500 drop-shadow-lg text-center relative"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {displayText}
            <span className={`inline-block w-2 h-8 bg-pink-400 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
          </motion.div>
        )}
        
        {/* Hint for continuing */}
        {visibleCount <= sentences.length && !isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex justify-center mt-12"
          >
            <span className="px-4 py-2 text-pink-400 text-sm border border-pink-200 rounded-full animate-pulse">
              탭하여 계속하기
            </span>
          </motion.div>
        )}
      </motion.div>
      
      {/* Add the CSS for heartbeat animation */}
      <style jsx>{`
        @keyframes heartbeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.05); }
          50% { transform: scale(1); }
          75% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .heartbeat {
          animation: heartbeat 0.8s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default Home