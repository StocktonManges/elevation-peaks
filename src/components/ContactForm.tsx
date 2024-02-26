import { useState } from "react";
import toast from "react-hot-toast";
import { ErrorMessage } from "./ErrorMessage";
import { ErrorMessages, Verify } from "../utils/ContactFormValidations";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

export const ContactForm = () => {
  const [firstNameInput, setFirstNameInput] = useState<string>("");
  const [lastNameInput, setLastNameInput] = useState<string>("");
  const [businessNameInput, setBusinessNameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [messageInput, setMessageInput] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = () => {
    return emailjs
      .sendForm(
        "service_xs4ogz7",
        "template_cd672cy",
        form.current ? form.current : "undefined",
        {
          publicKey: "e9EhloBrSvoxlhgMY",
        }
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          throw new Error(error.text);
        }
      );
  };

  const validationsPassed =
    firstNameInput.length > 0 &&
    lastNameInput.length > 0 &&
    emailInput.length > 0 &&
    messageInput.length > 0;

  const handleValidSubmit = () => {
    sendEmail()
      .then(() => {
        setIsSubmitted(false);
        resetContactForm();
        toast.success("Message sent!");
      })
      .catch((error) => console.log(error.message));
  };

  const handleInvalidSubmit = () => {
    setIsSubmitted(true);
  };

  const resetContactForm = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setBusinessNameInput("");
    setEmailInput("");
    setMessageInput("");
  };

  return (
    <>
      <form
        ref={form}
        onSubmit={(e) => {
          e.preventDefault();
          validationsPassed ? handleValidSubmit() : handleInvalidSubmit();
        }}
      >
        <div className="name-input-wrapper">
          <div className="input-wrapper first-name">
            <label htmlFor="first-name">
              First Name<span className="required-field">*</span>
            </label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              value={firstNameInput}
              onChange={(e) => {
                setFirstNameInput(e.target.value.trim());
              }}
            />
            <ErrorMessage
              isDisplayed={isSubmitted && !Verify.isNameValid(firstNameInput)}
              message={ErrorMessages.nameMessage}
            />
          </div>

          <div className="input-wrapper last-name">
            <label htmlFor="last-name">
              Last Name<span className="required-field">*</span>
            </label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              value={lastNameInput}
              onChange={(e) => {
                setLastNameInput(e.target.value.trim());
              }}
            />
            <ErrorMessage
              isDisplayed={isSubmitted && !Verify.isNameValid(lastNameInput)}
              message={ErrorMessages.nameMessage}
            />
          </div>
        </div>

        <div className="input-wrapper business-name">
          <label htmlFor="business-name">Business Name</label>
          <input
            type="text"
            id="business-name"
            name="business-name"
            value={businessNameInput}
            onChange={(e) => {
              setBusinessNameInput(e.target.value);
            }}
          />
        </div>

        <div className="input-wrapper email">
          <label htmlFor="email">
            Email<span className="required-field">*</span>
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.target.value);
            }}
          />
          <ErrorMessage
            isDisplayed={isSubmitted && !Verify.isEmailValid(emailInput)}
            message={ErrorMessages.emailMessage}
          />
        </div>

        <div className="input-wrapper message">
          <label htmlFor="message">
            Message<span className="required-field">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={messageInput}
            onChange={(e) => {
              setMessageInput(e.target.value);
            }}
          />
          <ErrorMessage
            isDisplayed={isSubmitted && !Verify.isMessageValid(messageInput)}
            message={ErrorMessages.messageMessage}
          />
        </div>

        <button type="submit">Send</button>
      </form>
    </>
  );
};
