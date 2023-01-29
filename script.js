(function () {

  let settings = {
    selectedTimer: "pomodoro",
    pomodoro: 25,
    shortBreak: 1,
    longBreak: 15,
    font: "Kumbh Sans",
    color: "#f87070"
  };

  let timerDuration, minutes, seconds, getSelectedTimer, countdownStrokeOffsetDistance;
  let timerStatus = "start";  //start or running or finished or paused

  const clockSelections = document.querySelectorAll('.selection > ul > li');

  function setColor() {
    document.querySelector('circle').style.stroke = settings.color;
    document.querySelector('.selected').style.backgroundColor = settings.color;
  }

  const settingFont = () => {
    let fontSelection = settings.font;
    document.body.style.fontFamily = fontSelection;

    if (fontSelection === "Kumbh Sans") {
      document.querySelectorAll('.selectionItem').forEach((element) => {
        if (element.classList.contains("selected")) {
          element.classList = "selectionItem selected kumbhSansNav"
        }
        else {
          element.classList = "selectionItem kumbhSansNav"
        }
      });
      document.querySelector('.clock').classList = "clock kumbhSansClock";
    }
    else if (fontSelection === "Roboto Slab") {
      document.querySelectorAll('.selectionItem').forEach((element) => {
        if (element.classList.contains("selected")) {
          element.classList = "selectionItem selected robotoSlabNav"
        }
        else {
          element.classList = "selectionItem robotoSlabNav"
        }
      });
      document.querySelector('.clock').classList = "clock robotoSlabClock";
    }

    else {
      document.querySelectorAll('.selectionItem').forEach((element) => {
        if (element.classList.contains("selected")) {
          element.classList = "selectionItem selected spaceMonoNav"
        }
        else {
          element.classList = "selectionItem spaceMonoNav"
        }
      });
      document.querySelector('.clock').classList = "clock spaceMonoClock";
    }
  };

  settingFont();

  const settingClockTime = () => {
    document.querySelector('circle').style.strokeDashoffset = 0;
    switch (document.querySelector('.selected').innerText) {
      case "pomodoro":
        document.querySelector('text.clock').textContent = settings.pomodoro < 10 ? `0${settings.pomodoro}:00` : `${settings.pomodoro}:00`;
        timerDuration = settings.pomodoro * 60;
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

  // need to reset animation
  clockSelections.forEach((selection) => {
    selection.addEventListener('click', () => {
      let currentSelection = document.querySelector('li.selected');
      currentSelection.style.backgroundColor = "";
      currentSelection.classList.toggle('selected');
      selection.classList.toggle('selected');
      selection.style.backgroundColor = settings.color;
      settings.selectedTimer = document.querySelector('li.selected').getAttribute('nav-item');
      settingClockTime();
    });
  });


  function startTimer(timer) {
    document.querySelector('.action').textContent = "PAUSE";
    countdownTimer = setInterval(function () {
      //if timer has finished
      if (timer <= 0) {
        clearInterval(countdownTimer);
        document.querySelector('.action').textContent = "FINSHED";
        timerStatus = "finished";
        getSelectedTimer = settings.selectedTimer;
        timerDuration = settings[getSelectedTimer] * 60;
      }

      //if timer is running
      else if (timerStatus == "running") {
        timer--
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.querySelector('text.clock').textContent = `${minutes}:${seconds}`;
        document.querySelector('circle').style.strokeDashoffset = document.querySelector('circle').style.strokeDashoffset - countdownStrokeOffsetDistance;
      }
    }, 1000);
  }

  document.querySelector('circle').addEventListener('click', function () {
    const element = document.querySelector('circle');
    const style = getComputedStyle(element);
    const strokeDashArray = parseInt(style.strokeDasharray, 10);

    //start timer
    if (timerStatus == "start" || timerStatus == "finished") {
      settingClockTime();
      timerStatus = "running";
      countdownStrokeOffsetDistance = strokeDashArray / timerDuration;
      startTimer(timerDuration);
    }
    //continue timer
    else if (timerStatus == "paused") {
      timerStatus = "running";
      startTimer(timerDuration);
    }

    //pause the timer
    else if (timerStatus == "running") {
      clearInterval(countdownTimer);
      timerStatus = "paused";
      document.querySelector('.action').textContent = "RESUME";
      timerDuration = (minutes * 60) + seconds;
    }
  });

  document.querySelector('circle').addEventListener('mouseenter', function () {
    const currentSelectedColor = settings.color;
    document.querySelector('.action').style.color = currentSelectedColor;
  });

  document.querySelector('circle').addEventListener('mouseleave', function () {
    document.querySelector('.action').style.color = "#d7e0ff";
  });

  /*===============================================================================
                                        Settings
===============================================================================*/

  const settingsIcon = document.querySelector('.settings-icon');

  const openSettingsModal = () => {
    document.querySelector('#settings-modal').style.display = "block";
    document.querySelector('#submit').style.backgroundColor = settings.color;
  };

  const closeSettingsModal = () => {
    document.querySelector('#settings-modal').style.display = "none";
  };

  settingsIcon.addEventListener('click', () => {
    openSettingsModal();
  });

  [document.querySelector('.backdrop'), document.querySelector('.close-icon')].forEach((element) => {
    element.addEventListener('click', function () {
      closeSettingsModal();
    });
  });

  document.querySelectorAll('.arrow').forEach((arrow) => {
    if (arrow.classList[0] == "topArrow") {
      arrow.addEventListener("click", () => {
        arrow.parentNode.previousElementSibling.value++;
      });
    }

    else if (arrow.classList[0] == "bottomArrow") {
      arrow.addEventListener("click", () => {
        arrow.parentNode.previousElementSibling.value--;
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
      pomodoro: document.querySelector('#pomodoroTime').value,
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