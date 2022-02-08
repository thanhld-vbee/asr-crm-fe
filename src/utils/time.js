const formatAudioTime = (numberOfSeconds) => {
  let minutes = Math.floor(numberOfSeconds / 60);
  let seconds = Math.floor(numberOfSeconds) - 60 * minutes;

  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  return `${minutes}:${seconds}`;
};

export { formatAudioTime };
