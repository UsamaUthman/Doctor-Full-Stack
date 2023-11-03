import React from 'react';

const PutStarRating = ({ rating, setRating }) => {
  const maxStars = 5;

  // Handle star click
    const handleStarClick = (i) => {
        setRating(i);
    };

  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <span
        key={i}
        className={`text-2xl cursor-pointer ${
          i <= rating ? 'text-yellow-500' : 'text-gray-400'
        }`}
        onClick={() => handleStarClick(i)}
      >
        ★
      </span>
    );
  }

  return <div className="flex">{stars}</div>;
};

export default PutStarRating;
