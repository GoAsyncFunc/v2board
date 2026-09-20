import history from './history';

export const router = {
  push: history.push.bind(history),
  replace: history.replace.bind(history),
  go: history.go.bind(history),
  goBack: history.goBack.bind(history),
  goForward: history.goForward.bind(history),
};
