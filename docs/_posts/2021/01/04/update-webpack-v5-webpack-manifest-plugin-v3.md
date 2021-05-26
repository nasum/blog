---
date: "2021-01-04"
slug: update-webpack-v5-webpack-manifest-plugin-v3
tag:
  - webpack
  - javascript
author: nasum
lang: ja
---

# Webpack を v5 に webpack-manifest-plugin を v3 にアップグレードする

[webpack-manifest-plugin](https://github.com/shellscape/webpack-manifest-plugin)が v3.0.0 にアップデートして Webpack の v5 に対応したので自分のサービスの webpack を v5.11.1、webpack-cli を v4.3.1、webpack-manifest-plugin を v3.0.0 にアップグレードしました。

|          name           | version |
| :---------------------: | :-----: |
|         webpack         | 5.11.1  |
|       webpack-cli       |  4.3.1  |
| webpack-manifest-plugin |  3.0.0  |

## webpack-manifest-plugin をアップデートすることによる差分

webpack の設定はあまり凝ってなかったこともありほとんど変えないでも大丈夫でしたが、一部`webpack-manifest-plugin` 周りはちょっと変える必要がありました。

差分は次のとおりです。

```diff
- const Manifest = require('webpack-manifest-plugin')
+ const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
module.exports = {
  mode: 'development',
  // 略
  plugins: [
    // 略
-   new Manifest(),
+   new WebpackManifestPlugin({ publicPath: '' }),
  ],
}
```

ほとんど大したことはしてないのですが、`require`周りと `plugin` の `option` を修正しました。

`option`のところが曲者でこれがないと `manifest` が次のように吐き出されてしまいます。

```json
{
  "app.css": "autoapp.css",
  "app.js": "autoapp.07e61b858bd29646bfb1.js"
}%
```

何故か `auto` という文字列が入ってしまいます。この問題に関しては[issue](https://github.com/shellscape/webpack-manifest-plugin/issues/229)が上がっていたのですが、問題は webpack5 の方らしく、[webpack5 の migration ガイド](https://webpack.js.org/migrate/5/)の方に書いてありました。

> 404 errors pointing to URLs containing auto
> Not all ecosystem tooling is ready for the new default automatic publicPath via output.publicPath: "auto"
> Use a static output.publicPath: "" instead.

ここに書かれている通り `option` の `publicPath` に空文字を入れて対応しました。

これで一旦対応を完了しました。webpack5 の方の migration ガイドはちゃんと読まないといけませんね。
