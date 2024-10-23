const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const trackName = document.getElementById('track-name');
const seekSlider = document.getElementById('seek-slider');
const albumArt = document.querySelector('.album-art img');

let isPlaying = false;
let currentTrackIndex = 0;

const tracks = [
    { name: 'SONG 1', src: 'song1.mp3', img: 'singer.jpg', bgColorClass: 'background-color-1' },
    { name: 'SONG 2', src: 'song2.mp3', img: 'singer1.jpg', bgColorClass: 'background-color-2' },
    { name: 'SONG 3', src: 'song3.mp3', img: 'singer2.jpg', bgColorClass: 'background-color-3' },
    { name: 'SONG 4', src: 'song4.mp3', img: 'singer3.jpg', bgColorClass: 'background-color-4' },
    { name: 'SONG 5', src: 'song5.mp3', img: 'singer4.jpg', bgColorClass: 'background-color-5' },
    { name: 'SONG 6', src: 'song6.mp3', img: 'singer5.jpg', bgColorClass: 'background-color-6' },
];

function loadTrack(index) {
    audioPlayer.src = tracks[index].src;
    trackName.textContent = tracks[index].name;
    albumArt.src = tracks[index].img;
    document.body.className = tracks[index].bgColorClass; 
}

function playPauseTrack() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.textContent = '▶️';
    } else {
        audioPlayer.play().catch(error => {
            console.error('Error playing audio:', error);
        });
        playPauseBtn.textContent = '⏸️';
    }
    isPlaying = !isPlaying;
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audioPlayer.play();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audioPlayer.play();
}

// Sync the seek slider with the track duration
audioPlayer.addEventListener('timeupdate', () => {
    seekSlider.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
});

// Seek functionality
seekSlider.addEventListener('input', () => {
    audioPlayer.currentTime = (seekSlider.value / 100) * audioPlayer.duration;
});


audioPlayer.addEventListener('ended', nextTrack);


playPauseBtn.addEventListener('click', playPauseTrack);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);


loadTrack(currentTrackIndex);
