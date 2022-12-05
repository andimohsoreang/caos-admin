const model = require('../models/index');

module.exports = {
    article: async(req,res)=>{
       
        res.render('./pages/article')
    },
    insertArticle : async(req,res) => {
        const {title,category,bodyArticle} = req.body;
        let finalSlug = title.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\W+/g, '-').toLowerCase();
        if(finalSlug.endsWith('-')) finalSlug = finalSlug.slice(0,finalSlug.length -1);
        if(finalSlug.startsWith('-')) finalSlug = finalSlug.slice(1,finalSlug.length);
        console.log(finalSlug);
        console.log({
            title : title,
            category : category,
        });

        // console.log(req.session);
        const data = await model.User.findOne({
            where : {
                uuid : req.session.userid,
            }
        })
        // console.log(data.id);



        await model.Article.create({
            title,
            category,
            body : bodyArticle,
            slug: finalSlug,
            id_user : data.id
        }).then((result)=>{
            req.flash('alert', {hex: '#28ab55', color: 'success', status: 'Success'})
            req.flash('message', `Artikel Berhasil Dibuat`)
        }).catch((error)=>{
            console.log(error)
            req.flash('alert', {hex: '#f3616d', color: 'danger', status: 'Failed'})
            req.flash('message', 'Gagal membuat Artikel')
        })
        res.redirect('/article');
    }
    
}
