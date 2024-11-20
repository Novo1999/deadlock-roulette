import { motion } from 'framer-motion';
import { useState } from 'react';
import './App.css';
import { deadlockLogo, heroes } from './data.js';


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const defaultAlp = ['a', 'b', 'c', 'd', 'e', 'f']

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [playerCount, setPlayerCount] = useState(1);
  const [randomHeroIndices, setRandomHeroIndices] = useState(null)
  console.log("🚀 ~ App ~ randomHeroIndices:", randomHeroIndices)
  const [alp, setAlp] = useState(defaultAlp)
  const [lockedHeroes, setLockedHeroes] = useState([])
  console.log("🚀 ~ App ~ lockedHeroes:", lockedHeroes)

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

  const handleLockedHeroes = (val) => {
    setLockedHeroes(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])
  }

  return (
    <div className='m-auto flex flex-col items-center text-center'>
      <div className='flex gap-2 flex-wrap'>
        {
          (randomHeroIndices ? Array.from(randomHeroIndices) : Array(playerCount).fill(0)).map((val, index) => (
            <motion.div
              key={index}
              className='relative'
            >
              <motion.img
                onClick={() => handleLockedHeroes(val)}
                transition={{ duration: 0.7 }}
                animate={{ rotateY: isLoading ? 180 : 0 }}
                src={isLoading ? deadlockLogo : randomHeroIndices && randomHeroIndices.size > 0 ? heroes[val] : heroes[0]}
                alt={`Hero ${index + 1}`}
                className={`w-36 h-48 object-contain cursor-pointer hover:filter hover:grayscale ${lockedHeroes.includes(val) ? "filter grayscale" : ""}`}
              />
              <div className="badge badge-primary p-6 text-xl font-bold uppercase mt-2">{alp[index]}</div>
              {lockedHeroes.includes(val) && <div onClick={() => handleLockedHeroes(val)} className='absolute top-16 left-0 right-0 bottom-0 text-3xl z-[50] m-auto cursor-pointer'>🔒</div>}
            </motion.div>
          ))
        }
      </div>
      <div className="flex gap-2 items-center mt-16 flex-wrap">
        {playerCount > 1 && <input disabled={isLoading} onChange={e => setAlp(() => e.target.value.length === 0 ? defaultAlp : e.target.value.split(",").join(","))} type="text" className='input input-primary' placeholder='Names First Letter' maxLength={playerCount} />}
        <div className='dropdown'>
          <label
            disabled={isLoading}
            onClick={() => document.querySelector(".dropdown-content").style.display = "block"}
            tabIndex="0"
            role='button'
            htmlFor="player-count"
            className='btn m-1 btn-accent'
          >
            Player Count: <span className='badge text-white'>{playerCount}</span>
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
        <button disabled={isLoading} onClick={handleRandomHero} className='btn btn-primary'>Give Random Heroes</button>
      </div>
    </div>
  );
}

export default App;

