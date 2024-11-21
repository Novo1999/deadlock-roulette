import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { deadlockLogo, heroes } from './data.js';
import DownArrow from './DownArrow.jsx';
import { formatTime } from './utils/date-util.js';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const defaultAlp = ['a', 'b', 'c', 'd', 'e', 'f']

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [playerCount, setPlayerCount] = useState(1);
  const [randomHeroIndices, setRandomHeroIndices] = useState(null)
  const [alp, setAlp] = useState(defaultAlp.join(""))
  const [lockedHeroes, setLockedHeroes] = useState([])
  const [widthOfHeroSlots, setWidthOfHeroSlots] = useState("")
  const [history, setHistory] = useState([])
  const [lockingDisabled, setLockingDisabled] = useState(false)
  const historyOfLockedHeroes = useRef(null)

  const handleRandomHeroAfterLock = async (heroes) => {
    setIsLoading(true)
    await sleep(800)
    const newSet = new Set()
    while (newSet.size !== playerCount - lockedHeroes.length) {
      let randomIndex = Math.floor(Math.random() * heroes.length)
      if (lockedHeroes.includes(randomIndex)) {
        return handleRandomHeroAfterLock(heroes.filter((_, index) => index !== randomIndex))
      }
      newSet.add(randomIndex)
    }
    let indicesToIgnore = []
    const existingRandomHeroes = Array.from(randomHeroIndices)
    existingRandomHeroes.forEach((hero, index) => lockedHeroes.includes(hero) && indicesToIgnore.push(index))

    const arrayOfNewSet = Array.from(newSet)
    let newSetIndex = 0
    existingRandomHeroes.forEach((_, index) => {
      if (!indicesToIgnore.includes(index)) {
        existingRandomHeroes[index] = arrayOfNewSet[newSetIndex]
        newSetIndex++
      }
    })

    setRandomHeroIndices(new Set(existingRandomHeroes))
    setIsLoading(false)
  }

  const handleRandomHero = async () => {
    setIsLoading(true)
    await sleep(800)
    setRandomHeroIndices(prev => {
      const newSet = new Set(prev)
      if (newSet.size > 0) newSet.clear()
      while (newSet.size !== playerCount) {
        let randomIndex = Math.floor(Math.random() * heroes.length)
        newSet.add(randomIndex)
      }
      setHistory(prev => {
        if (prev.length >= 5) {
          prev.shift()
        }
        prev.push({ time: Date.now(), playerFirstLetter: alp, history: Array.from(newSet) })
        return prev
      })
      return newSet
    })
    setIsLoading(false)
    setLockingDisabled(false)
    setLockedHeroes([])
    historyOfLockedHeroes.current = null
  };

  const handleSelectPlayerCount = (e) => {
    const count = Number(e.target.innerText);
    if (!count) return;

    setPlayerCount(count);
    setRandomHeroIndices(null)
    setLockedHeroes([])
    setHistory([])
    setLockingDisabled(false)
    const dropdownContent = document.querySelector(".dropdown-content");
    dropdownContent.style.display = "none";
  };

  const handleLockedHeroes = (val) => {
    if (isLoading || lockingDisabled) return
    playerCount > 1 && !!randomHeroIndices && setLockedHeroes(prev => prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val])
  }

  useEffect(() => {
    const heroSlots = document.querySelector(".hero-slots")
    setWidthOfHeroSlots(heroSlots.clientWidth)
  }, [playerCount])

  return (
    <div className='m-auto flex flex-col items-center text-center'>
      {!!randomHeroIndices && playerCount > 1 && !lockingDisabled && <p className={`absolute top-12 text-2xl bg-white p-1 rounded px-4 ${lockedHeroes.length === playerCount ? "text-red-500" : "text-black"}`}>{lockedHeroes.length === playerCount && !lockingDisabled ? "What's the point of doing this?" : "Hover to Lock Heroes in Place"}</p>}
      {playerCount > 1 && <div style={{ width: widthOfHeroSlots, transition: "ease-in", transitionDuration: "0.3s" }} className={`absolute top-32 border-2 border-b`}>
      </div>}

      <div className='flex gap-2 flex-wrap mt-36 relative hero-slots'>
        {
          (randomHeroIndices ? Array.from(randomHeroIndices) : Array(playerCount).fill(0)).map((val, index) => (
            <motion.div
              key={index}
              className='relative'
            >
              {playerCount > 1 && randomHeroIndices && !lockingDisabled && <DownArrow fill={lockedHeroes.includes(val) ? "yellow" : "lime"} className={`w-12 absolute bottom-36 left-12 ${randomHeroIndices && !lockedHeroes.includes(val) ? "animate-bounceLow" : ""}`} />}
              <motion.img
                loading='lazy'
                onClick={() => handleLockedHeroes(val)}
                transition={{ duration: 0.7 }}
                animate={{ rotateY: isLoading && !lockedHeroes.includes(val) ? 180 : 0 }}
                src={isLoading && !lockedHeroes.includes(val) ? deadlockLogo : randomHeroIndices && randomHeroIndices.size > 0 ? heroes[val] : heroes[0]}
                alt={`Hero ${index + 1}`}
                className={`w-36 h-48 object-contain ${playerCount > 1 && !lockingDisabled ? "hover:filter hover:grayscale cursor-pointer" : ""} ${lockedHeroes.includes(val) && !lockingDisabled ? "filter grayscale" : ""}`}
              />
              <div className="badge badge-primary p-6 text-xl font-bold uppercase mt-2">{alp[index]}</div>
              {lockedHeroes.includes(val) && <div onClick={() => handleLockedHeroes(val)} className='absolute top-16 left-0 right-0 bottom-0 text-3xl z-[50] m-auto cursor-pointer'>🔒</div>}
            </motion.div>
          ))
        }
      </div>
      <div className="flex gap-2 items-center mt-16 flex-wrap">
        {playerCount > 1 && <input disabled={isLoading || lockingDisabled} onChange={e => setAlp(() => e.target.value.length === 0 ? defaultAlp.join('') : e.target.value.split(",").join(","))} type="text" className='input input-primary' placeholder='Names First Letter' maxLength={playerCount} />}
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
            className="dropdown-content bg-cyan-500 menu rounded-box z-[1] w-52 p-2 shadow text-black hidden"
          >{
              Array(6).fill(0).map((_, index) => (
                <li key={index} value={index + 1} className='hover:bg-white rounded-lg'><a>{index + 1}</a></li>
              ))
            }
          </ul>
        </div>
        <button disabled={isLoading || lockedHeroes.length === playerCount} onClick={lockedHeroes.length > 0 ? () => handleRandomHeroAfterLock(heroes) : handleRandomHero} className='btn btn-primary'>Give Random Heroes</button>
      </div>
      {
        history.length > 0 && <div className="bg-base-100 border flex flex-col gap-1 mt-4 p-1 rounded transition-all duration-200">
          <p className='font-bold'>History</p>
          {history.map((his, index) =>
            <div key={index} className="flex gap-1">
              <button onClick={() => {
                if (history[history.length - 1].time === his.time) {
                  setLockingDisabled(false)
                  setLockedHeroes(historyOfLockedHeroes.current)
                }
                else {
                  setLockingDisabled(true)

                  setLockedHeroes(prev => {
                    historyOfLockedHeroes.current = [...prev]
                    return []
                  })
                }
                setRandomHeroIndices(new Set(his.history))

              }} className='badge badge-primary self-center w-24 py-4 hover:bg-cyan-400'>{formatTime(his.time)}</button>
              {his.history.map((item, index) => (
                <div
                  key={item}>
                  <motion.img
                    loading='lazy'
                    src={heroes[item]}
                    alt={`Hero ${item}`}
                    className="w-12"
                  />
                  <p className='uppercase flex items-center justify-center'>{his.playerFirstLetter?.split('')[index]}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      }
    </div>
  );
}

export default App;

