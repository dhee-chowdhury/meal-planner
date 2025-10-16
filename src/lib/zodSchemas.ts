import { z } from "zod";
import { patterns } from "./constants";

const regexSchema = (pattern: RegExp) => z.coerce.string().regex(pattern);
const requiredStringSchema = z.string().min(1).max(255).trim();
const passwordSchema = z
  .string()
  .max(255)
  .refine((str) => patterns.minimumOneUpperCaseLetter.test(str), {
    error: "Minimum one upper case letter",
  })
  .refine((str) => patterns.minimumOneLowerCaseLetter.test(str), {
    error: "Minimum one lower case letter",
  })
  .refine((str) => patterns.minimumOneDigit.test(str), {
    error: "Minimum one digit",
  })
  .refine((str) => patterns.minimumOneSpecialCharacter.test(str), {
    error: "Minimum one special character",
  })
  .refine((str) => patterns.minEightCharacters.test(str), {
    error: "Minimum eight characters",
  });

export { requiredStringSchema, regexSchema, passwordSchema };
