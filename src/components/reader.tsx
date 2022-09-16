import {useEffect, useState} from "react";
import {PLAY_STATUS} from "../types";
import {speak} from "./speech-synth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons/faPlay";
import ReadSpectrum from "./read-spectrum";
import ReadTime from "./read-time";

interface IReader {
  textToRead: string;
}

const Reader = ({textToRead}: IReader) => {
  const [text, setText] = useState("");
  const [playStatus, setPlayStatus] = useState(PLAY_STATUS.PLAY);

  // remove all HTML tags from text sample
  useEffect(() => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = textToRead;
    setText(tmp.textContent || tmp.innerText || "");
  }, [textToRead]);

  const handleClick = () => {
    // NOTE: will cause an error if this cancel isn't here
    speechSynthesis.cancel();
    setPlayStatus((prev) => {
      if (prev === PLAY_STATUS.PLAY) {
        speak(text, setPlayStatus, window.speechSynthesis);
        return PLAY_STATUS.STOP;
      }
      return PLAY_STATUS.PLAY;
    });
  };

  return (
    <div className="loader">
      <div className="wrapper">
        <div
          className="player_main_control"
          onClick={() => handleClick()}
          onKeyPress={() => handleClick()}
          aria-hidden="true"
        >
          <div className="control_play_pause">
            <div className={`control_icon_${playStatus}`}>
              {playStatus === PLAY_STATUS.PLAY ? (
                <FontAwesomeIcon icon={faPlay} />
              ) : (
                <ReadSpectrum />
              )}
            </div>
          </div>
        </div>
        <ReadTime loaded={playStatus === PLAY_STATUS.STOP} />
      </div>
    </div>
  );
};

export default Reader;
