import React, { useEffect, useState } from 'react';

function FloatingHearts({ count = 15 }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const newHearts = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 8,
      animationDuration: 8 + Math.random() * 4,
      size: 15 + Math.random() * 15
    }));
    setHearts(newHearts);
  }, [count]);

  return (
    <>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.animationDelay}s`,
            animationDuration: `${heart.animationDuration}s`,
            width: `${heart.size}px`,
            height: `${heart.size}px`
          }}
        />
      ))}
    </>
  );
}

export default FloatingHearts;
