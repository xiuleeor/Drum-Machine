import React, { useState } from 'react';
import { useEffect } from 'react';
import "../Styles/display.css";

function Display({ drumPads, on }) {
  const [activeKey, setActiveKey] = useState("");
  const [volume, setVolume] = useState(1);
  const [color, setColor] = useState({
    Q: "#0000FF",
    W: "#0000FF",
    E: "#0000FF",
    A: "#0000FF",
    S: "#0000FF",
    D: "#0000FF",
    Z: "#0000FF",
    X: "#0000FF",
    C: "#0000FF"
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [volume]);

  const handleKeyDown = (event) => {
    handlePlaySound(event.key.toUpperCase(), volume);
  };

  function handlePlaySound(selector, volume) {
    const audio = document.getElementById(selector);
    if (audio) {
      audio.volume = volume;
      if (audio.paused) {
        audio.play();
      } else {
        audio.currentTime = 0;
      }
      setActiveKey(selector);
      changeColor(selector, "#FFA500");
    }
  }

  function changeColor(key, newColor) {
    const originalColor = color[key];
    setColor((prev) => ({
      ...prev,
      [key]: newColor
    }));
    restoreColor(key, originalColor, 200);
  }

  function restoreColor(key, originalColor, delay) {
    setTimeout(() => {
      setColor((prev) => ({
        ...prev,
        [key]: originalColor
      }));
    }, delay);
  }

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  return (
    <div id="drum-machine">
      <div id="display"> {on ? activeKey : ""}</div>
      <div className="drum-pads">
        {drumPads.map((pad) => (
          <div
            className="drum-pad"
            key={pad.id + "2"}
            id={pad.id + "1"}
            onClick={() => handlePlaySound(pad.id, volume)}
            // Usar el estado del color para aplicar un estilo en línea
            style={{ backgroundColor: color[pad.id] }}
          >
            {pad.id}
            {on ? (
              <audio src={pad.src} id={pad.id} className="clip"></audio>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <div className="vol">
        <input
          type="range"
          id="volume"
          name="volume"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
        <label htmlFor="volume">Volume</label>
      </div>
    </div>
  );
}

export default Display;

