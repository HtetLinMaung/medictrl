# MediaPlayer

A lightweight and flexible MediaPlayer control for HTML5 video and audio elements in TypeScript.

## Installation

```shell
npm install medictrl
```

## Features

- Playback control
- Event handling
- Time and state querying
- Volume control
- Fullscreen functionality
- Error handling

## Usage

```javascript
import { MediaPlayer } from "your-package-name";

const player = new MediaPlayer("#myVideo");

// play media
player.play();

// pause media
player.pause();

// mute media
player.mute();

// jump to specific time
player.setPlaybackTime(120);

// skip forward or backward
player.skip(30);

// set volume (0.0 to 1.0)
player.setVolume(0.5);

// set playback speed
player.setPlaybackSpeed(2);

// listen to events
player.on("play", (event) => {
  console.log("Play event fired", event);
});
```
