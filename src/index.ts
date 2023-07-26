export const MediaReadyState = {
  HAVE_NOTHING: 0,
  HAVE_METADATA: 1,
  HAVE_CURRENT_DATA: 2,
  HAVE_FUTURE_DATA: 3,
  HAVE_ENOUGH_DATA: 4,
};

export class MediaPlayer {
  private media: HTMLMediaElement;
  private eventListeners: Map<string, (event: Event) => void>;

  constructor(selector: string) {
    const media = document.querySelector(selector) as HTMLMediaElement;
    if (!media) {
      throw new Error(`No media element found with selector ${selector}`);
    }
    if (
      !(media instanceof HTMLAudioElement) &&
      !(media instanceof HTMLVideoElement)
    ) {
      throw new Error(
        `The element selected by ${selector} is not a media element`
      );
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

  getFormattedCurrentTime(): string {
    const currentTime = this.media.currentTime;
    return this.formatTime(currentTime);
  }

  private formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const paddedHours = String(hours).padStart(2, "0");
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(remainingSeconds).padStart(2, "0");

    if (hours === 0) {
      return `${paddedMinutes}:${paddedSeconds}`;
    } else {
      return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    }
  }

  getPlaybackState(): string {
    if (this.media.ended) {
      return "ended";
    } else if (this.media.paused) {
      return "paused";
    } else if (this.media.readyState < 3) {
      return "loading";
    } else {
      return "playing";
    }
  }

  load() {
    this.media.load();
  }

  play(): void {
    if (this.media.paused || this.media.ended) {
      this.media.play();
    }
  }

  pause(): void {
    if (!this.media.paused) {
      this.media.pause();
    }
  }

  seek(time: number): void {
    if (time >= 0 && time <= this.media.duration) {
      this.media.currentTime = time;
    }
  }

  setPlaybackTime(time: number): void {
    this.seek(time);
  }

  restart(): void {
    this.media.currentTime = 0;
    this.media.play();
  }

  skip(seconds: number): void {
    let newTime = this.media.currentTime + seconds;
    if (newTime < 0) newTime = 0;
    if (newTime > this.media.duration) newTime = this.media.duration;
    this.media.currentTime = newTime;
  }

  setSource(src: string): void {
    this.media.src = src;
  }

  mute(): void {
    this.media.muted = true;
  }

  unmute(): void {
    this.media.muted = false;
  }

  setVolume(volume: number): void {
    if (volume < 0 || volume > 1) {
      throw new Error("Volume must be a number between 0 and 1");
    }
    this.media.volume = volume;
  }

  setPlaybackSpeed(speed: number): void {
    if (speed <= 0) {
      throw new Error("Speed should be greater than 0");
    }
    this.media.playbackRate = speed;
  }

  enterFullscreen(): void {
    if (this.media.requestFullscreen) {
      this.media.requestFullscreen();
    } else if ((this.media as any).mozRequestFullScreen) {
      /* Firefox */
      (this.media as any).mozRequestFullScreen();
    } else if ((this.media as any).webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      (this.media as any).webkitRequestFullscreen();
    } else if ((this.media as any).msRequestFullscreen) {
      /* IE/Edge */
      (this.media as any).msRequestFullscreen();
    }
  }

  on(event: string, handler: (event: Event) => void): void {
    this.media.addEventListener(event, handler);
    this.eventListeners.set(event, handler);
  }

  onLoadStart(handler: (event: Event) => void) {
    this.on("loadstart", handler);
  }

  onProgress(handler: (event: Event) => void) {
    this.on("progress", handler);
  }

  onCanPlay(handler: (event: Event) => void) {
    this.on("canplay", handler);
  }

  onPlaying(handler: (event: Event) => void) {
    this.on("playing", handler);
  }

  onPause(handler: (event: Event) => void) {
    this.on("pause", handler);
  }

  onWaiting(handler: (event: Event) => void) {
    this.on("waiting", handler);
  }

  onEnded(handler: (event: Event) => void) {
    this.on("ended", handler);
  }

  onError(handler: (event: Event) => void) {
    this.on("error", handler);
  }

  onCanPlayThrough(handler: (event: Event) => void): void {
    this.on("canplaythrough", handler);
  }

  destroy(): void {
    // Remove all event listeners
    this.eventListeners.forEach((handler, event) => {
      this.media.removeEventListener(event, handler);
    });
    this.eventListeners.clear();
  }
}
