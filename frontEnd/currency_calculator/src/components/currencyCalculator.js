import axios from "axios";
import { useState, useEffect } from "react";
import Input from "./input.js";

function CurrencyCalculator() {
    const [data, setData] = useState({});
    const [sum, setSum] = useState(1);
    const [conversion, setConversion] = useState(0);
    const [actualSum, setActualSum] = useState(1);
    const [actualSumCurrency, setActualSumCurrency] = useState("EUR");
    const [actualConversion, setActualConversion] = useState(0);
    const [conversionToOne, setConversionToOne] = useState(0);
    const [actualConversionCurrency, setActualConversionCurrency] = useState("USD");

    useEffect(() => {
        axios.get("http://localhost:4000/").then((res) => {
            setActualConversion(res.data["rate"]["USD"]);
            setConversionToOne(res.data["rate"]["USD"]);
            setConversion(res.data["rate"]["USD"]);
            setData(res.data);
        });
    }, []);

    useEffect(() => {
        setConversion(convert(sum, actualSum, actualConversion));
    }, [sum]);
    const convert = (sum, actualSum, actualConversion) => {
        return (sum / actualSum) * actualConversion;
    };
    let inputCurency;
    if (data["rates"] !== undefined) {
        inputCurency = data["rates"].map((item) => {
            return (
                <option key={item["name"]} value={item["name"]}>
                    {item["name"]}
                </option>
            );
        });
    }
    const sumCurrencyChange = (currency) => {
        setActualSum(data["rate"][currency]);
        setActualSumCurrency(currency);
        setConversionToOne(
            convert(1, data["rate"][currency], actualConversion)
        );
        setConversion(convert(sum, data["rate"][currency], actualConversion));
    };

    const conversionCurrencyChange = (currency) => {
        setActualConversion(data["rate"][currency]);
        setActualConversionCurrency(currency);
        setConversionToOne(convert(1, actualSum, data["rate"][currency]));
        setConversion(convert(sum, actualSum, data["rate"][currency]));
    };

    return (
        <div className="bg-blue-950 grid h-screen place-items-center">
            <div>
                <h1 className="text-white font-bold text-3xl">
                    Menová kalkulačka
                </h1>
                <div className="bg-white p-7 rounded-lg mt-5">
                    <form>
                        <div className="flex sm:items-end flex-col sm:flex-row items-center m/">
                            <div className="sm:mr-5 m-0">
                                <label className="text-sm opacity-75">
                                    Suma
                                </label>
                                <Input
                                    rate={sum}
                                    name={actualSumCurrency}
                                    inputCurency={inputCurency}
                                    setValue={(e) => setSum(e)}
                                    setName={(e) => sumCurrencyChange(e)}
                                />
                            </div>
                            <div className="h-9 flex items-center sm:m-0 my-3">
                                <svg
                                    className="h-6 w-6 origin-center rotate-90 sm:rotate-0 opacity-75"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"></path>
                                </svg>
                            </div>
                            <div className="sm:ml-5 m-0">
                                <label className="text-sm opacity-75">
                                    Prepočet
                                </label>
                                <Input
                                    rate={Number(conversion).toFixed(2)}
                                    name={actualConversionCurrency}
                                    inputCurency={inputCurency}
                                    setValue={(e) => setConversion(e)}
                                    setName={(e) => conversionCurrencyChange(e)}
                                />
                            </div>
                        </div>
                        <div className="font-bold flex mt-3">
                            1
                            {actualSumCurrency}
                            =
                            <p className="text-blue-500">
                                {Number(conversionToOne).toFixed(4)}
                            </p>
                            {actualConversionCurrency}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default CurrencyCalculator;
