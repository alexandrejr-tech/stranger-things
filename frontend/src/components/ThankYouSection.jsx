import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import api from "../services/api";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ThankYouSection() {
  const [cities, setCities] = useState([]);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    api.get("/api/cities").then((res) => setCities(res.data));
  }, []);

  useEffect(() => {
    if (cities.length === 0) return;

    const listItems = sectionRef.current?.querySelectorAll("ul li");

    const ctx = gsap.context(() => {
      if (listItems?.length) {
        gsap.from(listItems, {
          opacity: 0,
          x: 40,
          filter: "blur(10px)",
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        });
      }

      if (titleRef.current) {
        const split = SplitText.create(titleRef.current, {
          type: "lines, words, chars",
          mask: "lines",
        });

        gsap.from(split.chars, {
          y: 40,
          opacity: 0,
          duration: 0.3,
          stagger: 0.03,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [cities]);

  return (
    <section className="secaoObrigado" ref={sectionRef}>
      <h2 ref={titleRef}>
        OBRIGADO POR SE JUNTAR A NÓS NESTA AVENTURA EM:
      </h2>
      <ul>
        {cities.map((city) => (
          <li key={city.id}>{city.name}</li>
        ))}
        {cities.map((city) => (
          <li key={`dup-${city.id}`} aria-hidden="true">{city.name}</li>
        ))}
      </ul>
    </section>
  );
}
