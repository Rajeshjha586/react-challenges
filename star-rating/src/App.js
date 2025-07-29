import { useState } from "react";
import "./App.css";
import { StarRating } from "./components/StarRating";

function App() {
  const [rating, setRating] = useState(3);

  return <StarRating value={rating} max={5} onchange={setRating} />;
}

export default App;
