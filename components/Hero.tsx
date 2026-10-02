"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BarberScene from "./BarberScene";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const revealImageRef = useRef<HTMLDivElement>(null);
  const cutMaskRef = useRef<HTMLDivElement>(null);
  const cutLineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const blueprintRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

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

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const hero = heroRef.current;
    const image = imageRef.current;
    const revealImage = revealImageRef.current;
    const cutMask = cutMaskRef.current;
    const cutLine = cutLineRef.current;
    const intro = introRef.current;
    const blueprint = blueprintRef.current;
    const final = finalRef.current;
    const button = buttonRef.current;
    const cursor = cursorRef.current;

    if (
      !wrapper ||
      !hero ||
      !image ||
      !revealImage ||
      !cutMask ||
      !cutLine ||
      !intro ||
      !blueprint ||
      !final ||
      !button ||
      !cursor
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const resetScene = () => {
        gsap.set(image, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          filter: "brightness(0.82) saturate(0.9)",
        });

        gsap.set(revealImage, {
          scale: 1.035,
          filter: "brightness(1.03) saturate(1.08) contrast(1.02)",
        });

        gsap.set(cutMask, {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        });

        gsap.set(cutLine, {
          opacity: 0,
          xPercent: -100,
        });

        gsap.set(".nova-letter", {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
        });

        gsap.set(".hero-intro-copy", {
          opacity: 1,
          y: 0,
        });

        gsap.set(".hero-chrome", {
          opacity: 1,
        });

        gsap.set(blueprint, {
          opacity: 0,
          scale: 0.98,
        });

        gsap.set(".blueprint-item", {
          opacity: 0,
          x: 0,
          y: 18,
        });

        gsap.set(final, {
          opacity: 0,
          scale: 0.9,
        });
      };

      mm.add("(min-width: 768px)", () => {
        resetScene();
        scrollProgress.current = 0;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "+=3200",
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

        timeline
          // 01 — HERO RESPIRA
          .to(
            image,
            {
              scale: 1.08,
              xPercent: -1.2,
              ease: "none",
              duration: 1.1,
            },
            0
          )
          .to(
            ".hero-intro-copy",
            {
              opacity: 0,
              y: 30,
              ease: "none",
              duration: 0.55,
            },
            0.35
          )
          .to(
            button,
            {
              opacity: 0,
              y: 22,
              scale: 0.94,
              ease: "none",
              duration: 0.5,
            },
            0.35
          )

          // 02 — LETRAS ABREM ESPAÇO PARA O CORTE
          .to(
            ".nova-letter-n",
            {
              x: "-8vw",
              rotate: -3,
              opacity: 0.25,
              ease: "none",
              duration: 0.7,
            },
            0.85
          )
          .to(
            ".nova-letter-o",
            {
              x: "-3vw",
              y: "4vh",
              opacity: 0.18,
              ease: "none",
              duration: 0.7,
            },
            0.88
          )
          .to(
            ".nova-letter-v",
            {
              x: "3vw",
              y: "-4vh",
              opacity: 0.18,
              ease: "none",
              duration: 0.7,
            },
            0.88
          )
          .to(
            ".nova-letter-a",
            {
              x: "8vw",
              rotate: 3,
              opacity: 0.25,
              ease: "none",
              duration: 0.7,
            },
            0.85
          )

          // 03 — A TESOURA "CORTA" A FOTOGRAFIA
          .to(
            cutLine,
            {
              opacity: 1,
              xPercent: 0,
              ease: "none",
              duration: 0.15,
            },
            1.3
          )
          .to(
            cutMask,
            {
              clipPath:
                "polygon(0 0, 64% 0, 52% 100%, 0 100%)",
              ease: "none",
              duration: 1.1,
            },
            1.32
          )
          .to(
            cutLine,
            {
              xPercent: 185,
              ease: "none",
              duration: 1.1,
            },
            1.32
          )
          .to(
            image,
            {
              filter: "brightness(0.38) saturate(0.55)",
              ease: "none",
              duration: 0.9,
            },
            1.48
          )

          // 04 — ANÁLISE EDITORIAL DO CORTE
          .to(
            ".nova-letter",
            {
              opacity: 0,
              scale: 1.08,
              ease: "none",
              duration: 0.45,
            },
            2.15
          )
          .to(
            ".hero-chrome",
            {
              opacity: 0,
              ease: "none",
              duration: 0.35,
            },
            2.15
          )
          .to(
            blueprint,
            {
              opacity: 1,
              scale: 1,
              ease: "none",
              duration: 0.5,
            },
            2.25
          )
          .to(
            ".blueprint-item",
            {
              opacity: 1,
              y: 0,
              stagger: 0.12,
              ease: "none",
              duration: 0.45,
            },
            2.4
          )

          // 05 — FECHA O DIAGRAMA E ENTREGA A MARCA
          .to(
            ".blueprint-item",
            {
              opacity: 0,
              y: -16,
              stagger: 0.07,
              ease: "none",
              duration: 0.35,
            },
            3.25
          )
          .to(
            blueprint,
            {
              opacity: 0,
              scale: 1.03,
              ease: "none",
              duration: 0.35,
            },
            3.35
          )
          .to(
            cutMask,
            {
              clipPath:
                "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              ease: "none",
              duration: 0.5,
            },
            3.45
          )
          .to(
            revealImage,
            {
              scale: 1.13,
              filter: "brightness(0.22) saturate(0.5)",
              ease: "none",
              duration: 0.75,
            },
            3.45
          )
          .to(
            final,
            {
              opacity: 1,
              scale: 1,
              ease: "power2.out",
              duration: 0.55,
            },
            3.72
          );
      });

      mm.add("(max-width: 767px)", () => {
        resetScene();
        scrollProgress.current = 0;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "+=1900",
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

        timeline
          .to(
            image,
            {
              scale: 1.07,
              yPercent: -1.5,
              ease: "none",
              duration: 1,
            },
            0
          )
          .to(
            ".hero-intro-copy",
            {
              opacity: 0,
              y: 18,
              ease: "none",
              duration: 0.45,
            },
            0.3
          )
          .to(
            ".nova-letter-n",
            {
              x: "-15vw",
              opacity: 0.22,
              ease: "none",
              duration: 0.6,
            },
            0.78
          )
          .to(
            ".nova-letter-o",
            {
              x: "-5vw",
              y: "3vh",
              opacity: 0.18,
              ease: "none",
              duration: 0.6,
            },
            0.8
          )
          .to(
            ".nova-letter-v",
            {
              x: "5vw",
              y: "-3vh",
              opacity: 0.18,
              ease: "none",
              duration: 0.6,
            },
            0.8
          )
          .to(
            ".nova-letter-a",
            {
              x: "15vw",
              opacity: 0.22,
              ease: "none",
              duration: 0.6,
            },
            0.78
          )
          .to(
            cutLine,
            {
              opacity: 1,
              xPercent: 0,
              ease: "none",
              duration: 0.12,
            },
            1.18
          )
          .to(
            cutMask,
            {
              clipPath:
                "polygon(0 0, 100% 0, 100% 56%, 0 72%)",
              ease: "none",
              duration: 0.9,
            },
            1.2
          )
          .to(
            cutLine,
            {
              yPercent: 180,
              xPercent: 30,
              ease: "none",
              duration: 0.9,
            },
            1.2
          )
          .to(
            image,
            {
              filter: "brightness(0.35) saturate(0.5)",
              ease: "none",
              duration: 0.8,
            },
            1.35
          )
          .to(
            ".nova-letter",
            {
              opacity: 0,
              ease: "none",
              duration: 0.35,
            },
            1.95
          )
          .to(
            ".hero-chrome",
            {
              opacity: 0,
              ease: "none",
              duration: 0.3,
            },
            1.95
          )
          .to(
            blueprint,
            {
              opacity: 1,
              scale: 1,
              ease: "none",
              duration: 0.45,
            },
            2.02
          )
          .to(
            ".blueprint-item",
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              ease: "none",
              duration: 0.35,
            },
            2.12
          )
          .to(
            ".blueprint-item",
            {
              opacity: 0,
              y: -10,
              stagger: 0.05,
              ease: "none",
              duration: 0.3,
            },
            2.95
          )
          .to(
            blueprint,
            {
              opacity: 0,
              ease: "none",
              duration: 0.3,
            },
            3.02
          )
          .to(
            cutMask,
            {
              clipPath:
                "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              ease: "none",
              duration: 0.45,
            },
            3.08
          )
          .to(
            revealImage,
            {
              scale: 1.12,
              filter: "brightness(0.2) saturate(0.45)",
              ease: "none",
              duration: 0.65,
            },
            3.08
          )
          .to(
            final,
            {
              opacity: 1,
              scale: 1,
              ease: "power2.out",
              duration: 0.5,
            },
            3.3
          );
      });
    }, wrapper);

    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let handleMouseMove: ((event: MouseEvent) => void) | null = null;
    let handleButtonMove: ((event: MouseEvent) => void) | null = null;
    let handleButtonLeave: (() => void) | null = null;

    if (finePointer) {
      const moveCursorX = gsap.quickTo(cursor, "x", {
        duration: 0.16,
        ease: "power3.out",
      });

      const moveCursorY = gsap.quickTo(cursor, "y", {
        duration: 0.16,
        ease: "power3.out",
      });

      const moveImageX = gsap.quickTo(image, "x", {
        duration: 1.25,
        ease: "power3.out",
      });

      const moveImageY = gsap.quickTo(image, "y", {
        duration: 1.25,
        ease: "power3.out",
      });

      handleMouseMove = (event: MouseEvent) => {
        const rect = hero.getBoundingClientRect();
        const localX = event.clientX - rect.left;
        const localY = event.clientY - rect.top;

        const normalizedX = localX / rect.width - 0.5;
        const normalizedY = localY / rect.height - 0.5;

        moveCursorX(event.clientX);
        moveCursorY(event.clientY);

        moveImageX(normalizedX * -7);
        moveImageY(normalizedY * -5);
      };

      handleButtonMove = (event: MouseEvent) => {
        const rect = button.getBoundingClientRect();

        const x =
          event.clientX - rect.left - rect.width / 2;

        const y =
          event.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.3,
          ease: "power3.out",
        });

        gsap.to(cursor, {
          scale: 2.5,
          duration: 0.2,
        });
      };

      handleButtonLeave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        });

        gsap.to(cursor, {
          scale: 1,
          duration: 0.2,
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mousemove", handleButtonMove);
      button.addEventListener("mouseleave", handleButtonLeave);
    }

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();

      if (handleMouseMove) {
        window.removeEventListener("mousemove", handleMouseMove);
      }

      if (handleButtonMove) {
        button.removeEventListener("mousemove", handleButtonMove);
      }

      if (handleButtonLeave) {
        button.removeEventListener("mouseleave", handleButtonLeave);
      }
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-w-full overflow-x-clip bg-[#050505]"
    >
      <section
        ref={heroRef}
        id="home"
        className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-[#050505] text-white md:h-screen md:min-h-[680px]"
      >
        {/* FOTO BASE */}
        <div
          ref={imageRef}
          className="absolute inset-[-10px] z-0 will-change-transform"
        >
          <picture className="absolute inset-0 block">
            <source
              media="(max-width: 767px)"
              srcSet="/images/hero-barber-mobile.png"
            />

            <Image
              src="/images/hero-barber-v2.png"
              alt="Barbeiro realizando um corte na NØVA Barber Club"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </picture>
        </div>

        {/* TRATAMENTO CINEMATOGRÁFICO */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/75 via-black/15 to-black/25 md:from-black/60 md:via-transparent md:to-black/20" />

        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-transparent to-black/55" />

        {/* NØVA ATRÁS DA AÇÃO */}
        <div className="pointer-events-none absolute inset-0 z-[4] flex items-center justify-center overflow-hidden">
          <h1
            aria-label="NØVA"
            className="-translate-y-[7vh] flex select-none items-center justify-center text-[22vw] font-black leading-[0.78] tracking-[-0.105em] text-white/[0.20] mix-blend-screen md:translate-y-0 md:text-[17vw] md:text-white/[0.19]"
          >
            <span className="nova-letter nova-letter-n inline-block will-change-transform">
              N
            </span>
            <span className="nova-letter nova-letter-o inline-block will-change-transform">
              Ø
            </span>
            <span className="nova-letter nova-letter-v inline-block will-change-transform">
              V
            </span>
            <span className="nova-letter nova-letter-a inline-block will-change-transform">
              A
            </span>
          </h1>
        </div>

        {/* SEGUNDA CÓPIA DA FOTO:
            A MÁSCARA DESTA CAMADA É CONTROLADA PELO SCROLL.
            É ISSO QUE CRIA O "CORTE" VISUAL. */}
        <div
          ref={cutMaskRef}
          className="pointer-events-none absolute inset-0 z-[8] overflow-hidden will-change-[clip-path]"
        >
          <div
            ref={revealImageRef}
            className="absolute inset-[-10px] will-change-transform"
          >
            <picture className="absolute inset-0 block">
              <source
                media="(max-width: 767px)"
                srcSet="/images/hero-barber-mobile.png"
              />

              <Image
                src="/images/hero-barber-v2.png"
                alt=""
                aria-hidden="true"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </picture>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.025] to-white/[0.055]" />
        </div>

        {/* LINHA DO CORTE */}
        <div
          ref={cutLineRef}
          className="pointer-events-none absolute left-[-35%] top-1/2 z-[18] h-px w-[165%] -translate-y-1/2 -rotate-[9deg] bg-gradient-to-r from-transparent via-white/90 to-transparent opacity-0 shadow-[0_0_24px_rgba(255,255,255,0.8)] md:left-[-25%] md:w-[150%] md:-rotate-[17deg]"
        />

        {/* TESOURA 3D */}
        <BarberScene scrollProgress={scrollProgress} />

        {/* TOPO MINIMALISTA */}
        <div className="hero-chrome absolute left-5 top-5 z-30 text-[9px] font-semibold tracking-[0.28em] text-white/85 min-[390px]:left-6 min-[390px]:top-6 md:left-8 md:top-8 md:text-[10px]">
          NØVA
        </div>

        <div className="hero-chrome absolute right-5 top-5 z-30 text-[8px] tracking-[0.22em] text-white/55 min-[390px]:right-6 min-[390px]:top-6 md:right-8 md:top-8 md:text-[9px]">
          FUTURE BARBER CLUB
        </div>

        {/* COPY INICIAL */}
        <div
          ref={introRef}
          className="hero-intro-copy absolute bottom-[92px] left-5 z-30 max-w-[270px] min-[390px]:left-6 md:bottom-[88px] md:left-8 md:max-w-[390px]"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-white/55" />

            <span className="text-[8px] uppercase tracking-[0.3em] text-white/60 md:text-[9px]">
              PRECISION IN MOTION
            </span>
          </div>

          <p className="text-[18px] font-medium leading-[1.16] tracking-[-0.02em] text-white/95 md:text-[26px]">
            O corte não acompanha
            <br />
            seu estilo.
            <br />
            <span className="text-white/55">
              Ele define.
            </span>
          </p>
        </div>

        {/* CTA DESKTOP */}
        <button
          ref={buttonRef}
          type="button"
          onClick={goToBooking}
          className="group absolute bottom-[88px] right-8 z-30 hidden h-[58px] items-center gap-6 rounded-full border border-white/30 bg-black/15 px-8 text-[9px] font-medium tracking-[0.22em] backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-black md:flex"
        >
          AGENDAR HORÁRIO

          <span
            aria-hidden="true"
            className="text-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            ↗
          </span>
        </button>

        {/* CTA MOBILE */}
        <button
          type="button"
          onClick={goToBooking}
          className="hero-intro-copy absolute bottom-[42px] right-5 z-30 text-[8px] font-medium tracking-[0.2em] text-white/80 md:hidden"
        >
          AGENDAR ↗
        </button>

        {/* INSTRUÇÃO */}
        <div className="hero-chrome absolute bottom-5 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap text-[7px] tracking-[0.22em] text-white/45 md:bottom-8 md:text-[8px]">
          ROLE PARA REALIZAR O CORTE ↓
        </div>

        {/* BLUEPRINT / EXPLODED VIEW */}
        <div
          ref={blueprintRef}
          className="pointer-events-none absolute inset-0 z-[24] flex items-center justify-center opacity-0"
        >
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />

          <div className="relative h-[72%] w-[88%] max-w-[1250px] md:h-[78%]">
            <div className="absolute left-0 top-0 text-[7px] tracking-[0.32em] text-white/40 md:text-[9px]">
              NØVA / CUT ANALYSIS
            </div>

            <div className="absolute right-0 top-0 text-[7px] tracking-[0.25em] text-white/35 md:text-[9px]">
              01 — 04
            </div>

            <div className="blueprint-item absolute left-[4%] top-[18%] md:left-[8%] md:top-[20%]">
              <p className="text-[7px] tracking-[0.28em] text-white/45 md:text-[9px]">
                01
              </p>

              <p className="mt-1 text-[16px] font-semibold tracking-[-0.03em] md:text-[24px]">
                TEXTURA
              </p>

              <div className="mt-2 h-px w-[28vw] max-w-[300px] bg-gradient-to-r from-white/65 to-transparent" />
            </div>

            <div className="blueprint-item absolute right-[3%] top-[35%] text-right md:right-[7%]">
              <p className="text-[7px] tracking-[0.28em] text-white/45 md:text-[9px]">
                02
              </p>

              <p className="mt-1 text-[16px] font-semibold tracking-[-0.03em] md:text-[24px]">
                FADE
              </p>

              <div className="ml-auto mt-2 h-px w-[30vw] max-w-[330px] bg-gradient-to-l from-white/65 to-transparent" />
            </div>

            <div className="blueprint-item absolute left-[7%] top-[58%] md:left-[12%]">
              <p className="text-[7px] tracking-[0.28em] text-white/45 md:text-[9px]">
                03
              </p>

              <p className="mt-1 text-[16px] font-semibold tracking-[-0.03em] md:text-[24px]">
                CONTORNO
              </p>

              <div className="mt-2 h-px w-[25vw] max-w-[270px] bg-gradient-to-r from-white/65 to-transparent" />
            </div>

            <div className="blueprint-item absolute bottom-[5%] right-[4%] text-right md:bottom-[8%] md:right-[11%]">
              <p className="text-[7px] tracking-[0.28em] text-white/45 md:text-[9px]">
                04
              </p>

              <p className="mt-1 text-[16px] font-semibold tracking-[-0.03em] md:text-[24px]">
                FINALIZAÇÃO
              </p>

              <div className="ml-auto mt-2 h-px w-[27vw] max-w-[290px] bg-gradient-to-l from-white/65 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 text-[7px] leading-relaxed tracking-[0.18em] text-white/35 md:text-[8px]">
              CADA LINHA.
              <br />
              CADA ÂNGULO.
              <br />
              CADA DETALHE.
            </div>
          </div>
        </div>

        {/* FINAL DA EXPERIÊNCIA */}
        <div
          ref={finalRef}
          className="pointer-events-none absolute inset-0 z-[26] flex items-center justify-center opacity-0"
        >
          <div className="absolute inset-0 bg-black/55" />

          <div className="relative text-center">
            <p className="mb-4 text-[7px] tracking-[0.4em] text-white/45 md:text-[9px]">
              PRECISION / IDENTITY / PRESENCE
            </p>

            <p className="text-[12vw] font-black leading-[0.82] tracking-[-0.08em] text-white md:text-[8vw]">
              THIS IS
              <br />
              NØVA.
            </p>
          </div>
        </div>

        {/* CURSOR CUSTOMIZADO */}
        <div
          ref={cursorRef}
          className="pointer-events-none fixed left-[-6px] top-[-6px] z-50 hidden h-3 w-3 rounded-full bg-white mix-blend-difference md:block"
        />
      </section>
    </div>
  );
}
