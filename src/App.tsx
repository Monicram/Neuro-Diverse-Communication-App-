import { useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [expandedText, setExpandedText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState('');

  /* ================= DATASET ================= */

  const expansions: Record<string, string> = {
    good: 'I feel good.',
    bad: 'I feel bad.',
    happy: 'I feel happy.',
    sad: 'I feel sad.',
    angry: 'I feel angry.',
    tired: 'I feel tired.',
    sleepy: 'I feel sleepy.',
    excited: 'I feel excited.',
    calm: 'I feel calm.',
    scared: 'I feel scared.',
    nervous: 'I feel nervous.',
    confused: 'I feel confused.',
    overwhelmed: 'I feel overwhelmed.',

    thirsty: 'I am thirsty.',
    hungry: 'I am hungry.',
    sick: 'I feel sick.',
    hot: 'I feel too hot.',
    cold: 'I feel cold.',
    'head pain': 'My head hurts.',
    'stomach pain': 'My stomach hurts.',
    'eye hurt': 'My eyes hurt.',

    loud: 'The sound is too loud.',
    quiet: 'I need a quiet place.',
    bright: 'The light is too bright.',
    dark: 'It is too dark.',
    smell: 'The smell is unpleasant.',
    touch: 'I do not want to be touched.',
    crowd: 'Too many people make me uncomfortable.',

    help: 'I need help.',
    break: 'I need a break.',
    rest: 'I need to rest.',
    sleep: 'I need to sleep.',
    water: 'I want water.',
    food: 'I want food.',
    toilet: 'I need the bathroom.',
    hug: 'I want a hug.',

    stop: 'Please stop.',
    wait: 'Please wait.',
    slow: 'Please speak slowly.',
    repeat: 'Please repeat that.',
    listen: 'Please listen to me.',

    home: 'I want to go home.',
    routine: 'I want the same routine.',
    change: 'I do not like changes.',
    alone: 'I want to be alone.',
    stay: 'I want to stay here.',
    leave: 'I want to leave.',

    panic: 'I am panicking.',
    'too much': 'This is too much for me.',
    emergency: 'I need help right now.'
  };

  /* ================= EXPAND LOGIC ================= */

  const expandText = (text: string): string => {
    const normalized = text.toLowerCase();
    const keys = Object.keys(expansions).sort(
      (a, b) => b.length - a.length
    );

    for (const key of keys) {
      if (normalized.includes(key)) {
        return expansions[key];
      }
    }

    const words = normalized.split(' ');
    if (words.length === 1) return `I feel ${words[0]}.`;
    return text.endsWith('.') ? text : text + '.';
  };

  /* ================= SPEECH RECOGNITION ================= */

  const startRecording = async () => {
    try {
      setError('');
      setSpokenText('');
      setExpandedText('');
      setIsRecording(true);

      const perm = await SpeechRecognition.requestPermissions();
      if (perm.speechRecognition !== 'granted') {
        setError('Microphone permission not granted');
        return;
      }

      const result = await SpeechRecognition.start({
        language: 'en-US',
        maxResults: 1,
        prompt: 'Speak now',
        partialResults: false,
        popup: true
      });

      if (result.matches?.length) {
        const text = result.matches[0];
        setSpokenText(text);
        setExpandedText(expandText(text));
      }
    } catch {
      setError('Speech recognition failed');
    } finally {
      setIsRecording(false);
    }
  };

  /* ================= NATIVE TEXT TO SPEECH ================= */

  const speak = async () => {
    if (!expandedText) return;

    try {
      setIsSpeaking(true);
      await TextToSpeech.speak({
        text: expandedText,
        lang: 'en-US',
        rate: 0.9,
        pitch: 1.0,
        volume: 1.0
      });
    } catch {
      setError('Text to speech failed');
    } finally {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = async () => {
    await TextToSpeech.stop();
    setIsSpeaking(false);
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-2">
          Neurodiverse Communication
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Speak simply. Message clearly.
        </p>

        {error && (
          <div className="mb-4 text-red-600 text-center">{error}</div>
        )}

        <div className="flex justify-center mb-6">
          <button
            onClick={startRecording}
            className={`px-6 py-3 rounded-full text-white font-semibold flex gap-2 items-center ${
              isRecording ? 'bg-red-500' : 'bg-blue-600'
            }`}
          >
            {isRecording ? <MicOff /> : <Mic />}
            {isRecording ? 'Listening…' : 'Start'}
          </button>
        </div>

        {spokenText && (
          <div className="mb-4 p-4 bg-blue-50 rounded-xl">
            <strong>You said:</strong>
            <p>{spokenText}</p>
          </div>
        )}

        {expandedText && (
          <div className="p-4 bg-purple-50 rounded-xl">
            <strong>Meaning:</strong>
            <p className="mb-4">{expandedText}</p>

            <button
              onClick={isSpeaking ? stopSpeaking : speak}
              className="px-4 py-2 bg-purple-600 text-white rounded-full flex gap-2 items-center"
            >
              {isSpeaking ? <VolumeX /> : <Volume2 />}
              {isSpeaking ? 'Stop' : 'Speak'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;