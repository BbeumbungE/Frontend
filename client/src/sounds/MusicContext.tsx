import React, { createContext, useState, useContext, useMemo } from 'react';
import useSound from 'use-sound';
import drawBGM from '../assets/sound/background/cheeky_monkey_fun_app_playful_cheeky.mp3';
import stageBGM from '../assets/sound/background/African_fun_long.mp3';
import mainBGM from '../assets/sound/background/mr_clown.mp3';

const BGMContext = createContext<
  | {
      startBGM: (bgmType: 'main' | 'stage' | 'draw') => void;
      stopBGM: () => void;
      toggleMute: () => void; // 무음 모드를 토글하기 위한 함수
      isMuted: boolean; // 무음 모드 상태를 나타내는 변수
    }
  | undefined
>(undefined);

export const BGMProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [playMain, { stop: stopMain }] = useSound(mainBGM, {
    volume: 0.4,
    loop: true,
  });
  const [playStage, { stop: stopStage }] = useSound(stageBGM, {
    volume: 0.4,
    loop: true,
  });
  const [playDraw, { stop: stopDraw }] = useSound(drawBGM, {
    volume: 0.4,
    loop: true,
  });
  const [mainPlaying, setMainPlaying] = useState(false);
  const [stagePlaying, setStagePlaying] = useState(false);
  const [drawPlaying, setDrawPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // 초기값은 무음 모드가 아님

  // useMemo를 사용하여 value 객체를 최적화
  const value = useMemo(
    () => ({
      mainPlaying,
      stagePlaying,
      drawPlaying,
      isMuted,
      startBGM: (bgmType: 'main' | 'stage' | 'draw') => {
        console.log('play', isMuted);
        if (!isMuted) {
          switch (bgmType) {
            case 'main':
              if (!mainPlaying) {
                if (stagePlaying) {
                  stopStage();
                  setStagePlaying(false);
                }
                if (drawPlaying) {
                  stopDraw();
                  setDrawPlaying(false);
                }
                playMain();
                setMainPlaying(true);
              }
              break;
            case 'stage':
              if (!stagePlaying) {
                if (mainPlaying) {
                  stopMain();
                  setMainPlaying(false);
                }
                if (drawPlaying) {
                  stopDraw();
                  setDrawPlaying(false);
                }
                playStage();
                setStagePlaying(true);
              }
              break;
            case 'draw':
              if (!drawPlaying) {
                if (mainPlaying) {
                  stopMain();
                  setMainPlaying(false);
                }
                if (stagePlaying) {
                  stopStage();
                  setStagePlaying(false);
                }
                playDraw();
                setDrawPlaying(true);
              }
              break;
            default:
              break;
          }
        }
      },
      stopBGM: () => {
        if (mainPlaying) {
          stopMain();
          setMainPlaying(false);
        }
        if (stagePlaying) {
          stopStage();
          setStagePlaying(false);
        }
        if (drawPlaying) {
          stopDraw();
          setDrawPlaying(false);
        }
      },
      toggleMute: () => {
        setIsMuted(!isMuted); // 무음 모드를 토글
      },
    }),
    [
      mainPlaying,
      stagePlaying,
      drawPlaying,
      playMain,
      stopMain,
      playStage,
      stopStage,
      playDraw,
      stopDraw,
      isMuted,
    ],
  );

  return <BGMContext.Provider value={value}>{children}</BGMContext.Provider>;
};

export const useBGM = () => {
  const context = useContext(BGMContext);
  if (context === undefined) {
    throw new Error('useBGM must be used within a BGMProvider');
  }
  return context;
};
