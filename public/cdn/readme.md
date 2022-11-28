# cdn
本目录用于存储一些使用到的 cdn, 便于本地化部署.

使用 vue@2.4.4 的 cdn 资源, 可以使用下面方式获取:

## 方法一
这个方法相当于使用 wget 去网页上逐一下载每个文件, 速度较慢, 但下载后的文件能与 url 引用地址保持一致.

``` sh
wget -cmkEpnp -R index.htm* https://cdn.jsdelivr.net/npm/vue@2.4.4/
```

## 方法二
使用包管理下载, 例如 `yarn add vue@2.4.4`, 这种方式下载比较快, 但目录上并没有 `@2.4.4` 的标志, 并且会下载其他依赖文件.

如果要实现目录带版本标志, 需要做额外处理.


``` sh
# 示例
wget -cmkEpnp -R index.htm* https://cdn.jsdelivr.net/npm/vue-dplayer@0.0.10/
```