const router = require('express').Router();
const { Questions, validate } = require('../../models/faq/questions')


router.post('/', async (req, res) => 
{
    try 
    {

        // console.log(req.body);

        // return;

        const { error } = validate(req.body);

        if(error)
            return res.status(400).send({ message:  error.details[0].message });

        var date_time = new Date();

        await new Questions({ ...req.body, status: 1, created_at: date_time, updated_at: date_time })
                .save()
                    .then(data => {
                        res.status(201).send({ message: 'Question created successfully', data: data });
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
        Questions.find()
            .sort({updated_at:-1})
            .populate('category')
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
   
    Questions.count({status: 1}, function(err, count)
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
   
    Questions.findById(id)
            .sort({updated_at:-1})
            .populate('category')
            .exec()
            .then((data)=>{
                        res.status(200).send(data);
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

        // console.log(req_body);
        // console.log(id);

        const { error } = validate(req.body);
        
        if(error)
            return res.status(400).send({ message:  error.details[0].message })
    
        var date_time = new Date();

        Questions.findByIdAndUpdate(id, req_body,{"updated_at": date_time}, function(err, result){

            if(err){
                res.status(500).send({ message: 'Something went wrong: ' + err });
            }
            else{
                res.status(200).send({ message: 'Question updated successfully' });
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

    Questions.findByIdAndRemove(id, function (err, docs) {
        if (err){
            res.status(400).send({ message: 'Something went wrong'});
        }
        else{
            res.status(200).send({ message: 'Question deleted successfully' });
        }
    });
})

module.exports = router;