const mongoose = require('mongoose');

const subObjectSchema = new mongoose.Schema({
  label: { type: String, required: true },
  confidence: { type: String, required: true }  // stored as string with % symbol
}, { _id: false });

const analysisSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    image: { type: String, required: true },
    defects: [{
        oil_vs_dry: { type: subObjectSchema, required: true },
        acne: { type: subObjectSchema, required: true },
        wrinkles: { type: subObjectSchema, required: true }
    }],
    createdAt: { type: Date, default: new Date().toLocaleDateString() },
})

const Analysis = mongoose.models.analysis || new mongoose.model("analysis", analysisSchema);

module.exports = Analysis;
