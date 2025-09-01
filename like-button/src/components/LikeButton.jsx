import { useState } from "react";
import { HeartIcon, SpinnerIcon } from "./icon";
import "./LikeButton.css";

const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

function classNames(...args) {
  return args.filter(Boolean).join(" ");
}

function LikeButton() {
  const [buttonState, setButtonState] = useState({
    status: STATUS.IDLE,
    isLiked: false,
    errorMessage: null,
  });

  async function handleLikeAction() {
    try {
      setButtonState((prev) => ({
        ...prev,
        status: STATUS.LOADING,
        errorMessage: null,
      }));

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: buttonState.isLiked ? "unlike" : "like",
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        setButtonState((prev) => ({
          ...prev,
          status: STATUS.ERROR,
          errorMessage: error.message,
        }));
        return;
      }

      setButtonState((prev) => ({
        ...prev,
        status: STATUS.SUCCESS,
        isLiked: !prev.isLiked,
        errorMessage: null,
      }));
    } finally {
      setButtonState((prev) => ({
        ...prev,
        status: prev.status === STATUS.SUCCESS ? STATUS.IDLE : prev.status,
      }));
    }
  }

  return (
    <div className="button-container">
      <button
        className={classNames(
          "like-button",
          buttonState.isLiked ? "liked-button--liked" : "liked-button--default"
        )}
        disabled={buttonState.status === STATUS.LOADING}
        onClick={handleLikeAction}
      >
        {buttonState.status === STATUS.LOADING ? (
          <SpinnerIcon />
        ) : (
          <HeartIcon />
        )}
        {buttonState.isLiked ? "Liked" : "Like"}
      </button>
      {buttonState.status === STATUS.ERROR && (
        <div className="error-message">{buttonState.errorMessage}</div>
      )}
    </div>
  );
}

export { LikeButton };
