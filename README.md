<div align="center">
  <img src="./assets/untitled-card-game.gif" alt="Untitled Card Game Logo" />

# Untitled Card Game (UCG)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A strategic puzzle game where you arrange playing cards on a grid to score big!

</div>

## 🎮 Insert Coin

Visit [untitled-card-game.gaeljacquin-aws.com](https://untitled-card-game.gaeljacquin-aws.com) to play now!

## 🃏 About the Game

Untitled Card Game is a single-player card puzzle that combines the familiar scoring of poker with the strategic challenge of grid placement. Think of it as a blend of solitaire and sudoku, but with poker hands.

**What makes it special:**

- **Strategic Depth**: Every card placement matters. You're not just making one hand—you're building multiple hands simultaneously across rows and columns.

- **Two Game Modes**: Start with the 5×5 grid for a quick puzzle, or challenge yourself with the larger 6×6 grid for more complex decision-making.

- **No Time Pressure**: Take your time planning the perfect arrangement. This is a game about thinking, not rushing.

- **High Score Challenge**: Beat your personal best or compete with friends to see who can master the perfect grid.

**Perfect for:**
- Poker fans looking for a new twist on the classic game
- Puzzle enthusiasts who enjoy spatial reasoning challenges
- Anyone who wants a relaxing yet engaging game to play at their own pace

Whether you're a poker pro or just learning the hands, Untitled Card Game offers a fresh and satisfying puzzle experience that's easy to learn but difficult to master.

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

## 🔧 For Developers

Built with React, TypeScript, and Elysia. Check out `CLAUDE.md` for technical documentation and development guidelines.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
