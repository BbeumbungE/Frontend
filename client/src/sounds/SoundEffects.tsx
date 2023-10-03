import useSound from 'use-sound';
import ClapSound from '../assets/sound/effect/human_crowd_applause_snooker_match_002.mp3';
import AlarmSound from '../assets/sound/effect/zapsplat_multimedia_ui_chime_alert_notification_simple_chime_correct_answer_88733.mp3';
import BtnSmallSound from '../assets/sound/effect/zapsplat_multimedia_button_click_bright_001_92098.mp3';
import BtnSmallSound2 from '../assets/sound/effect/zapsplat_multimedia_button_click_bright_002_92099.mp3';
import BtnBrightSound from '../assets/sound/effect/zapsplat_multimedia_button_click_bright_003_92100.mp3';
import BtnBrightSound2 from '../assets/sound/effect/zapsplat_multimedia_game_sound_positive_bright_warm_synth_001_60700.mp3';
import ErrorSound from '../assets/sound/effect/zapsplat_multimedia_game_tone_synth_bright_organ_style_short_stab_warning_error_002_50785.mp3';
import StampSound from '../assets/sound/effect/zapsplat_foley_footstep_single_stomp_on_metal_drain_cover_002_81772.mp3';
import SuccessSound from '../assets/sound/effect/cartoon_success_fanfair.mp3';
import CompleteSound from '../assets/sound/effect/zapsplat_multimedia_game_sound_finish_complete_success_bright_warm_synth_003_60690.mp3';
import WandSound from '../assets/sound/effect/zapsplat_fantasy_magic_wand_ping_bright_002_68678.mp3';
import BtnWarmSound from '../assets/sound/effect/zapsplat_multimedia_game_sound_synth_stab_warm_bright_alert_005_38400.mp3';
import BtnWarmSound2 from '../assets/sound/effect/zapsplat_multimedia_game_sound_synth_stab_warm_bright_alert_003_38398.mp3';
import BtnWarmSound3 from '../assets/sound/effect/zapsplat_multimedia_game_sound_synth_stab_warm_bright_alert_004_38399.mp3';

const SoundEffects = () => {
  const [playComplete] = useSound(CompleteSound, {
    volume: 0.35,
  });
  const [playSuccess] = useSound(SuccessSound, {
    volume: 0.35,
  });
  const [playClap] = useSound(ClapSound, {
    volume: 0.35,
  });

  const [playAlarm] = useSound(AlarmSound, {
    volume: 0.35,
  });

  const [playBtnSmall] = useSound(BtnSmallSound, {
    volume: 0.35,
  });
  const [playBtnSmall2] = useSound(BtnSmallSound2, {
    volume: 0.35,
  });
  const [playBtnBright] = useSound(BtnBrightSound, {
    volume: 0.37,
  });
  const [playBtnBright2] = useSound(BtnBrightSound2, {
    volume: 0.25,
  });
  const [playError] = useSound(ErrorSound, {
    volume: 0.35,
  });
  const [playStamp] = useSound(StampSound, {
    volume: 0.35,
  });
  const [playWand] = useSound(WandSound, {
    volume: 0.35,
  });
  const [playBtnWarm] = useSound(BtnWarmSound, {
    volume: 0.31,
  });
  const [playBtnWarm2] = useSound(BtnWarmSound2, {
    volume: 0.31,
  });
  const [playBtnWarm3] = useSound(BtnWarmSound3, {
    volume: 0.31,
  });
  // 다른 효과음도 필요한 경우, 이곳에 추가

  return {
    playComplete,
    playSuccess,
    playError,
    playStamp,
    playClap,
    playAlarm,
    playBtnSmall,
    playBtnSmall2,
    playBtnBright,
    playBtnBright2,
    playWand,
    playBtnWarm,
    playBtnWarm2,
    playBtnWarm3,
  };
};

export default SoundEffects;
