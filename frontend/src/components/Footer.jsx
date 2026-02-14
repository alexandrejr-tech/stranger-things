import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        y: "-30%",
        immediateRender: false,
        scrollTrigger: {
          trigger: footerRef.current,
          scrub: true,
          invalidateOnRefresh: true,
          end: "100% 100%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef}>
      <div className="conteudoFooter">
        <div className="logoFooter">
          <h3>THE EXPERIENCE</h3>
          <h2>STRANGER THINGS</h2>
        </div>
        <div className="secoesFooter">
          <div className="social">
            <h3>REDES SOCIAIS</h3>
            <ul>
              <li>
                <img src="/imagens/footer-facebook.svg" alt="Facebook" />
              </li>
              <li>
                <img src="/imagens/footer-instagram.svg" alt="Instagram" />
              </li>
              <li>
                <img src="/imagens/footer-twitter.svg" alt="Twitter" />
              </li>
            </ul>
          </div>
          <div className="parceiro">
            <h3>PARCEIRO DE MÍDIA</h3>
            <img src="/imagens/footer-parceiro.svg" alt="Parceiro" />
          </div>
          <div className="institucional">
            <h3>INSTITUCIONAL</h3>
            <nav>
              <ul>
                <li>Contato</li>
                <li>Imprensa</li>
                <li>Parcerias</li>
                <li>Influenciadores</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="logotiposFooter">
        <img src="/imagens/netflix-logo.svg" alt="Netflix" />
        <img src="/imagens/fever-logo.svg" alt="Fever" />
      </div>
      <div className="textoInfinito">
        <h3>THE EXPERIENCE</h3>
        <h3>THE EXPERIENCE</h3>
        <h3>THE EXPERIENCE</h3>
      </div>
    </footer>
  );
}
