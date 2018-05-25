module.exports = {
 chainWebpack: config => {
   if (process.env.NODE_ENV === 'production') {
     // console.log(config.plugins.entries())
     config.plugins.delete('html')
     config.plugins.delete('split-vendor')
     config.plugins.delete('split-manifest')
      config.plugins.get('extract-css')
    .tap(args => {
      args[0].disable = true
      return args
    })
     config.output.libraryTarget('umd')
     config.output.filename('js/app.js')
   }
 }
}
