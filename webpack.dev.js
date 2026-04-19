import {merge} from 'webpack-merge';
import commom from 'webpack.common.js'

export default merge(common,{
    mode:"developement",
    devTool:"eval-source-map",
    devServer:{
        WatchFiles:"./src/template.html"
    },
})