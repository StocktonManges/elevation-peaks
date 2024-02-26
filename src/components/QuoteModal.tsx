import toast from "react-hot-toast";
import { ErrorMessage } from "./ErrorMessage";
import { ErrorMessages, Verify } from "../utils/ContactFormValidations";
import { useRef, useState } from "react";
import { PhoneInputs } from "./PhoneInputs";
import { PhoneInputState } from "../utils/Types";
import emailjs from "@emailjs/browser";

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

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = () => {
    return emailjs
      .sendForm(
        "service_w74c7gy",
        "template_qaeqayj",
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
        resetForm();
        toast.success("Message sent!");
      })
      .catch((error) => console.log(error.message));
  };

  const handleInvalidSubmit = () => {
    setIsSubmitted(true);
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
        <div>
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
            ref={form}
            action="https://formsubmit.co/stocktonmanges@gmail.com"
            method="POST"
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
                  isDisplayed={
                    isSubmitted && !Verify.isNameValid(firstNameInput)
                  }
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
                  isDisplayed={
                    isSubmitted && !Verify.isNameValid(lastNameInput)
                  }
                  message={ErrorMessages.nameMessage}
                />
              </div>
            </div>

            <div className="input-wrapper business-name">
              <label htmlFor="business-name">Business Name</label>
              <input
                type="text"
                name="business-name"
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
                name="email"
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
              <input
                type="text"
                name="add-to-email-list"
                style={{ display: "none" }}
                value={addToEmailList ? "yes" : "no"}
                readOnly
              />
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
                isDisplayed={
                  isSubmitted && !Verify.isMessageValid(messageInput)
                }
                message={ErrorMessages.messageMessage}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
};
