const  { xml2json } = require('xml-js');
const express = require('express');
const router = express.Router();
const axios = require('axios');

let responseJson;
let correctJson;

axios.get('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml')
.then(function(response) {
    responseJson = JSON.parse(xml2json(response.data, { spaces: 2, compact: true }));
    correctedJson()
});

const correctedJson = () =>{
    const rate = {}
    responseJson["gesmes:Envelope"]["Cube"]["Cube"]["Cube"].forEach((item, key) =>{
        rate[item["_attributes"]["currency"]] = item["_attributes"]["rate"]
    })
    const rates = responseJson["gesmes:Envelope"]["Cube"]["Cube"]["Cube"].map((item)=>{
        return(
            {
                "name": item["_attributes"]["currency"],
                "rate": item["_attributes"]["rate"]
            }
        )
    })

    correctJson = {
        "date": responseJson["gesmes:Envelope"]["Cube"]["Cube"]["_attributes"]["time"],
        rate,
        rates
    }
}



  router.get('/', (req, res) => {
  res.send(correctJson);
});

module.exports = router;