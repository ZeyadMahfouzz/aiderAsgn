import Big from "big.js";

const TRIG_FUNCTIONS = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
};

export default function operate(numberOne, numberTwo, operation) {
  try {
    // Input validation: Check for valid numeric input
    if (
      typeof numberOne !== "number" &&
      typeof numberOne !== "string" ||
      isNaN(parseFloat(numberOne))
    ) {
      throw new Error("Invalid input: numberOne must be a number or a numeric string.");
    }
    if (
      typeof numberTwo !== "number" &&
      typeof numberTwo !== "string" ||
      isNaN(parseFloat(numberTwo))
    ) {
      throw new Error("Invalid input: numberTwo must be a number or a numeric string.");
    }

    const operandOne = Big(numberOne);
    const operandTwo = Big(numberTwo || (operation === "÷" || operation === "x" ? "1" : "0"));

    if (operation === "+") {
      return operandOne.plus(operandTwo).toString();
    }
    if (operation === "-") {
      return operandOne.minus(operandTwo).toString();
    }
    if (operation === "x") {
      return operandOne.times(operandTwo).toString();
    }
    if (operation === "÷") {
      if (operandTwo.eq(0)) {
        throw new Error("Divide by zero error");
      }
      return operandOne.div(operandTwo).toString();
    }

    // Handle trigonometric functions
    if (operation in TRIG_FUNCTIONS) {
      const result = TRIG_FUNCTIONS[operation](parseFloat(operandOne));
      if (!isFinite(result)) {
        throw new Error("Result is not a finite number");
      }
      return result.toString();
    }

    throw new Error(`Unknown operation '${operation}'`);
  } catch (error) {
    return "Error"; // Return "Error" to indicate calculation failure
  }
}
