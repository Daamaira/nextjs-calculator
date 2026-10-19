"use client";
import { useState } from "react";

export default function Calculator() {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");

  // Buttons par click karne par input update karne ke liye
  const handleButtonClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  // Screen clear karne ke liye
  const handleClear = () => {
    setInput("");
    setResult("");
  };

  // Backspace (ek number hatane) ke liye
  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  // Calculation karne ke liye
  const handleCalculate = () => {
    try {
      // Suraksha aur simplicity ke liye Function use kar rahe hain eval() ki jagah
      const calculateResult = new Function(`return ${input}`)();
      setResult(calculateResult.toString());
    } catch (error) {
      setResult("Error");
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-xs">
        <h1 className="text-xl font-bold text-center text-gray-800 mb-4">Micro Calculator</h1>
        
        {/* Display Screen */}
        <div className="bg-gray-50 p-4 rounded-xl mb-4 text-right min-h-[80px] flex flex-col justify-between border border-gray-200">
          <div className="text-gray-500 text-sm overflow-x-auto whitespace-nowrap">{input || "0"}</div>
          <div className="text-gray-800 text-2xl font-bold overflow-x-auto">{result || "0"}</div>
        </div>

        {/* Clear & Backspace Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <button onClick={handleClear} className="bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition">Clear</button>
          <button onClick={handleBackspace} className="bg-orange-400 text-white p-3 rounded-lg font-semibold hover:bg-orange-500 transition">⌫</button>
        </div>

        {/* Number and Operator Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => (btn === "=" ? handleCalculate() : handleButtonClick(btn))}
              className={`p-4 rounded-lg text-lg font-semibold transition ${
                btn === "=" 
                  ? "bg-green-500 text-white hover:bg-green-600 col-span-1" 
                  : ["/", "*", "-", "+"].includes(btn)
                  ? "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
