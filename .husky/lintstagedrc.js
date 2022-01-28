module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
  'package.json': ['prettier --write'],
  '*.vue': ['eslint --fix', 'prettier --write'],
  '*.{scss,less,styl}': ['stylelint --fix', 'prettier --write'],
  '*.{html,md}': ['prettier --write'],
};
