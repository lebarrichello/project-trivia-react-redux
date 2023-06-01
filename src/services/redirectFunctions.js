export function redirectToLogin(component) {
  const { history } = component.props;
  localStorage.removeItem('token');
  history.push('/');
}

export function redirectToGame(component) {
  const { history } = component.props;
  history.push('/game');
}

export function redirectToFeedback(component) {
  const { history } = component.props;
  history.push('/feedback');
}

export function redirectToResults(component) {
  const { history } = component.props;
  history.push('/results');
}

export function redirectToSettings(component) {
  const { history } = component.props;
  history.push('/settings');
}
