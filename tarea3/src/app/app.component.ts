import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const BackFace = "https://raw.githubusercontent.com/GhostSalt/LuigiPoker/master/Assets/Sprites/back%20face.png";

const rawLinks = [
  "https://raw.githubusercontent.com/GhostSalt/LuigiPoker/master/Assets/Sprites/star%20face.png",
  "https://raw.githubusercontent.com/GhostSalt/LuigiPoker/master/Assets/Sprites/mushroom%20face.png",
  "https://raw.githubusercontent.com/GhostSalt/LuigiPoker/master/Assets/Sprites/mario%20face.png",
  "https://raw.githubusercontent.com/GhostSalt/LuigiPoker/master/Assets/Sprites/luigi%20face.png",
  "https://raw.githubusercontent.com/GhostSalt/LuigiPoker/master/Assets/Sprites/fire%20flower%20face.png",
  "https://raw.githubusercontent.com/GhostSalt/LuigiPoker/master/Assets/Sprites/cloud%20face.png"
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tarea3';
  backFace = BackFace;
  cards: { image: string; isFlipped: boolean; isMatched: boolean }[] = [];
  firstCardIndex: number | null = null;
  secondCardIndex: number | null = null;
  attempts = 0;
  isGameOver = false;

  constructor() {
    this.resetGame();
  }

  shuffleCards() {
    const shuffledCards = [...rawLinks, ...rawLinks]
      .map(image => ({ image, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    this.cards = shuffledCards;
  }

  flipCard(index: number) {
    if (this.isGameOver || this.cards[index].isFlipped || this.cards[index].isMatched) {
      return;
    }

    this.cards[index].isFlipped = true;

    if (this.firstCardIndex === null) {
      this.firstCardIndex = index;
    } else if (this.secondCardIndex === null) {
      this.secondCardIndex = index;
      this.checkMatch();
    }
  }

  checkMatch() {
    if (this.firstCardIndex !== null && this.secondCardIndex !== null) {
      const firstCard = this.cards[this.firstCardIndex];
      const secondCard = this.cards[this.secondCardIndex];
      this.attempts++;

      if (firstCard.image === secondCard.image) {
        firstCard.isMatched = true;
        secondCard.isMatched = true;
      } else {
        setTimeout(() => {
          firstCard.isFlipped = false;
          secondCard.isFlipped = false;
        }, 1000);
      }

      this.firstCardIndex = null;
      this.secondCardIndex = null;

      this.checkGameOver();
    }
  }

  checkGameOver() {
    this.isGameOver = this.cards.every(card => card.isMatched);
  }

  resetGame() {
    this.shuffleCards();
    this.firstCardIndex = null;
    this.secondCardIndex = null;
    this.attempts = 0;
    this.isGameOver = false;
  }
}