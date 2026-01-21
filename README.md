# 🍅 Professional Pomodoro Timer

A sleek, functional, and high-performance Pomodoro Timer built with vanilla web technologies. This project focuses on clean state management, precise asynchronous logic, and modern UI/UX principles.



## 🚀 Features

- **Dynamic Countdown**: A precise timer engine built with JavaScript `setInterval`.
- **Circular Progress Bar**: Interactive SVG-based visual feedback that depletes as time passes.
- **State Management**: Automatic toggling between "Work" and "Break" sessions.
- **Persistence**: Integration with **Local Storage** to save user preferences (session durations).
- **Audio Notifications**: High-quality audio alerts upon session completion.
- **Responsive UI**: Fully responsive design with modern CSS (Flexbox, CSS Variables).
- **Browser Integration**: Real-time timer updates in the browser tab title.

## 🛠️ Tech Stack

- **HTML5**: Semantic structure.
- **CSS3**: Custom properties (variables), SVG animations, and Flexbox.
- **JavaScript (ES6+)**: DOM manipulation, LocalStorage API, and Asynchronous logic.

## 🧠 What I Learned / Challenges

- **SVG Math**: Calculating the circumference ($2 \times \pi \times r$) and manipulating `stroke-dashoffset` to create the circular progress effect.
- **Logic Refactoring**: Managing timer IDs to prevent "multiple instance" bugs where the timer runs faster than intended.
- **UX Persistence**: Implementing `localStorage` to ensure a seamless experience across browser refreshes.

## 🏁 How to Run

1. Clone the repository.
2. Open `index.html` in any modern web browser.
3. Set your preferred focus/break times and start being productive!

## Author
Nico Periz