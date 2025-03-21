import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import Services from "../components/landing/Services";
import MeetUs from "../components/landing/MeetUs";
import ContactUs from "../components/landing/ContactUs";
import Testimony from "../components/landing/Testimony";
import Footer from "../components/landing/Footer";

const Landing = () => {
  window.scrollTo(0, 0);
    return (
      <div className="landing">
        <Header />
        <Hero />
        <Services />
        <MeetUs />
        <ContactUs />
        <Testimony />
        <Footer />
      </div>
    );
  };
  
  export default Landing;