import React, { useState } from "react";

const Calculator = () => {
	const [display, setDisplay] = useState("0");
	const [currentValue, setCurrentValue] = useState("");
	const [operator, setOperator] = useState("");
	const [previousValue, setPreviousValue] = useState("");
	const [sequence, setSequence] = useState("");

	const handleClear = () => {
		setDisplay("0");
		setCurrentValue("");
		setOperator("");
		setPreviousValue("");
		setSequence("");
	};

	const handleNumberClick = (num) => {
		if (currentValue.includes(".") && num === ".") return;
		if (currentValue === "0" && num === "0") return;
		if (currentValue === "" && num === ".") {
			setCurrentValue("0.");
			setDisplay("0.");
			setSequence((prev) => prev + "0.");
			return;
		}
		const value = currentValue === "0" ? num : currentValue + num;
		setCurrentValue(value);
		setDisplay(value);
		setSequence((prev) => prev + num);
	};

	const handleOperatorClick = (op) => {
		if (currentValue === "" && op === "-") {
			setCurrentValue("-");
			setDisplay("-");
			setSequence((prev) => prev + "-");
			return;
		}
		if (currentValue === "") return;
		if (previousValue !== "") {
			handleEqualClick();
		}
		setOperator(op);
		setPreviousValue(currentValue);
		setCurrentValue("");
		setSequence((prev) => prev + " " + op + " ");
	};

	const handleEqualClick = () => {
		if (previousValue === "" || currentValue === "") return;
		const result = evaluateExpression(previousValue, currentValue, operator);
		setDisplay(result);
		setCurrentValue(result);
		setPreviousValue("");
		setOperator("");
		setSequence((prev) => prev + " = " + result);
	};

	const evaluateExpression = (prev, curr, op) => {
		const prevNum = parseFloat(prev);
		const currNum = parseFloat(curr);
		switch (op) {
			case "+":
				return (prevNum + currNum).toString();
			case "-":
				return (prevNum - currNum).toString();
			case "*":
				return (prevNum * currNum).toString();
			case "/":
				return (prevNum / currNum).toFixed(4).toString();
			default:
				return curr;
		}
	};

	return (
		<div className="container mx-auto mt-10 max-w-xs border border-zinc-900">
			<div className="bg-gray-200 p-8 text-right relative">
				<div className="text-s text-yellow-800 absolute top-2 right-4">{sequence}</div>
				<div id="display" className="text-3xl absolute top-7 right-4">
					{display}
				</div>
			</div>
			<div className="grid grid-cols-4 gap-1 mt-1">
				<button id="clear" className="col-span-2 pad bg-red-300 p-4" onClick={handleClear}>
					AC
				</button>
				<button id="divide" className="bg-blue-300 pad p-4" onClick={() => handleOperatorClick("/")}>
					/
				</button>
				<button id="multiply" className="bg-blue-300 pad p-4" onClick={() => handleOperatorClick("*")}>
					*
				</button>
				<button id="seven" className="bg-gray-400 pad p-4" onClick={() => handleNumberClick("7")}>
					7
				</button>
				<button id="eight" className="bg-gray-400 pad p-4" onClick={() => handleNumberClick("8")}>
					8
				</button>
				<button id="nine" className="bg-gray-400 pad p-4" onClick={() => handleNumberClick("9")}>
					9
				</button>
				<button id="subtract" className="bg-blue-300 pad p-4" onClick={() => handleOperatorClick("-")}>
					-
				</button>
				<button id="four" className="bg-gray-400 pad p-4" onClick={() => handleNumberClick("4")}>
					4
				</button>
				<button id="five" className="bg-gray-400 pad p-4" onClick={() => handleNumberClick("5")}>
					5
				</button>
				<button id="six" className="bg-gray-400 pad p-4" onClick={() => handleNumberClick("6")}>
					6
				</button>
				<button id="add" className="bg-blue-300 pad p-4" onClick={() => handleOperatorClick("+")}>
					+
				</button>
				<button id="one" className="bg-gray-400 pad p-4" onClick={() => handleNumberClick("1")}>
					1
				</button>
				<button id="two" className="bg-gray-400 pad p-4" onClick={() => handleNumberClick("2")}>
					2
				</button>
				<button id="three" className="bg-gray-400 pad p-4" onClick={() => handleNumberClick("3")}>
					3
				</button>
				<button id="equals" className="row-span-2 bg-green-300 pad p-4" onClick={handleEqualClick}>
					=
				</button>
				<button id="zero" className="col-span-2 bg-gray-400 pad p-4" onClick={() => handleNumberClick("0")}>
					0
				</button>
				<button id="decimal" className="bg-gray-400 pad p-4" onClick={() => handleNumberClick(".")}>
					.
				</button>
			</div>
		</div>
	);
};

export default Calculator;
