import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const pic1Ref = useRef(null);
  const pic2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        opacity: 0,
        duration: 1,
      });

      gsap.from(pic2Ref.current, {
        y: 60,
        duration: 1,
      });

      gsap.from(pic1Ref.current, {
        y: -60,
        duration: 1,
      });

      if (textRef.current) {
        const split = SplitText.create(textRef.current, {
          type: "lines, words, chars",
          mask: "lines",
        });

        gsap.from(split.chars, {
          y: 40,
          opacity: 0,
          duration: 0.3,
          stagger: 0.03,
          scrollTrigger: {
            trigger: textRef.current,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <picture ref={pic1Ref} data-speed=".6">
        <source media="(max-width: 600px)" srcSet="/imagens/bg-1-mobile.webp" />
        <img src="/imagens/bg-1.webp" alt="" />
      </picture>
      <picture ref={pic2Ref}>
        <source media="(max-width: 600px)" srcSet="/imagens/bg-2-mobile.webp" />
        <img src="/imagens/bg-2.webp" alt="" />
      </picture>
      <div className="esquerda">
        <h3>THE EXPERIENCE</h3>
        <h1>STRANGER THINGS</h1>
      </div>
      <div className="direita">
        <p ref={textRef}>
          Descubra os seus<br />
          poderes e vire o herói de<br />
          sua própria aventura!
        </p>
        <button className="botaoPrincipal" onClick={() => navigate("/login")}>
          ESCOLHA SUA CIDADE
          <img src="/imagens/seta-botao.svg" alt="" />
        </button>
      </div>
    </section>
  );
}
