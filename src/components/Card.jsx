import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import "../assets/css/card.css";
import { Link } from "react-router-dom";

function Card() {
  const [cardClass, setCardClass] = useState("");
  const [isCardOpened, setIsCardOpened] = useState(false);
  const timerRef = useRef(null);

  const toggleCard = () => {
    if (cardClass === "" || cardClass === "close-half") {
      setCardClass("open-half");
      setIsCardOpened(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCardClass("open-fully");
        timerRef.current = null;
      }, 1000);
    } else {
      setCardClass("close-half");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCardClass("");
        setIsCardOpened(false);
        timerRef.current = null;
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-clip">
      <div className="w-[400px] h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div id="card" className={`${cardClass}`} onClick={toggleCard}>
            <div id="card-inside">
              <div className="wrap">
                <p>경민아, 생일 축하해!</p>
                <p>
                  오늘은 정말 특별한 날이야. 네가 이 세상에 태어난 날을 축하하는
                  날이니까! 너를 알게 된 순간부터, 넌 정말 대단한 사람이라는 걸
                  느꼈어. 너만의 밝은 에너지와 따뜻한 마음 덕분에 주변이 더
                  빛나고 행복해지는 것 같아.
                </p>
                <p>
                  넌 정말 멋진 사람이야. 항상 적절한 말로 사람들을 위로하고,
                  좋은 기운을 나눠주는 게 참 대단해. 그래서 오늘, 네가 항상
                  행복하고 멋진 일들로 가득한 한 해를 보내길 진심으로 바래. 네가
                  주는 웃음만큼, 많은 웃음을 되돌려 받았으면 좋겠어.
                </p>
                <p>
                  이번 생일이 너에게 새로운 기회와 멋진 경험들로 가득하길 바라!
                  생일 진심으로 축하해! 🎉🎂 사랑하는 사람들과 함께 행복한 하루
                  보내길!
                </p>
                <p className="signed">Daniel</p>
              </div>
            </div>

            <div id="card-front">
              <div className="wrap">
                <h1>Happy Birthday!</h1>
              </div>
            </div>
          </div>
        </motion.div>

        {isCardOpened && (
          <motion.div
            className="-mt-[3rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, visibility: "visible !important" }}
            transition={{ duration: 1.2 }}
          >
            <Link to="/cake">
              <p className="-mt-[4rem] px-7 py-3 bg-customBlue text-pink-600 font-medium text-base rounded-full hover:bg-pink-400">
                다음
              </p>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Card;
