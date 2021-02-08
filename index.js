const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require('./config/keys');
const DiscordStrategy = require("passport-discord");

const app = express();
const port = process.env.PORT || 4000

let ddd = 123456678996335678666


passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientId,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback"
  },
    (accessToken, refreshToken, profile, done)=>{
        console.log("access token", accessToken)
        console.log("refresh token", refreshToken)
        console.log('profile', profile)
        console.log('done', done)
    }
  ), 
)

passport.use(
    new DiscordStrategy({
        clientID: keys.dicordClientId,
        clientSecret: keys.discordClientSecret,
        callbackURL: "/auth/discord/callback",
        scope: 'identify'
    },
    (accessToken, refreshToken, profile, cb) =>{
      console.log("access token", accessToken)
          console.log("refresh token", refreshToken)
          console.log('profile', profile)
          console.log('cb', cb)
      }
    )
)

app.get('/auth/google', 
passport.authenticate('google', { scope: ['email','profile'] }));

app.get("/",(req, res)=>{
    console.log(ddd);
    res.send("hellow mere world"); 
})

app.get('/auth/google/callback', 
  passport.authenticate('google'),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/auth/discord', passport.authenticate('discord'));


app.get('/auth/discord/callback',passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect('/secretstuff') // Successful auth
});

app.get('/secretstuff',(req, res)=>{
    res.send('Yaa authenticated');
})

app.listen(port,()=>{
    console.log("server running on "+port)
})


