import { useState } from 'react';
import './App.css';

// Import all images one by one
import abrams from './assets/heroes/1 - Abrams.jpg';
import lash from './assets/heroes/10 - Lash.jpg';
import mcginnis from './assets/heroes/11 - McGinnis.jpg';
import mirage from './assets/heroes/12 - Mirage.jpg';
import moKrill from './assets/heroes/13 - Mo & Krill.jpg';
import paradox from './assets/heroes/14 - Paradox.jpg';
import pocket from './assets/heroes/15 - Pocket.jpg';
import seven from './assets/heroes/16 - Seven.jpg';
import shiv from './assets/heroes/17 - Shiv.jpg';
import vindicta from './assets/heroes/18 - Vindicta.jpg';
import viscous from './assets/heroes/19 - Viscous.jpg';
import bebop from './assets/heroes/2 - Bebop.jpg';
import warden from './assets/heroes/20 - Warden.jpg';
import wraith from './assets/heroes/21 - Wraith.jpg';
import yamato from './assets/heroes/22 - Yamato.jpg';
import dynamo from './assets/heroes/3 - Dynamo.jpg';
import greyTalon from './assets/heroes/4 - Grey Talon.jpg';
import haze from './assets/heroes/5 - Haze.jpg';
import infernus from './assets/heroes/6 - Infernus.jpg';
import ivy from './assets/heroes/7 - Ivy.jpg';
import kelvin from './assets/heroes/8 - Kelvin.jpg';
import ladyGeist from './assets/heroes/9 - Lady Geist.jpg';

// Store the imported images in an array
const heroes = [
  abrams,
  bebop,
  dynamo,
  greyTalon,
  haze,
  infernus,
  ivy,
  kelvin,
  ladyGeist,
  lash,
  mcginnis,
  mirage,
  moKrill,
  paradox,
  pocket,
  seven,
  shiv,
  vindicta,
  viscous,
  warden,
  wraith,
  yamato,
];

// Helper function to create a delay
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function App() {
  const [heroNum, setHeroNum] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRandomHero = async () => {
    setLoading(true); // Show loader
    let randomIndex;

    // Keep generating random numbers until it's different from the current one
    do {
      randomIndex = Math.floor(Math.random() * heroes.length);
    } while (randomIndex === heroNum);

    await sleep(1000); // Wait for 1 second
    setHeroNum(randomIndex);
    setLoading(false); // Hide loader
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {loading ? (
        // Loader while the image is being updated
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Loading...</div>
      ) : (
        <img
          src={heroes[heroNum]}
          alt={`Hero ${heroNum + 1}`}
          style={{ width: '300px', height: 'auto' }}
        />
      )}
      <div>
        <button onClick={handleRandomHero} disabled={loading}>
          Random Hero
        </button>
      </div>
    </div>
  );
}

export default App;
