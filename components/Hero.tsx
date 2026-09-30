"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BarberScene from "./BarberScene";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const scrollProgress = useRef(0);

  const goToBooking = () => {
    const booking = document.getElementById("booking");

    if (booking) {
      booking.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    // Fallback temporário caso o Booking ainda não tenha id.
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const hero = heroRef.current;
    const title = titleRef.current;
    const glow = glowRef.current;
    const cursor = cursorRef.current;
    const button = buttonRef.current;

    if (
      !wrapper ||
      !hero ||
      !title ||
      !glow ||
      !cursor ||
      !button
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ==================================================
      // DESKTOP
      // ==================================================

      mm.add("(min-width: 768px)", () => {
        scrollProgress.current = 0;

        gsap.set(title, {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
        });

        gsap.set(".hero-label", {
          opacity: 1,
          x: 0,
          y: 0,
        });

        gsap.set(".hero-description", {
          opacity: 1,
          x: 0,
          y: 0,
        });

        gsap.set(button, {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
        });

        gsap.set(".hero-ui", {
          opacity: 1,
        });

        gsap.set(".hero-darkness", {
          opacity: 0,
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "+=1800",
            scrub: 1,
            pin: hero,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,

            onUpdate: (self) => {
              scrollProgress.current = self.progress;
            },
          },
        });

        timeline.to(
          title,
          {
            scale: 1.35,
            y: -20,
            ease: "none",
          },
          0
        );

        timeline.to(
          title,
          {
            scale: 2.4,
            y: -80,
            opacity: 0,
            ease: "none",
          },
          0.65
        );

        timeline.to(
          ".hero-label",
          {
            opacity: 0,
            y: -80,
            ease: "none",
          },
          0.15
        );

        timeline.to(
          ".hero-description",
          {
            opacity: 0,
            y: 80,
            ease: "none",
          },
          0.2
        );

        timeline.to(
          button,
          {
            opacity: 0,
            y: 100,
            scale: 0.75,
            ease: "none",
          },
          0.2
        );

        timeline.to(
          ".hero-ui",
          {
            opacity: 0,
            ease: "none",
          },
          0.25
        );

        timeline.to(
          ".hero-darkness",
          {
            opacity: 1,
            ease: "none",
          },
          0.75
        );
      });

      // ==================================================
      // MOBILE
      // Mantém NØVA + tesoura sincronizados
      // ==================================================

      mm.add("(max-width: 767px)", () => {
        scrollProgress.current = 0;

        gsap.set(title, {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
        });

        gsap.set(".hero-label", {
          opacity: 1,
          x: 0,
          y: 0,
        });

        gsap.set(".hero-description", {
          opacity: 1,
          x: 0,
          y: 0,
        });

        gsap.set(button, {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
        });

        gsap.set(".hero-ui", {
          opacity: 1,
        });

        gsap.set(".hero-darkness", {
          opacity: 0,
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "+=950",
            scrub: 0.75,
            pin: hero,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,

            onUpdate: (self) => {
              scrollProgress.current = self.progress;
            },
          },
        });

        timeline.to(
          title,
          {
            scale: 1.18,
            y: -8,
            ease: "none",
          },
          0
        );

        timeline.to(
          title,
          {
            scale: 1.8,
            y: -42,
            opacity: 0,
            ease: "none",
          },
          0.6
        );

        timeline.to(
          ".hero-label",
          {
            opacity: 0,
            y: -35,
            ease: "none",
          },
          0.12
        );

        timeline.to(
          ".hero-description",
          {
            opacity: 0,
            y: 35,
            ease: "none",
          },
          0.18
        );

        timeline.to(
          button,
          {
            opacity: 0,
            y: 45,
            scale: 0.88,
            ease: "none",
          },
          0.2
        );

        timeline.to(
          ".hero-ui",
          {
            opacity: 0,
            ease: "none",
          },
          0.24
        );

        timeline.to(
          ".hero-darkness",
          {
            opacity: 1,
            ease: "none",
          },
          0.75
        );
      });
    }, wrapper);

    // ==================================================
    // MOUSE — SOMENTE DESKTOP
    // ==================================================

    const hasFinePointer = window.matchMedia(
      "(pointer: fine)"
    ).matches;

    let handleMouseMove:
      | ((event: MouseEvent) => void)
      | null = null;

    let handleButtonMove:
      | ((event: MouseEvent) => void)
      | null = null;

    let handleButtonLeave:
      | (() => void)
      | null = null;

    if (hasFinePointer) {
      const moveGlowX = gsap.quickTo(glow, "x", {
        duration: 0.8,
        ease: "power3.out",
      });

      const moveGlowY = gsap.quickTo(glow, "y", {
        duration: 0.8,
        ease: "power3.out",
      });

      const moveCursorX = gsap.quickTo(cursor, "x", {
        duration: 0.18,
        ease: "power3.out",
      });

      const moveCursorY = gsap.quickTo(cursor, "y", {
        duration: 0.18,
        ease: "power3.out",
      });

      handleMouseMove = (event: MouseEvent) => {
        const rect = hero.getBoundingClientRect();

        moveGlowX(event.clientX - rect.left);
        moveGlowY(event.clientY - rect.top);

        moveCursorX(event.clientX);
        moveCursorY(event.clientY);
      };

      handleButtonMove = (event: MouseEvent) => {
        const rect = button.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;

        gsap.to(button, {
          x: x * 0.25,
          y: y * 0.25,
          duration: 0.3,
          ease: "power3.out",
        });

        gsap.to(cursor, {
          scale: 2.5,
          duration: 0.3,
        });
      };

      handleButtonLeave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });

        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
        });
      };

      window.addEventListener(
        "mousemove",
        handleMouseMove
      );

      button.addEventListener(
        "mousemove",
        handleButtonMove
      );

      button.addEventListener(
        "mouseleave",
        handleButtonLeave
      );
    }

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      window.clearTimeout(refreshTimer);

      ctx.revert();

      if (handleMouseMove) {
        window.removeEventListener(
          "mousemove",
          handleMouseMove
        );
      }

      if (handleButtonMove) {
        button.removeEventListener(
          "mousemove",
          handleButtonMove
        );
      }

      if (handleButtonLeave) {
        button.removeEventListener(
          "mouseleave",
          handleButtonLeave
        );
      }
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="
        relative
        w-full
        max-w-full
        overflow-x-clip
        bg-[#050505]
      "
    >
      <section
        ref={heroRef}
        id="home"
        className="
          relative
          flex
          h-[100svh]
          min-h-[600px]
          w-full
          max-w-full
          items-center
          justify-center
          overflow-hidden
          bg-[#050505]
          text-white

          md:h-screen
          md:min-h-[650px]
        "
        style={{
          perspective: "1200px",
        }}
      >
        {/* 3D — NÃO ALTERADO */}

        <BarberScene
          scrollProgress={scrollProgress}
        />

        {/* GRID */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[2]
            opacity-[0.045]

            md:opacity-[0.075]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.08) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.08) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "70px 70px",

            maskImage:
              "radial-gradient(circle at center, black, transparent 75%)",
          }}
        />

        {/* GLOW */}

        <div
          ref={glowRef}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[43%]
            z-[2]

            h-[280px]
            w-[280px]

            -translate-x-1/2
            -translate-y-1/2

            rounded-full
            bg-white/[0.04]
            blur-[90px]

            min-[390px]:h-[340px]
            min-[390px]:w-[340px]

            md:left-[-300px]
            md:top-[-300px]
            md:h-[600px]
            md:w-[600px]
            md:translate-x-0
            md:translate-y-0
            md:bg-white/[0.08]
            md:blur-[120px]
          "
        />

        {/* TOPO */}

        <div
          className="
            hero-ui
            absolute
            left-5
            top-5
            z-30

            text-[8px]
            font-medium
            tracking-[0.2em]
            text-white/50

            min-[390px]:left-6
            min-[390px]:top-6

            md:left-8
            md:top-8
            md:text-[9px]
            md:tracking-[0.3em]
          "
        >
          NØVA / BARBER CLUB
        </div>

        <div
          className="
            hero-ui
            absolute
            right-5
            top-5
            z-30

            text-[8px]
            tracking-[0.18em]
            text-white/40

            min-[390px]:right-6
            min-[390px]:top-6

            md:right-8
            md:top-8
            md:text-[9px]
            md:tracking-[0.3em]
          "
        >
          SÃO PAULO
        </div>

        {/* CONTEÚDO */}

        <div
          className="
            relative
            z-20
            flex
            w-full
            min-w-0
            max-w-full
            flex-col
            items-center
            px-5
            text-center

            min-[390px]:px-6
          "
        >
          <span
            className="
              hero-label
              mb-5
              whitespace-nowrap

              text-[8px]
              font-medium
              tracking-[0.25em]
              text-white/55

              min-[390px]:text-[9px]

              md:mb-7
              md:text-[10px]
              md:tracking-[0.4em]
            "
          >
            BARBEARIA CONTEMPORÂNEA · SÃO PAULO
          </span>

          {/* NØVA — CONTINUA SENDO O IMPACTO PRINCIPAL */}

          <div
            className="
              flex
              w-full
              min-w-0
              max-w-full
              items-center
              justify-center
              overflow-visible
              py-5

              md:py-8
            "
          >
            <h1
              ref={titleRef}
              className="
                hero-title

                select-none
                whitespace-nowrap

                text-[22vw]
                font-black
                leading-[0.72]
                tracking-[-0.09em]

                opacity-100

                min-[390px]:text-[21vw]

                sm:text-[20vw]

                md:text-[18vw]
                md:leading-[0.65]
              "
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
              }}
            >
              NØVA
            </h1>
          </div>

          {/* TEXTO MAIS HUMANO */}

          <div
            className="
              hero-description
              mt-5
              flex
              max-w-[290px]
              flex-col
              items-center
              gap-2

              sm:max-w-[360px]

              md:mt-8
              md:max-w-[470px]
            "
          >
            <p
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-white/70

                md:text-[11px]
                md:tracking-[0.22em]
              "
            >
              Precisão em cada corte. Estilo em cada detalhe.
            </p>

            <p
              className="
                text-[11px]
                leading-relaxed
                text-white/40

                md:text-[12px]
              "
            >
              Uma experiência pensada para valorizar
              seu estilo, com técnica, cuidado e atenção
              a cada detalhe.
            </p>
          </div>

          {/* CTA FUNCIONAL */}

          <button
            ref={buttonRef}
            type="button"
            onClick={goToBooking}
            aria-label="Ir para o agendamento"
            className="
              group
              mt-8

              flex
              min-h-[48px]
              items-center
              justify-center
              gap-4

              rounded-full

              border
              border-white/30

              bg-white/[0.04]

              px-7
              py-3

              text-[9px]
              font-medium
              tracking-[0.18em]

              backdrop-blur-md

              transition-colors
              duration-300

              active:bg-white
              active:text-black

              md:mt-9
              md:min-h-[50px]
              md:px-9
              md:text-[10px]
              md:hover:bg-white
              md:hover:text-black
            "
          >
            AGENDAR HORÁRIO

            <span
              aria-hidden="true"
              className="
                text-sm
                transition-transform
                duration-300

                group-active:translate-x-1
                md:group-hover:translate-x-1
              "
            >
              ↗
            </span>
          </button>
        </div>

        {/* RODAPÉ */}

        <div
          className="
            hero-ui

            absolute
            bottom-5
            left-5
            z-30

            text-[8px]
            tracking-[0.18em]
            text-white/35

            min-[390px]:left-6

            md:bottom-8
            md:left-8
            md:text-[9px]
            md:tracking-[0.25em]
          "
        >
          01 / INÍCIO
        </div>

        <div
          className="
            hero-ui

            absolute
            bottom-5
            left-1/2
            z-30

            -translate-x-1/2
            whitespace-nowrap

            text-[8px]
            tracking-[0.14em]
            text-white/35

            md:bottom-8
            md:text-[9px]
            md:tracking-[0.25em]
          "
        >
          ROLE PARA EXPLORAR
        </div>

        <div
          className="
            hero-ui

            absolute
            bottom-8
            right-8
            z-30

            hidden

            text-[9px]
            tracking-[0.25em]
            text-white/30

            md:block
          "
        >
          CORTE · BARBA · ESTILO
        </div>

        {/* ESCURECIMENTO DO SCROLL */}

        <div
          className="
            hero-darkness

            pointer-events-none
            absolute
            inset-0
            z-40

            bg-black
            opacity-0
          "
        />

        {/* CURSOR DESKTOP */}

        <div
          ref={cursorRef}
          className="
            pointer-events-none

            fixed
            left-[-6px]
            top-[-6px]
            z-50

            hidden

            h-3
            w-3

            rounded-full
            bg-white

            mix-blend-difference

            md:block
          "
        />
      </section>
    </div>
  );
}