import React, { useState, useEffect } from 'react';
import './App.css'
const pads = [
  { id: 'Heater-1', keyTrigger: 'Q', clipSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', text: 'Heater 1' },
  { id: 'Heater-2', keyTrigger: 'W', clipSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', text: 'Heater 2' },
  { id: 'Heater-3', keyTrigger: 'E', clipSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', text: 'Heater 3' },
  { id: 'Heater-4', keyTrigger: 'A', clipSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', text: 'Heater 4' },
  { id: 'Clap', keyTrigger: 'S', clipSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', text: 'Clap' },
  { id: 'Open-HH', keyTrigger: 'D', clipSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', text: 'Open-HH' },
  { id: 'Kick-n-Hat', keyTrigger: 'Z', clipSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', text: 'Kick-n-Hat' },
  { id: 'Kick', keyTrigger: 'X', clipSrc: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', text: 'Kick' },
  { id: 'Closed-HH', keyTrigger: 'C', clipSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', text: 'Closed-HH' },
];

const DrumPad = ({ id, keyTrigger, clipSrc, playAudio, isPowerOn }) => {
  return (
    <div className="drum-pad" id={id} onClick={() => isPowerOn && playAudio(keyTrigger, id)}>
      {keyTrigger}
      <audio className="clip" id={keyTrigger} src={clipSrc}></audio>
    </div>
  );
};

const DrumMachine = () => {
  const [display, setDisplay] = useState('');
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(0.5);

  const handleKeyPress = (e) => {
    if (power) {
      const pad = pads.find(pad => pad.keyTrigger === e.key.toUpperCase());
      if (pad) {
        playAudio(pad.keyTrigger, pad.id);
      }
    }
  };

  const playAudio = (keyTrigger, id) => {
    const audio = document.getElementById(keyTrigger);
    if (audio) {
      audio.currentTime = 0;
      audio.volume = volume;
      audio.play();
      setDisplay(id);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [power, volume]);

  return (
    <div id="drum-machine">
      <div id="display">
        <p>{power ? display : ''}</p>
      </div>
      <div className="drum-pads">
        {pads.map(pad => (
          <DrumPad
            key={pad.id}
            id={pad.id}
            keyTrigger={pad.keyTrigger}
            clipSrc={pad.clipSrc}
            playAudio={playAudio}
            isPowerOn={power}
          />
        ))}
      </div>
      <div className="controls">
        <div>
          <label>Power</label>
          <button onClick={() => setPower(!power)}>
            {power ? 'ON' : 'OFF'}
          </button>
        </div>
        <div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            disabled={!power}
          />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <DrumMachine />
    </div>
  );
};

export default App;
