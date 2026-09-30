"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TheSpace() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ==================================================
      // DESKTOP
      // ==================================================

      mm.add("(min-width: 768px)", () => {
        gsap.from(".space-top", {
          opacity: 0,
          y: 30,

          scrollTrigger: {
            trigger: ".space-top",
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        });

        gsap.from(".space-heading", {
          opacity: 0,
          y: 130,
          scale: 0.92,

          scrollTrigger: {
            trigger: ".space-heading",
            start: "top 90%",
            end: "top 45%",
            scrub: 1,
          },
        });

        gsap.from(".space-description", {
          opacity: 0,
          y: 50,

          scrollTrigger: {
            trigger: ".space-heading",
            start: "top 75%",
            end: "top 45%",
            scrub: 1,
          },
        });

        // FOTO COMEÇA MAIS FECHADA E ABRE
        gsap.fromTo(
          image,
          {
            scale: 0.88,
          },
          {
            scale: 1,
            ease: "none",

            scrollTrigger: {
              trigger: image,
              start: "top 90%",
              end: "top 30%",
              scrub: 1.2,
            },
          }
        );

        // ZOOM INTERNO DA FOTO
        gsap.fromTo(
          ".space-image",
          {
            scale: 1.18,
          },
          {
            scale: 1,
            ease: "none",

            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.3,
            },
          }
        );

        // TEXTO SOBRE A FOTO
        gsap.from(".space-overlay-content", {
          opacity: 0,
          y: 60,

          scrollTrigger: {
            trigger: image,
            start: "top 55%",
            end: "top 30%",
            scrub: 1,
          },
        });

        gsap.fromTo(
          ".space-bg-text",
          {
            xPercent: -8,
          },
          {
            xPercent: 8,

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
        gsap.from(".space-top", {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: "power2.out",

          scrollTrigger: {
            trigger: ".space-top",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".space-heading", {
          opacity: 0,
          y: 60,
          scale: 0.96,
          duration: 0.9,
          ease: "power3.out",

          scrollTrigger: {
            trigger: ".space-heading",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".space-description", {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power2.out",

          scrollTrigger: {
            trigger: ".space-description",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(image, {
          opacity: 0,
          y: 50,
          scale: 0.97,
          duration: 0.9,
          ease: "power3.out",

          scrollTrigger: {
            trigger: image,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".space-overlay-content", {
          opacity: 0,
          y: 25,
          duration: 0.7,
          delay: 0.1,
          ease: "power2.out",

          scrollTrigger: {
            trigger: image,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="espaco"
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
          space-bg-text

          pointer-events-none
          absolute
          left-0
          top-[28%]

          whitespace-nowrap

          text-[28vw]
          font-black
          leading-none
          tracking-[-0.1em]

          text-white/[0.01]

          md:text-[17vw]
        "
      >
        O ESPAÇO
      </div>

      {/* ==================================================
          LUZ
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute

          left-1/2
          top-[35%]

          h-[450px]
          w-[450px]

          -translate-x-1/2

          rounded-full

          bg-white/[0.02]
          blur-[120px]

          md:h-[800px]
          md:w-[800px]
          md:blur-[180px]
        "
      />

      <div className="relative z-10 mx-auto max-w-[1600px]">

        {/* ==================================================
            TOPO
        =================================================== */}

        <div
          className="
            space-top

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
            07 / O ESPAÇO
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
            gap-7

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
              space-heading

              max-w-[780px]

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
            UM ESPAÇO
            <br />

            <span className="text-white/30">
              FEITO PARA VOCÊ.
            </span>
          </h2>

          <div
            className="
              space-description

              max-w-[320px]

              md:mb-1
              md:max-w-[340px]
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

            <p
              className="
                text-[11px]
                normal-case
                leading-[1.8]
                tracking-normal
                text-white/50

                sm:text-[12px]

                md:text-[13px]
                md:leading-[1.8]
              "
            >
              Mais do que uma barbearia.
              Um ambiente pensado para você
              desacelerar, cuidar do visual
              e aproveitar cada momento.
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
            NOSSO AMBIENTE
          </span>

          <div className="h-px flex-1 bg-white/10" />

          <span className="whitespace-nowrap">
            EST. 2026
          </span>
        </div>

        {/* ==================================================
            IMAGEM PRINCIPAL
        =================================================== */}

        <div
          ref={imageRef}
          className="
            relative

            mt-7

            h-[520px]

            overflow-hidden

            border
            border-white/10

            min-[390px]:h-[560px]

            sm:h-[640px]

            md:mt-10
            md:h-[82vh]
            md:min-h-[680px]
            md:max-h-[900px]
          "
        >
          <Image
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=2200&q=90"
            alt="Interior da NØVA Barber Club"
            fill
            sizes="100vw"
            className="
              space-image
              object-cover
            "
          />

          {/* ==================================================
              OVERLAY LEVE

              Mantemos a foto clara e natural.
              O gradiente fica concentrado no rodapé
              apenas para garantir leitura do texto.
          =================================================== */}

          <div
            className="
              pointer-events-none

              absolute
              inset-0

              bg-gradient-to-t

              from-black/80
              via-black/5
              to-transparent

              md:from-black/75
            "
          />

          {/* ==================================================
              BORDA INTERNA
          =================================================== */}

          <div
            className="
              pointer-events-none

              absolute
              inset-3

              border
              border-white/[0.12]

              sm:inset-4

              md:inset-5
              md:border-white/[0.1]
            "
          />

          {/* ==================================================
              SUPERIOR
          =================================================== */}

          <div
            className="
              absolute

              left-6
              right-6
              top-6
              z-10

              flex
              items-center
              justify-between

              md:left-8
              md:right-8
              md:top-8
            "
          >
            <div
              className="
                flex
                items-center
                gap-3

                rounded-full

                border
                border-white/15

                bg-black/20

                px-3
                py-2

                backdrop-blur-md
              "
            >
              <span
                className="
                  h-[5px]
                  w-[5px]

                  rounded-full

                  bg-white/80
                "
              />

              <span
                className="
                  text-[7px]
                  tracking-[0.18em]
                  text-white/80

                  md:text-[8px]
                "
              >
                NØVA / INTERIOR
              </span>
            </div>

            <span
              className="
                rounded-full

                border
                border-white/15

                bg-black/20

                px-3
                py-2

                text-[7px]
                tracking-[0.18em]
                text-white/70

                backdrop-blur-md

                md:text-[8px]
              "
            >
              01 / 01
            </span>
          </div>

          {/* ==================================================
              TEXTO SOBRE A FOTO
          =================================================== */}

          <div
            className="
              space-overlay-content

              absolute
              bottom-0
              left-0
              right-0
              z-10

              p-6

              sm:p-8

              md:p-12
            "
          >
            <div
              className="
                flex
                flex-col
                gap-7

                md:flex-row
                md:items-end
                md:justify-between
                md:gap-12
              "
            >
              <div>
                <span
                  className="
                    mb-4
                    block

                    text-[8px]
                    tracking-[0.2em]
                    text-white/65

                    md:text-[9px]
                  "
                >
                  PENSADO PARA A SUA EXPERIÊNCIA
                </span>

                <h3
                  className="
                    max-w-[780px]

                    text-[9vw]
                    font-black
                    uppercase

                    leading-[0.88]
                    tracking-[-0.055em]

                    sm:text-[7vw]

                    md:text-[3.8vw]
                    md:leading-[0.9]
                  "
                >
                  CADA DETALHE
                  <br />

                  <span className="text-white/55">
                    TEM UM PROPÓSITO.
                  </span>
                </h3>
              </div>

              <div
                className="
                  flex
                  max-w-[360px]
                  items-start
                  gap-4

                  border-t
                  border-white/20

                  pt-4

                  md:border-0
                  md:pt-0
                "
              >
                <span
                  className="
                    mt-2

                    h-px
                    w-7
                    shrink-0

                    bg-white/45
                  "
                />

                <p
                  className="
                    text-[10px]
                    normal-case

                    leading-[1.7]
                    tracking-normal

                    text-white/70

                    sm:text-[11px]

                    md:text-[12px]
                  "
                >
                  Conforto, iluminação e design
                  se encontram em um ambiente
                  preparado para tornar cada visita
                  uma experiência completa.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            DETALHES
        =================================================== */}

        <div
          className="
            grid
            grid-cols-2

            border-b
            border-white/10

            md:grid-cols-4
          "
        >
          {[
            ["01", "AMBIENTE CONFORTÁVEL"],
            ["02", "DESIGN MODERNO"],
            ["03", "ILUMINAÇÃO PENSADA"],
            ["04", "EXPERIÊNCIA NØVA"],
          ].map(([number, text], index) => (
            <div
              key={number}
              className={`
                border-t
                border-white/10

                px-3
                py-5

                md:px-6
                md:py-7

                ${
                  index % 2 === 0
                    ? "border-r"
                    : ""
                }

                md:border-r
                md:last:border-r-0
              `}
            >
              <span
                className="
                  block

                  text-[7px]
                  tracking-[0.2em]
                  text-white/25
                "
              >
                {number}
              </span>

              <span
                className="
                  mt-2
                  block

                  text-[8px]
                  tracking-[0.12em]
                  text-white/55

                  md:text-[9px]
                  md:tracking-[0.16em]
                "
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}