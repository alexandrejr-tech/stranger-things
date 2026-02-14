import { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";
import api from "../services/api";

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    api.get("/api/testimonials").then((res) => setTestimonials(res.data));
  }, []);

  return (
    <section className="secaoDepoimentos">
      <div className="logotipos">
        <img src="/imagens/netflix-logo.svg" alt="Netflix" />
        <img src="/imagens/clio-logo.svg" alt="Clio" />
        <img src="/imagens/fever-logo.svg" alt="Fever" />
      </div>
      <div className="depoimentos">
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>
    </section>
  );
}
