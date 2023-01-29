# Frontend Mentor - Pomodoro app solution

This is a solution to the [Pomodoro app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/pomodoro-app-KBFnycJ6G). This was an old project that I previously started when knowing I wanted to become a Front End Developer but was struggling with certain aspects. I came across this old project recently and was motivated to finish and improve it.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Struggle I Faced](#Struggle-I-Faced)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Set a pomodoro timer and short & long break timers
- Customize how long each timer runs for
- See a circular progress bar that updates every minute and represents how far through their timer they are
- Customize the appearance of the app with the ability to set preferences for colors and fonts

### Screenshot

![](./Pomodoro-App-Screenshot.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- SCSS/CSS
- Vanilla JS
- Responsive Design
- Cypress for testing
- Live Server VS Code Extension

### Struggle I Faced
Early on in this project, the main stuggle I came across was the animation of the countdown timer. I started off trying to use CSS Animations in order to create a smooth countdown animation, however I was finding that if a user were to press pause the amination sometimes jumped and wouldn't actually reflect how long on the timer was left.

So I decided to go down the JS route and control the countdown so that it actually reflected how long was left on the timer (lines 128 - 147 in [script.js](https://github.com/MartinShelley/Pomodoro-Timer-App/blob/master/script.js) file).

## Author
Frontend Mentor - [@MartinShelley](https://www.frontendmentor.io/profile/MartinShelley)

