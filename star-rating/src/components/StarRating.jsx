import { useState } from "react";
import { Star } from "./Star";

function StarRating({ value, max, onchange }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div>
      {Array.from({ length: max }).map((_, index) => (
        <span
          key={index}
          tabIndex={0}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => onchange(index + 1)}
        >
          <Star
            filled={
              hoveredIndex != null ? index <= hoveredIndex : index < value
            }
          />
        </span>
      ))}
    </div>
  );
}

export { StarRating };
