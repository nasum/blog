---
date: "2020-11-15"
slug: emacs-git-gutter-without-global-linum-mode
tag:
  - emacs
author: nasum
lang: ja
---

# global-linum-mode を有効にした状態で git-gutter を有効にすると左 fringe が永遠に拡大する

現象はタイトルの通り。下のコードのような設定をすると、何かをするたびに左 fringe が拡大し続ける。

```lisp
;; init.el
(require 'package)
(add-to-list
 'package-archives
 '("melpa" . "https://melpa.org/packages/"))
(package-initialize)

(global-linum-mode t)

(use-package git-gutter
  :ensure t
  :config
  (global-git-gutter-mode t)
  )
```

この `init.el` を読み込むとなにかするたびに下の図のように左 fringe が拡大し続ける。

![拡大する左fringe](https://i.imgur.com/3qfHTbI.png)

何故こうなるかは `git-gutter` の実装を見てみないとわからないが（そして現在の自分には emacs-lisp を読む力がない・・・）、とりあえず `global-linum-mode` を無効にするとこの現象は起こらない。
