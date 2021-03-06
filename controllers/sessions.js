const express = require('express')
const router = express.Router()
const User = require('../models/users.js')
const bcrypt = require('bcrypt')

router.get('/new', (req, res) => {
	res.render('sessions/new.ejs')
})

router.post('/', (req, res) => {
	User.findOne({username: req.body.username}, (err, foundUser) => {
		if (foundUser === null) {
			res.redirect('/users/new')
		} else {
			const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password)
			if (doesPasswordMatch) {
				req.session.user = foundUser
				req.session.username = foundUser.username
				res.redirect('/restaurants')
			} else {
				res.redirect('/sessions/new')
			}
		}
	})
})

router.post('/destroy', (req, res)=>{ 
	req.session.destroy((err)=>{
		if(err){
			res.send(err)
		} else {
			res.redirect("/restaurants")
		}
	});
});

module.exports = router