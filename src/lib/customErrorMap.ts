import * as z from "zod";
const customErrorMap = z.config({
  customError: (iss) => {
    switch (iss.code) {
      case "invalid_type":
        if (iss.expected !== undefined || iss.expected !== null) {
          return "This field is required";
        }
        if (iss.expected === "string") {
          return "Please enter text";
        }
        if (iss.expected === "number") {
          return "Please enter a number";
        }
        return "Invalid value type";

      case "too_small":
        if (iss.expected === "string") {
          return `Minimum ${iss.minimum} characters required`;
        }
        if (iss.expected === "number") {
          return `Number must be greater than or equal to ${iss.minimum}`;
        }
        return "Value is too small";

      case "too_big":
        if (iss.expected === "string") {
          return `Maximum ${iss.maximum} characters allowed`;
        }
        if (iss.expected === "number") {
          return `Number must be less than or equal to ${iss.maximum}`;
        }
        return "Value is too large";

      case "invalid_format":
        if (iss.expected === "email") {
          return "Please enter a valid email address";
        }
        if (iss.expected === "url") {
          return "Please enter a valid URL";
        }
        return "Invalid text format";

      case "invalid_value":
        return "Please enter a valid date";

      case "custom":
        // iss.message is guaranteed to exist if custom
        return iss.message;

      default:
        // fallback: return undefined so Zod falls back to internal default
        return undefined;
    }
  },
});
// Apply globally
export { customErrorMap };
