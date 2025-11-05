const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: {type: String},
    password: {type: String},
    subscription: {
        status: {type: String, default: 'inactive'},
        plan: {type: String, default: 'free'},
        customerId: {type: String, required: false},
        subscriptionId: {type: String, required: false},
        startDate: {type: String, required: false},
        endDate: { type: String, required: false}
    },
    joinedOn: { type: String, default: new Date().toLocaleDateString() },
    role: {type: String, default: "user"}
})

const User = mongoose.models.users || new mongoose.model("users", userSchema)

module.exports = User