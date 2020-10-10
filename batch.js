const fs = require('fs')
const path = require('path')

/**
 * 批量操作 转换pages下页面vue，nvue后缀互相转换
 * action
 * @param {*} dir 页面所在目录
 * @param {*} oExt .vue
 * @param {*} tExt .nvue
 * @param {*} action 文件操作方法
 */
const dir = 'pages'
const oExt = '.vue'
const tExt = '.nvue'
const action = 'put' // delete, put, copy
batches(dir)
// const whiteList = ['draggable']

function batches(dir) {
    const dirs = fs.readdirSync(dir, { withFileTypes: true })
    dirs.forEach(dirent => {
        const fullPath = path.resolve(dir, dirent.name)
        if (dirent.isDirectory()) {
            console.log(fullPath)
            batches(fullPath)
        } else {
            const { base, name, ext } = path.parse(dirent.name)
            if (ext === oExt) {
                if (action === 'delete') {
                    console.log(`delete ${fullPath}`)
                    fs.unlinkSync(fullPath)
                    // ~whiteList.indexOf(fullPath) && fs.unlinkSync(fullPath)
                }

                if (action === 'put') {
                    const oldPath = path.resolve(dir, dirent.name)
                    const newPath = path.resolve(dir, name + tExt)
                    console.log(`rename ${dirent.name} to ${name}${tExt}`)
                    fs.renameSync(oldPath, newPath)
                }
                if (action === 'copy') {
                    const fromPath = path.resolve(dir, dirent.name)
                    const toPath = path.resolve(dir, name + tExt)
                    console.log(`copy ${dirent.name} to ${name}${tExt}`)
                    fs.writeFileSync(toPath, fs.readFileSync(fromPath))
                }
            }
        }
    })
}
