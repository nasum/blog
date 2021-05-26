---
date: "2020-12-6"
slug: emacs-init-el-dev
tag:
  - emacs
author: nasum
lang: ja
---

# emacs.d でないところで init.el を育てる方法

この記事は[Emacs Advent Calendar 2020](https://qiita.com/advent-calendar/2020/emacs)の 6 日目の記事です。

普段自分は `spacemacs` を使っているのですが、ある時なんとなく一から `emacs` の設定を育ててみたくなりました。

ところが `spacemacs` は `emacs.d` に直接 `git clone` してインストールするので `emacs.d` のなかに `init.el` を新たに作るということはできません。普段仕事で `spacemacs` を使っているのでまるっと別のところにコピーというのもあまりやりたくありません。

悩んでいろいろググってみた結果 StackOverflow に良さそうな記事を見つけました。

[https://emacs.stackexchange.com/a/4258](https://emacs.stackexchange.com/a/4258)

この回答いわく。

1. emacs の起動をエイリアスを使って特定の init.el を使うようにする。

```zsh
alias emacs='emacs -q --load "/path/to/init.el"'
```

2. 新しくつくる init.el の `user-init-file` と `user-emacs-directory` を書き換える

```lisp
(setq user-init-file (or load-file-name (buffer-file-name)))
(setq user-emacs-directory (file-name-directory user-init-file))
```

でいけるとか。

`user-init-file` は init.el の絶対パスを示します。この変数を `load-file-name` か `buffer-file-name` に入っている init.el の絶対パスで上書きます。

`user-emacs-directory` は `emacs` の設定ファイルが入っているディレクトリを示します。この変数を先ほどの `user-init-file` から `file-name-directory` でディレクトリのパスを取得し上書きます。

一旦これで `el-get` してきてもちゃんと指定したディレクトリにパッケージが落ちてきたり、自動生成されるファイルも指定したディレクトリに生成されます。

多分他の拡張でお行儀よく `user-init-file` や `user-emacs-directory` を指定して入れば問題なく、横着して `emacs.d` を直接指定しているような拡張があれば壊れてしまう気がしています。その場合は普段遣いしている `spacemacs` の設定が壊れるのでちょっと怖いですね。

とりあえずこれで `spacemacs` とは別に `emacs` の設定を育て始めることができました。ちまちまとこのリポジトリで現在作成中です。

[https://github.com/nasum/.emacs.d](https://github.com/nasum/.emacs.d)

目標は `spacemacs` に頼らず仕事ができるようになることです。まだまだ先な気がしますが気長に育てていこうと思います。
