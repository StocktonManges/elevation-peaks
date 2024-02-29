import { PhoneInputState } from "./Types";

export const ErrorMessages = {
  messageMessage: "Must have 2 or more words.",
  nameMessage: "Must only contain letters.",
  emailMessage: "Invalid email.",
  phoneMessage: "Must be 10 digits.",
};

export const Verify = {
  isMessageValid: (bioInput: string) => {
    const regex = /^(?:\S+\s+){1,}\S+$/;
    return !!bioInput.trim().match(regex);
  },

  isNameValid: (nameInput: string) => {
    const regex = /^[A-Za-z]+$/;
    return !!nameInput.match(regex) && nameInput !== "";
  },

  isEmailValid: (emailInput: string) => {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !!emailInput.match(regex) && emailInput !== "";
  },

  isPhoneValid: (phoneInput: PhoneInputState) => {
    return phoneInput.join("").length === 10;
  },
};
