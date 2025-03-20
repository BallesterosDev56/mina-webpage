import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8 } from '../assets';
import { Link } from 'react-router-dom';
import SectionWrapper from './SectionWrapper';

const images = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8];

function Picture() {
  const [loadedImages, setLoadedImages] = useState(0);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  const allImagesLoaded = loadedImages === images.length;

  return (
    <SectionWrapper>
      {!allImagesLoaded && (
        <div className="absolute inset-0 flex justify-center items-center">
          <p className="text-xl font-medium text-gray-500">Loading...</p>
        </div>
      )}

      {allImagesLoaded && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
        >
          <Link to="/card">
            <p className="absolute text-4xl font-bold text-pink-500 inset-0 flex justify-center items-center text-center transform rotate-6 cursor-pointer">
              경민아, 나이 먹고 있네~! 🥹
            </p>
            <p className="absolute text-sm text-customBlue inset-0 flex justify-end items-end text-end transform rotate-6 cursor-pointer">
              클릭해서 계속...
            </p>
          </Link>
        </motion.div>
      )}

      <AnimatePresence>
        {showHint && allImagesLoaded && (
          <motion.div 
            className="absolute bottom-8 right-8 bg-yellow-100 rounded-2xl py-2 px-4 shadow-md z-50 max-w-xs"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.4 }}
          >
            <div className="relative">
              <div className="absolute -bottom-2 right-4 w-4 h-4 bg-yellow-100 transform rotate-45"></div>
              <div className="flex items-center">
                <motion.div 
                  animate={{ y: [0, -2, 0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="mr-2 text-lg"
                >
                  ✨
                </motion.div>
                <p className="text-center text-yellow-800 font-medium text-sm">
                  쉿! 사진을 이리저리 움직여 봐!
                </p>
                <motion.div 
                  animate={{ x: [0, 6, 0], rotate: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                  className="ml-2 text-lg"
                >
                  👉
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {images.map((image, index) => (
        <motion.div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            allImagesLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ zIndex: images.length - index }}
          initial={{ scale: 1, rotate: Math.random() * 20 - 10 }}
          whileDrag={{ scale: 1.05, rotate: Math.random() * 20 - 10 }}
          drag
        >
          <img
            src={image}
            alt={`Stacked image ${index + 1}`}
            className="w-full h-full object-cover rounded-lg shadow-lg"
            onLoad={handleImageLoad}
          />
        </motion.div>
      ))}
    </SectionWrapper>
  );
}

export default Picture;
