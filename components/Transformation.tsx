"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Transformation() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const sliderRef =
    useRef<HTMLDivElement>(null);

  const [position, setPosition] =
    useState(50);

  const [dragging, setDragging] =
    useState(false);

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

      // ==================================================
      // DESKTOP
      // ==================================================

      mm.add(
        "(min-width: 768px)",
        () => {
          gsap.from(
            ".transformation-top",
            {
              opacity: 0,
              y: 30,

              scrollTrigger: {
                trigger:
                  ".transformation-top",

                start:
                  "top 90%",

                end:
                  "top 60%",

                scrub: 1,
              },
            }
          );

          gsap.from(
            ".transformation-heading",
            {
              opacity: 0,
              y: 130,
              scale: 0.92,

              scrollTrigger: {
                trigger:
                  ".transformation-heading",

                start:
                  "top 90%",

                end:
                  "top 45%",

                scrub: 1,
              },
            }
          );

          gsap.from(
            ".transformation-description",
            {
              opacity: 0,
              y: 50,

              scrollTrigger: {
                trigger:
                  ".transformation-heading",

                start:
                  "top 75%",

                end:
                  "top 45%",

                scrub: 1,
              },
            }
          );

          gsap.from(
            ".transformation-slider",
            {
              opacity: 0,
              y: 120,
              scale: 0.96,

              scrollTrigger: {
                trigger:
                  ".transformation-slider",

                start:
                  "top 90%",

                end:
                  "top 55%",

                scrub: 1,
              },
            }
          );

          gsap.fromTo(
            ".transformation-bg-text",
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

      // ==================================================
      // MOBILE
      // ==================================================

      mm.add(
        "(max-width: 767px)",
        () => {
          gsap.set(
            ".transformation-top",
            {
              opacity: 0,
              y: 20,
            }
          );

          gsap.set(
            ".transformation-heading",
            {
              opacity: 0,
              y: 65,
              scale: 0.95,
            }
          );

          gsap.set(
            ".transformation-description",
            {
              opacity: 0,
              y: 30,
            }
          );

          gsap.set(
            ".transformation-slider",
            {
              opacity: 0,
              y: 50,
            }
          );

          gsap.to(
            ".transformation-top",
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",

              scrollTrigger: {
                trigger:
                  ".transformation-top",

                start:
                  "top 92%",

                toggleActions:
                  "play none none reverse",
              },
            }
          );

          gsap.to(
            ".transformation-heading",
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",

              scrollTrigger: {
                trigger:
                  ".transformation-heading",

                start:
                  "top 90%",

                toggleActions:
                  "play none none reverse",
              },
            }
          );

          gsap.to(
            ".transformation-description",
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",

              scrollTrigger: {
                trigger:
                  ".transformation-description",

                start:
                  "top 92%",

                toggleActions:
                  "play none none reverse",
              },
            }
          );

          gsap.to(
            ".transformation-slider",
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",

              scrollTrigger: {
                trigger:
                  ".transformation-slider",

                start:
                  "top 90%",

                toggleActions:
                  "play none none reverse",
              },
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
  // ANTES / DEPOIS
  // MOUSE + TOUCH
  // ====================================================

  const updateSlider = (
    clientX: number
  ) => {
    const slider =
      sliderRef.current;

    if (!slider) return;

    const rect =
      slider.getBoundingClientRect();

    const x =
      clientX -
      rect.left;

    const percentage =
      (x / rect.width) *
      100;

    const limited =
      Math.min(
        95,
        Math.max(
          5,
          percentage
        )
      );

    setPosition(limited);
  };

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    setDragging(true);

    event.currentTarget.setPointerCapture(
      event.pointerId
    );

    updateSlider(
      event.clientX
    );
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!dragging) return;

    updateSlider(
      event.clientX
    );
  };

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    setDragging(false);

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }
  };

  return (
    <section
      id="transformacao"
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
          TEXTO DECORATIVO
      =================================================== */}

      <div
        className="
          transformation-bg-text

          pointer-events-none
          absolute
          left-0
          top-[30%]

          whitespace-nowrap

          text-[27vw]
          font-black
          leading-none
          tracking-[-0.1em]

          text-white/[0.01]

          md:text-[17vw]
        "
      >
        TRANSFORMAÇÃO
      </div>

      {/* ==================================================
          LUZ
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute

          left-1/2
          top-[38%]

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
            transformation-top

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
            05 / TRANSFORMAÇÃO
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
              transformation-heading

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
            VEJA A
            <br />

            <span className="text-white/30">
              DIFERENÇA.
            </span>
          </h2>

          <div
            className="
              transformation-description

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
              Arraste para comparar e veja como
              técnica, cuidado e atenção aos
              detalhes transformam o resultado.
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
            ANTES / DEPOIS
          </span>

          <div className="h-px flex-1 bg-white/10" />

          <span className="whitespace-nowrap">
            ARRASTE PARA COMPARAR
          </span>
        </div>

        {/* ==================================================
            SLIDER
        =================================================== */}

        <div
          ref={sliderRef}
          onPointerDown={
            handlePointerDown
          }
          onPointerMove={
            handlePointerMove
          }
          onPointerUp={
            handlePointerUp
          }
          onPointerCancel={() =>
            setDragging(false)
          }
          className="
            transformation-slider

            relative

            mt-7

            h-[460px]
            w-full

            cursor-ew-resize
            touch-none
            select-none
            overflow-hidden

            border
            border-white/10

            bg-[#080808]

            min-[390px]:h-[500px]

            sm:h-[600px]

            md:mt-10
            md:h-[720px]
          "
        >
          {/* ==================================================
              DEPOIS
          =================================================== */}

          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1800&q=90"
              alt="Resultado depois do corte"
              fill
              priority={false}
              sizes="100vw"
              className="
                pointer-events-none
                object-cover
              "
              draggable={false}
            />

            {/* Camada muito leve apenas para equilíbrio */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-black/[0.03]
              "
            />
          </div>

          {/* ==================================================
              ANTES
          =================================================== */}

          <div
            className="
              absolute
              inset-0
              overflow-hidden
            "
            style={{
              clipPath: `inset(0 ${
                100 -
                position
              }% 0 0)`,
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1800&q=90"
              alt="Visual antes do corte"
              fill
              sizes="100vw"
              className="
                pointer-events-none
                object-cover
              "
              draggable={false}
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-black/[0.05]
              "
            />
          </div>

          {/* ==================================================
              LABEL ANTES
          =================================================== */}

          <div
            className="
              pointer-events-none

              absolute
              left-5
              top-5
              z-20

              md:left-8
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

                bg-black/25

                px-3
                py-2

                backdrop-blur-md
              "
            >
              <span
                className="
                  text-[8px]
                  tracking-[0.22em]
                  text-white/90

                  md:text-[9px]
                "
              >
                ANTES
              </span>

              <span className="h-px w-5 bg-white/40" />
            </div>
          </div>

          {/* ==================================================
              LABEL DEPOIS
          =================================================== */}

          <div
            className="
              pointer-events-none

              absolute
              right-5
              top-5
              z-20

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

                bg-black/25

                px-3
                py-2

                backdrop-blur-md
              "
            >
              <span className="h-px w-5 bg-white/40" />

              <span
                className="
                  text-[8px]
                  tracking-[0.22em]
                  text-white/90

                  md:text-[9px]
                "
              >
                DEPOIS
              </span>
            </div>
          </div>

          {/* ==================================================
              LINHA DO SLIDER
          =================================================== */}

          <div
            className="
              pointer-events-none

              absolute
              bottom-0
              top-0
              z-30

              w-px

              bg-white/90

              shadow-[0_0_12px_rgba(255,255,255,0.25)]
            "
            style={{
              left: `${position}%`,
            }}
          />

          {/* ==================================================
              CONTROLE
          =================================================== */}

          <div
            className="
              pointer-events-none

              absolute
              top-1/2
              z-40

              flex

              h-12
              w-12

              -translate-x-1/2
              -translate-y-1/2

              items-center
              justify-center

              rounded-full

              border
              border-white/60

              bg-black/55

              shadow-[0_8px_30px_rgba(0,0,0,0.3)]

              backdrop-blur-md

              md:h-14
              md:w-14
            "
            style={{
              left: `${position}%`,
            }}
          >
            <div
              className="
                flex
                items-center
                gap-2
                text-white
              "
            >
              <span className="text-sm">
                ‹
              </span>

              <span
                className="
                  h-1
                  w-1

                  rounded-full

                  bg-white
                "
              />

              <span className="text-sm">
                ›
              </span>
            </div>
          </div>

          {/* ==================================================
              MOLDURA
          =================================================== */}

          <div
            className="
              pointer-events-none

              absolute
              inset-3
              z-20

              border
              border-white/[0.12]

              sm:inset-4

              md:inset-5
            "
          />

          {/* ==================================================
              RODAPÉ DA FOTO
          =================================================== */}

          <div
            className="
              pointer-events-none

              absolute
              bottom-5
              left-5
              right-5
              z-20

              flex
              items-center
              justify-between

              md:bottom-8
              md:left-8
              md:right-8
            "
          >
            <span
              className="
                rounded-full

                bg-black/25

                px-3
                py-2

                text-[7px]
                tracking-[0.18em]
                text-white/70

                backdrop-blur-md

                md:text-[8px]
              "
            >
              NØVA / TRANSFORMAÇÃO
            </span>

            <span
              className="
                rounded-full

                bg-black/25

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
        </div>

        {/* ==================================================
            TEXTO FINAL
        =================================================== */}

        <div
          className="
            mt-6

            flex
            flex-col
            gap-3

            border-b
            border-white/10

            pb-6

            sm:flex-row
            sm:items-center
            sm:justify-between

            md:mt-8
            md:pb-8
          "
        >
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-white/40

              md:text-[9px]
            "
          >
            CADA DETALHE FAZ DIFERENÇA.
          </span>

          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-white/25

              md:text-[9px]
            "
          >
            PRECISÃO / TÉCNICA / ESTILO
          </span>
        </div>
      </div>
    </section>
  );
}