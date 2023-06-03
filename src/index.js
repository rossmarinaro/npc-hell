
import './style.css';
import Phaser from 'phaser';
import { Boot, Preload } from './scripts/preload.js';
import Menu from './scripts/Menu.js';
import Main from './scripts/Main.js';
import GameOver from './scripts/GameOver.js';
import Controller from './scripts/Controller.js';

/****** MOBILE FRIENDLY*/

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  scale: {
    parent: 'game',
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: innerWidth,
    height: innerHeight 
  },
  parent: 'game',
    dom: {
        createContainer: true
  },
  scene: [Boot, Preload, Menu, Main, Controller, GameOver],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  }
}

new Phaser.Game(config);


