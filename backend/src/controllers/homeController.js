const asyncHandler = require('express-async-handler')

const { models } = require('../models');
const User = models.users
// @desc    Get homes
// @route   GET /homes
// @access  Private
const getHomes = asyncHandler(async (req, res) => {
  const { email } = req.query
  let homes = await models.homes.findAll( {attributes:['homeID'] , where : {email}});
  if (homes) {
      res.status(200).json(homes);
  } else {
      homes = await models.homes.findAll();
      res.status(200).json(homes);
  }
})

// @desc    Set home
// @route   POST /homes
// @access  Private
const addHome = asyncHandler(async (req, res) => {
  const {  email, homeID } = req.body
  console.log(req.body)
  let found = await models.homes.findAll({where :{email, homeID}});
  if (found.length > 0){
    res.status(409).json({mesg : "Already Here"});
  }else{
    await models.homes.create({email, homeID});
    res.status(201).json({mesg : "Added homeID"});
  }
})


// @desc    Delete home
// @route   DELETE /homes
// @access  Private
const deleteHome = asyncHandler(async (req, res) => {
  const {  email, homeID } = req.body
  let found = await models.homes.findAll({where :{email, homeID}});
  if (found.length > 0){
    await models.homes.destroy({
      where :{email, homeID}
    });
    res.status(200).json({msg: "Deleted homeID",
    homeID: homeID
  })
  }else{
    res.status(400).json({mesg : "homeID is not added"});
  }
  // if(!email){
  //     res.status(400).send('400 - Bad Request');
  // }
  // await models.homes.destroy({
  //     where: {
  //         "email":email
  //     }
  // });
  // res.status(200).end();
})

module.exports = {
  getHomes,
  addHome,
  deleteHome,
}