import { motion } from 'framer-motion';
import { useState } from 'react';
import './App.css';
import { deadlockLogo, heroes } from './data.js';

const alp = ['a', 'b', 'c', 'd', 'e', 'f']

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [playerCount, setPlayerCount] = useState(1);
  const [randomHeroIndices, setRandomHeroIndices] = useState(null)

  const handleRandomHero = async () => {
    setIsLoading(true)
    await sleep(800)
    setIsLoading(false)
    setRandomHeroIndices(prev => {
      const newSet = new Set(prev)
      if (newSet.size > 0) newSet.clear()
      while (newSet.size !== playerCount) {
        let randomIndex = Math.floor(Math.random() * heroes.length)
        newSet.add(randomIndex)
      }
      return newSet
    })
  };

  const handleSelectPlayerCount = (e) => {
    const count = Number(e.target.innerText);
    if (!count) return;

    setPlayerCount(count);
    setRandomHeroIndices(null)
    const dropdownContent = document.querySelector(".dropdown-content");
    dropdownContent.style.display = "none";
  };

  return (
    <div className='m-auto flex flex-col items-center' style={{ textAlign: 'center' }}>
      <div className='flex gap-2'>
        {
          (randomHeroIndices ? Array.from(randomHeroIndices) : Array(playerCount).fill(0)).map((val, index) => (
            <motion.div
              key={index}
            >
              <motion.img
                transition={{ duration: 0.7 }}
                animate={{ rotateY: isLoading ? 180 : 0 }}
                src={isLoading ? deadlockLogo : randomHeroIndices && randomHeroIndices.size > 0 ? heroes[val] : heroes[0]}
                alt={`Hero ${index + 1}`}
                className='w-36 h-48 object-contain'
              />
              <div className="badge badge-primary p-6 text-xl font-bold uppercase mt-2">{alp[index]}</div>
            </motion.div>
          ))
        }
      </div>
      <div className="dropdown mt-16">
        <label
          onClick={() => document.querySelector(".dropdown-content").style.display = "block"}
          tabIndex="0"
          role='button'
          htmlFor="player-count"
          className='btn m-1 btn-accent'
        >
          Player Count
        </label>
        <ul
          onClick={e => handleSelectPlayerCount(e)}
          tabIndex={0}
          className="dropdown-content bg-cyan-500 menu rounded-box z-[1] w-52 p-2 shadow text-black"
          style={{ display: "none" }}
        >{
            Array(6).fill(0).map((_, index) => (
              <li key={index} value={index + 1} className='hover:bg-white rounded-lg'><a>{index + 1}</a></li>
            ))
          }
        </ul>
      </div>
      <button onClick={handleRandomHero} className='btn btn-primary mt-4'>Give Random Heroes</button>
    </div>
  );
}

export default App;

