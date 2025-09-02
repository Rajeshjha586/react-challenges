import { useEffect, useState } from "react";
import { Light } from "./Light";

function TrafficLight({ initialColor = "green", config, layout = "vertical" }) {
  const [currentColor, setCurrentColor] = useState(initialColor);

  useEffect(() => {
    const { duration, next } = config[currentColor];
    const timerID = setTimeout(() => {
      setCurrentColor(next);
    }, duration);

    return () => {
      clearTimeout(timerID);
    };
  }, [currentColor]);

  return (
    <div
      aria-live="polite"
      aria-label={`Curent light: ${currentColor}`}
      className={[
        "traffic-light-container",
        layout === "vertical" && "traffic-light-container--vertical",
      ]
        .filter((cls) => !!cls)
        .join(" ")}
    >
      {Object.keys(config).map((color) => (
        <Light
          key={color}
          backgroundColor={
            color === currentColor ? config[color].backgroundColor : undefined
          }
        />
      ))}
    </div>
  );
}

export { TrafficLight };
