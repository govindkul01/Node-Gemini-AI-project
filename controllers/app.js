const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

//Create config object for GoogleGenerative API by passing API key
const configuration = new GoogleGenerativeAI(process.env.API_KEY);

//Model initialization by providing model id
const modelId = "gemini-pro";

const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 500,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
  };

const model= configuration.getGenerativeModel({ 
    model: modelId, 
    generationConfig 
});

//keeps track of conversation history so create array[] history
const history = [];

//Security settings


//controller function
const generateResponse = async(req, res) => {
    try{
    const { prompt } = req.body;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    console.log(response);

    history.push(response);
    console.log(history);

    res.send({ response });
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Internal server error" });

    }
};

module.exports = {
    generateResponse,
    history,
};
 
//we have created a configuration object for the Google Generative AI API by 
//passing the API key from the environment variables.