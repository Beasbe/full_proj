import Hero from "../src/components/Hero";
import Services from "../src/components/Services";
import Projects from "../src/components/Projects";
import Partners from "../src/components/Partners";
import ContactForm from "../src/components/ContactForm";
import Experience from "../src/components/Experience";
import Scopes from "../src/components/Scopes";
export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Services />
      <Scopes />
      <ContactForm />
    </>
  );
}
