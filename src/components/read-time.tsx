import {useState, useEffect} from "react";

interface ILoaded {
  loaded: boolean;
}

let totalSeconds = 0;

const ReadTime = ({loaded}: ILoaded) => {
  const [displayTime, setDisplayTime] = useState("00:00");

  const pad = (val: string) => {
    let valString = `${val}`;
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  };

  useEffect(() => {
    if (loaded) {
      let timer = setInterval(() => {
        ++totalSeconds;
        const minutes = `${parseInt(`${totalSeconds / 60}`, 10)}`;
        const seconds = `${parseInt(`${totalSeconds % 60}`, 10)}`;
        setDisplayTime(`${pad(minutes)}:${pad(seconds)}`);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setDisplayTime("00:00");
      totalSeconds = 0;
    }
  }, [loaded]);

  return (
    <div className={`read_spectrum_container ${loaded ? "open" : "closed"}`}>
      <div className="player_container">
        <p>{displayTime}</p>
      </div>
    </div>
  );
};

export default ReadTime;
