require('dotenv').config();
const express = require('express');
const app = express();
const cohere = require('cohere-ai');
const API_Key = process.env.COHERE_API_Key
cohere.init(API_Key)
const port = 3000;

app.use(express.json());

app.post('/classify', (req,res) => {
  const inputs = req.body.inputs;
  const  examples = req.body.examples;
  (async () => {
    var response = await cohere.classify({
      inputs: inputs,
      examples: examples
    });
    console.log(response);
    res.status(200).send(response["body"]["classifications"][0]["prediction"]);
  })();
  
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
