const model = require("../models/index");
const puppeteer = require('puppeteer');
const fs = require('fs');
const hbs = require('handlebars')
const { Op } = require("sequelize")

module.exports = {
  measurement: async (req, res) => {
    const startYear = new Date(`01/01/${req.params.year}`)
    const endYear = new Date(`01/01/${+req.params.year + 1}`)
    await model.Toddler.findAll({
      attributes: ['nik', 'name'],
      include: [{
        model: model.Measurement,
        attributes: ['bb', 'tb', 'date', 'lila', 'lika'],
        where: {
            date: {
                [Op.between]: [startYear, endYear]
            }
        }
      }]
    }).then(async (toddlers) => {
      toddlers = JSON.parse(JSON.stringify(toddlers))

      for (let i = 0; i < toddlers.length; i++) {
        const e = toddlers[i].Measurements
        for (let j = 0; j < 12; j++) {
            if(!e[j]) {
                e.push({bb: '-', tb: '-', lila: '-', lika: '-', date: null})
            }
        }
        for (let j = 0; j < e.length; j++) {
            if(e[j].date != null) {
                const newIndex = +e[j].date.split('-')[1] - 1
                if(j != newIndex) {
                    e[newIndex] = e[j]
                    e[j] = {bb: '-', tb: '-', lila: '-', lika: '-', date: null}
                }
            }
        }
      }
      
      const data = { toddlers, year: req.params.year }
      
      // Create a browser instance
      const browser = await puppeteer.launch();
  
      // Create a new page
      const page = await browser.newPage();
  
      //Get HTML content from HTML file
      const html = fs.readFileSync(`${dirName}/templates/measurement-report.hbs`, 'utf-8');
      const content = hbs.compile(html)(data)

      await page.setContent(content, { waitUntil: 'domcontentloaded' });
  
      // To reflect CSS used for screens instead of print
      await page.emulateMediaType('screen');
  
      // Downlaod the PDF
      const pdf = await page.pdf({
        path: `${dirName}/public/report/Laporan Register Penimbangan Balita Tahun ${req.params.year}.pdf`,
        margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        printBackground: true,
        format: 'A4',
        landscape: true
      });
  
      // Close the browser instance
      await browser.close();
  
      res.redirect(`${baseUrl}/report/Laporan Register Penimbangan Balita Tahun ${req.params.year}.pdf`)

    }).catch((err) => {
      console.log(err)
      res.redirect(`${baseUrl}/measurement`)
    })
  },
  accumulation: async (req, res) => {
    const startMonth = new Date(`${req.params.year}-${req.params.month}-01`)
    const endMonth = new Date(`${req.params.year}-${req.params.month}-01`)
    endMonth.setDate(endMonth.getDate() + 29);
    await model.Measurement.findAll({
      attributes: ['date', 'bb', 'tb', 'current_age', 'bbu', 'tbu', 'bbtb', 'lila', 'lika'],
        where: {
            date: {
                [Op.between]: [startMonth, endMonth]
            }
        },
        include: [{
            model: model.Toddler,
            attributes: ['name'],
        }],
        raw: true
    }).then(async (measures) => {
      console.log(measures)
      const data = { measures, year: req.params.year, month: req.params.month }
      
      // Create a browser instance
      const browser = await puppeteer.launch();
  
      // Create a new page
      const page = await browser.newPage();
  
      //Get HTML content from HTML file
      const html = fs.readFileSync(`${dirName}/templates/accumulation-report.hbs`, 'utf-8');
      const content = hbs.compile(html)(data)

      await page.setContent(content, { waitUntil: 'domcontentloaded' });
  
      // To reflect CSS used for screens instead of print
      await page.emulateMediaType('screen');
  
      // Downlaod the PDF
      const pdf = await page.pdf({
        path: `${dirName}/public/report/Laporan Akumulasi Penimbangan Balita Bulan ${req.params.month} Tahun ${req.params.year}.pdf`,
        margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        printBackground: true,
        format: 'A4',
        landscape: true
      });
  
      // Close the browser instance
      await browser.close();
  
      res.redirect(`${baseUrl}/report/Laporan Akumulasi Penimbangan Balita Bulan ${req.params.month} Tahun ${req.params.year}.pdf`)

    }).catch((err) => {
      console.log(err)
      res.redirect(`${baseUrl}/measurement`)
    })
  }
};
