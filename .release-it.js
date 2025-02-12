module.exports = {
  git: {
    commitMessage: 'chore: release v${version}',
    tagName: 'v${version}',
    push: true
  },
  hooks: {
    'after:bump': 'npx conventional-changelog -p angular -i CHANGELOG.md -s'
  },
  github: {
    release: true
  },
  npm: {
    publish: false
  }
}