const { xml2json } = require("xml-js");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const cors = require("cors");

router.use(cors());

const getCurrency = async () => {
    const promise = axios.get(
        "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
    );
    const dataPromise = await promise.then((response) => {
        let responseJson = JSON.parse(
            xml2json(response.data, { spaces: 2, compact: true })
        );
        return correctedJson(responseJson);
    });
    return await dataPromise;
};

const correctedJson = (responseJson) => {
    const rate = {};
    responseJson["gesmes:Envelope"]["Cube"]["Cube"]["Cube"].forEach((item) => {
        rate[item["_attributes"]["currency"]] = item["_attributes"]["rate"];
    });
    rate["EUR"] = "1";
    const rates = responseJson["gesmes:Envelope"]["Cube"]["Cube"]["Cube"].map(
        (item) => {
            return {
                name: item["_attributes"]["currency"],
                rate: item["_attributes"]["rate"],
            };
        }
    );
    rates.push({
        name: "EUR",
        rate: "1",
    });
    let correctJson = {
        date: responseJson["gesmes:Envelope"]["Cube"]["Cube"]["_attributes"][
            "time"
        ],
        rate,
        rates,
    };
    return correctJson;
};

router.get("/", async (req, res) => {
    await res.send(await getCurrency());
});

router.get("/bycurrency/", async (req, res) => {
    const currency = req.query.currency;
    const data = await getCurrency();
    const byQuery = data["rate"][currency];
    if (byQuery === undefined) res.status(204).send();
    else await res.send(byQuery);
});

module.exports = router;
