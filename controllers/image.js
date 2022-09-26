const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '840e115894c145bfb30bcad9d6babb6c'
});

const handleClarifai = (req, res) => {
    app.models.predict(Clarifai.CELEBRITY_MODEL, req.body.input)
       .then(data => {
           res.json(data)
       })
        .catch(() => res.style(400).json('API connection failed'))
}


const handleImage = (req, res, knex) => {
    const {id} = req.body;
    knex('users').where('id', id)
                 .increment('entries', 1)
                 .returning('entries')
                 .then(data => res.json(data))
                 .catch(() => res.status(400).json('unable to get entries'));
}

module.exports = {
    handleImage: handleImage,
    handleClarifai: handleClarifai
}