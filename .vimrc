" Use Vim settings, rather then Vi settings (much better!).
" This must be first, because it changes other options as a side effect.
set nocompatible

runtime bundle/vim-pathogen/autoload/pathogen.vim
call pathogen#infect()

syntax on
filetype plugin indent on

" darkmode
let g:solarized_termtrans = 1
let g:solarized_termcolors=256
set background=dark
colorscheme solarized

set number
set expandtab
set shiftwidth=2
set softtabstop=2
set smarttab
set autoindent
set backspace=indent,eol,start

" highlight searches
set hlsearch

" highlight dynamically as pattern is typed
set incsearch

" Ignore case of searches
set ignorecase

" Always show status line
set laststatus=2

" Don’t reset cursor to start of line when moving around.
set nostartofline

" Show the filename in the window titlebar
set title

" be silent
set noerrorbells

" keep a big history
set history=1000

" always show the mode in which one is in
set showmode

" Use the OS clipboard by default (on versions compiled with `+clipboard`)
set clipboard=unnamed

" highlight the current line
set cursorline

" enable mouse in all modes
set mouse=a

" Add the g flag to search/replace by default
set gdefault

" Reload files changed outside vim
set autoread

" ============= Coding practices =====================

" show row and column information in the status bar
set ruler

" Display tabs and trailing spaces visually
set list listchars=tab:\ \ ,trail:·

" use different background color after 80 chars
" http://stackoverflow.com/questions/235439/vim-80-column-layout-concerns
highlight OverLength ctermbg=red ctermfg=white guibg=#592929
match OverLength /\%81v.\+/

" ================ Scrolling ========================

set scrolloff=8         "Start scrolling when we're 8 lines away from margins
set sidescrolloff=15
set sidescroll=1

" ================ Plugins  ========================

" vim-markdown
" Do not fold sections
let g:vim_markdown_folding_disabled=1

" NERDTree
" Show hidden files by default
let NERDTreeShowHidden=1

let NERDTreeIgnore = ['\.DS_Store$']

" ================= Keys = ========================

let mapleader = "," " , is just easier to type

" toggle the NERDTree via ,-b
nmap <leader>b :NERDTreeToggle<CR>

let g:multi_cursor_next_key='<C-d>' " use Ctrl-D so select multiple lines with
                                    " multiple cursors. This is part of the
                                    " vim-multiple-cursors plugin
