import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const vimeoPlayer = new Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

vimeoPlayer.on('play', function (evt) {
  // evt.preventDefault();
});
vimeoPlayer.on('timeupdate', throttle(isTimeUpdate, 1000));
timeLocal();

function isTimeUpdate(evt) {
  let time = evt.seconds;
  const JSONTime = JSON.stringify(time);
  localStorage.setItem(LOCALSTORAGE_KEY, JSONTime);
  console.log('Сurrent playback time:', time);
}

function timeLocal() {
  const savedTime = localStorage.getItem(LOCALSTORAGE_KEY);
  if (savedTime) {
    vimeoPlayer.setCurrentTime(savedTime);
  }
}
