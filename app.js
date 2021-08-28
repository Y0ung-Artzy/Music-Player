const playlistContainer =
  document.getElementsByClassName("playlistContainer")[0];
const audioTag = document.getElementsByClassName("audioTag")[0];
const currentTimeTag = document.getElementsByClassName("currentTime")[0];
const currentProgressTag = document.getElementById("currentProgress");
const playButtonTag = document.getElementsByClassName("playButton")[0];
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const previousButtonTag = document.getElementsByClassName("previousButton")[0];
const nextButtonTag = document.getElementsByClassName("nextButton")[0];

const tracks = [
  { trackId: "music/track1.mp3", title: "When We Were Young-Adele" },
  { trackId: "music/track2.mp3", title: "Fix You-ColdPlay" },
  { trackId: "music/track3.mp3", title: "Ever Glow-ColdPlay" },
  { trackId: "music/track4.mp3", title: "Lot to Learn-Luke Christopher" },
];

for (let i = 0; i < tracks.length; i++) {
  const trackTag = document.createElement("div");
  trackTag.classList.add("trackItem");
  trackTag.addEventListener("click", () => {
    playSong();
    currentSongTrack = i;
  });
  const title = (i + 1).toString() + ".     " + tracks[i].title;
  trackTag.textContent = title;
  playlistContainer.append(trackTag);
}

let durationTimeText = "00:00";
let duration = 0;
audioTag.addEventListener("loadeddata", () => {
  duration = Math.floor(audioTag.duration);
  durationTimeText = timeFunc(duration);
});

audioTag.addEventListener("timeupdate", () => {
  const currentTime = Math.floor(audioTag.currentTime);
  const currentTimeText = timeFunc(currentTime);
  const finalTime = currentTimeText + " / " + durationTimeText;
  currentTimeTag.textContent = finalTime;
  updateCurrentProgress(currentTime);
});

const updateCurrentProgress = (currentTime) => {
  let currentProgress = (400 / duration) * currentTime;
  currentProgressTag.style.width = currentProgress.toString() + "px";
};

const timeFunc = (totalSecond) => {
  let minutes = Math.floor(totalSecond / 60);
  let seconds = totalSecond % 60;

  const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
  const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;
  return minuteText + ":" + secondText;
};

let currentSongTrack = 0;
let isPlaying = false;
playButtonTag.addEventListener("click", () => {
  const currentTime = Math.floor(audioTag.currentTime);
  if (currentTime === 0) {
    playSong();
    
  } else {
    audioTag.play();
  }
  isPlaying = true;
  updatePlayAndPauseButton();
});

pauseButtonTag.addEventListener("click", () => {
  isPlaying = false;
  audioTag.pause();
  updatePlayAndPauseButton();
});

const updatePlayAndPauseButton = () => {
  if (isPlaying) {
    playButtonTag.style.display = "none";
    pauseButtonTag.style.display = "inline";
  } else {
    playButtonTag.style.display = "inline";
    pauseButtonTag.style.display = "none";
  }
};

previousButtonTag.addEventListener("click",()=>{
  if(currentSongTrack === 0){
    return;
  }
    currentSongTrack -= 1;
    playSong();
})

nextButtonTag.addEventListener("click",()=>{
  if(currentSongTrack === tracks.length-1){
    return;
  }
  currentSongTrack += 1;
  playSong();
})

const playSong = () => {
  const songIdToPlay = tracks[currentSongTrack].trackId;
  audioTag.src = songIdToPlay;
  audioTag.play();
  isPlaying= true;
  updatePlayAndPauseButton();
}
