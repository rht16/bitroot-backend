const express = require('express')
const mongoose = require("mongoose");
const Contact = require("../schema/contact");
const multer = require('multer');
const upload = multer();
const router = express.Router();
const shortid = require('shortid');

const encodeToBase64 = (str) => {
  const buff = Buffer.from(str);
  return buff.toString('base64');
};

router.post("/add-contacts", upload.fields(
  [{ name: 'image' }],
), async (req, res) => {
  try {
    const {
      name, mobileNumber
    } = req.body;

    const code = shortid.generate();

    const checkDuplicate = await Contact.findOne({
      mobileNumber
    });

    if (checkDuplicate) {
      return res.status(501).send({ msg: 'Contact Number already exists' });
    }

    const contactObj = {
      code,
      name,
      mobileNumber,
      createdOn: new Date(),
      modifiedOn: new Date(),
    };

    if (req.files) {
      const {
        image
      } = req.files;
      if (image) {
        const profileImgKey = encodeToBase64(`${name}_PROFILE`);
      }
    }
    const newContact = new Contact(contactObj);

    await newContact.save();

    return res.status(200).send({ code });
  } catch (err) {
    return res.status(409).send();
  }
});

router.post("/get-contact", async (req, res) => {
  try {
    const {
      userName, mobileNumber
    } = req.body;
    const contact = await Contact.findOne({ $or: [
      { mobileNumber },
      { name: userName }
    ] });
    return res.status(200).send(contact);
  } catch (err) {
    return res.status(501).send();
  }
});

router.get('/get-all-contacts', async (req, res) => {
  try {
    const contact = await Contact.find({},{ name:1,
      mobileNumber:1,
      _id:1,
      });
      return res.status(200).send(contact);
  } catch (err) {
    console.log(err)
    return res.status(501).send();
  }
});

router.delete('/contact-delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Contact.deleteOne({
      _id: id,
    });
    return res.status(201).json('delete');
  } catch (err) {
    return res.status(501).send();
  }
});

router.put('/update-contact', async (req, res) =>{
  const  { name, mobileNumber, _id } = req.body;
  const checkDuplicate = await Contact.findOne({
    mobileNumber,
    _id: { $ne: _id },
  });

  if (checkDuplicate) {
    return res.status(501).send({ msg: 'Contact Number already exists' });
  };

  await Contact.updateOne({
    _id,
  }, {
    $set: {
      name,
      mobileNumber,
      modifiedOn: new Date(),
    },
  });
  return res.status(201).send({ msg: 'Sucessfull' });
})

module.exports = router;