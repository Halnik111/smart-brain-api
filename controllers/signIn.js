
const handleSignIn = (req, res, knex, bcrypt) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('Login form blank');
    }
    knex.select('email', 'hash').from('login').where('email', req.body.email)
        .then(data => {
            if (bcrypt.compareSync(req.body.password, data[0].hash)) {
                return knex.select('*').from('users').where('email', data[0].email)
                           .then(user => {
                               res.json(user);
                           })
            }
            else {
                res.status(400).json('Invalid login.');
            }

        })
        .catch(() => res.status(400).json('Invalid login.'));
}

module.exports = {
    handleSignIn: handleSignIn
}