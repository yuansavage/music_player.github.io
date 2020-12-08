const music = document.querySelector('audio');
const progress_container = document.getElementById('progress-container');
const progress = document.getElementById('progress'); 

const curTime = document.getElementById('current-time');
const durTime = document.getElementById('duration');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const image = document.querySelector('img');
const title = document.getElementById('songname');
const artist = document.getElementById('artist');

let songIndex = 0;
//song list
const songs = [
    {
        name:'Clocks',
        artist:'John du',
        file:'track1-Clocks'
    },
    {
        name:'Dystopia',
        artist:'Du John',
        file:'track2-Dystopia'
    }
];

let isPlaying = false;

//play
function playSong(){
    isPlaying = true;
    music.play();
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','pause');

}
//pause
function pauseSong(){
    isPlaying = false;
    music.pause();
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','play');
}

//update song data by DOM
function loadSong(song){
    //如果是相同值textContent則不會重新load，但innerText會
    title.textContent = song.name;
    artist.textContent = song.artist;
    music.src = `./music/${song.file}.mp3`;
    image.src = `./img/${song.file}.jpg`;
}

//prevSong
function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e){
    if(isPlaying){
        const duration = e.srcElement.duration;
        const currentTime = e.srcElement.currentTime;
        //const {duration,currentTime} = e.srcElement;
        
        //progressBarWidth
        const progressBarWidth = (currentTime/duration)*100;
        progress.style.width = `${progressBarWidth}%`;

        //durationTime
        const durationMinTime = Math.floor(duration/60);
        let durationSecTime = Math.floor(duration%60);
        if(durationSecTime<10){
            durationSecTime = `0${durationSecTime}`;
        }
        //avoid the durationTime is NaN
        if(durationSecTime){
            durTime.textContent = `${durationMinTime}:${durationSecTime}`;
        }

        //currentTime
        let currentMinTime = Math.floor(currentTime/60);
        let currentSecTime = Math.floor(currentTime%60);
        if(currentSecTime<10){
            currentSecTime = `0${currentSecTime}`;
        }
        //avoid the currentTime is NaN
        if(currentSecTime){
            curTime.textContent = `${currentMinTime}:${currentSecTime}`;
        } 
    }
}

function setProgressBar(e){
    //const width = e.srcElement.clientWidth;
    const width = this.clientWidth;
    let curWidth = e.offsetX;
    const {duration} = music;
    music.currentTime = (curWidth/width)*duration;
}

function playNext(){


}

playBtn.addEventListener('click',()=>(isPlaying?pauseSong():playSong()));
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate', updateProgress);
music.addEventListener('ended',nextSong);
progress_container.addEventListener('click',setProgressBar);