# Vyas Portfolio - Advanced

This is a personal portfolio website built with React and TypeScript, showcasing my projects, skills, and blog posts.

## Live Demo

You can view the live demo of the portfolio at [https://veeda241.github.io/portfolio](https://veeda241.github.io/portfolio).

## About the Project

This project is a comprehensive personal portfolio designed to highlight my work and capabilities as a developer. It features a modern, interactive user interface with 3D elements and particle animations.

The portfolio is structured into the following sections:

*   **Header:** A welcoming header section.
*   **About:** Information about my background and experience.
*   **Skills:** A list of my technical skills.
*   **Projects:** A showcase of my projects with descriptions and links.
*   **Achievements:** A section to display my achievements.
*   **Blog:** A collection of my blog posts.
*   **Contact:** A form to get in touch with me.
*   **Footer:** Social media links and other information.

## Built With

This project is built with a modern tech stack, including:

*   [React](https://reactjs.org/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Three.js](https://threejs.org/) for 3D graphics, with [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) and [@react-three/drei](https://github.com/pmndrs/drei)
*   [Framer Motion](https://www.framer.com/motion/) for animations
*   [tsParticles](https://particles.js.org/) for particle effects
*   [Styled Components](https://styled-components.com/) for styling
*   [React Icons](https://react-icons.github.io/react-icons/) for icons

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm installed on your machine. You can download them from [https://nodejs.org/](https://nodejs.org/).

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/veeda241/portfolio.git
    ```
2.  Navigate to the project directory
    ```sh
    cd vyas-portfolio-advanced
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\nOpen [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\nYou will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\nIt correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\nYour app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Deployment

This project is deployed using GitHub Pages. The `deploy` script builds the app and pushes the `build` folder to the `gh-pages` branch.

To deploy the app, run:

```sh
npm run deploy
```