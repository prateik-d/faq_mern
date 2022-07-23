const router = require('express').Router();
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try 
    {
        let dob = req.body.dob;
        
        var pwd_arr = dob.split('-');

        let pwd = pwd_arr[2] + '-' + pwd_arr[1] + '-' + pwd_arr[0] ;

        const { error } = validate(req.body);
        if(error)
            return res.status(400).send({ message:  error.details[0].message })
        
        const user = await User.findOne({email: req.body.email});
        if(user)
            return res.status(400).send({ message: "User with given email already exist" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        // const hashPassword = await bcrypt.hash(req.body.password, salt);
        const hashPassword = await bcrypt.hash(pwd, salt);

        // console.log( {...req.body, password: hashPassword } );

        await new User({ ...req.body, password: hashPassword })
                .save()
                    .then(data => {
                        res.status(201).send({ message: 'User created successfully', data: data });
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
    const user = await User.find({role: 2})
        .then((data)=>{
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        })      
})

router.get('/list_count', async (req, res) => 
{
   
    User.count({role: 2}, function(err, count)
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
   
    User.findById(id, function (err, data) {
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
        
        console.log(req_body);


        // const { error } = validate(req.body);

        // if(error)
        //     return res.status(400).send({ message:  error.details[0].message })

    }
    catch(err)
    {
        res.status(500).send({ message: 'Internal Server Eroor' });
    }
});



module.exports = router;