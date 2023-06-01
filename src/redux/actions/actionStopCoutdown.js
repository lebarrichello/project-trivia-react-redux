export const actionStopCoutdown = (idCounter) => ({
  type: 'STOP_COUNTDOWN',
  payload: {
    idCounter,
  },
});
