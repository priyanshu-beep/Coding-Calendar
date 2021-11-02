const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '966641561326-7nivlb5sna5dpcloaot4d51oba9n46ej.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
const checkAuthenticated = function(req, res, next){

    let token = req.cookies['session-token'];
    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }
      verify()
      .then(()=>{
          req.user = user;
          next();
      })
      .catch(err=>{
          
        res.redirect('/users/login');
        console.log(err);
    })
}

module.exports = {
    checkAuthenticated
}