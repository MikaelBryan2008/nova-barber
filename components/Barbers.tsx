"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const barbers = [
  {
    number: "01",
    name: "LUCAS",
    surname: "MORENO",
    role: "ESPECIALISTA EM DEGRADÊ",
    experience: "7 ANOS DE EXPERIÊNCIA",
    image:
      "https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "02",
    name: "MATHEUS",
    surname: "COSTA",
    role: "BARBA & CLÁSSICOS",
    experience: "5 ANOS DE EXPERIÊNCIA",
    image:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "03",
    name: "GABRIEL",
    surname: "SILVA",
    role: "ESPECIALISTA EM TEXTURA",
    experience: "6 ANOS DE EXPERIÊNCIA",
    image:
      "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=1400&q=90",
  },
];

export default function Barbers() {
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
        gsap.from(".barbers-top", {
          opacity: 0,
          y: 30,

          scrollTrigger: {
            trigger: ".barbers-top",
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        });

        gsap.from(".barbers-heading", {
          opacity: 0,
          y: 120,
          scale: 0.92,

          scrollTrigger: {
            trigger: ".barbers-heading",
            start: "top 90%",
            end: "top 45%",
            scrub: 1,
          },
        });

        gsap.from(".barbers-description", {
          opacity: 0,
          y: 50,

          scrollTrigger: {
            trigger: ".barbers-heading",
            start: "top 75%",
            end: "top 45%",
            scrub: 1,
          },
        });

        const cards =
          gsap.utils.toArray<HTMLElement>(".barber-card");

        cards.forEach((card) => {
          const image =
            card.querySelector(".barber-image");

          const info =
            card.querySelector(".barber-info");

          gsap.from(card, {
            opacity: 0,
            y: 130,

            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 55%",
              scrub: 1,
            },
          });

          if (image) {
            gsap.fromTo(
              image,
              {
                scale: 1.2,
                yPercent: -5,
              },
              {
                scale: 1,
                yPercent: 5,

                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.3,
                },
              }
            );
          }

          if (info) {
            gsap.from(info, {
              opacity: 0,
              y: 50,

              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 50%",
                scrub: 1,
              },
            });
          }
        });

        gsap.fromTo(
          ".barbers-bg-text",
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
        gsap.set(".barbers-top", {
          opacity: 0,
          y: 20,
        });

        gsap.set(".barbers-heading", {
          opacity: 0,
          y: 70,
          scale: 0.95,
        });

        gsap.set(".barbers-description", {
          opacity: 0,
          y: 30,
        });

        gsap.to(".barbers-top", {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",

          scrollTrigger: {
            trigger: ".barbers-top",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.to(".barbers-heading", {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",

          scrollTrigger: {
            trigger: ".barbers-heading",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.to(".barbers-description", {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",

          scrollTrigger: {
            trigger: ".barbers-description",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });

        const cards =
          gsap.utils.toArray<HTMLElement>(".barber-card");

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 55,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",

              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
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
      id="equipe"
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
          barbers-bg-text

          pointer-events-none
          absolute
          left-0
          top-[23%]

          whitespace-nowrap

          text-[28vw]
          font-black
          leading-none
          tracking-[-0.1em]

          text-white/[0.01]

          md:top-[25%]
          md:text-[17vw]
          md:text-white/[0.012]
        "
      >
        NOSSA EQUIPE
      </div>

      {/* ==================================================
          LUZ
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute

          left-[-180px]
          top-[18%]

          h-[420px]
          w-[420px]

          rounded-full

          bg-white/[0.02]
          blur-[100px]

          md:left-[-300px]
          md:top-[20%]

          md:h-[700px]
          md:w-[700px]

          md:bg-white/[0.025]
          md:blur-[160px]
        "
      />

      <div className="relative z-10 mx-auto max-w-[1600px]">

        {/* ==================================================
            TOPO
        =================================================== */}

        <div
          className="
            barbers-top

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
            04 / EQUIPE
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
            TÍTULO
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
              barbers-heading

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
            CONHEÇA
            <br />

            <span className="text-white/30">
              QUEM FAZ.
            </span>
          </h2>

          <div
            className="
              barbers-description

              max-w-[320px]

              md:mb-1
              md:max-w-[330px]
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
              Profissionais que unem técnica,
              experiência e atenção aos detalhes
              para encontrar o estilo que combina
              com você.
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
            tracking-[0.2em]
            text-white/30

            sm:mt-16

            md:mt-20
            md:gap-4
            md:text-[8px]
            md:tracking-[0.3em]
          "
        >
          <span className="whitespace-nowrap">
            NOSSA EQUIPE
          </span>

          <div className="h-px flex-1 bg-white/10" />

          <span className="whitespace-nowrap">
            01 — 03
          </span>
        </div>

        {/* ==================================================
            BARBEIROS
        =================================================== */}

        <div
          className="
            mt-7

            grid
            grid-cols-1
            gap-4

            sm:mt-8

            md:mt-10
            md:grid-cols-3
            md:gap-px
            md:bg-white/10
          "
        >
          {barbers.map((barber) => (
            <article
              key={barber.number}
              className="
                barber-card
                group
                relative

                h-[460px]
                overflow-hidden

                border
                border-white/10

                bg-[#050505]

                min-[390px]:h-[500px]

                sm:h-[560px]

                md:h-auto
                md:min-h-[650px]
                md:border-0
              "
            >
              {/* ==========================================
                  FOTO
              =========================================== */}

              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={barber.image}
                  alt={`${barber.name} ${barber.surname}`}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="
                    barber-image

                    object-cover

                    transition-[transform,filter]
                    duration-700
                  "
                />

                {/* Gradiente somente para leitura */}

                <div
                  className="
                    pointer-events-none

                    absolute
                    inset-0

                    bg-gradient-to-t

                    from-black/90
                    via-black/10
                    to-transparent

                    md:from-black/85
                    md:via-black/5
                  "
                />

                {/* Camada extremamente leve */}

                <div
                  className="
                    pointer-events-none

                    absolute
                    inset-0

                    bg-black/[0.02]

                    transition-colors
                    duration-700

                    md:group-hover:bg-transparent
                  "
                />
              </div>

              {/* ==========================================
                  BORDA INTERNA
              =========================================== */}

              <div
                className="
                  pointer-events-none

                  absolute
                  inset-3

                  border
                  border-white/[0.12]

                  sm:inset-4

                  md:inset-5
                  md:border-white/[0.09]

                  md:transition-all
                  md:duration-500

                  md:group-hover:inset-4
                  md:group-hover:border-white/25
                "
              />

              {/* ==========================================
                  TOPO DO CARD
              =========================================== */}

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
                <div className="flex items-center gap-3">
                  <span
                    className="
                      text-[9px]
                      tracking-[0.25em]
                      text-white/80

                      md:text-[9px]
                      md:tracking-[0.3em]
                    "
                  >
                    {barber.number}
                  </span>

                  <span
                    className="
                      h-px
                      w-5
                      bg-white/40

                      md:hidden
                    "
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className="
                      h-[4px]
                      w-[4px]

                      rounded-full
                      bg-white/80

                      md:h-[5px]
                      md:w-[5px]
                    "
                  />

                  <span
                    className="
                      text-[7px]
                      tracking-[0.18em]
                      text-white/70

                      md:text-[7px]
                      md:tracking-[0.25em]
                    "
                  >
                    PROFISSIONAL NØVA
                  </span>
                </div>
              </div>

              {/* ==========================================
                  INFORMAÇÕES
              =========================================== */}

              <div
                className="
                  barber-info

                  absolute
                  bottom-0
                  left-0
                  right-0
                  z-10

                  p-6

                  sm:p-7

                  md:p-8
                "
              >
                {/* ESPECIALIDADE + EXPERIÊNCIA */}

                <div
                  className="
                    mb-4

                    flex
                    flex-col
                    gap-2

                    sm:flex-row
                    sm:items-center
                    sm:justify-between

                    md:mb-5
                  "
                >
                  <span
                    className="
                      text-[9px]
                      font-medium
                      tracking-[0.12em]
                      text-white/80

                      md:text-[9px]
                      md:tracking-[0.15em]
                    "
                  >
                    {barber.role}
                  </span>

                  <span
                    className="
                      text-[8px]
                      tracking-[0.1em]
                      text-white/50

                      md:text-[8px]
                      md:text-white/50
                    "
                  >
                    {barber.experience}
                  </span>
                </div>

                {/* NOME */}

                <h3
                  className="
                    text-[11vw]
                    font-black
                    uppercase

                    leading-[0.82]
                    tracking-[-0.055em]

                    min-[430px]:text-[48px]

                    sm:text-[56px]

                    md:text-[3.2vw]
                    md:leading-[0.85]
                  "
                >
                  {barber.name}

                  <br />

                  <span
                    className="
                      text-white/55

                      transition-colors
                      duration-500

                      md:group-hover:text-white
                    "
                  >
                    {barber.surname}
                  </span>
                </h3>

                {/* LINHA + SETA */}

                <div
                  className="
                    mt-6

                    flex
                    items-center
                    gap-4

                    md:mt-7
                  "
                >
                  <div className="h-px flex-1 bg-white/20">
                    <div
                      className="
                        h-full
                        w-[25%]

                        bg-white/60

                        md:w-0
                        md:bg-white

                        md:transition-all
                        md:duration-700

                        md:group-hover:w-full
                      "
                    />
                  </div>

                  <div
                    className="
                      flex

                      h-10
                      w-10
                      shrink-0

                      items-center
                      justify-center

                      rounded-full

                      border
                      border-white/40

                      bg-black/10

                      text-xs
                      text-white

                      backdrop-blur-sm

                      md:h-9
                      md:w-9

                      md:border-white/30

                      md:transition-all
                      md:duration-500

                      md:group-hover:rotate-45
                      md:group-hover:border-white
                      md:group-hover:bg-white
                      md:group-hover:text-black
                    "
                  >
                    ↗
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ==================================================
            FINAL MOBILE
        =================================================== */}

        <div
          className="
            mt-8

            flex
            items-center
            justify-between

            border-t
            border-white/[0.06]

            pt-4

            md:hidden
          "
        >
          <span
            className="
              text-[7px]
              tracking-[0.18em]
              text-white/25
            "
          >
            NØVA / EQUIPE
          </span>

          <span
            className="
              text-[7px]
              tracking-[0.18em]
              text-white/25
            "
          >
            TÉCNICA / ESTILO
          </span>
        </div>
      </div>
    </section>
  );
}