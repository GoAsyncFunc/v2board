import history from '../app/history';

export const router = {
  push: (...args) => history.push(...args),
  replace: (...args) => history.replace(...args),
  go: (...args) => history.go(...args),
  goBack: (...args) => history.goBack(...args),
  goForward: (...args) => history.goForward(...args),
};
