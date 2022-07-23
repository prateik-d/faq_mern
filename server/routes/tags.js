const router = require('express').Router();
const { Tags, validate } = require('../models/tags');


router.post('/', async (req, res) => 
{
    try 
    {
        const { error } = validate(req.body);

        if(error)
            return res.status(400).send({ message:  error.details[0].message });


        const tags_name = await Tags.findOne({name: req.body.name});
        const tags_slug = await Tags.findOne({slug: req.body.slug});

        if(tags_name)
            return res.status(400).send({ message: "Tags with given name already exist" });
    
        if(tags_slug)
            return res.status(400).send({ message: "Tags with given slug already exist" });
        
        var date_time = new Date();

        await new Tags({ ...req.body, status: 1, created_at: date_time, updated_at: date_time })
                .save()
                    .then(data => {
                        res.status(201).send({ message: 'Tags created successfully', data: data });
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
    const tags = await Tags.find({status: 1}).sort({updated_at:-1})
        .then((data)=>{
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        })      
})

router.get('/list_count', async (req, res) => 
{
   
    Tags.count({status: 1}, function(err, count)
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
   
    Tags.findById(id, function (err, data) {
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
        
        const tags_name = await Tags.findOne({name: req.body.name});
        const tags_slug = await Tags.findOne({slug: req.body.slug});

        if(tags_name)
        {
            if(tags_name.id != id)
            {
                return res.status(400).send({ message: "Tags with given name already exist" });
            }
        }
    
        if(tags_slug)
        {
            if(tags_slug.id != id)
            {
                return res.status(400).send({ message: "Tags with given slug already exist" });
            }
        }

        var date_time = new Date();

        Tags.findByIdAndUpdate(id, req_body,{"updated_at": date_time}, function(err, result){

            if(err){
                res.status(500).send({ message: 'Something went wrong: ' + err });
            }
            else{
                res.status(201).send({ message: 'Tags updated successfully' });
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

    Tags.findByIdAndRemove(id, function (err, docs) {
        if (err){
            res.status(400).send({ message: 'Something went wrong'});
        }
        else{
            res.status(200).send({ message: 'Tags deleted successfully' });
        }
    });
})

module.exports = router;