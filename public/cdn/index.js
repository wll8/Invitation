const cp = require(`child_process`)
const fs = require(`fs`)
const shelljs = require(`shelljs`)
const download = require(`download`)
const path = require(`path`)

const list = [
  `vue@2.4.4`,
  `vue-dplayer@0.0.10`,
  `vconsole@3.15.0`,
  `swiper@3.4.2`,
  `fingerprintjs2@2.1.0`,
  `vue-router@2.7.0`,
  `vue-baberrage@2.1.9`,
  `zepto@1.2.0`,
  `@wll8/express-ws@1.0.3`,
]
const dirSave = `./npm`
const pList = list.map((item, index) => {
  return new Promise(() => {
    cp.exec(`npm view ${item} dist.tarball`, async (err, stdout) => {
      const tarbal = stdout.toString().trim()
      const nameFile = `./tgz/${item}/${path.parse(tarbal).name}.tgz`
      if (fs.existsSync(nameFile)) {
        console.log(`${item} skip`)
        return undefined
      }
      const unZipDir = nameFile.replace(/.tgz$/, ``)
      await download(tarbal, `./tgz/${item}`)
      const compressing = require(`compressing`)
      await compressing.tgz.uncompress(nameFile, unZipDir).catch(console.log)
      shelljs.mkdir(`-p`, path.parse(`${dirSave}/${item}`).dir)
      shelljs.mv(`${unZipDir}/package`, `${dirSave}/${item}`)
      console.log(`${item} ok`)
    })
  })
})
Promise.all(pList)
