---
date: "2020-03-11"
slug: deploy-blog-github-actions
tag:
  - vuepress
  - github
auther: nasum
lang: ja
---# VuePress で作ったブログを GitHubActions で GitHub Pages にデプロイする

[LAPRAS アウトプットリレー](https://daily.lapras.blog/)の 2 日目の記事です。

このブログは GitHubActions で GitHub Pages にデプロイしています。今回はそのことについて書いていきます。

## デプロイの構成

このブログは Public なリポジトリの[nasum/blog](https://github.com/nasum/blog)と private なリポジトリの nasum/nasum.github.io で構築されています。Public なリポジトリの[nasum/blog](https://github.com/nasum/blog)の GitHubActions のワークフローでから nasum/nasum.github.io への `git push` でデプロイを行っています。

普通は一つのリポジトリでやると思うのですが、LAPRAS のアウトプットで HTML のコード量だけ異常に増えたら嫌だなと思ってこうしています。

簡単に次のようなフローでデプロイを行っています。

1. Public なリポジトリで master にマージされる
2. それを検知してビルドする（GitHubActions で実行
3. ビルドした成果物を Private なリポジトリに`git push`する（GitHubActions で実行

## GitHubActions の設定

GitHubActions の設定を見ていきます。次のような設定でデプロイフローを構築しています。

```yaml
name: deploy
on:
  push:
    branches:
      - master
jobs:
  deploy:
    runs-on: ubuntu-18.04
    env:
      GA: ${{ secrets.GA }}
    steps:
      - uses: actions/checkout@master
      - name: package install
        run: |
          yarn install
      - name: build
        run: |
          yarn run build
      - name: commit file
        run: |
          cd docs/.vuepress/dist
          echo ${{ secrets.DOMAIN }} > CNAME
          git config --global user.email ${{ secrets.EMAIL }}
          git config --global user.name ${{ secrets.NAME }}
          git init
          git add -A
          git commit -m 'deploy'
      - name: Push
        uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.ACCESS_TOKEN}}
          force: true
          directory: ./docs/.vuepress/dist
          repository: ${{ secrets.REPO_NAME }}
```

ポイントごとに見ていきます。

### master への push を検知

master への push の検知は次のように書きます。

```yaml
on:
  push:
    branches:
      - master
```

`on` ではワークフローをトリガする GitHub のイベントを指定できます。今回の場合だと`master` ブランチへの `push` を検知しワークフローを実行しています。

イベントは `push` だけでなく `pull_request` や定期的に実行する `schedule` もあったりします。詳しくは[ドキュメント](https://help.github.com/ja/actions/reference/workflow-syntax-for-github-actions)を見るとよいです。

### デプロイのワークフロー

デプロイのワークフローは `jobs` に書いていきます。

`runs-on` でビルド環境の設定をします。 `ubuntu` を設定していますが、`windows-latest` や `macos-latest` を指定できます。指定できる環境も[ドキュメント](https://help.github.com/ja/actions/reference/virtual-environments-for-github-hosted-runners)に詳しく書かれています。

`env` ではビルド環境での環境変数を設定しています。自分のブログは GA でアクセス解析をしているのでビルド時に埋め込むために GA の ID を埋め込んでいます。

ここで `secrets.GA` と書いているのですが、これは GitHub のリポジトリの Settings にある Secrets から値を呼び出すコードです。Public なリポジトリの Secrets は Collaborator の権限を持つひとしかアクセスできないので Public なリポジトリで使っても大丈夫です（大丈夫なはず。見えちゃってたらこっそり教えてくれると嬉しい）。

そのあとの `steps` で具体的なデプロイプロセスを記述していきます。このあたりは CircleCI などと同じような感じで書くことができます。

### デプロイステップ

GitHubActions ならではの機能として `uses` で他の Action を呼び出せるというのがあります。今回は master からチェックアウトしてくれる `actions/checkout` と、GitHub のリポジトリへ push してくれる[`ad-m/github-push-action`](https://github.com/ad-m/github-push-action) の２つを使用しています。

具体的なデプロイステップは

1. `actions/checkout` でプロジェクトのチェックアウト
2. パッケージのインストール
3. ビルド
4. 成果物のディレクトリに移動し `git init` `add` `commit` してデプロイの準備を整える
5. `ad-m/github-push-action` で別のリポジトリに push

の順番に行います。このプロセスは VuePress のドキュメントにあった[デプロイ方法](https://vuepress.vuejs.org/guide/deploy.html#github-pages)をそのまま GitHubActions に落とし込んだものです。

`ad-m/github-push-action` では `with` を使ってデプロイに必要な変数を埋め込んできます。ここではトークンや `force push` するかどうか、成果物のディレクトリなどを設定しています。

こうして設定したデプロイフローがうまく動くの GitHub で次のように実行され無事 blog の更新がなされます。

![GitHubActionsでデプロイされる様子](https://i.imgur.com/2iHzs4I.png)

## まとめ

VuePress で作ったブログを GitHubActions でデプロイについて書いていきました。VuePress 公式のデプロイ方法をそのまま GitHubActions に落とし込むことで簡単にデプロイができるようになりました。

GitHubActions はまだ結構やれそうなことがたくさんあるので、例えばデプロイしたら Twitter で通知みたいなこともできそうなので今度はそれにチャレンジしたいと思います。
