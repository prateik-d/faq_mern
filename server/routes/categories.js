const router = require('express').Router();
const { Categories, validate } = require('../models/categories');


router.post('/', async (req, res) => 
{
    try 
    {
        const { error } = validate(req.body);

        if(error)
            return res.status(400).send({ message:  error.details[0].message });


        const categories_name = await Categories.findOne({name: req.body.name});
        const categories_slug = await Categories.findOne({slug: req.body.slug});

        if(categories_name)
            return res.status(400).send({ message: "Category with given name already exist" });
    
        if(categories_slug)
            return res.status(400).send({ message: "Category with given slug already exist" });
        
        var date_time = new Date();

        await new Categories({ ...req.body, status: 1, created_at: date_time, updated_at: date_time })
                .save()
                    .then(data => {
                        res.status(201).send({ message: 'Categories created successfully', data: data });
                    })
                    .catch(err => {
                        res.status(500).send({ message: 'Something went wrong' + err });
                    })
    } 
    catch (error) 
    {
        res.status(500).send({ message: 'Internal Server Eroor' });
    }
})

router.get('/list', async (req, res) => 
{
    const categories = await Categories.find({status: 1}).sort({updated_at:-1})
        .then((data)=>{
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        })      
})

router.get('/list_count', async (req, res) => 
{
   
    Categories.count({status: 1}, function(err, count)
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
   
    Categories.findById(id, function (err, data) {
        if (err)
        {
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })
});

router.put('/update/:id', async (req, res) => 
{
    try
    {
        
        let req_body = req.body;
        let id = req.params.id; 

        // console.log(req_body);
        // console.log(id);

        const { error } = validate(req.body);
        
        if(error)
            return res.status(400).send({ message:  error.details[0].message })
        
        const categories_name = await Categories.findOne({name: req.body.name});
        const categories_slug = await Categories.findOne({slug: req.body.slug});

        if(categories_name)
        {
            if(categories_name.id != id)
            {
                return res.status(400).send({ message: "Category with given name already exist" });
            }
        }
    
        if(categories_slug)
        {
            if(categories_slug.id != id)
            {
                return res.status(400).send({ message: "Category with given slug already exist" });
            }
        }

        var date_time = new Date();

        Categories.findByIdAndUpdate(id, req_body,{"updated_at": date_time}, function(err, result){

            if(err){
                res.status(500).send({ message: 'Something went wrong: ' + err });
            }
            else{
                res.status(201).send({ message: 'Categories updated successfully' });
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
    
    console.log(id);

    Categories.findByIdAndRemove(id, function (err, docs) {
        if (err){
            res.status(400).send({ message: 'Something went wrong'});
        }
        else{
            res.status(200).send({ message: 'Categories deleted successfully' });
        }
    });
})

module.exports = router;