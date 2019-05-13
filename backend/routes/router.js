const express = require("express");
const router= express.Router();
const {Location}= require('../db/models/data');

require('../db/mongoose'); // Connect to DB


// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
    Location.find({},(err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
    const { name, update } = req.body;
    Location.findOneAndUpdate(name, update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
    const { name } = req.body;
    Location.findOneAndDelete(name, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
    let location = new Location();

    const { name, address } = req.body;

    if ((!name) || !address) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }
    location.name = name;
    location.address = address;
    location.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

module.exports=router;
