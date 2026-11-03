# 🍅 Pomodoro Timer

A sleek, functional Pomodoro Timer built with vanilla web technologies. Focuses on clean state management, precise timing logic, and modern UI/UX principles.

## 🚀 Live Demo

[https://nicoperiz.github.io/pomodoro-timer/](https://nicoperiz.github.io/pomodoro-timer/)

## ✨ Features

- **Circular Progress Bar**: SVG-based visual feedback that depletes as time passes
- **Auto Session Switch**: Automatic toggling between Work and Break sessions
- **Dark Mode**: Toggle with preference saved in LocalStorage
- **Persistence**: LocalStorage saves user preferences and timer state across browser refreshes
- **Audio Notifications**: Audio alert on session completion
- **Tab Title Update**: Real-time timer displayed in the browser tab
- **Responsive UI**: Clean design with CSS Variables and Flexbox

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** (Custom Properties, SVG animations, Flexbox)
- **JavaScript (ES6+)** (DOM manipulation, LocalStorage API, setInterval)

## 🎯 Why I Built This

I wanted a simple, reliable Pomodoro timer that works without any framework. I also wanted to practice state management (the timer survives page reloads), SVG animations, and dark mode with persistence.

## 📚 What I Learned

- Managing timer state with `setInterval` and `clearInterval`
- Persisting state across page reloads with `localStorage`
- Building a circular progress bar with SVG and `stroke-dashoffset`
- Handling dark mode with CSS variables and `localStorage`

## 🧠 Technical Highlights

- **SVG Math**: Circumference calculation and `stroke-dashoffset` manipulation for the circular progress effect
- **Timer Safety**: Managing timer IDs to prevent multiple instance bugs
- **State Persistence**: The timer resumes from where it left off after a page reload

## 👤 Author

Nico Periz