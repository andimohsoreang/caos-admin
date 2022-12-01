const fs = require('fs')
const datasetPath = `${__dirname}/../config/dataset.json`
const datasetConfig = require(datasetPath)

module.exports = {
    dataset: (req, res) => {
        const dataset = req.files.dataset
        const oldpath = dataset.path;
        const newFileName = `${new Date().getTime()}_${dataset.name}`
        const newpath = `${__dirname}/../public/uploads/${newFileName}`;
        fs.rename(oldpath, newpath, (err) => {
            if (err) {
                console.log(err)
                req.flash('alert', {hex: '#f3616d', color: 'danger', status: 'Failed'})
                req.flash('message', 'Upload Gagal')
                return res.redirect('/importdataset')
            }
        })
        datasetConfig.fileName = newFileName;
        fs.writeFile(datasetPath, JSON.stringify(datasetConfig), (err) => {
            if (err) {
                console.log('An error has occurred ', err)
            }
        })
        req.flash('alert', {hex: '#28ab55', color: 'success', status: 'Success'})
        req.flash('message', 'Upload Berhasil')
        return res.redirect('/importdataset')
    }
}

