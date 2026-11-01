import { useState } from 'react';
import type { ActivityProps } from '../registry';
import { normalize } from '../engine';
import { useUI } from '../../hooks/useUIStore';
import { getFurniture } from '../../data/content';
import { SpeakButton } from '../../components/ui/SpeakButton';

// Word → choose the right picture.

export function PictureChoiceActivity({ question, onAnswer }: ActivityProps) {
  const [chosen, setChosen] = useState<number | null>(null);
  const thumbnails = useUI((s) => s.thumbnails);
  const answered = chosen !== null;

  return (
    <div className="activity">
      <p className="activity-prompt">
        Which picture is <b className="accent">{question.answer}</b>? <SpeakButton text={question.answer} small />
      </p>
      <div className="picture-grid">
        {question.options.map((option, i) => {
          const objectId = question.pictures?.[i] ?? '';
          const isAnswer = normalize(option) === normalize(question.answer);
          const state = !answered ? '' : isAnswer ? 'right' : chosen === i ? 'wrong' : 'dim';
          return (
            <button
              key={option}
              className={`picture-option ${state}`}
              disabled={answered}
              onClick={() => {
                setChosen(i);
                onAnswer(isAnswer);
              }}
              aria-label={answered ? option : `Picture ${i + 1}`}
            >
              {thumbnails[objectId] ? <img src={thumbnails[objectId]} alt="" /> : <span className="card-emoji">{objectId ? getFurniture(objectId).icon : '❓'}</span>}
              {answered && <span className="picture-caption">{option}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
