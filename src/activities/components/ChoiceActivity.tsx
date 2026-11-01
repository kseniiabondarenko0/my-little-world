import { useEffect, useState } from 'react';
import type { ActivityProps } from '../registry';
import { normalize } from '../engine';
import { ModelPreview } from '../../components/3d/ModelPreview';
import { SpeakButton } from '../../components/ui/SpeakButton';
import { useUI } from '../../hooks/useUIStore';
import { speak } from '../speech';

// One component for every "pick an answer" activity:
// vocabulary (with 3D object), picture → word, listening, multiple choice, sentence gap, translation.

export function ChoiceActivity({ question, onAnswer }: ActivityProps) {
  const [chosen, setChosen] = useState<string | null>(null);
  const answered = chosen !== null;

  const choose = (option: string) => {
    if (answered) return;
    setChosen(option);
    onAnswer(normalize(option) === normalize(question.answer));
  };

  const [before, after] = question.sentence ? question.sentence.split('___') : ['', ''];
  const thumbnail = useUI((s) => s.thumbnails[question.objectId]);
  const listening = question.type === 'listening';

  useEffect(() => {
    if (listening) {
      const t = setTimeout(() => speak(question.answer), 350);
      return () => clearTimeout(t);
    }
  }, [listening, question.answer]);

  return (
    <div className="activity">
      <p className="activity-prompt">{question.prompt}</p>

      {question.showModel && (
        <div className="activity-model">
          <ModelPreview objectId={question.objectId} />
        </div>
      )}

      {question.type === 'imageChoice' && (
        <div className="activity-model">
          {thumbnail ? <img className="activity-thumb" src={thumbnail} alt="" /> : <ModelPreview objectId={question.objectId} />}
        </div>
      )}

      {listening && (
        <button className="listen-big" onClick={() => speak(question.answer)} aria-label="Play the word again">
          🔊<span>Play again</span>
        </button>
      )}

      {question.type === 'translation' && (
        <div className="activity-native">
          <span className="native-word">{question.native}</span>
        </div>
      )}

      {question.sentence && (
        <p className="activity-sentence">
          {before}
          <span className={`gap ${answered ? (normalize(chosen!) === normalize(question.answer) ? 'gap-right' : 'gap-wrong') : ''}`}>
            {answered ? chosen : '     '}
          </span>
          {after}
          {answered && <SpeakButton text={question.sentence.replace('___', question.answer)} small />}
        </p>
      )}

      <div className="options">
        {question.options.map((option) => {
          const isAnswer = normalize(option) === normalize(question.answer);
          const state = !answered ? '' : isAnswer ? 'right' : option === chosen ? 'wrong' : 'dim';
          return (
            <button key={option} className={`option ${state}`} onClick={() => choose(option)} disabled={answered}>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
