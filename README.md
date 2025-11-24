# 10 Things I Can't Live Without - Slideshow

A React + Vite slideshow project with Tailwind CSS, featuring fullscreen mode and keyboard navigation.

## Features

- 📱 Responsive design (mobile, tablet, desktop)
- 🖼️ Fullscreen slideshow mode
- ⌨️ Keyboard navigation (Arrow keys, F for fullscreen, ESC to exit)
- 🎥 Video section with YouTube embed
- 🌐 Bilingual support (English/Português)
- 🔗 Footer with links to other projects

## Installation

Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

## Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

```
yasigi-project/
├── public/
│   └── icons/          # Image assets
├── src/
│   ├── components/
│   │   ├── Slideshow.jsx
│   │   ├── VideoSection.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── slidesData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Usage

- Use arrow keys (← →) to navigate between slides
- Press `F` to toggle fullscreen mode
- Press `ESC` to exit fullscreen
- Switch between Slideshow and Video sections using the header buttons
- Change language using the dropdown selector



