const router = require('express').Router();
const { Article, validate } = require('../models/article');


router.post('/', async (req, res) => 
{
    try 
    {

        // console.log(req.body);


        const { error } = validate(req.body);

        if(error)
            return res.status(400).send({ message:  error.details[0].message });


        const article_title = await Article.findOne({title: req.body.title});
        const article_slug = await Article.findOne({slug: req.body.slug});

        if(article_title)
            return res.status(400).send({ message: "Article with given title already exist" });
    
        if(article_slug)
            return res.status(400).send({ message: "Article with given slug already exist" });
        
        var date_time = new Date();

        await new Article({ ...req.body, status: 1, created_at: date_time, updated_at: date_time })
                .save()
                    .then(data => {
                        res.status(201).send({ message: 'Article created successfully', data: data });
                    })
                    .catch(err => {
                        res.status(500).send({ message: 'Something went wrong' + err });
                    })
    } 
    catch (error) 
    {
        res.status(500).send({ message: 'Internal Server Eroor'+ error });
    }
})

router.get('/list', async (req, res) => 
{
    Article.find({status: 1})
        .sort({updated_at:-1})
        .populate('category')
        .populate('tags')
        .exec()
        .then((data)=>{
                    res.status(200).send(data);
                })
        .catch((err) => {
            res.status(500).send(err);
        });
})

router.get('/list_count', async (req, res) => 
{
   
    Article.count({status: 1}, function(err, count)
    {
        if (err)
        {
            res.status(500).send(err);
        } 
        else 
        {
            res.status(200).send((count).toString());
        }
    });
});


router.get('/view/:id', async (req, res) => 
{
    var id = req.params.id; 
   
    Article
        .findById(id)
        .sort({updated_at:-1})
        .populate('category')
        .populate('tags')
        .exec()
        .then((data)=>{
                    res.status(200).send(data);
                })
        .catch((err) => {
            res.status(500).send(err);
        });
});

router.get('/tags/:id', async (req, res) => 
{
    var id = req.params.id; 
   
    Article
        .findById(id)
        .populate('tags', '_id')
        .then((data)=>{
                    res.status(200).send(data.tags);
                })
        .catch((err) => {
            res.status(500).send(err);
        });
});

router.put('/update/:id', async (req, res) => 
{
    try
    {
        
        let req_body = req.body;
        let id = req.params.id; 

        console.log(req_body);
        // console.log(id);

        const { error } = validate(req.body);
        
        if(error)
            return res.status(400).send({ message:  error.details[0].message })
        
        const article_name = await Article.findOne({name: req.body.name});
        const article_slug = await Article.findOne({slug: req.body.slug});

        if(article_name)
        {
            if(article_name.id != id)
            {
                return res.status(400).send({ message: "Article with given name already exist" });
            }
        }
    
        if(article_slug)
        {
            if(article_slug.id != id)
            {
                return res.status(400).send({ message: "Article with given slug already exist" });
            }
        }

        var date_time = new Date();

        Article.findByIdAndUpdate(id, req_body,{"updated_at": date_time}, function(err, result){

            if(err){
                res.status(500).send({ message: 'Something went wrong: ' + err });
            }
            else{
                res.status(201).send({ message: 'Article updated successfully' });
            }
    
        });
    
    }
    catch(err)
    {
        res.status(500).send({ message: 'Internal Server Eroor' });
    }
});

router.delete('/delete/:id', async (req, res) => 
{
    var id = req.params.id; 
    
    // console.log(id);

    Article.findByIdAndRemove(id, function (err, docs) {
        if (err){
            res.status(400).send({ message: 'Something went wrong'});
        }
        else{
            res.status(200).send({ message: 'Article deleted successfully' });
        }
    });
})

module.exports = router;