import { useState } from 'react';

import { motion, AnimatePresence } from "framer-motion";
import Grid from './Grid';

import './App.scss';
import { pages } from './assets/pages';

const BLUE = "#23B9F8"


function App() {

  const [page, setPage] = useState(pages[0]);

  /** Keyframes for carousel page changes */
  const carouselPage = {
    enter: {
      x: 'calc(100vw + 100%)',
      transition: {
        type: "tween",
        ease: [.75, 0, 1, .25],
        duration: .25
      }
    },
    center: {
      x: 'calc(50vw - 50%)',
      transition: {
        type: "tween",
        ease: [0, .75, .25, 1],
        duration: 1
      }
    },
    exit: {
      x: '-100%',
      transition: {
        type: "tween",
        ease: [.75, 0, 1, .25],
        duration: .25
      }
    },
  };

  /** Keyframes for carousel hero image reveals */
  const imageReveal = {
    enter: {
      clipPath: 'inset(50% 0% 50% 0%)',
      transition: {
        type: "tween",
        ease: [.75, 0, 1, .25],
        duration: .25
      },
    },
    center: {
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: {
        type: "tween",
        ease: [1, 0, 1, .5],
        duration: .5,
      },
    },
    exit: {
      transition: {
        type: "tween",
        ease: [.75, 0, 1, .25],
        duration: .25
      },
    },
  };

  /** keyframes for carousel page background reveals */
  const backgroundAnimation = {
    enter: {
      clipPath: 'inset( 0% 50% 0% 50% 0%)',
      scale: '25%',
      rotate: '-10deg',
      transition: {
        type: "tween",
        ease: [.75, 0, 1, .25],
        duration: .25
      },
    },
    center: {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: '100%',
      rotate: "0deg",
      transition: {
        type: "spring",
        bounce:.25,
        damping:10,
        duration: .5,
      },
    },
    exit: {
      clipPath: 'inset(25% 0% 75% 0%)',
      rotate:"-10deg",
      transition: {
        type: "tween",
        ease: [.75, 0, 1, .25],
        duration: .25
      },
    },
  };

  return (
    <main>
      <button onClick={() => { setPage(() => pages[(page.id) % pages.length]); }}>NEXT</button>
      <div className='carousel'>
        <AnimatePresence initial={false} mode="wait">
          <motion.div className='carousel-page'
            key={page.id}
            variants={carouselPage}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <motion.div className='carousel-pageContents'>
              {/* Accent Triangle */}
              <motion.div className='carousel-backgroundElements'
                variants={backgroundAnimation}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <Grid className="carousel-Grid"></Grid>
                <motion.svg viewBox='0 0 100 100'>
                  <polygon fill={`${BLUE}`} points={`${page.triangle}`}/>
                </motion.svg>
              </motion.div>

              {/* Hero Image for Page */}
              <motion.div className='carousel-imageContainer'
                key={page.id}
                variants={imageReveal}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <motion.img
                  src={page.image.url}
                  style={{ clipPath: `url(#clippingMask-${page.id})` }}
                />
                <svg className="carousel-imageMask" viewBox={`0 0 ${page.image.width} ${page.image.height}`}>
                  <clipPath id={`clippingMask-${page.id}`} clipPathUnits="objectBoundingBox">
                    <polygon points={`${page.image.maskPath}`} />
                  </clipPath>
                </svg>
              </motion.div>


            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

export default App;
