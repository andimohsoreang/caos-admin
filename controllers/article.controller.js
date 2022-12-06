const model = require('../models/index');
const fs = require('fs')
const path = require('path');

module.exports = {
    article: async(req,res)=>{
        const data = await model.Category.findAll({
                attributes: ['name']
        })
        res.render('./pages/insertArticle',{data});
    },
    insertarticle : async(req,res) => {
        const {title,category,bodyArticle} = req.body;
        const image = req.files.foto;
        //image setting
        const ext = path.extname(image.name);
        const fileName = image.md5 + Math.floor(Date.now() / 1000) + ext;
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
        const newpath = `${__dirname}/../public/images/uploads/${fileName}`;
        await image.mv(newpath);

        // console.log(image);
        let finalSlug = title.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\W+/g, '-').toLowerCase();
        if(finalSlug.endsWith('-')) finalSlug = finalSlug.slice(0,finalSlug.length -1);
        if(finalSlug.startsWith('-')) finalSlug = finalSlug.slice(1,finalSlug.length);

        const data = await model.User.findOne({
            where : {
                uuid : req.session.userid,
            }
        })

        await model.Article.create({
            title,
            category,
            body : bodyArticle,
            image_name : fileName,
            slug: finalSlug,
            id_user : data.id
        }).then((result)=>{
            req.flash('alert', {hex: '#28ab55', color: 'success', status: 'Success'})
            req.flash('message', `Artikel Berhasil Dibuat`)
            res.status(201);
        }).catch((error)=>{
            console.log(error)
            req.flash('alert', {hex: '#f3616d', color: 'danger', status: 'Failed'})
            req.flash('message', 'Gagal membuat Artikel')
            res.status(400);
        })
        res.redirect('/insertarticle');
    },
    getarticle: async(req,res) => {
        const data = await model.Article.findAll({
            attributes : ['title','category','createdAt','updatedAt','slug']
        });
        // console.log(data);
        res.render('./pages/getArticle', {data});
    } 
    
}
