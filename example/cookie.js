const ytdl = require('..');
const path = require('path');
const fs = require('fs');


// You can get your YouTube cookie by navigating to YouTube in a web browser,
// opening up dev tools (opt+cmd+j on mac), and typing "document.cookie" in the console
const COOKIE = 'key1=value1; key2=value2; key3=value3';
const id = 'B3eAMGXFw1o';

const outputName = 'video.mp4';
const outputPath = path.resolve(__dirname, outputName);
const video = ytdl(id, {
  requestOptions: {
    headers: {
      cookie: COOKIE,
    },
  },
});

video.on('info', info => {
  console.log('title:', info.videoDetails.title);
  console.log('rating:', info.player_response.videoDetails.averageRating);
  console.log('uploaded by:', info.videoDetails.author.name);
});

video.on('progress', (chunkLength, downloaded, total) => {
  const percent = downloaded / total;
  console.log('downloading', `${(percent * 100).toFixed(1)}%`);
});

video.on('end', () => {
  console.log('saved to', outputName);
});

video.pipe(fs.createWriteStream(outputPath));