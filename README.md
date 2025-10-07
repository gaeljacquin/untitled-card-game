<div align="center">
  <img src="./assets/untitled-card-game.gif" alt="Untitled Card Game Logo" />

# Untitled Card Game (UCG)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-required-blue.svg)](https://www.docker.com/)

An intuitive and relaxing game where you arrange cards in a grid to create the highest scoring poker hands!

</div>

## 🎮 Insert Coin

Visit [untitled-card-game.gaeljacquin-aws.com](https://untitled-card-game.gaeljacquin-aws.com) to play now!

## 🛠️ Tech Stack

### Frontend

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Magic UI](https://magicui.design/)
- [dnd kit](https://dndkit.com/)

### Backend

- [Elysia](https://elysiajs.com)

### Development Tools

- [Amazon Q Developer](https://aws.amazon.com/q/developer/)
- [Docker](https://www.docker.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [socket.io](https://socket.io/)
- [pnpm](https://pnpm.io/)

### Design Tools

- [Inkscape](https://inkscape.org/)
- [Lottie](https://lottiefiles.com/)
- [Canva](https://www.canva.com/)

### AWS Infrastructure

- AWS Amplify
- Amazon CloudWatch
- Amazon ECR
- Amazon EC2
- Elastic Load Balancing
- AWS Certificate Manager
- Amazon Route 53

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)

### Installation

1. Clone the repository

2. Run the setup script

   - MacOS / Linux / WSL

     ```shell
     chmod +x setup.sh, start.sh, stop.sh, cleanup.sh
     ./setup.sh
     ```

   - Windows

     ```powershell
     .\setup.ps1
     ```

### Launching the Game

You may directly head to `http://localhost:3000/` in your favorite browser if you have just installed the game successfully. Otherwise run the script below first.

- MacOS / Linux / WSL

  ```shell
  ./start.sh
  ```

- Windows
  ```powershell
  .\start.ps1
  ```

### Closing the Game

- MacOS / Linux / WSL

  ```shell
  ./stop.sh
  ```

- Windows
  ```powershell
  .\stop.ps1
  ```

### Uninstalling

- MacOS / Linux / WSL

  ```shell
  ./cleanup.sh
  ```

- Windows
  ```powershell
  .\cleanup.ps1
  ```

> **Note:** On Windows, you may need to adjust the execution policy first:
>
> `Set-ExecutionPolicy RemoteSigned`
>
> You may also try:
>
> `powershell -ExecutionPolicy Bypass -File .\script.ps1`

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
