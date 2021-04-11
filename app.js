const express = require('express');
const app = express();

const { mongoose } = require('./backend/db/mongoose');

const bodyParser = require('body-parser');

//Load in the mongoose models
const { User } = require('./backend/db/models');


const jwt = require('jsonwebtoken');

/* MIDDLEWARE */

/* LOAD GLOBAL MIDDLEWARE */
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the req from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");
  res.header('Access-Control-Expose-Headers', "x-access-token, x-refresh-token");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");

  res.header(
      'Access-Control-Expose-Headers',
      'x-access-token, x-refresh-token'
  );

  next();
});

//Verify refresh token middleware (which will be verifying the session)
let verifySession = (req, res, next) => {
    //grab the refresh token from the request header
    let refreshToken = req.header('x-refresh-token');

    //grab the _id from the refresh header
    let _id =  req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            //user couldn't be found
            return Promise.reject({
                'error' : 'User not found. Make sure that the refresh token and user id are correct'
            });
        }

        //if the code reaches here - the user was found
        //therefore the refresh token exists in the database

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token ===refreshToken) {
                //check if the session has expired
                if (User.hasRefreshTokenExpired(session.expiresAt) === false){
                    //refresh token has not expired
                    isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            //the session is valid , call next() to continue with processing this web request
            next();
        }else {
            //the session is not valid
            return Promise.reject({
                'error' : 'Refresh token has expired or the session is invalid'
            })
        }
    }).catch((e) => {
        res.status(401).send(e);
    })
}
/* END MIDDLEWARE */


/*USER ROUTES */
/**
 * POST/Users
 * Purpose: Sign up
 */
 app.post('/users', (req, res) => {
    //Create a new user
    let body = req.body;
    let newUser = new User(body);
    newUser.save().then(() => {
      return newUser.createSession();
    }).then((refreshToken) => {
      //Session created successfully, refresh token returned
      //Now generate an access auth token for the user
      return newUser.generateAccessAuthToken().then((accessToken) => {
        //Access token generated successfully
        //Now return an object containing the auth tokens
        return { accessToken, refreshToken }
      })
    }).then((authTokens) => {
      //Now construct and send respond to user with their auth tokens in the header and user object in the body
      res
          .header('x-refresh-token', authTokens.refreshToken)
          .header('x-access-token', authTokens.accessToken)
          .send(newUser);
    }).catch((e) => {
      res.status(400).send(e);
    })
  })

/*USER ROUTES */
/**
 * POST/Users/login
 * Purpose: Login
 */
 app.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
      return user.createSession().then((refreshToken) => {
          //Sessions created successfully - refreshToken returned
          //Generate an access auth token for the user

        return user.generateAccessAuthToken().then((accessToken) => {
            //access auth token generated successfully => return an object containing the auth tokens
          return { accessToken, refreshToken }
        })
      }).then((authTokens) => {
        //Now construct and send respond to user with their auth tokens in the header and user object in the body
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(user);
      })
    }).catch((e) => {
      res.status(400).send();
    })
  })


/**
 * GET /users/me/access-token
 * Purpose: generates and return an access token
 */
 app.get('/users/me/access-token', verifySession, (req, res) => {
    //The user/caller is authenticated, user_id and user object is available
    req.userObject.generateAccessAuthToken().then((accessToken) => {
      res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
      res.status(400).send(e);
    })
  })




/////////////////////////////////////////////////////
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})
