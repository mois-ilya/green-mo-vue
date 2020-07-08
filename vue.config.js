const fs = require('fs');

module.exports = {
  devServer: {
    proxy: {
      "/api/": {
        target: "http://localhost:3000/"
      }
    },
    https: true
  },
  transpileDependencies: [
    "vuetify"
  ],
  pwa: {
    name: 'Озеленение Владимирский',
    themeColor: '#2b7a23',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'dev/sw.js',
      // ...other Workbox options...
    },
    iconPaths: {
      favicon32: 'static/favicon.ico',
      favicon16: 'static/favicon.ico',
      appleTouchIcon: 'static/favicon.ico',
      maskIcon: 'static/favicon.ico',
      msTileImage: 'static/favicon.icog'
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}