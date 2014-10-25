runtime bundle/vim-pathogen/autoload/pathogen.vim
call pathogen#infect()

syntax on
filetype plugin indent on

set number
set expandtab
set shiftwidth=2
set softtabstop=2
set smarttab
set autoindent
set backspace=indent,eol,start
set hlsearch
set incsearch

" use different background color after 80 chars
" http://stackoverflow.com/questions/235439/vim-80-column-layout-concerns
highlight OverLength ctermbg=red ctermfg=white guibg=#592929
match OverLength /\%81v.\+/

" vim-markdown
" Do not fold sections
let g:vim_markdown_folding_disabled=1
