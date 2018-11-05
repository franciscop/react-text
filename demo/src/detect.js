export default () => {
  const lang = window.navigator.userLanguage || window.navigator.language;
  return lang.split('-').shift().trim();
};
