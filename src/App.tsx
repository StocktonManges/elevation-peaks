import { useState } from "react";
import { ContactForm } from "./components/ContactForm";
import { Global } from "./utils/Global";
import { QuoteModal } from "./components/QuoteModal";

function App() {
  const [viewingModal, setViewingModal] = useState<boolean>(false);

  const cardInfo = [
    {
      title: "Sales Funnels",
      details:
        "A website designed for your brand with one purpose: To close more sales more often.",
    },
    {
      title: "Creative Ads",
      details:
        "Run Ads online through Google and Facebook to attract customers looking for your services near by.",
    },
    {
      title: "Analytics",
      details:
        "Your own personalized dashboard to track your numbers and see how well your ads are converting.",
    },
  ];

  Global.preventScroll(viewingModal);

  return (
    <>
      <header>
        <div className="app-width-wrapper">
          <div className="image-container">
            <img src="./assets/images/EP-Symbol-Red.png" alt="EP symbol red" />
          </div>
          <a href="https://www.instagram.com/elevationpeaks/" target="_blank">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </header>

      <section className="title">
        <div className="title-container">
          <div className="image-container">
            <img src={Global.EPLogoColor} alt="EP logo color" />
          </div>
          <div>
            <h3>Websites and ads that help your business grow!</h3>
            <span>Elevate your business with results-driven marketing.</span>
          </div>
          <button
            onClick={() => {
              setViewingModal(true);
            }}
          >
            Get A Quote
          </button>
        </div>
      </section>

      <section className="how-it-works">
        <div className="app-width-wrapper">
          <div className="flex-container">
            <h2>How it works</h2>
            <div className="card-wrapper">
              {cardInfo.map((info, index) => (
                <div className="card" key={index}>
                  <h3>{info.title}</h3>
                  <p>{info.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="our-mission">
        <div className="app-width-wrapper">
          <div className="grid-container">
            <div className="image-container">
              <img
                src={
                  Global.baseURL +
                  "src/assets/images/our-mission-stock-photo.jpeg"
                }
                alt="our mission stock photo"
              />
            </div>
            <div className="our-mission-text">
              <div>
                <h2>Our Mission</h2>
                <p>
                  At Elevation Peaks, our mission is to empower businesses of
                  all sizes to achieve sustainable growth and scale their
                  operations efficiently.
                </p>
                <p>
                  With our team of experts helping you to grow, we are confident
                  that you can build your business faster without the headache
                  of managing your online marketing on your own.
                </p>
              </div>
              <div className="image-container">
                <img
                  src={
                    Global.baseURL +
                    "src/assets/images/10x-marketing-certified.png"
                  }
                  alt="10x marketing certified"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-us">
        <div className="app-width-wrapper">
          <div>
            <h2>Contact Us</h2>
            <span>How can we help your business?</span>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer>
        <div className="app-width-wrapper">
          <div className="image-container">
            <img src={Global.EPSymbolRed} alt="EP symbol red" />
          </div>
          <div className="contact-info">
            <div>801-899-5564</div>
            <div>logan@elevationpeaks.com</div>
            <div>anthony@elevationpeaks.com</div>
          </div>
        </div>
      </footer>

      <QuoteModal
        viewingModal={viewingModal}
        setViewingModal={setViewingModal}
      />
    </>
  );
}

export default App;
