const mongoose = require("mongoose")
const { Schema } = mongoose;

const   nameMax = 80,
        surnameMax = 80,
        descriptionMin = 10,
        descriptionMax = 500;

const requiredField = (field) => {
    return `Field ${field} is required.`;
}
const minSymbols = (field, minNum) => {
    return `Field ${field} contains min ${minNum}.`
}
const maxSymbols = (field, maxNum) => {
    return `Field ${field} contains max ${maxNum}.`;
}
const incorrectField = (field) => {
    return `Field ${field} is incorrect.`;
}

const ContactsSchema = new Schema({
    name: {
        type: String,
        required: [true, requiredField("name")],
        trim: true,
        maxlength: [nameMax, maxSymbols("name", nameMax)],
    },
    surname: {
        type: String,
        required: [true, requiredField("surname")],
        trim: true,
        maxlength: [surnameMax, maxSymbols("surname", surnameMax)],
    },
    description: {
        type: String,
        required: [true, requiredField("description")],
        trim: true,
        minlength: [descriptionMin, minSymbols("description", descriptionMin)],
        maxlength: [descriptionMax, maxSymbols("description", descriptionMax)],
    },
    phone: {
        type: String,
        unique: true,
        sparse: true,
        validate: [
            (val) => {
                return val == null || /^\+[0-9]{10,12}$/.test(val);
            },
            incorrectField("phone")
        ],
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        validate: [
            (val) => {
                return val == null || /^[a-z0-9_]{3,25}@[a-z]{2,8}\.[a-z]{2,4}$/.test(val);
            },
            incorrectField("email")
        ]
    }
});

module.exports = mongoose.model("contacts", ContactsSchema);