[ -n "$PS1" ] && source ~/backup/dotfiles/.bash_profile

# added by travis gem
[ -f /Users/ben/.travis/travis.sh ] && source /Users/ben/.travis/travis.sh

export NVM_DIR="/Users/ben/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
