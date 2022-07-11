var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect('mongodb+srv://Laurent:Jabami4738329@cluster0.rjey0hh.mongodb.net/mymovizapp?retryWrites=true&w=majority',
    options,
    function (err) {
        if (err) {
            console.log(
                `error, failed to connect to the database because-- > ${err}`
            );
        } else {
            console.info("connexion a mymovizapp réussie");
        }
    }
);