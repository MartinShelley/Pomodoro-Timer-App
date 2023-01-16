/*
To Do
Need to sort selection area. Last font screws it up
Countdown animation
Tablet & Mobile views
Cypress

*/

(function () {

  let settings = {
    selectedTimer: "pomodoro",
    pomodoroTime: 25,
    shortBreak: 5,
    longBreak: 15,
    font: "Kumbh Sans",
    color: "#f87070"
  };
  let isPaused = true;
  let initialTime = 60;
  let timerDuration, minutes, seconds;

  const clockSelections = document.querySelectorAll('.selection > ul > li > a');

  function setColor() {
    document.querySelector('circle').style.stroke = settings.color;
    document.querySelector('.selected').style.backgroundColor = settings.color;
  }

  const settingFont = () => {
    let fontSelection = settings.font;
    document.querySelectorAll('.selectionItem, .clock, .action').forEach((element) => {
      element.style.fontFamily = settings.font;
    });

    switch (fontSelection) {
      case "Kumbh Sans":
        document.querySelector('.clock').style.letterSpacing = "-5px";
        document.querySelector('.clock').style.fontWeight = "bold";
        document.querySelectorAll('.selectionItem').forEach((element) => {
          element.style.fontSize = "14px";
          // element.style.padding = "20px";
        });
        break;
      case "Roboto Slab":
        document.querySelector('.clock').style.letterSpacing = "0px";
        document.querySelector('.clock').style.fontWeight = "bold";
        document.querySelectorAll('.selectionItem').forEach((element) => {
          element.style.fontSize = "14px";
          // element.style.padding = "20px";
        });
        break;
      case "Space Mono":
        document.querySelector('.clock').style.letterSpacing = "-10px";
        document.querySelector('.clock').style.fontWeight = "normal";
        document.querySelectorAll('.selectionItem').forEach((element) => {
          element.style.fontSize = "13px";
          // element.style.padding = "18px";
        });
    }
  };

  settingFont();

  const settingClockTime = () => {
    switch (document.querySelector('.selected').innerText) {
      case "pomodoro":
        document.querySelector('text.clock').textContent = settings.pomodoroTime < 10 ? `0${settings.pomodoroTime}:00` : `${settings.pomodoroTime}:00`;
        timerDuration = settings.pomodoroTime * 60;
        break;
      case "short break":
        document.querySelector('text.clock').textContent = settings.shortBreak < 10 ? `0${settings.shortBreak}:00` : `${settings.shortBreak}:00`;
        timerDuration = settings.shortBreak * 60;
        break;
      case "long break":
        document.querySelector('text.clock').textContent = settings.longBreak < 10 ? `0${settings.longBreak}:00` : `${settings.longBreak}:00`;
        timerDuration = settings.longBreak * 60;
    }
  }

  settingClockTime();

  clockSelections.forEach((selection) => {
    selection.addEventListener('click', () => {
      let currentSelection = document.querySelector('a.selected');
      currentSelection.style.backgroundColor = "";
      currentSelection.classList.remove('selected');
      selection.classList.add('selected');
      selection.style.backgroundColor = settings.color;
      settingClockTime();
    });
  });

  function startTimer(timer) {
    document.querySelector('.action').textContent = "PAUSE";
    countdownTimer = setInterval(function () {
      //if timer has finished
      if (timer <= 0) {
        document.querySelector('.action').textContent = "FINSHED";
        document.querySelector('circle').classList.remove("countdown");
        document.querySelector('circle').style.strokeDashoffset = "-1037px";
        document.querySelector('circle').style.animationPlayState = 'paused';
        isPaused = true;
        clearInterval(countdownTimer);
        timerDuration = initialTime;
      }

      //if timer is running
      else if (!isPaused) {
        timer--
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.querySelector('text.clock').textContent = `${minutes}:${seconds}`;
      }
    }, 1000);
  }

  document.querySelector('circle').addEventListener('click', function () {
    //start the timer again
    if (isPaused) {
      isPaused = false;
      startTimer(timerDuration);
      // document.querySelector('circle').classList.add("countdown");
      document.querySelector('circle').style.animationDuration = `${timerDuration}s`;
      document.querySelector('circle').style.animationPlayState = 'running';
    }
    //pause the timer
    else if (!isPaused) {
      isPaused = true;
      document.querySelector('.action').textContent = "RESUME";
      clearInterval(countdownTimer);
      document.querySelector('circle').style.animationPlayState = 'paused';
      timerDuration = (minutes * 60) + seconds;
    }
  });

  /*===============================================================================
                                        Settings
===============================================================================*/

  const settingsIcon = document.querySelector('.settings-icon');

  //Function to display settings form
  const openSettingsModal = () => {
    document.querySelector('#settings-modal').style.display = "block";
  };
  //Function to close settings form
  const closeSettingsModal = () => {
    document.querySelector('#settings-modal').style.display = "none";
  };
  //Adds event listener to the settings icon to open the Settings form
  settingsIcon.addEventListener('click', () => {
    openSettingsModal();
  });

  [document.querySelector('.backdrop'), document.querySelector('.close-icon')].forEach((element) => {
    element.addEventListener('click', function () {
      closeSettingsModal();
    });
  });

  //update time input fields by clicking on arrows
  document.querySelectorAll('img').forEach((image) => {
    if (image.classList == "topArrow") {
      image.addEventListener("click", () => {
        image.previousElementSibling.value++;
      });
    }
    else if (image.classList == "bottomArrow") {
      image.addEventListener("click", () => {
        image.offsetParent.children[1].value--;
      });
    }
  });

  function submittingSettingsForm(event) {
    event.preventDefault();
    let selectedFont, selectedColor;
    document.querySelectorAll('input[name="fontSelection"]').forEach((selection) => {
      if (selection.checked == true) {
        selectedFont = selection.value;
      }
    });
    document.querySelectorAll('input[name="colorSelection"]').forEach((selection) => {
      if (selection.checked == true) {
        selectedColor = selection.value;
      }
    });
    settings = {
      pomodoroTime: document.querySelector('#pomodoroTime').value,
      shortBreak: document.querySelector('#shortBreakTime').value,
      longBreak: document.querySelector('#longBreakTime').value,
      font: selectedFont,
      color: selectedColor
    }
    settingClockTime();
    setColor();
    settingFont();
    closeSettingsModal();
  }

  document.querySelector('#submit').addEventListener('click', submittingSettingsForm);


})();