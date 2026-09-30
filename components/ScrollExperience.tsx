"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const styles = [
  {
    number: "01",
    title: "DEGRADÊ",
    subtitle: "Transição suave e acabamento preciso",
    image:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "02",
    title: "TEXTURIZADO",
    subtitle: "Movimento, volume e personalidade",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "03",
    title: "BARBA",
    subtitle: "Contorno, definição e cuidado",
    image:
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1400&q=90",
  },
];

export default function ScrollExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section || !title) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ==================================================
      // DESKTOP
      // ==================================================

      mm.add("(min-width: 1024px)", () => {
        gsap.set(".identity-top", {
          opacity: 0,
          y: 35,
        });

        gsap.set(title, {
          opacity: 0,
          y: 140,
          scale: 0.9,
        });

        gsap.set(".identity-description", {
          opacity: 0,
          y: 50,
        });

        gsap.set(".style-card", {
          opacity: 0,
          y: 120,
        });

        gsap.set(".style-card-image", {
          scale: 1.15,
        });

        gsap.to(".identity-top", {
          opacity: 1,
          y: 0,

          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        });

        gsap.to(title, {
          opacity: 1,
          y: 0,
          scale: 1,

          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 35%",
            scrub: 1,
          },
        });

        gsap.to(".identity-description", {
          opacity: 1,
          y: 0,

          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 40%",
            scrub: 1,
          },
        });

        const cards =
          gsap.utils.toArray<HTMLElement>(
            ".style-card"
          );

        cards.forEach((card) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,

            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 60%",
              scrub: 1,
            },
          });

          const image =
            card.querySelector(
              ".style-card-image"
            );

          if (image) {
            gsap.to(image, {
              scale: 1,

              scrollTrigger: {
                trigger: card,
                start: "top 95%",
                end: "top 45%",
                scrub: 1.1,
              },
            });
          }
        });
      });

      // ==================================================
      // TABLET
      // ==================================================

      mm.add(
        "(min-width: 768px) and (max-width: 1023px)",
        () => {
          gsap.from(".identity-top", {
            opacity: 0,
            y: 25,
            duration: 0.7,
            ease: "power2.out",

            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              toggleActions:
                "play none none reverse",
            },
          });

          gsap.from(title, {
            opacity: 0,
            y: 70,
            duration: 0.9,
            ease: "power3.out",

            scrollTrigger: {
              trigger: title,
              start: "top 90%",
              toggleActions:
                "play none none reverse",
            },
          });

          gsap.from(
            ".identity-description",
            {
              opacity: 0,
              y: 30,
              duration: 0.7,
              ease: "power2.out",

              scrollTrigger: {
                trigger:
                  ".identity-description",
                start: "top 90%",
                toggleActions:
                  "play none none reverse",
              },
            }
          );

          const cards =
            gsap.utils.toArray<HTMLElement>(
              ".style-card"
            );

          cards.forEach((card) => {
            gsap.from(card, {
              opacity: 0,
              y: 55,
              duration: 0.8,
              ease: "power3.out",

              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions:
                  "play none none reverse",
              },
            });
          });
        }
      );

      // ==================================================
      // MOBILE
      // ==================================================

      mm.add("(max-width: 767px)", () => {
        gsap.from(".identity-top", {
          opacity: 0,
          y: 18,
          duration: 0.6,
          ease: "power2.out",

          scrollTrigger: {
            trigger: section,
            start: "top 92%",
            toggleActions:
              "play none none reverse",
          },
        });

        gsap.from(title, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",

          scrollTrigger: {
            trigger: title,
            start: "top 92%",
            toggleActions:
              "play none none reverse",
          },
        });

        gsap.from(
          ".identity-description",
          {
            opacity: 0,
            y: 25,
            duration: 0.65,
            ease: "power2.out",

            scrollTrigger: {
              trigger:
                ".identity-description",
              start: "top 94%",
              toggleActions:
                "play none none reverse",
            },
          }
        );

        const cards =
          gsap.utils.toArray<HTMLElement>(
            ".style-card"
          );

        cards.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 0.75,
            ease: "power3.out",

            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions:
                "play none none reverse",
            },
          });

          const image =
            card.querySelector(
              ".style-card-image"
            );

          if (image) {
            gsap.fromTo(
              image,
              {
                scale: 1.06,
              },
              {
                scale: 1,
                duration: 1,
                ease: "power3.out",

                scrollTrigger: {
                  trigger: card,
                  start: "top 92%",
                  toggleActions:
                    "play none none reverse",
                },
              }
            );
          }
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
      id="estilos"
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

        lg:px-12
        lg:pb-32
        lg:pt-40
      "
    >
      {/* ==================================================
          LUZ
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0

          h-[300px]
          w-[120vw]
          max-w-[900px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-white/[0.025]
          blur-[100px]

          lg:h-[500px]
          lg:bg-white/[0.03]
          lg:blur-[150px]
        "
      />

      {/* ==================================================
          GRID DE FUNDO
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.025]

          lg:opacity-[0.04]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.06) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.06) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "70px 70px",
          maskImage:
            "linear-gradient(to bottom, black, transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1600px]">

        {/* ==================================================
            TOPO
        =================================================== */}

        <div
          className="
            identity-top

            flex
            items-center
            justify-between
            gap-4

            border-b
            border-white/10

            pb-4

            lg:pb-5
          "
        >
          <span
            className="
              whitespace-nowrap

              text-[8px]
              tracking-[0.22em]
              text-white/40

              sm:text-[9px]

              lg:text-[9px]
              lg:tracking-[0.32em]
            "
          >
            02 / ESTILOS
          </span>

          <span
            className="
              hidden

              text-[8px]
              tracking-[0.28em]
              text-white/35

              sm:block

              lg:text-[9px]
              lg:tracking-[0.3em]
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

            lg:mt-24
            lg:flex-row
            lg:items-end
            lg:justify-between
            lg:gap-16
          "
        >
          <h2
            ref={titleRef}
            className="
              max-w-[760px]

              text-[11vw]
              font-black
              uppercase
              leading-[0.88]
              tracking-[-0.06em]

              sm:text-[9vw]

              md:text-[7vw]

              lg:max-w-[800px]
              lg:text-[4.8vw]
              lg:leading-[0.9]
              lg:tracking-[-0.065em]
            "
          >
            ENCONTRE
            <br />

            <span className="text-white/30">
              SEU ESTILO.
            </span>
          </h2>

          {/* DESCRIÇÃO */}

          <div
            className="
              identity-description

              max-w-[320px]

              sm:max-w-[340px]

              lg:mb-1
              lg:max-w-[330px]
            "
          >
            <span
              className="
                mb-4
                block

                h-px
                w-8

                bg-white/35

                lg:mb-5
                lg:w-10
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

                lg:text-[13px]
                lg:leading-[1.8]
              "
            >
              Cada pessoa tem um estilo.
              Nosso trabalho é encontrar o corte
              e o acabamento que combinam com você.
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

            lg:mt-20
            lg:gap-4
            lg:text-[8px]
            lg:tracking-[0.3em]
          "
        >
          <span className="whitespace-nowrap">
            ESCOLHA SEU ESTILO
          </span>

          <div className="h-px flex-1 bg-white/10" />

          <span className="whitespace-nowrap">
            01 — 03
          </span>
        </div>

        {/* ==================================================
            CARDS
        =================================================== */}

        <div
          className="
            styles-grid

            mt-7

            grid
            grid-cols-1
            gap-4

            sm:mt-8

            md:grid-cols-2

            lg:mt-10
            lg:grid-cols-3
            lg:gap-0

            lg:border-l
            lg:border-t
            lg:border-white/10
          "
        >
          {styles.map((style, index) => (
            <article
              key={style.number}
              className={`
                style-card
                group
                relative

                h-[400px]
                min-w-0
                overflow-hidden

                border
                border-white/10

                bg-[#050505]

                min-[390px]:h-[430px]

                sm:h-[480px]

                md:h-[520px]

                lg:h-auto
                lg:min-h-[590px]
                lg:cursor-pointer

                lg:border-0
                lg:border-b
                lg:border-r
                lg:border-white/10

                ${
                  index === 2
                    ? "md:col-span-2 lg:col-span-1"
                    : ""
                }
              `}
            >
              {/* ==========================================
                  FOTO NATURAL
              =========================================== */}

              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={style.image}
                  alt={style.title}
                  fill
                  sizes="
                    (max-width: 767px) 100vw,
                    (max-width: 1023px) 50vw,
                    33vw
                  "
                  className="
                    style-card-image

                    object-cover

                    opacity-[0.92]

                    transition-transform
                    duration-700

                    lg:opacity-[0.82]
                    lg:transition-[transform,filter,opacity]
                    lg:duration-700

                    lg:group-hover:scale-[1.025]
                    lg:group-hover:opacity-100
                  "
                />

                {/* Apenas o necessário para o texto ficar legível */}

                <div
                  className="
                    absolute
                    inset-0

                    bg-gradient-to-t

                    from-black/85
                    via-black/10
                    to-transparent

                    lg:from-black/80
                    lg:via-black/5
                  "
                />

                <div
                  className="
                    absolute
                    inset-0

                    bg-black/[0.02]

                    transition-colors
                    duration-700

                    lg:group-hover:bg-transparent
                  "
                />
              </div>

              {/* BORDA INTERNA */}

              <div
                className="
                  pointer-events-none

                  absolute
                  inset-3

                  border
                  border-white/[0.12]

                  sm:inset-4

                  lg:inset-5
                  lg:border-white/[0.09]

                  lg:transition-all
                  lg:duration-500

                  lg:group-hover:inset-4
                  lg:group-hover:border-white/25
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

                  lg:left-8
                  lg:right-8
                  lg:top-8
                "
              >
                <div className="flex items-center gap-3">
                  <span
                    className="
                      text-[9px]
                      tracking-[0.25em]
                      text-white/80

                      lg:text-[9px]
                      lg:tracking-[0.3em]
                      lg:text-white/70
                    "
                  >
                    {style.number}
                  </span>

                  <span className="h-px w-5 bg-white/40" />
                </div>

                <div
                  className="
                    relative

                    h-2
                    w-2

                    rounded-full

                    border
                    border-white/70
                  "
                >
                  <div
                    className="
                      absolute
                      left-1/2
                      top-1/2

                      h-[2px]
                      w-[2px]

                      -translate-x-1/2
                      -translate-y-1/2

                      rounded-full
                      bg-white
                    "
                  />
                </div>
              </div>

              {/* ==========================================
                  CONTEÚDO DO CARD
              =========================================== */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  z-10

                  min-w-0

                  p-6

                  sm:p-7

                  lg:p-8
                "
              >
                <p
                  className="
                    mb-3

                    text-[10px]
                    normal-case
                    leading-relaxed
                    tracking-normal
                    text-white/70

                    min-[390px]:text-[11px]

                    lg:mb-4
                    lg:text-[12px]
                    lg:text-white/65
                  "
                >
                  {style.subtitle}
                </p>

                {/* TÍTULO + SETA */}

                <div
                  className="
                    flex
                    min-w-0
                    items-end
                    justify-between
                    gap-3
                  "
                >
                  <h3
                    className="
                      min-w-0

                      font-black
                      uppercase

                      leading-[0.88]
                      tracking-[-0.05em]

                      text-[clamp(2.2rem,10vw,3.5rem)]

                      md:text-[clamp(2.2rem,5vw,3.4rem)]

                      lg:text-[clamp(2.1rem,2.7vw,3.3rem)]
                      lg:tracking-[-0.06em]

                      lg:transition-transform
                      lg:duration-500

                      lg:group-hover:-translate-y-2

                      xl:text-[clamp(2.3rem,2.8vw,3.5rem)]
                    "
                  >
                    {style.title}
                  </h3>

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

                      text-sm
                      text-white

                      backdrop-blur-sm

                      lg:h-9
                      lg:w-9

                      lg:border-white/30

                      lg:transition-all
                      lg:duration-500

                      lg:group-hover:rotate-45
                      lg:group-hover:border-white
                      lg:group-hover:bg-white
                      lg:group-hover:text-black

                      xl:h-10
                      xl:w-10
                    "
                  >
                    ↗
                  </div>
                </div>

                {/* LINHA */}

                <div
                  className="
                    mt-5
                    h-px
                    w-full
                    overflow-hidden
                    bg-white/15

                    lg:mt-6
                  "
                >
                  <div
                    className="
                      h-full
                      w-[25%]

                      bg-white/60

                      lg:w-0
                      lg:bg-white

                      lg:transition-all
                      lg:duration-700

                      lg:group-hover:w-full
                    "
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}