import React, {useEffect, useState} from "react";
import "./styles.css";
import Reader from "./components/reader";

export default function App() {
  
  const [textToRead, setTextToRead] = useState("");

  useEffect(() => {
    setTextToRead("Hello World. I am an experimental NFT.")
  }, []);

  return (
    <main>
      <div className="nft-box">
        <img alt="Interactive NFT" src="nft.png" className="center" width="400" height="500"></img>
        <Reader textToRead={textToRead} />
      </div>
    </main>
  );
}