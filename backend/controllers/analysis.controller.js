const analysisValidation = require('../utils/validators/analysisValidation')
const client = require('@gradio/client')
const fetch = require('node-fetch')
const analysisModel = require('../models/Analysis')
const baseConverter = require('../utils/base64converter')
const bufferConverter = require('../utils/bufferConverter')

exports.analyze = async (req, res) => {

    const path = req.file.path
    const user_id = req.body.user_id
    const user_email = req.body.user_email
    const user_name = req.body.user_name

    console.log(path, user_id, user_email, user_name)

    if (path && user_id && user_email && user_name) {

        try {
            const bufferImage = await bufferConverter(path);

            const input = {
                image: bufferImage
            };

            const HfClient = await client.Client.connect("ehsanwebdev99/AI-Skin-Analyzer");

            const result = await HfClient.predict("/predict", input);

            console.log(result.data)

            const analysis = new analysisModel({
                userId: user_id,
                userEmail: user_email,
                userName: user_name,
                image: path,
                defects: result.data[0]
            });

            await analysis.save().then(() => {
                console.log("Analysis saved to database");
                return res.status(200).json(result.data);
            }).catch((error) => {
                console.error("Error saving analysis:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            });

        }

        catch (error) {
            console.error("Error during analysis:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    else {
        return res.status(400).json({ error: "All fields are required" });
    }
}

exports.getReport = async (req, res) => {

    const user_id = req.params.user_id;

    try {
        const analysis = await analysisModel.find({ userId: user_id });

        if (!analysis) {
            return res.status(404).json({ error: "No analysis found for this user" });
        }

        return res.status(200).json(analysis);
    }

    catch (error) {
        console.error("Error fetching analysis:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    
}