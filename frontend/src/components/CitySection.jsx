import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import api from "../services/api";

gsap.registerPlugin(ScrollTrigger, SplitText);

const fixedCities = [
  { name: "Sidney", image: "/imagens/card1.webp" },
  { name: "Cidade do México", image: "/imagens/card2.webp" },
  { name: "Yas Island", image: "/imagens/card3.webp" },
];

export default function CitySection() {
  const { user } = useAuth();
  const [cityIds, setCityIds] = useState({});
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/cities").then((res) => {
      const map = {};
      res.data.forEach((c) => { map[c.name] = c.id; });
      setCityIds(map);
    });
  }, []);

  useEffect(() => {
    const cardsEl = sectionRef.current?.querySelector(".cards");
    const cardEls = sectionRef.current?.querySelectorAll(".card");

    const ctx = gsap.context(() => {
      if (cardEls?.length) {
        gsap.from(cardEls, {
          opacity: 0,
          filter: "blur(10px)",
          stagger: 0.3,
          scrollTrigger: {
            trigger: cardsEl,
            start: "0% 80%",
            end: "100% 70%",
            scrub: true,
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
            trigger: titleRef.current,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="secaoCidade" ref={sectionRef}>
      <div className="titulo">
        <h2 ref={titleRef}>ESCOLHA SUA CIDADE</h2>
        <button>
          ESCOLHA SUA CIDADE
          <img src="/imagens/seta-botao.svg" alt="" />
        </button>
      </div>
      <div className="cards">
        {fixedCities.map((city) => (
          <div
            key={city.name}
            className="card"
            style={{ backgroundImage: `url(${city.image})`, cursor: "pointer" }}
            onClick={() => {
              if (!user) {
                navigate("/login");
              } else if (cityIds[city.name]) {
                navigate(`/cidade/${cityIds[city.name]}`);
              }
            }}
          >
            <h3>{city.name}</h3>
            <p>INGRESSOS DISPONÍVEIS</p>
          </div>
        ))}
      </div>
    </section>
  );
}
