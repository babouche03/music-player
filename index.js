const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'https://gcore.jsdelivr.net/gh/babouche03/music-player/assets/1.mp3',
        displayName: 'I`ll Fly Away',
        cover: 'https://gcore.jsdelivr.net/gh/babouche03/music-player/assets/1.jpg',
        artist: 'Kanye West',
    },
    {
        path: 'https://gcore.jsdelivr.net/gh/babouche03/music-player/assets/Kanye West,Kid Cudi - Father Stretch My Hands Pt. 1.mp3',
        displayName: 'Father Stretch My Hands Pt. 1.',
        cover: 'https://gcore.jsdelivr.net/gh/babouche03/music-player/assets/2.jpg',
        artist: 'Kanye West  Kid Cudi',
    },
    {
        path: 'https://gcore.jsdelivr.net/gh/babouche03/music-player/assets/JAY-Z,Gloria Carter - Smile.mp3',
        displayName: 'Smile',
        cover: 'https://gcore.jsdelivr.net/gh/babouche03/music-player/assets/jay.jpg',
        artist: 'JAY-Z Gloria Carter',
    },
     {
        path: 'https://gcore.jsdelivr.net/gh/babouche03/music-player/assets/nike.mp3',
        displayName: 'Nikes(Justice Der Guitar)',
        cover: 'https://gcore.jsdelivr.net/gh/babouche03/music-player/assets/frank.webp',
        artist: 'Frank Ocean',
    },
    {
        path: 'https://gcore.jsdelivr.net/gh/babouche03/music-player/assets/Wu-Tang Clan - C.R.E.A.M.mp3',
        displayName: 'C.R.E.A.M',
        cover: 'https://gcore.jsdelivr.net/gh/babouche03/music-player/assets/wu.jpg',
        artist: 'Wu-Tang Clan',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
