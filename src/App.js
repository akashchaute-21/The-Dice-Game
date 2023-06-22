import "./App.css";
import { useState } from "react";
import dices from "../src/assets/dices.png"
import dice1 from "../src/assets/dice/dice1.png"
import dice2 from "../src/assets/dice/dice2.png"
import dice3 from "../src/assets/dice/dice3.png"
import dice4 from "../src/assets/dice/dice4.png"
import dice5 from "../src/assets/dice/dice5.png"
import dice6 from "../src/assets/dice/dice6.png"
import bgImg from "../src/assets/bg-texture1.png"

function App() {


  const diceImages = {
    1: dice1,
    2: dice2,
    3: dice3,
    4: dice4,
    5: dice5,
    6: dice6,
    // Map other dice numbers to their corresponding imported images
  };

  const[gameStarted, setGameStarted] = useState(false);
  const[selectedNumber, setSelectedNumber] = useState();
  const [dice, setDice] = useState(1);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);

  const startGameHandler = () =>{
    setGameStarted(true);
  };

  const numbers = [1,2,3,4,5,6];

  console.log(selectedNumber);
  const onNumberClicked = (value) => {
    setSelectedNumber(value);
    setError(null);
  };

  const genRandomNo = () => {
    if(selectedNumber){
      const generatedNo = Math.ceil(Math.random() * 6);
      setDice(generatedNo);

      if(selectedNumber === generatedNo){
        setScore((prev) => prev + generatedNo);
      }
      else{
        setScore((prev) => prev -2);
      }
    }
    else{
      setError("Please Select Number");
    }
  };

  return (
    <>
  
    {gameStarted ?( 
        <>
        <div className="w-full h-full bg-gradient-to-r from-red-100 via-orange-100 to-yellow-100">
      <div className="flex flex-col justify-center items-center max-w-1300px mx-auto h-screen">
        <div>
        <h1 className={`mb-8 text-6xl text-${error ? 'red-600' : 'black'} align-middle font-bold`} >
          {error ? error : "Select Number"}
        </h1>
        </div>


        <div className="flex-row">
        <div className="pb-10 flex flex-row">

          {numbers.map((value) => (
            <div
              className={`cursor-pointer flex-row rounded-md mr-2 text-2xl justify-center items-center h-[50px] w-[50px] ${selectedNumber === value ? 'bg-green-600' : 'bg-black'} text-white`}
              onClick={() => onNumberClicked(value)}
              key={value}
            >
               <div className="text-center items-center mt-2">{value}</div>
            </div>

          ))}
        </div>
        </div>
        
        <div className="h-150 w-150" onClick={genRandomNo}>
          <img src={diceImages[dice]} className="cursor-pointer" alt="Dice" />
        </div>

        <p className="text-xl mt-5">Click on the dice to roll</p>
        <p className={`text-8xl font-bold ${score >= 0 ? 'text-green-600' : 'text-red-600'}`}>{score}</p>
        <p className="text-5xl mt-4 mb-4">Total Score</p>



        <div>
        <button className="bg-black text-white hover:bg-gray-700 px-4 py-2 rounded-md mt-3" onClick={() => setScore(0)}>
          Reset Score
        </button>
        </div>
      <button
        className=" hover:bg-gray-300 bg-black text-2xl px-4 py-2 rounded-md text-white self-end mr-14 mt-14"
        onClick={() => setGameStarted(false)}>
        Back
      </button>
      </div>


      <div className="max-w-900px mx-8 items-center justify-center">
        <h2 className="font-semibold text-lg">Game Rules:-</h2>
        <ul>
          <li>1) Select a number from 1 to 6.</li>
          <li>2) Click on the dice image to roll it.</li>
          <li>3) If the selected number is equal to the number obtained on the dice, you will get the same number of points as the dice number.</li>
          <li>4) If the number on the dice and the selected number are different, the score will be deducted by 2.</li>
          <li>5) The score can be reset to 0 by clicking the Reset Score button.</li>
        </ul>
      </div>
    </div>
    
        </>
    ) : <>
    <div className=" bg-[] bg-repeat bg-cover w-full h-screen bg-gradient-to-r from-red-100 via-orange-100 to-yellow-100">
      <div className="flex justify-center items-center">
        <img className="w-1/2" src={dices} alt="Dice" />
        <div className="flex flex-col">
          <h1 className="bg-gradient-to-r from-violet-500 to-pink-500 text-transparent bg-clip-text text-6xl font-extrabold">
            The Dice Game!
          </h1>
          <button
            className="bg-black text-white hover:bg-gray-700 self-end px-4 py-2 rounded-md mt-4"
            onClick={setGameStarted}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
    </>
    }
    
  </>
  );
}

export default App;
