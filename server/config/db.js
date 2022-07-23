const mongoose = require('mongoose');

module.exports = () =>
{
    const connectionParams = {
        useNewURLParser : true,
        useUnifiedTopology : true
    };

    try
    {
        mongoose.connect(process.env.DB, connectionParams);
        console.log('Connection to DB Successfully');
    }
    catch(err)
    {
        console.log('Could not connect to DB due to : ' + err);
    }
}