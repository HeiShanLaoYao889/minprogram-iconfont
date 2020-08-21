/*
 * @Author: heishanlaoyao 
 * @Date: 2020-08-21 14:26:29 
 * @Last Modified by: heishanlaoyao
 * @Last Modified time: 2020-08-21 18:42:34
 */
const path = require("path")
const { download, isExisted, writeFileToFolder, readJson } = require('./lib/fileUtil');
const makeDir = require('make-dir');
var colors = require('colors');


/**
 *  获取配置文件目录
 * @param {*} params 
 */
function getProjectRootPath() {
    let rootPath = path.resolve(__dirname)
    return rootPath.slice(0, rootPath.indexOf('node_modules'))
}
/**
 * 读取iconfont全局配置
 * @param {*}  
 */
async function readConfig(rootPath) {   
    let configName = "iconfont.json"
    let path = rootPath + configName
    if (await isExisted(path)) {
        let iconfontJson = await readJson(path)
        return iconfontJson
    }
    
    console.error(colors.red(`${configName} is not in folder!`))
    throw new Error("配置文件不存在")
}

/**
 * 初始化 iconfont配置
 *
 * @param {*} params
 */
function initIconfontConfig(params) {

}
/**
 * 生成css文件
 * @param {*} folderName 
 * @param {*} fileName 
 */
async function geneateFontCss(folderName, fileName, content,modules) {
    try {
        if (await isExisted(folderName)) {
            console.log(colors.green("正在生成..."));
           modules.forEach(module=>{
                writeFileToFolder(folderName, `${fileName}.${module}`, content)
           })
            console.log(colors.green("文件生成成功"));
        } else {
            await makeDir(folderName)
            console.log(colors.green("正在生成..."));
            await writeFileToFolder(folderName, fileName, content)
            console.log(colors.green("文件生成成功"));
        }
    } catch (error) {
        console.error(colors.red(error))
    }
}

(async () => {
    let config = null
    let path = getProjectRootPath()
    let cssModules = ['css']
    let fileName = "iconfont"   
    let content = "" 
    try {
        config = await readConfig(path)
        console.log("配置参数：", config.cssModules);
        content = await download(config.cssPath)
        if (config && Array.isArray(config.cssModules)) {
            cssModules = cssModules.concat(config.cssModules)
            await geneateFontCss(`${path}/${config.saveDir}`, fileName, content, cssModules)
        }else{
            console.error(colors.red("cssModules should be Array!"))
        }
    } catch (error) {
        console.error(colors.red(error))
    }
})()