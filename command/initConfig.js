/*
 * @Author: heishanlaoyao 
 * @Date: 2020-08-22 00:53:48 
 * @Last Modified by: heishanlaoyao
 * @Last Modified time: 2020-08-24 17:02:04
 */
/**
 * 初始化 iconfont配置
 *
 * @param {*} params
 */
const { writeJson } = require('../lib/fileUtil');
const colors = require('colors');
const { getProjectRootPath } = require('../lib/rootPath')


const configTemp = {
    "cssPath": "请输入iconfont项目中的font class地址",
    "saveDir": "请输入生成后的文件存放目录",
    "cssModules": "请输入要转换的CSS预处理器格式",
    "fileName": "iconfont"
}
/**
 * 生成默认配置文件
 * @param {*}  
 */
async function initIconfontConfig() {
    let path = getProjectRootPath()
    console.log(path);
    try {
        await writeJson(`${path}/iconfont.json`, configTemp)
        console.log(colors.green("iconfont.json generation successful", `${path}/iconfont.json`));
    } catch (error) {
        console.error(colors.red(error))
    }
}
module.exports = { initIconfontConfig}