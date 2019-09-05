const jwt = require("jsonwebtoken")
const authConfig = require("../../config/auth.json")


module.exports = (req, res, next) => {
	const autheader = req.headers.authorization
	if(!autheader) {
       return res.status(401).send({error: "No token provided"})
	}

	const parts = autheader.split(' ')

	if(!parts.length == 2){
		return res.status(401).send({error: "Token error"})
	}

	const [scheme, token] = parts

	if(!/^Bearer$/i.test(scheme)) {
       return   res.status(401).send({error: "Token  malformated"})
	}

	jwt.verify(token, authConfig.secret, (err, decoded) => {
		if(err) {
            return res.status(401).send({error: "Invalid Token"})
		}

		req.userId = decoded.id

		return next()
	})


	next()
}