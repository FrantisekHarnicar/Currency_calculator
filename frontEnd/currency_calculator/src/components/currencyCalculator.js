import axios from 'axios'
import {useState, useEffect} from 'react'

function CurrencyCalculator() {

    const [data, setData] = useState({})
    const [sum, setSum] = useState(1)
    const [conversion, setConversion] = useState(0)
    const [actualSum, setActualSum] = useState(1)
    const [actualSumCurrency, setActualSumCurrency] = useState("EUR")
    const [actualConversion, setActualConversion] = useState(0)
    const [actualConversionCurrency, setActualConversionCurrency] = useState("USD")

    useEffect(() => {
        axios.get('http://localhost:4000/').then(res => {
        console.log(res.data["rate"]["USD"])
        setActualConversion(res.data["rate"]["USD"])
        setConversion(res.data["rate"]["USD"])
        setData(res.data)
    })
    },[])

    /* axios.get('http://localhost:4000/bycurrency?currency=USD').then(res => {
        console.log(res.data)
        setData(res.data)
    }) */

    useEffect(() =>{
        setConversion(convert)
    },[sum])
    console.log(sum)
    console.log(data)
    const convert = () =>{
        let result = sum / actualSum * actualConversion
        return result
    }
    let inputCurency
    if(data["rates"] !== undefined){
        inputCurency = data["rates"].map((item) =>{
            return(
                <option key = {item["name"]} value={item["name"]}>{item["name"]}</option>
            )
        })
    }
    const setCurrency = (currency) =>{
        setActualSum( data["rate"][currency])
    }


    return (
      <div className='bg-blue-950 grid h-screen place-items-center'>
        <div >
            <h1 className='text-white font-bold text-3xl'>Menová kalkulačka</h1>
            <div className='bg-white p-5 rounded-lg'>
                <form>
                    <div className='flex'>
                        <div>
                            <label className='text-sm'>Suma:</label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <input 
                                type="number" 
                                value={sum}
                                onChange={(e) => setSum(e.target.value)}
                                className="[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center">
                                    <label  className="sr-only">Currency</label>
                                    <select 
                                    onChange={(e) => setActualSum( data["rate"][e.target.value])}
                                    id="currencySum" 
                                    className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    >
                                        {inputCurency}
                                    </select>
                                </div>
                            </div>
                            <div className='font-bold flex'>
                                {actualSum} 
                                {actualSumCurrency}
                                = 
                                <p className='text-blue-500'>{actualConversion}</p>
                                {actualConversionCurrency}
                            </div>
                        </div>
                        <div>
                            <label className='text-sm'>Prepočet:</label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <input 
                                type="number" 
                                value={conversion}
                                placeholder={conversion}
                                onChange={(e) => setConversion(e.target.value)}
                                className="[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center">
                                    <label  className="sr-only">Currency</label>
                                    <select 
                                    onChange={(e) => setActualConversion( data["rate"][e.target.value])}
                                    id="currency2" 
                                    className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    >
                                         {inputCurency}
                                    </select>
                                </div>
                            </div>
                            <button className="bg-blue-950 hover:bg-blue-700 text-white font-medium py-2 px-8  rounded-full">
                                Prepočítať
                            </button>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
      </div>
    );
  }
  export default CurrencyCalculator;