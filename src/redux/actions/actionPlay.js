export const actionPlay = (name, email) => ({
  type: 'PLAY',
  payload: {
    name,
    email,
  },
});
