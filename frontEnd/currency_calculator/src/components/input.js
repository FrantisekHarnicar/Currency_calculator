function input(props) {
    return (
        <div className="relative mt-2 rounded-md shadow-sm">
            <input
                type="number"
                value={props.rate}
                onChange={(e) => props.setValue(e.target.value)}
                className="[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
                <label className="sr-only">Currency</label>
                <select
                    value={props.name}
                    onChange={(e) => props.setName(e.target.value)}
                    id="currencySum"
                    className="h-full font-bold rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                    {props.inputCurency}
                </select>
            </div>
        </div>
    );
}

export default input;
