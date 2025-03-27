import {useState, useEffect} from 'react'
import "./App.css"
import AlpacaNose from "./alpaca/nose.png"
import data from "./data"
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import { MdDownload } from "react-icons/md";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";



const App = () => {
  document.title = "Alpaca Generator";
  const [category, setCategory] = useState("Hair")
  
  const [background, setBackground] = useState(require("./alpaca/backgrounds/blue50.png"));  
  const [neck, setNeck] = useState(require("./alpaca/neck/default.png"));  
  const [leg , setLeg] = useState(require("./alpaca/leg/default.png"))
  const [mouth , setMouth] = useState(require("./alpaca/mouth/default.png"))
  const [eyes , setEyes] = useState(require("./alpaca/eyes/default.png"))
  const [hair, setHair] = useState(require("./alpaca/hair/default.png"))
  const [ears, setEars] = useState(require("./alpaca/ears/default.png"))
  const [accesories, setAccesories] = useState()
  
  const selectCategory = (event) => {
    let currentSelected = document.querySelector(".categories .selected")
    currentSelected.classList.remove("selected")
    
    let newSelected = event.target
    newSelected.classList.add("selected")

    setCategory(newSelected.innerHTML);
  }

  const selectStyle = (event, key, value) => {
    (value == "None") ? setAccesories() : console.log("error");
    (category == "Accesories") ? setAccesories(value) : console.log("error");
    (category == "Background") ? setBackground(value) : console.log("error");
    (category == "Ears") ? setEars(value) : console.log("error");
    (category == "Eyes") ? setEyes(value) : console.log("error");
    (category == "Hair") ? setHair(value) : console.log("error");
    (category == "Leg") ? setLeg(value) : console.log("error");
    (category == "Mouth") ? setMouth(value) : console.log("error");
    (category == "Neck") ? setNeck(value) : console.log("error");

    
    let currentSelected = document.querySelector(".styles .selected")
    if (currentSelected) {
      currentSelected.classList.remove("selected");
    }
    
    let newSelected = event.target
    newSelected.classList.add("selected")
  }

  const randomStyles = () => {
    const backgroundKeys = Object.keys(data["Background"]);
    const neckKeys = Object.keys(data["Neck"]);
    const legKeys = Object.keys(data["Leg"]);
    const mouthKeys = Object.keys(data["Mouth"]);
    const eyesKeys = Object.keys(data["Eyes"]);
    const hairKeys = Object.keys(data["Hair"]);
    const earsKeys = Object.keys(data["Ears"]);
    const accesoriesKeys = Object.keys(data["Accesories"]);
  
    const backgroundIndex = Math.floor(Math.random() * backgroundKeys.length);
    const neckIndex = Math.floor(Math.random() * neckKeys.length);
    const legIndex = Math.floor(Math.random() * legKeys.length);
    const mouthIndex = Math.floor(Math.random() * mouthKeys.length);
    const eyesIndex = Math.floor(Math.random() * eyesKeys.length);
    const hairIndex = Math.floor(Math.random() * hairKeys.length);
    const earsIndex = Math.floor(Math.random() * earsKeys.length);
    const accesoriesIndex = Math.floor(Math.random() * accesoriesKeys.length);
  
    setBackground(data["Background"][backgroundKeys[backgroundIndex]]);
    setNeck(data["Neck"][neckKeys[neckIndex]]);
    setLeg(data["Leg"][legKeys[legIndex]]);
    setMouth(data["Mouth"][mouthKeys[mouthIndex]]);
    setEyes(data["Eyes"][eyesKeys[eyesIndex]]);
    setHair(data["Hair"][hairKeys[hairIndex]]);
    setEars(data["Ears"][earsKeys[earsIndex]]);
    setAccesories(data["Accesories"][accesoriesKeys[accesoriesIndex]]);
  };
  
  const handleCaptureClick = async () => {
    const canvas = await html2canvas(document.querySelector(".alpaca"));
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, 'download.png', 'image/png');
  };

  useEffect(() => {
  }, [accesories]);


  return (
    <div className="container">
      <h1 className='title '>ALPACA GENERATOR</h1>
      <div className="alpaca">
          <img src={background} alt="" className='bg'/>
          <img src={neck} alt="" className='neck'/>
          <img src={leg} alt="" className='leg' />
          <img src={AlpacaNose} alt="" className='nose'/>
          <img src={mouth} alt="" className='mouth' />
          <img src={eyes} alt="" className='eyes' />
          <img src={hair} alt="" className='hair'/>
          <img src={ears} alt="" className='ears'/>
          {accesories && <img src={accesories} alt="" className='accesories' />}
      </div>
      <div className="buttons">
        <button onClick={randomStyles}><GiPerspectiveDiceSixFacesRandom className='icon'/>Random</button>
        <button onClick={handleCaptureClick}><MdDownload className='icon'/>Download</button>
      </div>

      <div className="category-container">
          <div className="category categories">
          <h1>ACCESSORIZE THE ALPACA'S</h1>
          <div className="all-buttons">
            <a className='selected' onClick={selectCategory}>Hair</a>
            <a onClick={selectCategory}>Ears</a>
            <a onClick={selectCategory}>Eyes</a>
            <a onClick={selectCategory}>Mouth</a>
            <a onClick={selectCategory}>Neck</a>
            <a onClick={selectCategory}>Leg</a>
            <a onClick={selectCategory}>Accesories</a>
            <a onClick={selectCategory}>Background</a>
          </div>
        </div>
        <div className="category styles">
          <h1>STYLE</h1>
          <div className="all-buttons">
            {Object.entries(data[category]).map(([key, value]) => (
              
              <a onClick={(event) => selectStyle(event, key, value)} className={(value === background || value === neck || value === leg || value === mouth || value === eyes || value === hair || value === ears || value === accesories) ? "selected" : ""} key={key}> {key}</a>

            ))}
          </div>
        </div>
      </div>

      
      
    </div>
  )
}

export default App