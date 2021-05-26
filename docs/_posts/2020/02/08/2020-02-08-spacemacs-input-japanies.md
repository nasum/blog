---
date: "2020-02-08"
slug: spacemacs-input-japanies
tag:
  - emacs
  - spacemacs
  - mozc
author: nasum
lang: ja
---

# spacemacs で mozc を用いた日本語入力

最近普段使いするエディタを spacemacs にしようと思っていろいろ調べています。spacemacs で日本語入力をしようと思って詰まったのでその時のメモを残します。

環境

|   名前    | バージョン |
| :-------: | :--------: |
|   emacs   |    26.3    |
| spacemacs |  0.200.13  |
|  ubuntu   |   18.04    |

## emacs-mozc-bin のインストール

emacs で mozc を使うためのパッケージ emacs-mozc-bin をインストールします。

```bash
$ sudo apt-get install emacs-mozc-bin
```

## .spacemacs を編集

spacemacs の設定 `.spacemacs` を次のように編集します。

`~/.spacemacs`

```lisp
(defun dotspacemacs/layers ()
  ;; 略
  (setq-default
   dotspacemacs-additional-packages '(
                                      mozc
                                      )
  ;; 略
   dotspacemacs-install-packages 'used-only))


(defun dotspacemacs/user-config ()
  ;; 略

  ;; Mozc settings
  (set-language-environment "Japanese")
  (setq default-input-method "japanese-mozc")
  (setq mozc-candidate-style 'echo-area)

  (defun mozc-start()
    (interactive)
    (set-cursor-color "blue")
    (message "Mozc start")
    (mozc-mode 1))

  (defun mozc-end()
    (interactive)
    (setm-cursor-color "gray")
    (message "Mozc end")
    (mozc-mode -1))

  (bind-keys*
   ("<henkan>" . mozc-start)

  (bind-keys :map mozc-mode-map
             ("q" . mozc-end)
             ("C-g" . mozc-end)
             ("C-x h" . mark-whole-buffer)
             ("C-x C-s" . save-buffer))

  )
```

これで mozc による日本語入力が可能になります。

## 参考 URL

[Emacs から Spacemacs に乗り換えました-株式会社クイックの Web サービス開発 blog](https://aimstogeek.hatenablog.com/entry/2017/02/09/101450)
