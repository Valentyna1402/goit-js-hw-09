import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

const timerContainer = document.querySelector('.timer');
const fieldDiv = document.querySelectorAll('.field');
const valueDiv = document.querySelectorAll('.value');
const bodyEl = document.querySelector('body');
console.log(fieldDiv);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const currentDate = Date.now();

    if (selectedDate < currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      startBtn.style.backgroundColor = '#00cd00';
    }
  },
};

startBtn.disabled = true;

flatpickr(inputEl, options);

startBtn.addEventListener('click', onTimerStart);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onTimerStart() {
  startBtn.disabled = true;

  const intervalId = setInterval(() => {

    const selectedDate = new Date(inputEl.value).getTime();
    const timeDifference = selectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    if (timeDifference < 999) {
      clearInterval(intervalId);
      Notiflix.Notify.success('Timer finished');
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

bodyEl.style.padding = '50px';
bodyEl.style.backgroundColor = '#d4fecad2';

startBtn.style.width = '80px';
startBtn.style.fontWeight = 'bold';

inputEl.style.backgroundColor = '00cd00';
timerContainer.style.marginTop = '40px';
fieldDiv.forEach(item => {
  item.style.marginBottom = '20px';
  item.style.fontSize = '24px';
});
valueDiv.forEach(item => {
  item.style.fontWeight = 'bold';
});
