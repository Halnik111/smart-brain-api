
//TODO endpoint for editing profile

const handleProfile = (req, res, knex) => {
    const {id} = req.params;
    knex.select('*').from('users').where('id', id)
        .then(data => {
            if (data.length)
                res.json(data)
            else
                res.status(400).json('error getting user');
        })
}

module.exports = {
    handleProfile: handleProfile
}