# 🧠 Neurodiverse Communication App

A mobile-friendly communication application designed to help neurodiverse individuals express themselves more effectively using AI-assisted speech recognition and text expansion.

The application listens to simple spoken words or phrases, converts them into meaningful sentences, and reads them aloud using Text-to-Speech, making communication easier in everyday situations.

---

## ✨ Features

- 🎤 Speech Recognition
- 📝 Converts short words into complete meaningful sentences
- 🔊 Text-to-Speech output
- 📱 Mobile support using Capacitor
- ⚡ Fast React + Vite interface
- 🎨 Clean and responsive UI

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Mobile
- Capacitor

### Libraries
- Capacitor Speech Recognition
- Capacitor Text-to-Speech
- Lucide React Icons

---

## 📂 Project Structure

```
src/
 ├── App.tsx          # Main application
 ├── main.tsx         # Entry point
 ├── index.css        # Styling

android/              # Android Capacitor project

package.json
vite.config.ts
```

---

## 🚀 How It Works

1. User taps **Start**.
2. Speech Recognition captures the spoken words.
3. The application searches its communication dataset.
4. Short phrases are expanded into complete sentences.
5. The generated sentence is displayed.
6. Text-to-Speech reads the sentence aloud.

Example:

```
Input:
happy

Output:
I feel happy.
```

Another example:

```
Input:
hungry

Output:
I am hungry.
```

---

## 📦 Installation

Clone the repository

```bash
git clone https://github.com/your-username/neurodiverse-communication-app.git
```

Go to the project folder

```bash
cd neurodiverse-communication-app
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Build the project

```bash
npm run build
```

---

## 📱 Android

To run on Android:

```bash
npx cap sync
npx cap open android
```

Build and run the project from Android Studio.

---

## 💡 Future Improvements

- AI-powered sentence generation
- Multiple language support
- Personalized communication profiles
- Cloud database integration
- Offline communication dataset
- Emotion detection
- Caregiver dashboard

---

## 🎯 Use Cases

- Autism Spectrum Disorder (ASD)
- Speech impairment assistance
- Cognitive communication support
- Educational environments
- Healthcare communication


---

## 📄 License

This project is developed for educational and research purposes.
