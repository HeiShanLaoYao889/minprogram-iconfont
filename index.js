#!/usr/bin/env node
/*
 * @Author: heishanlaoyao 
 * @Date: 2020-08-22 01:13:48 
 * @Last Modified by: heishanlaoyao
 * @Last Modified time: 2020-08-25 09:41:38
 */
const {readJson } = require('./lib/fileUtil');
const { executeGeneate} = require('./command/geneateStyleFont');
const {command} = require('./lib/command');
const { initIconfontConfig} = require('./command/initConfig')
const colors = require('colors');
(() => {
    try {
       
        let packageJson = require('./package.json')
        const commands = [
            {
                name: 'init',
                desc: 'Initialize the configuration file',
                callback: initIconfontConfig
            },
            {
                name: "generate",
                desc: 'Generate the style sheet from the configuration file',
                callback: executeGeneate
            }
        ]
        command.init(packageJson.version)
        command.main(commands)
    } catch (error) {
        console.error(colors.red(error))
    }
})()