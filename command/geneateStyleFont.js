/*
 * @Author: heishanlaoyao 
 * @Date: 2020-08-21 14:26:29 
 * @Last Modified by: heishanlaoyao
 * @Last Modified time: 2020-08-25 09:39:39
 */

const { download, isExisted, writeFileToFolder, readJson } = require('../lib/fileUtil');
const makeDir = require('make-dir');
const colors = require('colors');
const { getProjectRootPath} = require('../lib/rootPath')

/**
 * 读取iconfont全局配置
 * @param {*}  
 */
async function readConfig(rootPath) {
    let configName = "/iconfont.json"
    let path = rootPath + configName
    if (await isExisted(path)) {
        let iconfontJson = await readJson(path)
        return iconfontJson
    }
    console.error(colors.red(`${configName} is not in folder!`))
    throw new Error("The profile does not exist")
}


/**
 * 生成css文件
 * @param {*} folderName 
 * @param {*} fileName 
 */
async function geneateCssFile(folderName, fileName, content, modules) {
    content = content.replace(/\/\/at.alicdn.com/g, 'https://at.alicdn.com')
    try {
        if (await isExisted(folderName) && modules.length > 1) {
            console.log(colors.green("Being generated..."));
        
            modules.forEach(module => {
                writeFileToFolder(folderName, `${fileName}.${module}`, content)
            })
            console.log(colors.green("File generation successful"));
        } else {
            await makeDir(folderName)
            console.log(colors.green("Being generated..."));
            modules.forEach(module => {
                writeFileToFolder(folderName, `${fileName}.${module}`, content)
            })
            console.log(colors.green("File generation successful"));
        }
    } catch (error) {
        console.error(colors.red(error))
    }
}
/**
 * 读取配置文件，下载css，并生成CSS预处理文件
 * @param {*} params 
 */
async function executeGeneate() {
    let config = null
    let path = getProjectRootPath()
    let cssModules = ['css']
    let fileName = "iconfont"
    let content = ""
    try {
        config = await readConfig(path)
        
        if (!(/[a-zA-z0-9]{1,}.css$/g.test(config.cssPath))) {
            console.error(colors.red("The file address must end with.css"))
            return
        }
        content = await download(config.cssPath)
        if (config && Array.isArray(config.cssModules)) {
            cssModules = cssModules.concat(config.cssModules)
            await geneateCssFile(`${path}/${config.saveDir}`, fileName, content, cssModules)
        } else {
            console.error(colors.red("The cssModules should be Array!"))
        }
    } catch (error) {
        console.error(colors.red(error))
    }
}
module.exports = { executeGeneate}



