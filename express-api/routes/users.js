const express = require('express')
const router = express.Router()
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt')
const passwordCheck = require('../utils/passwordCheck')

// routing endpoint users utama
router.get('/', async (req, res) => {
  const users = await UsersModel.findAll()
  res.status(200).json({
    data: users,
    metadata: "test user endpoint"
  })
})

router.post('/', async (req, res) => {
  //nip, nama, password ->>>>>>>>>>>>>> BE nangkep
  const { nip, nama, password } = req.body

  const encryptedPassword = await bcrypt.hash(password, 10)

  const users = await UsersModel.create({
    nip, nama, password: encryptedPassword
  })
  res.status(200).json({
    registered: users,
    metadata: "test post user endpoint"
  })
})

router.put('/', async (req, res) => {
  //nip, nama, password ->>>>>>>>>>>>>> BE nangkep
  const { nip, nama, password, passwordBaru } = req.body

  const check = await passwordCheck(nip, password)

  const encryptedPassword = await bcrypt.hash(passwordBaru, 10)
  //password yang muncul di db === password dari inputan
  if (check.compare === true) {
    const users = await UsersModel.update({
      nama, password: encryptedPassword
    }, { where: { nip: nip } })

    res.status(200).json({
      users: { updated: users[0] },
      metadata: "user updated! 😋"
    })
  } else {
    res.status(400).json({
      error: "data invalid"
    })
  }
})

router.post('/login', async (req, res) => {
  const { nip, password } = req.body
  try {
    const check = await passwordCheck(nip, password)
    if (check.compare === true) {
      res.status(200).json({
        users: check.userData,
        metadata: "login successs"
      })
    }
  } catch (e) {
    res.status(400).json({
      error: "data invalid"
    })
  }
})

module.exports = router