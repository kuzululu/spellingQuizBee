// src/shared/components/SpellingQuiz.jsx
import React, { useEffect, useState, useRef } from 'react';
import WORDS from '../wordLists/words.json'; // adjust path as needed

// Utilities
function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function chunk(array, size) {
  const out = [];
  for (let i = 0; i < array.length; i += size) {
    out.push(array.slice(i, i + size));
  }
  return out;
}

export default function SpellingQuiz({
  words = WORDS,
  groupSize = 10,        // group size (10 words per group)
  autoSpeak = true
}) {
  // state controlling deck + grouping
  const [deck, setDeck] = useState(() => shuffle(words));
  const [groups, setGroups] = useState(() => chunk(shuffle(words), groupSize));
  const [groupIndex, setGroupIndex] = useState(0);   // which group (0-based)
  const [itemIndex, setItemIndex] = useState(0);     // index within current group
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  // derived helpers
  const currentGroup = groups[groupIndex] || [];
  const current = currentGroup[itemIndex] ?? null;
  const overallIndex = groupIndex * groupSize + itemIndex; // 0-based overall
  const overallTotal = deck.length;
  const currentGroupTotal = currentGroup.length || 0;
  const groupTotal = groups.length || 0;

  // voice selection (same as your previous speak logic)
  function selectPreferredVoice(voices) {
    const preferredNames = [
     'Google US English',
      'Google UK English Female',
      'Microsoft Zira',
      'Microsoft Aria',
      'Samantha',
      'Alloy'
    ];
    let v = voices.find(vv => preferredNames.some(n => vv.name.includes(n)));
    if (v) return v;
    v = voices.find(vv => /female/i.test(vv.name));
    if (v) return v;
    v = voices.find(vv => vv.lang && vv.lang.startsWith('en'));
    if (v) return v;
    return voices[0] || null;
  }

  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    let voices = synth.getVoices();
    if (!voices || !voices.length) {
      const handler = () => {
        synth.removeEventListener('voiceschanged', handler);
        setTimeout(() => speak(text), 50);
      };
      synth.addEventListener('voiceschanged', handler);
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.9;
    utter.pitch = 1.0;
    const v = selectPreferredVoice(voices);
    if (v) utter.voice = v;
    synth.cancel();
    synth.speak(utter);
  }

  // Initialize / rebuild groups when deck or groupSize changes
  useEffect(() => {
    const shuffled = shuffle(words);
    setDeck(shuffled);
    setGroups(chunk(shuffled, groupSize));
    setGroupIndex(0);
    setItemIndex(0);
    setScore(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, groupSize]);

  // Reset input/feedback when itemIndex or groupIndex changes
  useEffect(() => {
    setAnswer('');
    setFeedback(null);
    setShowAnswer(false);
    setTimeout(() => inputRef.current?.focus(), 50);
    if (autoSpeak && current) {
      setTimeout(() => speak(`Spell ${current}`), 150);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupIndex, itemIndex, current]);

  // Answer checking
  function checkAnswer(submitted) {
    if (!current) return;
    const normalized = (submitted ?? answer).trim().toLowerCase();
    const correct = current.toLowerCase();
    if (normalized === correct) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('wrong');
    }
  }
  function handleSubmit(e) {
    e?.preventDefault();
    if (feedback) return;
    checkAnswer(answer);
  }

  // Navigation: next/prev item within group
  function goNextItem() {
    if (!currentGroup.length) return;
    if (itemIndex < currentGroup.length - 1) {
      setItemIndex(i => i + 1);
    } else {
      // end of group -> if next group exists, go to next group; else reshuffle
      if (groupIndex < groups.length - 1) {
        setGroupIndex(g => g + 1);
        setItemIndex(0);
      } else {
        // finished all groups -> reshuffle the whole deck and rebuild groups
        const newDeck = shuffle(deck);
        const newGroups = chunk(newDeck, groupSize);
        setDeck(newDeck);
        setGroups(newGroups);
        setGroupIndex(0);
        setItemIndex(0);
        setScore(0);
      }
    }
  }

  function goPrevItem() {
    if (itemIndex > 0) {
      setItemIndex(i => i - 1);
    } else if (groupIndex > 0) {
      // go to previous group last item
      const prevGroupIndex = groupIndex - 1;
      const lastInPrev = (groups[prevGroupIndex]?.length || groupSize) - 1;
      setGroupIndex(prevGroupIndex);
      setItemIndex(lastInPrev);
    }
  }

  // Group navigation explicit
  function goNextGroup() {
    if (groupIndex < groups.length - 1) {
      setGroupIndex(g => g + 1);
      setItemIndex(0);
    }
  }
  function goPrevGroup() {
    if (groupIndex > 0) {
      setGroupIndex(g => g - 1);
      setItemIndex(0);
    }
  }

  function revealAnswer() {
    setShowAnswer(true);
    setFeedback('wrong');
    if (current) speak(current);
  }

  function restart() {
    const newDeck = shuffle(words);
    setDeck(newDeck);
    const newGroups = chunk(newDeck, groupSize);
    setGroups(newGroups);
    setGroupIndex(0);
    setItemIndex(0);
    setScore(0);
    setAnswer('');
    setFeedback(null);
    setShowAnswer(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  if (!groups.length) {
    return <div className="container my-4"><div className="card"><div className="card-body">No words available.</div></div></div>;
  }

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Grade 1 — Spelling Quiz</h5>

          <div className="d-flex justify-content-between mb-3">
            <div>
              <small className="text-muted">Question</small>
              <div className="fw-bold">{itemIndex + 1} / {currentGroupTotal}</div>
              <div className="small text-muted">Group {groupIndex + 1} / {groupTotal}</div>
            </div>

            <div className="text-end">
              <small className="text-muted">Overall</small>
              <div className="fw-bold">{overallIndex + 1} / {overallTotal}</div>
              <div className="small text-muted">Score {score}</div>
            </div>
          </div>

          <p className="mb-1">Listen and spell the word:</p>
          <div className="mb-3 d-flex align-items-center gap-2">
            <button
              type="button"
              onClick={() => current && speak(`Spell ${current}`)}
              className="btn btn-outline-primary btn-sm"
              aria-label="Play prompt"
            >
              🔊 Play
            </button>
            <small className="text-muted">(or press Enter to submit)</small>
          </div>

          <form onSubmit={handleSubmit} className="row g-2 align-items-center">
            <div className="col">
              <input
                ref={inputRef}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className={`form-control ${feedback === 'correct' ? 'is-valid' : feedback === 'wrong' ? 'is-invalid' : ''}`}
                placeholder="Type your spelling here"
                aria-label="Spelling input"
                autoComplete="off"
              />
            </div>

            <div className="col-auto">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>

          {feedback && (
            <div className={`mt-3 alert ${feedback === 'correct' ? 'alert-success' : 'alert-danger'}`} role="alert">
              {feedback === 'correct' ? (
                <div>✅ Correct! Great job.</div>
              ) : (
                <div>❌ Not quite. Try again or reveal the answer.</div>
              )}
            </div>
          )}

          {showAnswer && current && (
            <div className="mt-2">
              <small className="text-muted">Correct answer: </small>
              <strong>{current}</strong>
            </div>
          )}

          <div className="mt-3 d-flex gap-2 align-items-center">
            <div className="btn-group" role="group" aria-label="item navigation">
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={goPrevItem} disabled={groupIndex === 0 && itemIndex === 0}>◀ Prev</button>
              <button type="button" className="btn btn-light btn-sm" onClick={goNextItem}>Next ▶</button>
            </div>

            <div className="ms-2 btn-group" role="group" aria-label="group navigation">
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={goPrevGroup} disabled={groupIndex === 0}>Prev Group</button>
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={goNextGroup} disabled={groupIndex >= groups.length - 1}>Next Group</button>
            </div>

            <div className="ms-auto d-flex gap-2">
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={revealAnswer}>Show answer</button>
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => current && speak(current)}>Speak answer</button>
            </div>
          </div>

          <div className="mt-3 text-muted small">Tip: keep volume up so the child can hear the prompt.</div>

          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-outline-secondary btn-sm" onClick={restart}>Restart Quiz</button>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => {
                const newDeck = shuffle(words);
                setDeck(newDeck);
                setGroups(chunk(newDeck, groupSize));
                setGroupIndex(0);
                setItemIndex(0);
                setScore(0);
              }}
            >
              Shuffle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
