# jump-to-line

Rapidly jump to the start of any line that is currently visible.

![gif](https://cldup.com/wK4OJ-4eHF.gif)

This was the only feature that I really used from [vim-easymotion](https://github.com/easymotion/vim-easymotion), and no other
package emulated the workflow that I wanted well. Most of the time I don't want
to search, or figure out what motion gets me precisely where I want. With this
I just look at the line that I want to jump to, hit the label button, and I'm
there.

# Features

* Search and jump to position across visible panes.
* [easymotion](https://github.com/easymotion/vim-easymotion) style label jump.

# How to use

1. Start jump-to-line-mode with `jump-to-line:start`
2. Type the label for the line you want to go to, and your cursor will be moved

# Commands

* `jump-to-line:start`: Start smalls jumping mode.

# Keymap
No keymap by default.

e.g.

```coffeescript
'atom-text-editor:not([mini])':
  'ctrl-;': 'jump-to-line:start'
```

# Similar packages

Atom
* [atom-smalls](https://atom.io/packages/smalls)
* [jumpy](https://atom.io/packages/jumpy)
* [easy-motion](https://github.com/adrian-budau/easy-motion)
* [quick-jump](https://atom.io/packages/quick-jump)
* [QuickJumpPlus](https://atom.io/packages/QuickJumpPlus)

Vim
* [vim-easymotion](https://github.com/easymotion/vim-easymotion)
* [clever-f](https://github.com/rhysd/clever-f.vim)
* [vim-sneak](https://github.com/justinmk/vim-sneak)
* [vim-seek](https://github.com/goldfeld/vim-seek)
* [vim-smalls](https://github.com/t9md/vim-smalls)

Emacs
* [ace-jump-mode](https://github.com/winterTTr/ace-jump-mode)

IntelliJ
* [AceJump](https://github.com/johnlindquist/AceJump)

# Thanks to great predecessor!!

This package is a fork and rewrite to flow/ES6 of [atom-smalls](https://atom.io/packages/smalls)
