import operate from './operate';
import isNumber from './isNumber';

export default function calculate(obj, buttonName) {
  if (buttonName === "AC") {
    return { total: null, next: null, operation: null, history: [] };
  }

  if (isNumber(buttonName)) {
    if (buttonName === "0" && obj.next === "0") {
      return obj; // Avoid leading zeros
    }
    return { ...obj, next: obj.next === "0" ? buttonName : (obj.next || "") + buttonName };
  }

  if (buttonName === ".") {
    if (obj.next && obj.next.includes(".")) {
      return obj; // Avoid multiple decimal points
    }
    return { ...obj, next: (obj.next || "0") + "." }; // Handle case where next is null or undefined
  }

  if (buttonName === "+/-") {
    if (obj.next) {
      return { ...obj, next: (-1 * parseFloat(obj.next)).toString() };
    }
    if (obj.total) {
      return { ...obj, total: (-1 * parseFloat(obj.total)).toString() };
    }
    return obj;
  }

  if (buttonName === "=") {
    if (obj.next && obj.operation) {
      try {
        const result = operate(obj.total, obj.next, obj.operation);
        return {
          total: result,
          next: null,
          operation: null,
          history: [...(obj.history || []), { expression: `${obj.total || 0}${obj.operation}${obj.next}`, result }],
        };
      } catch (error) {
        throw new Error(`Calculation error: ${error.message}`);
      }
    }
    return obj; // Handle cases where no operation or next value is present
  }

  // Operation buttons (+, -, x, ÷, %)
  if (["+", "-", "x", "÷", "%"].includes(buttonName)) {
    if (obj.operation) { //if an operation is already selected, perform the calculation first
      if (obj.next) {
        try {
          const result = operate(obj.total, obj.next, obj.operation);
          return {
            total: result,
            next: null,
            operation: buttonName,
            history: [...(obj.history || []), { expression: `${obj.total || 0}${obj.operation}${obj.next}`, result }],
          };
        } catch (error) {
          throw new Error(`Calculation error: ${error.message}`);
        }
      } else {
        return { ...obj, operation: buttonName }; //if no next value, just change the operation
      }
    } else if (obj.next) { //if no operation is selected, set the total and operation
      return {
        total: obj.next,
        next: null,
        operation: buttonName,
        history: [...(obj.history || []), { expression: obj.next, result: obj.next }],
      };
    } else {
      return obj; // Handle cases where no next value is present
    }
  }

  return obj;
}
