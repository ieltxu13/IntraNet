  var jwt        = require('jsonwebtoken');

module.exports = function(authenticate){

  authenticate.route('/')

  .post(function (req, res) {
    //TODO validate req.body.username and req.body.password
    //if is invalid, return 401
    if (!(req.body.username === 'username' && req.body.password === 'password')) {
      res.send(401, 'Wrong user or password');
      return;
    }
    var profile = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@doe.com',
      id: 123
    };
      // We are sending the profile inside the token
    var token = jwt.sign(profile, 'sarabaram', { expiresInMinutes: 60*5 });

    res.json({ token: token });
    });
};
