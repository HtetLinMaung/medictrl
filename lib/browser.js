"use strict";
const MediaReadyState = {
    HAVE_NOTHING: 0,
    HAVE_METADATA: 1,
    HAVE_CURRENT_DATA: 2,
    HAVE_FUTURE_DATA: 3,
    HAVE_ENOUGH_DATA: 4,
};
class MediaPlayer {
    constructor(selector) {
        const media = document.querySelector(selector);
        if (!media) {
            throw new Error(`No media element found with selector ${selector}`);
        }
        if (!(media instanceof HTMLAudioElement) &&
            !(media instanceof HTMLVideoElement)) {
            throw new Error(`The element selected by ${selector} is not a media element`);
        }
        this.media = media;
        this.eventListeners = new Map();
    }
    getMediaElement() {
        return this.media;
    }
    getReadyState() {
        return this.media.readyState;
    }
    getPlaybackRate() {
        return this.media.playbackRate;
    }
    getPlaybackSpeed() {
        return this.getPlaybackRate();
    }
    isMuted() {
        return this.media.muted;
    }
    getVolume() {
        return this.media.volume;
    }
    isPaused() {
        return this.media.paused;
    }
    getDuration() {
        return this.media.duration;
    }
    getCurrentTime() {
        return this.media.currentTime;
    }
    getSource() {
        return this.media.src;
    }
    getFormattedCurrentTime() {
        const currentTime = this.media.currentTime;
        return this.formatTime(currentTime);
    }
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const paddedHours = String(hours).padStart(2, "0");
        const paddedMinutes = String(minutes).padStart(2, "0");
        const paddedSeconds = String(remainingSeconds).padStart(2, "0");
        if (hours === 0) {
            return `${paddedMinutes}:${paddedSeconds}`;
        }
        else {
            return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
        }
    }
    getPlaybackState() {
        if (this.media.ended) {
            return "ended";
        }
        else if (this.media.paused) {
            return "paused";
        }
        else if (this.media.readyState < 3) {
            return "loading";
        }
        else {
            return "playing";
        }
    }
    load() {
        this.media.load();
    }
    play() {
        if (this.media.paused || this.media.ended) {
            this.media.play();
        }
    }
    pause() {
        if (!this.media.paused) {
            this.media.pause();
        }
    }
    seek(time) {
        if (time >= 0 && time <= this.media.duration) {
            this.media.currentTime = time;
        }
    }
    setPlaybackTime(time) {
        this.seek(time);
    }
    restart() {
        this.media.currentTime = 0;
        this.media.play();
    }
    skip(seconds) {
        let newTime = this.media.currentTime + seconds;
        if (newTime < 0)
            newTime = 0;
        if (newTime > this.media.duration)
            newTime = this.media.duration;
        this.media.currentTime = newTime;
    }
    setSource(src) {
        this.media.src = src;
    }
    mute() {
        this.media.muted = true;
    }
    unmute() {
        this.media.muted = false;
    }
    setVolume(volume) {
        if (volume < 0 || volume > 1) {
            throw new Error("Volume must be a number between 0 and 1");
        }
        this.media.volume = volume;
    }
    setPlaybackSpeed(speed) {
        if (speed <= 0) {
            throw new Error("Speed should be greater than 0");
        }
        this.media.playbackRate = speed;
    }
    enterFullscreen() {
        if (this.media.requestFullscreen) {
            this.media.requestFullscreen();
        }
        else if (this.media.mozRequestFullScreen) {
            this.media.mozRequestFullScreen();
        }
        else if (this.media.webkitRequestFullscreen) {
            this.media.webkitRequestFullscreen();
        }
        else if (this.media.msRequestFullscreen) {
            this.media.msRequestFullscreen();
        }
    }
    on(event, handler) {
        this.media.addEventListener(event, handler);
        this.eventListeners.set(event, handler);
    }
    onLoadStart(handler) {
        this.on("loadstart", handler);
    }
    onProgress(handler) {
        this.on("progress", handler);
    }
    onCanPlay(handler) {
        this.on("canplay", handler);
    }
    onPlaying(handler) {
        this.on("playing", handler);
    }
    onPause(handler) {
        this.on("pause", handler);
    }
    onWaiting(handler) {
        this.on("waiting", handler);
    }
    onEnded(handler) {
        this.on("ended", handler);
    }
    onError(handler) {
        this.on("error", handler);
    }
    onCanPlayThrough(handler) {
        this.on("canplaythrough", handler);
    }
    destroy() {
        this.eventListeners.forEach((handler, event) => {
            this.media.removeEventListener(event, handler);
        });
        this.eventListeners.clear();
    }
}
