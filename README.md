# Triantaphilos Terzides - Portfolio Website

A professional portfolio website built with React, Vite, and TailwindCSS to showcase my work as a React/React Native Developer.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean and professional interface with smooth animations
- **Project Showcase**: Detailed case studies of my development projects
- **Skills Section**: Highlighting my technical expertise and certifications
- **Contact Form**: Easy way for potential clients to reach out

## Technologies Used

- **React**: Frontend library for building the user interface
- **Vite**: Fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework for styling
- **React Router**: For handling navigation within the application

## Project Structure

```
portfolio-site/
├── public/                 # Static assets
│   └── assets/
│       ├── images/         # Image assets
│       └── videos/         # Video assets
├── src/
│   ├── assets/             # Component-specific assets
│   ├── components/         # Reusable components
│   │   ├── about/          # About page components
│   │   ├── common/         # Shared components (navbar, footer, etc.)
│   │   ├── contact/        # Contact page components
│   │   ├── home/           # Home page components
│   │   ├── projects/       # Project page components
│   │   └── skills/         # Skills page components
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── .gitignore
├── package.json
├── tailwind.config.js      # TailwindCSS configuration
└── vite.config.js          # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/terzidest/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:5173/`

## Building for Production

```bash
npm run build
# or
yarn build
```

This will create a `dist` directory with the production-ready files.

## Future Enhancements

- Add blog section
- Implement dark mode
- Add animations for project transitions
- Integrate with a CMS for easier content updates

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Triantaphilos Terzides - terzidest@gmail.com

Project Link: [https://github.com/terzidest/portfolio](https://github.com/terzidest/portfolio)
