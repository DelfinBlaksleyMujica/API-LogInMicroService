const router = require("express").Router();
const { User , validate } = require("../models/users");
const bcrypt = require("bcrypt");



router.route("/fetchdata").get(function(req, res) {
    const users = User;
    users.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });


router.post("/" , async ( req , res ) => {
    try{
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        const user = await User.findOne({ email: req.body.email});
        if ( user ) {
            return res.status(409).send({ message:"User with given email already exists!"})
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash( req.body.password , salt );

        await new User({...req.body , password: hashPassword }).save();
        res.status(201).send({message: "User created successfully"});
    } catch ( error ) {
        res.status(500).send({ message: error.message})
    }
})

module.exports = router;