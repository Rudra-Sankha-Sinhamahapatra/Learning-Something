import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  noOfStars?: number;
}

export default function StarRating({ noOfStars = 5 }: StarRatingProps): JSX.Element {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="star-rating flex flex-row justify-center mt-8">
      {[...Array(noOfStars)].map((_, index) => {
        const starValue = index + 1;

        return (
          <FaStar
            key={index}
            className="star"
            color={starValue <= (hover || rating || 0) ? "#ffc107" : "#e4e5e9"}
            size={30}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
          />
        );
      })}
    </div>
  );
}
