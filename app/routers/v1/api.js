const { Router } = require("express");
const router = Router();
const Contacts = require("../../models/Contacts");

const contactNotFound = "Contact with this id not found.";

// GET: get all contacts
router.get("/", (req, res) => {
    Contacts.find().exec().then(contacts => {
        restApi(res, 200);
        res.json(configJSON(true, contacts));
    }).catch(err => {
        restApi(res, 400);
        res.json(configJSON(true, null, configErrors(err)));
    })
});

// GET: get one contact
router.get("/:id/", (req, res) => {
    Contacts.findById(req.params.id).exec().then(contact => {
        if (contact) {
            restApi(res, 200);
            res.json(configJSON(true, contact));
        } else {
            restApi(res, 400);
            res.json(configJSON(false, null, contactNotFound))
        }
    }).catch(err => {
        restApi(res, 400);
        res.json(configJSON(false, null, configErrors(err)));
    });
});

// POST: Create new contact
router.post("/", (req, res) => {
    Contacts.create({
        name: req.body.name,
        surname: req.body.surname,
        description: req.body.description,
        phone: req.body.phone,
        email: req.body.email,
    }).then(contact => {
        restApi(res, 201);
        res.json(configJSON(true, contact));
    }).catch(err => {
        err = configErrors(err);
        restApi(res, 400);
        res.json(configJSON(false, null, configErrors(err)));
    });
});

// PUT: Change contact
router.put("/:id/", (req, res) => {
    const modifiedContact = {}
    if (req.body.name) modifiedContact.name = req.body.name;
    if (req.body.surname) modifiedContact.surname = req.body.surname
    if (req.body.description) modifiedContact.description = req.body.description;
    if (req.body.phone) modifiedContact.phone = req.body.phone;
    if (req.body.email) modifiedContact.email = req.body.email;

    Contacts.findByIdAndUpdate(req.params.id, {
        $set: modifiedContact
    }, { new: true}).exec().then(contact => {
        restApi(res, 200);
        res.json(configJSON(true, contact));
    }).catch((err) => {
        restApi(res, 400);
        res.json(configJSON(false, null, configErrors(err)))
    });
});

// DELETE: delete contact
router.delete("/:id/", (req, res) => {
    Contacts.findByIdAndDelete(req.params.id).exec().then(contact => {
        if (contact) {
            restApi(res, 200);
            res.json(configJSON(true));
        } else {
            restApi(res, 400);
            res.json(configJSON(false, null, contactNotFound))
        }
    }).catch(err => {
        restApi(res, 400);
        res.json(configJSON(false, null, configErrors(err)));
    });
});

function restApi(res, status = 404) {
    res.status(status);
    res.set({
        "Content-Type": "application/json"
    });
}

function configJSON(success = false, data = null, error = null) {
    res = {
        success: success,
    }
    if (data)
        res.data = data;
    if (error)
        res.error = error;
    return res;
}

function configErrors(errors) {
    if (errors.errors) {
        errors = errors.errors;
        let sendErrors = {}

        for (let key in errors) {
            sendErrors[key] = errors[key].message;
        }
        return sendErrors;
    } else if (errors.kind === "ObjectId") {
        return "Id is incorrect.";
    }
    return errors;
}

module.exports = router;
