declare const MediaReadyState: {
    HAVE_NOTHING: number;
    HAVE_METADATA: number;
    HAVE_CURRENT_DATA: number;
    HAVE_FUTURE_DATA: number;
    HAVE_ENOUGH_DATA: number;
};
declare class MediaPlayer {
    private media;
    private eventListeners;
    constructor(selector: string);
    getMediaElement(): HTMLMediaElement;
    getReadyState(): number;
    getPlaybackRate(): number;
    getPlaybackSpeed(): number;
    isMuted(): boolean;
    getVolume(): number;
    isPaused(): boolean;
    getDuration(): number;
    getCurrentTime(): number;
    getSource(): string;
    getFormattedCurrentTime(): string;
    private formatTime;
    getPlaybackState(): string;
    load(): void;
    play(): void;
    pause(): void;
    seek(time: number): void;
    setPlaybackTime(time: number): void;
    restart(): void;
    skip(seconds: number): void;
    setSource(src: string): void;
    mute(): void;
    unmute(): void;
    setVolume(volume: number): void;
    setPlaybackSpeed(speed: number): void;
    enterFullscreen(): void;
    on(event: string, handler: (event: Event) => void): void;
    onLoadStart(handler: (event: Event) => void): void;
    onProgress(handler: (event: Event) => void): void;
    onCanPlay(handler: (event: Event) => void): void;
    onPlaying(handler: (event: Event) => void): void;
    onPause(handler: (event: Event) => void): void;
    onWaiting(handler: (event: Event) => void): void;
    onEnded(handler: (event: Event) => void): void;
    onError(handler: (event: Event) => void): void;
    onCanPlayThrough(handler: (event: Event) => void): void;
    destroy(): void;
}
