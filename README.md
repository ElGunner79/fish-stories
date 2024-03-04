# FISHSTORIES APP

## Overview
FISHSTORIES APP is a video sharing application, for fishing enthusiasts looking for a "quick fix" of their favoruite past-time when they aren't able to go fishing. It is built with React and Vite for quick development, Node.js, Express, Swagger and MySQL for the backend and database. It also utilizes Docker containers for easy deployment. This README file serves as a guide for setting up the development environment and running the Docker containers.

## Development Environment Setup
1. **Clone the Repository**:
  
git clone https://github.com/YOUR_USERNAME/fishstories.git


2. **Install Project Dependencies**:

cd fishstories > npm install

      "@emotion/react": "^11.11.3",
      "@emotion/styled": "^11.11.0",
      "@fontsource/roboto": "^5.0.8",
      "@mui/icons-material": "^5.15.10",
      "@mui/material": "^5.15.10",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-dropzone": "^14.2.3",
      "react-hook-form": "^7.50.1",
      "react-infinite-scroll-component": "^6.1.0",
      "react-router-dom": "^6.22.1"

3. **Install Dev-Dependencies**:

npm install

      "@types/react": "^18.2.56",
      "@types/react-dom": "^18.2.19",
      "@vitejs/plugin-react": "^4.2.1",
      "dotenv": "^16.4.5",
      "eslint": "^8.56.0",
      "eslint-plugin-react": "^7.33.2",
      "eslint-plugin-react-hooks": "^4.6.0",
      "eslint-plugin-react-refresh": "^0.4.5",
      "vite": "^5.1.4"

3. **Start the Development Server**: 

npm run dev

The backend will be available at `http://localhost:3001`.

## Docker Container Setup
1. **Install Docker**: 
If you haven't already, [install Docker](https://docs.docker.com/get-docker/) on your machine.

2. **Build Docker Image**:

       A. First check if there are any other containers open using: docker ps -a
       B. If containers are open, stop them using: docker stop (container name)
       C. It is advisable to do a system prune to then delete any containers that could cause conflicts using: docker system prune -a
       D. Build docker image using: docker compose up -d

3. **Run Docker Container**: 

docker run -p 8080:8080 (container name)

The app will be available at `http://localhost:3001`.

## Quick Start Guide
1. **Development Environment**:
- Clone the repository.
- Install dependencies with `npm install`.
- Start the development server with `npm run dev`.

2. **Docker Container**:
- Install Docker if not already installed.
- Build the Docker image with `docker compose up -d`.
- Run the Docker container with `docker run -p 3001:3001 fishstories`.

## License
This project is licensed under the Creative Commons Legal Code CC0 1.0 Universal license - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Swagger](https://https://swagger.io/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
- [Vite](https://vitejs.dev/)

## Support
For any questions or support, please contact the maintainers of this repository.
