"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    number: "01",
    name: "RAFAEL M.",
    service: "CORTE NØVA",
    text:
      "ATENDIMENTO EXCELENTE E CORTE MUITO BEM FEITO. DÁ PARA PERCEBER O CUIDADO EM CADA DETALHE.",
  },
  {
    number: "02",
    name: "BRUNO A.",
    service: "CORTE + BARBA",
    text:
      "NÃO É SÓ FAZER O CORTE E IR EMBORA. O ATENDIMENTO E O AMBIENTE FAZEM TODA A DIFERENÇA.",
  },
  {
    number: "03",
    name: "PEDRO L.",
    service: "EXPERIÊNCIA COMPLETA",
    text:
      "GOSTEI MUITO DO RESULTADO. EQUIPE ATENCIOSA, AMBIENTE BONITO E ACABAMENTO IMPECÁVEL.",
  },
];

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ==================================================
      // DESKTOP
      // ==================================================

      mm.add("(min-width: 768px)", () => {
        gsap.from(".reviews-heading", {
          opacity: 0,
          y: 120,
          scale: 0.92,

          scrollTrigger: {
            trigger: ".reviews-heading",
            start: "top 90%",
            end: "top 45%",
            scrub: 1,
          },
        });

        gsap.from(".reviews-score", {
          opacity: 0,
          y: 50,

          scrollTrigger: {
            trigger: ".reviews-heading",
            start: "top 75%",
            end: "top 45%",
            scrub: 1,
          },
        });

        const cards =
          gsap.utils.toArray<HTMLElement>(
            ".review-card"
          );

        cards.forEach((card, index) => {
          gsap.from(card, {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,

            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 55%",
              scrub: 1,
            },
          });
        });

        gsap.fromTo(
          ".reviews-bg",
          {
            xPercent: -10,
          },
          {
            xPercent: 10,

            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      });

      // ==================================================
      // MOBILE
      // ==================================================

      mm.add("(max-width: 767px)", () => {
        gsap.from(".reviews-heading", {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power3.out",

          scrollTrigger: {
            trigger: ".reviews-heading",
            start: "top 90%",
            toggleActions:
              "play none none reverse",
          },
        });

        gsap.from(".reviews-score", {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power2.out",

          scrollTrigger: {
            trigger: ".reviews-score",
            start: "top 92%",
            toggleActions:
              "play none none reverse",
          },
        });

        const cards =
          gsap.utils.toArray<HTMLElement>(
            ".review-card"
          );

        cards.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 45,
            duration: 0.75,
            ease: "power3.out",

            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions:
                "play none none reverse",
            },
          });
        });
      });
    }, section);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="avaliacoes"
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[#050505]

        px-5
        py-24

        text-white

        sm:px-6
        sm:py-28

        md:px-12
        md:py-40
      "
    >
      {/* ==================================================
          TEXTO DE FUNDO
      =================================================== */}

      <div
        className="
          reviews-bg

          pointer-events-none
          absolute
          left-0
          top-[30%]

          whitespace-nowrap

          text-[30vw]
          font-black
          leading-none
          tracking-[-0.1em]

          text-white/[0.01]

          md:text-[17vw]
        "
      >
        AVALIAÇÕES
      </div>

      {/* ==================================================
          LUZ
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute

          right-[-200px]
          top-[15%]

          h-[450px]
          w-[450px]

          rounded-full

          bg-white/[0.02]
          blur-[120px]

          md:right-[-300px]

          md:h-[700px]
          md:w-[700px]

          md:blur-[170px]
        "
      />

      <div className="relative z-10 mx-auto max-w-[1600px]">

        {/* ==================================================
            TOPO
        =================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-5

            border-b
            border-white/10

            pb-4

            md:pb-5
          "
        >
          <span
            className="
              whitespace-nowrap

              text-[8px]
              tracking-[0.22em]
              text-white/40

              sm:text-[9px]

              md:text-[9px]
              md:tracking-[0.32em]
            "
          >
            06 / AVALIAÇÕES
          </span>

          <span
            className="
              hidden

              text-[9px]
              tracking-[0.3em]
              text-white/35

              sm:block
            "
          >
            NØVA BARBER CLUB
          </span>

          <span
            className="
              text-[8px]
              tracking-[0.2em]
              text-white/30

              sm:hidden
            "
          >
            NØVA
          </span>
        </div>

        {/* ==================================================
            CABEÇALHO
        =================================================== */}

        <div
          className="
            mt-14

            flex
            flex-col
            gap-8

            sm:mt-16

            md:mt-24
            md:flex-row
            md:items-end
            md:justify-between
            md:gap-16
          "
        >
          <h2
            className="
              reviews-heading

              max-w-[760px]

              text-[11vw]
              font-black
              uppercase
              leading-[0.88]
              tracking-[-0.06em]

              sm:text-[9vw]

              md:text-[4.8vw]
              md:leading-[0.9]
              md:tracking-[-0.065em]
            "
          >
            QUEM VEM,
            <br />

            <span className="text-white/30">
              RECOMENDA.
            </span>
          </h2>

          {/* ==============================================
              NOTA
          =============================================== */}

          <div
            className="
              reviews-score

              md:mb-1
              md:min-w-[200px]
            "
          >
            <div
              className="
                mb-4

                h-px
                w-8

                bg-white/35

                md:mb-5
                md:w-10
              "
            />

            <div className="flex items-end gap-3">
              <span
                className="
                  text-5xl
                  font-black
                  tracking-[-0.07em]

                  md:text-6xl
                "
              >
                4.9
              </span>

              <span
                className="
                  mb-1

                  text-[10px]
                  tracking-[0.2em]
                  text-white/35
                "
              >
                / 5
              </span>
            </div>

            <div
              className="
                mt-3

                text-[11px]
                tracking-[0.25em]
                text-white/75
              "
            >
              ★ ★ ★ ★ ★
            </div>

            <p
              className="
                mt-3

                text-[9px]
                tracking-[0.16em]
                text-white/35
              "
            >
              EXPERIÊNCIA DOS CLIENTES
            </p>
          </div>
        </div>

        {/* ==================================================
            INDICADOR
        =================================================== */}

        <div
          className="
            mt-14

            flex
            items-center
            gap-3

            text-[8px]
            tracking-[0.18em]
            text-white/30

            sm:mt-16

            md:mt-20
            md:gap-4
            md:text-[8px]
            md:tracking-[0.3em]
          "
        >
          <span className="whitespace-nowrap">
            DEPOIMENTOS
          </span>

          <div className="h-px flex-1 bg-white/10" />

          <span className="whitespace-nowrap">
            01 — 03
          </span>
        </div>

        {/* ==================================================
            AVALIAÇÕES
        =================================================== */}

        <div
          className="
            mt-7

            border-t
            border-white/10

            md:mt-10
          "
        >
          {reviews.map((review) => (
            <article
              key={review.number}
              className="
                review-card
                group
                relative

                border-b
                border-white/10

                py-9

                sm:py-11

                md:py-14
              "
            >
              <div
                className="
                  grid
                  grid-cols-1
                  gap-7

                  md:grid-cols-[80px_1fr_240px]
                  md:items-center
                  md:gap-10
                "
              >
                {/* ==========================================
                    NÚMERO
                =========================================== */}

                <div className="flex items-center gap-3">
                  <span
                    className="
                      text-[9px]
                      tracking-[0.25em]
                      text-white/40
                    "
                  >
                    {review.number}
                  </span>

                  <span
                    className="
                      h-px
                      w-6

                      bg-white/20

                      md:hidden
                    "
                  />
                </div>

                {/* ==========================================
                    TEXTO
                =========================================== */}

                <blockquote
                  className="
                    max-w-[950px]

                    text-[7vw]
                    font-black
                    uppercase

                    leading-[1]
                    tracking-[-0.045em]

                    text-white/85

                    sm:text-[5vw]

                    md:text-[2.2vw]
                    md:leading-[1]
                    md:text-white/70

                    md:transition-colors
                    md:duration-500

                    md:group-hover:text-white
                  "
                >
                  “{review.text}”
                </blockquote>

                {/* ==========================================
                    CLIENTE
                =========================================== */}

                <div
                  className="
                    flex
                    items-end
                    justify-between

                    border-t
                    border-white/[0.08]

                    pt-5

                    md:block
                    md:border-0
                    md:pt-0
                  "
                >
                  <div>
                    <p
                      className="
                        text-[10px]
                        font-medium
                        tracking-[0.18em]
                        text-white/75

                        md:text-[10px]
                      "
                    >
                      {review.name}
                    </p>

                    <p
                      className="
                        mt-2

                        text-[8px]
                        tracking-[0.14em]
                        text-white/35
                      "
                    >
                      {review.service}
                    </p>
                  </div>

                  <div
                    className="
                      flex

                      h-10
                      w-10

                      items-center
                      justify-center

                      rounded-full

                      border
                      border-white/30

                      text-[11px]
                      text-white/70

                      md:mt-6

                      md:transition-all
                      md:duration-500

                      md:group-hover:border-white
                      md:group-hover:bg-white
                      md:group-hover:text-black
                    "
                  >
                    ★
                  </div>
                </div>
              </div>

              {/* ==========================================
                  HOVER DESKTOP
              =========================================== */}

              <div
                className="
                  pointer-events-none

                  absolute
                  inset-0
                  -z-10

                  hidden

                  origin-left
                  scale-x-0

                  bg-white/[0.018]

                  transition-transform
                  duration-700

                  md:block
                  md:group-hover:scale-x-100
                "
              />
            </article>
          ))}
        </div>

        {/* ==================================================
            FINAL
        =================================================== */}

        <div
          className="
            mt-6

            flex
            flex-col
            gap-3

            text-[7px]
            tracking-[0.18em]
            text-white/25

            sm:flex-row
            sm:items-center
            sm:justify-between

            md:mt-8
            md:text-[8px]
          "
        >
          <span>
            CLIENTES REAIS / EXPERIÊNCIAS REAIS
          </span>

          <span>
            NØVA BARBER CLUB / 2026
          </span>
        </div>
      </div>
    </section>
  );
}