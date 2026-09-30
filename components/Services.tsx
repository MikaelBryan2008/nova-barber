"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    name: "CORTE NØVA",
    description:
      "Corte personalizado para valorizar o seu estilo.",
    price: "R$ 55",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=90",
  },
  {
    number: "02",
    name: "CORTE + BARBA",
    description:
      "Visual completo, do corte ao acabamento da barba.",
    price: "R$ 85",
    image:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1000&q=90",
  },
  {
    number: "03",
    name: "BARBA",
    description:
      "Contorno, definição e acabamento preciso.",
    price: "R$ 40",
    image:
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1000&q=90",
  },
  {
    number: "04",
    name: "EXPERIÊNCIA COMPLETA",
    description:
      "Corte, barba e cuidado completo em uma só experiência.",
    price: "R$ 110",
    image:
      "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1000&q=90",
  },
];

export default function Services() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const imageRef =
    useRef<HTMLDivElement>(null);

  const [activeService, setActiveService] =
    useState<number | null>(null);

  // ====================================================
  // ANIMAÇÕES
  // ====================================================

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const mm =
        gsap.matchMedia();

      // ================================================
      // DESKTOP / TABLET
      // ================================================

      mm.add(
        "(min-width: 768px)",
        () => {
          gsap.from(
            ".services-top",
            {
              opacity: 0,
              y: 30,

              scrollTrigger: {
                trigger:
                  ".services-top",

                start:
                  "top 90%",

                end:
                  "top 60%",

                scrub: 1,
              },
            }
          );

          gsap.from(
            ".services-heading",
            {
              opacity: 0,
              y: 120,
              scale: 0.92,

              scrollTrigger: {
                trigger:
                  ".services-heading",

                start:
                  "top 90%",

                end:
                  "top 45%",

                scrub: 1,
              },
            }
          );

          gsap.from(
            ".services-description",
            {
              opacity: 0,
              y: 50,

              scrollTrigger: {
                trigger:
                  ".services-heading",

                start:
                  "top 75%",

                end:
                  "top 45%",

                scrub: 1,
              },
            }
          );

          gsap.from(
            ".service-row",
            {
              opacity: 0,
              y: 80,
              stagger: 0.08,

              scrollTrigger: {
                trigger:
                  ".services-list",

                start:
                  "top 90%",

                end:
                  "top 45%",

                scrub: 1,
              },
            }
          );

          gsap.fromTo(
            ".services-background-text",
            {
              xPercent: 8,
            },
            {
              xPercent: -8,

              scrollTrigger: {
                trigger:
                  section,

                start:
                  "top bottom",

                end:
                  "bottom top",

                scrub: 1.5,
              },
            }
          );
        }
      );

      // ================================================
      // MOBILE
      // ================================================

      mm.add(
        "(max-width: 767px)",
        () => {
          gsap.set(
            ".services-top",
            {
              opacity: 0,
              y: 20,
            }
          );

          gsap.set(
            ".services-heading",
            {
              opacity: 0,
              y: 70,
              scale: 0.95,
            }
          );

          gsap.set(
            ".services-description",
            {
              opacity: 0,
              y: 30,
            }
          );

          gsap.to(
            ".services-top",
            {
              opacity: 1,
              y: 0,

              duration: 0.7,
              ease: "power2.out",

              scrollTrigger: {
                trigger:
                  ".services-top",

                start:
                  "top 92%",

                toggleActions:
                  "play none none reverse",
              },
            }
          );

          gsap.to(
            ".services-heading",
            {
              opacity: 1,
              y: 0,
              scale: 1,

              duration: 0.9,
              ease: "power3.out",

              scrollTrigger: {
                trigger:
                  ".services-heading",

                start:
                  "top 90%",

                toggleActions:
                  "play none none reverse",
              },
            }
          );

          gsap.to(
            ".services-description",
            {
              opacity: 1,
              y: 0,

              duration: 0.7,
              ease: "power2.out",

              scrollTrigger: {
                trigger:
                  ".services-description",

                start:
                  "top 92%",

                toggleActions:
                  "play none none reverse",
              },
            }
          );

          const rows =
            gsap.utils.toArray<HTMLElement>(
              ".service-row"
            );

          rows.forEach(
            (row) => {
              gsap.fromTo(
                row,
                {
                  opacity: 0,
                  y: 45,
                },
                {
                  opacity: 1,
                  y: 0,

                  duration: 0.75,
                  ease:
                    "power3.out",

                  scrollTrigger: {
                    trigger:
                      row,

                    start:
                      "top 92%",

                    toggleActions:
                      "play none none reverse",
                  },
                }
              );
            }
          );
        }
      );
    }, section);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  // ====================================================
  // IMAGEM FLUTUANTE — SOMENTE MOUSE
  // ====================================================

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (
      !imageRef.current ||
      window.innerWidth < 768
    ) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left;

    const y =
      event.clientY -
      rect.top;

    gsap.to(
      imageRef.current,
      {
        x: x - 145,
        y: y - 190,

        duration: 0.7,

        ease:
          "power3.out",

        overwrite:
          "auto",
      }
    );
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      onMouseMove={
        handleMouseMove
      }
      className="
        relative
        overflow-hidden
        bg-[#050505]
        px-5
        py-24
        text-white

        sm:px-6
        sm:py-28

        md:min-h-screen
        md:px-12
        md:py-40
      "
    >
      {/* ============================================
          TEXTO DECORATIVO
      ============================================= */}

      <div
        className="
          services-background-text
          pointer-events-none
          absolute
          left-0
          top-[31%]
          whitespace-nowrap

          text-[30vw]
          font-black
          leading-none
          tracking-[-0.1em]
          text-white/[0.012]

          md:top-[32%]
          md:text-[18vw]
          md:text-white/[0.014]
        "
      >
        SERVIÇOS
      </div>

      {/* ============================================
          LUZ
      ============================================= */}

      <div
        className="
          pointer-events-none
          absolute
          right-[-200px]
          top-[20%]

          h-[420px]
          w-[420px]

          rounded-full
          bg-white/[0.02]
          blur-[100px]

          md:right-[-300px]
          md:h-[700px]
          md:w-[700px]
          md:bg-white/[0.025]
          md:blur-[160px]
        "
      />

      {/* ============================================
          CONTEÚDO
      ============================================= */}

      <div className="relative z-10 mx-auto max-w-[1600px]">

        {/* TOPO */}

        <div
          className="
            services-top

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
            03 / SERVIÇOS
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

        {/* ==========================================
            CABEÇALHO
        =========================================== */}

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
              services-heading

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
            SEU ESTILO,
            <br />

            <span className="text-white/30">
              DO SEU JEITO.
            </span>
          </h2>

          <div
            className="
              services-description

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
              Escolha o cuidado que combina
              com você. Do corte à barba,
              cada serviço é feito com técnica,
              atenção e cuidado nos detalhes.
            </p>
          </div>
        </div>

        {/* ==========================================
            INDICADOR
        =========================================== */}

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
            NOSSOS SERVIÇOS
          </span>

          <div className="h-px flex-1 bg-white/10" />

          <span className="whitespace-nowrap">
            01 — 04
          </span>
        </div>

        {/* ==========================================
            SERVIÇOS
        =========================================== */}

        <div
          className="
            services-list

            mt-7

            border-t
            border-white/10

            md:mt-8
          "
        >
          {services.map(
            (
              service,
              index
            ) => (
              <article
                key={
                  service.number
                }
                onMouseEnter={() => {
                  if (
                    window.innerWidth >=
                    768
                  ) {
                    setActiveService(
                      index
                    );
                  }
                }}
                onMouseLeave={() => {
                  setActiveService(
                    null
                  );
                }}
                className="
                  service-row
                  group
                  relative

                  border-b
                  border-white/10

                  py-7

                  md:flex
                  md:cursor-pointer
                  md:items-center
                  md:py-10
                "
              >
                {/* ==================================
                    MOBILE
                =================================== */}

                <div
                  className="
                    grid

                    grid-cols-[42px_1fr_94px]
                    gap-x-3

                    md:hidden
                  "
                >
                  {/* NÚMERO */}

                  <div className="pt-1">
                    <span
                      className="
                        text-[8px]
                        tracking-[0.25em]
                        text-white/40
                      "
                    >
                      {
                        service.number
                      }
                    </span>
                  </div>

                  {/* NOME */}

                  <div className="min-w-0">
                    <h3
                      className="
                        text-[7.3vw]
                        font-bold
                        uppercase
                        leading-[0.95]
                        tracking-[-0.045em]

                        min-[430px]:text-[31px]
                      "
                    >
                      {
                        service.name
                      }
                    </h3>

                    <p
                      className="
                        mt-3

                        max-w-[220px]

                        text-[10px]
                        normal-case
                        leading-[1.6]
                        tracking-normal
                        text-white/45

                        min-[390px]:text-[11px]
                      "
                    >
                      {
                        service.description
                      }
                    </p>

                    <div className="mt-5 flex items-center gap-3">
                      <span
                        className="
                          text-[10px]
                          font-medium
                          tracking-[0.12em]
                          text-white/75
                        "
                      >
                        {
                          service.price
                        }
                      </span>

                      <div className="h-px w-5 bg-white/20" />

                      <span
                        className="
                          text-[7px]
                          tracking-[0.15em]
                          text-white/30
                        "
                      >
                        SERVIÇO
                      </span>
                    </div>
                  </div>

                  {/* FOTO COLORIDA */}

                  <div
                    className="
                      relative

                      h-[122px]
                      w-[94px]

                      overflow-hidden
                      rounded-[2px]
                    "
                  >
                    <Image
                      src={
                        service.image
                      }
                      alt={
                        service.name
                      }
                      fill
                      sizes="94px"
                      className="
                        object-cover

                        transition-transform
                        duration-500

                        group-active:scale-[1.03]
                      "
                    />

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-black/[0.03]
                      "
                    />

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-[5px]
                        border
                        border-white/15
                      "
                    />

                    <span
                      className="
                        absolute
                        bottom-2
                        right-2

                        flex
                        h-6
                        w-6
                        items-center
                        justify-center

                        rounded-full

                        border
                        border-white/40

                        bg-black/25

                        text-[9px]
                        text-white

                        backdrop-blur-sm
                      "
                    >
                      ↗
                    </span>
                  </div>
                </div>

                {/* ==================================
                    DESKTOP
                =================================== */}

                <span
                  className="
                    hidden
                    w-[12%]

                    text-[9px]
                    tracking-[0.3em]
                    text-white/30

                    transition-colors

                    md:block
                    md:group-hover:text-white
                  "
                >
                  {service.number}
                </span>

                <div
                  className="
                    hidden
                    flex-1

                    md:block
                  "
                >
                  <h3
                    className="
                      text-[3vw]
                      font-bold
                      uppercase
                      leading-none
                      tracking-[-0.05em]

                      transition-all
                      duration-500

                      group-hover:translate-x-4
                    "
                  >
                    {
                      service.name
                    }
                  </h3>

                  <p
                    className="
                      mt-3

                      text-[11px]
                      normal-case
                      tracking-normal
                      text-white/40

                      lg:text-[12px]
                    "
                  >
                    {
                      service.description
                    }
                  </p>
                </div>

                <span
                  className="
                    mr-8
                    hidden

                    text-xs
                    tracking-[0.18em]
                    text-white/50

                    transition-colors

                    md:block
                    md:group-hover:text-white
                  "
                >
                  {service.price}
                </span>

                <div
                  className="
                    hidden

                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-white/15

                    text-sm
                    text-white/40

                    transition-all
                    duration-500

                    md:flex

                    md:group-hover:rotate-45
                    md:group-hover:border-white
                    md:group-hover:bg-white
                    md:group-hover:text-black
                  "
                >
                  ↗
                </div>

                {/* FUNDO DESKTOP */}

                <div
                  className="
                    pointer-events-none

                    absolute
                    inset-0
                    -z-10

                    hidden

                    origin-left
                    scale-x-0

                    bg-white/[0.025]

                    transition-transform
                    duration-500

                    md:block
                    md:group-hover:scale-x-100
                  "
                />
              </article>
            )
          )}
        </div>

        {/* ==========================================
            RODAPÉ MOBILE
        =========================================== */}

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
              tracking-[0.2em]
              text-white/25
            "
          >
            NØVA / SERVIÇOS
          </span>

          <span
            className="
              text-[7px]
              tracking-[0.2em]
              text-white/25
            "
          >
            EST. 2026
          </span>
        </div>
      </div>

      {/* ============================================
          FOTO FLUTUANTE — DESKTOP
      ============================================= */}

      <div
        ref={imageRef}
        className={`
          pointer-events-none

          absolute
          left-0
          top-0
          z-20

          hidden

          h-[380px]
          w-[290px]

          overflow-hidden

          transition-opacity
          duration-300

          md:block

          ${
            activeService !==
            null
              ? "md:opacity-100"
              : "md:opacity-0"
          }
        `}
      >
        {activeService !==
          null && (
          <>
            <Image
              src={
                services[
                  activeService
                ].image
              }
              alt={
                services[
                  activeService
                ].name
              }
              fill
              sizes="290px"
              className="
                object-cover
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-black/[0.03]
              "
            />

            <div
              className="
                absolute
                inset-3
                border
                border-white/25
              "
            />

            <span
              className="
                absolute
                bottom-5
                left-5

                text-[8px]
                tracking-[0.25em]
                text-white/80
              "
            >
              NØVA /{" "}
              {
                services[
                  activeService
                ].number
              }
            </span>
          </>
        )}
      </div>
    </section>
  );
}