const model = require('../models/index');

module.exports = {
    article: async(req,res)=>{
        const data = await model.Category.findAll({
                attributes: ['name']
        })
        res.render('./pages/insertArticle',{data});
    },
    insertarticle : async(req,res) => {
        console.log("oke");
        const {title,category,bodyArticle} = req.body;
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
            slug: finalSlug,
            id_user : data.id
        }).then((result)=>{
            console.log("oke");
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
