import toast from "react-hot-toast";
import { ErrorMessage } from "./ErrorMessage";
import { ErrorMessages, Verify } from "../utils/ContactFormValidations";
import { useState } from "react";
import { PhoneInputs } from "./PhoneInputs";
import { PhoneInputState } from "../utils/Types";

export const QuoteModal = ({
  viewingModal,
  setViewingModal,
}: {
  viewingModal: boolean;
  setViewingModal: (value: boolean) => void;
}) => {
  const [firstNameInput, setFirstNameInput] = useState<string>("");
  const [lastNameInput, setLastNameInput] = useState<string>("");
  const [phoneInput, setPhoneInput] = useState<PhoneInputState>(["", "", ""]);
  const [businessNameInput, setBusinessNameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [addToEmailList, setAddToEmailList] = useState<boolean>(false);
  const [messageInput, setMessageInput] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const validationsPassed =
    firstNameInput.length > 0 &&
    lastNameInput.length > 0 &&
    emailInput.length > 0 &&
    messageInput.length > 0;

  const handleValidSubmit = () => {
    setIsSubmitted(false);
    resetForm();
    toast.success("Message sent!");

    console.log({
      firstNameInput,
      lastNameInput,
      businessNameInput,
      emailInput,
      messageInput,
    });
  };

  const handleInvalidSubmit = () => {
    setIsSubmitted(true);
    toast.error("Invalid form details.", { id: "invalidFormDetails" });
  };

  const resetForm = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setPhoneInput(["", "", ""]);
    setBusinessNameInput("");
    setEmailInput("");
    setAddToEmailList(false);
    setMessageInput("");
    setIsSubmitted(false);
  };

  const exitModal = () => {
    resetForm();
    setViewingModal(false);
  };

  return (
    <section
      className={`modal-bg ${viewingModal ? "fade-in" : "fade-out"}`}
      onClick={() => {
        exitModal();
      }}
    >
      <div
        className={`quote-modal ${viewingModal ? "slide-in" : "slide-out"}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className="modalX"
          onClick={() => {
            exitModal();
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
        <h2>Get A Quote</h2>
        <form
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
                value={firstNameInput}
                onChange={(e) => {
                  setFirstNameInput(e.target.value);
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
                value={lastNameInput}
                onChange={(e) => {
                  setLastNameInput(e.target.value);
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
              value={businessNameInput}
              onChange={(e) => {
                setBusinessNameInput(e.target.value);
              }}
            />
          </div>

          <div className="input-wrapper">
            <PhoneInputs
              phoneInput={phoneInput}
              setPhoneInput={setPhoneInput}
            />
            <ErrorMessage
              isDisplayed={isSubmitted && !Verify.isPhoneValid(phoneInput)}
              message={ErrorMessages.phoneMessage}
            />
          </div>

          <div className="input-wrapper email">
            <label htmlFor="email">
              Email<span className="required-field">*</span>
            </label>
            <input
              type="text"
              id="email"
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

          <div className="input-wrapper email-list">
            <span
              className={addToEmailList ? "added" : ""}
              onClick={() => {
                setAddToEmailList(!addToEmailList);
              }}
            >
              {addToEmailList ? <i className="fa-solid fa-check"></i> : null}
            </span>
            <div
              onClick={() => {
                setAddToEmailList(!addToEmailList);
              }}
            >
              Sign up for news and updates
            </div>
          </div>

          <div className="input-wrapper message">
            <label htmlFor="message">
              Message<span className="required-field">*</span>
            </label>
            <textarea
              name="message"
              id="message"
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

          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};
