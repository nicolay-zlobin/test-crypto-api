module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },
  css: {
    // Make bootstrap's variables/mixins available global
    // https://css-tricks.com/how-to-import-a-sass-file-into-every-vue-component-in-an-app/
    loaderOptions: {
      sass: {
        prependData: `
          @import "./node_modules/bootstrap/scss/_functions.scss";
          @import "@/assets/style/_variables.scss";
          @import "./node_modules/bootstrap/scss/mixins/_breakpoints.scss";`
      }
    }
  }
}
