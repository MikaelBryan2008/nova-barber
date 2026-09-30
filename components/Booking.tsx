"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const whatsappNumber = "5511999999999";

const whatsappMessage =
  "Olá, NØVA! Gostaria de agendar um horário. Poderia me passar os horários disponíveis?";

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage
)}`;

const steps = [
  {
    number: "01",
    title: "ESCOLHA O SERVIÇO",
    description:
      "Corte, barba ou experiência completa. Escolha o cuidado ideal para o seu estilo.",
  },
  {
    number: "02",
    title: "ESCOLHA O PROFISSIONAL",
    description:
      "Encontre o barbeiro que mais combina com o resultado que você procura.",
  },
  {
    number: "03",
    title: "CONFIRME O HORÁRIO",
    description:
      "Fale com a nossa equipe pelo WhatsApp e confirme o melhor horário para você.",
  },
];

export default function Booking() {
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
        gsap.from(".booking-label", {
          opacity: 0,
          y: 30,

          scrollTrigger: {
            trigger: ".booking-label",
            start: "top 90%",
            end: "top 65%",
            scrub: 1,
          },
        });

        gsap.from(".booking-line", {
          opacity: 0,
          y: 120,
          scale: 0.92,
          stagger: 0.12,

          scrollTrigger: {
            trigger: ".booking-title",
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
          },
        });

        gsap.from(".booking-info", {
          opacity: 0,
          y: 60,

          scrollTrigger: {
            trigger: ".booking-info",
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        });

        gsap.from(".booking-step", {
          opacity: 0,
          y: 60,
          stagger: 0.12,

          scrollTrigger: {
            trigger: ".booking-steps",
            start: "top 88%",
            end: "top 55%",
            scrub: 1,
          },
        });

        gsap.from(".booking-button", {
          opacity: 0,
          scale: 0.65,
          rotate: -20,

          scrollTrigger: {
            trigger: ".booking-button",
            start: "top 90%",
            end: "top 55%",
            scrub: 1,
          },
        });

        gsap.from(".booking-contact", {
          opacity: 0,
          y: 35,

          scrollTrigger: {
            trigger: ".booking-contact",
            start: "top 92%",
            end: "top 70%",
            scrub: 1,
          },
        });

        gsap.fromTo(
          ".booking-background",
          {
            scale: 0.7,
            opacity: 0,
          },
          {
            scale: 1.3,
            opacity: 1,

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
        gsap.from(".booking-label", {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: "power2.out",

          scrollTrigger: {
            trigger: ".booking-label",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });

        const lines =
          gsap.utils.toArray<HTMLElement>(".booking-line");

        lines.forEach((line) => {
          gsap.from(line, {
            opacity: 0,
            y: 60,
            duration: 0.85,
            ease: "power3.out",

            scrollTrigger: {
              trigger: line,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          });
        });

        gsap.from(".booking-info", {
          opacity: 0,
          y: 30,
          duration: 0.75,
          ease: "power2.out",

          scrollTrigger: {
            trigger: ".booking-info",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });

        const steps =
          gsap.utils.toArray<HTMLElement>(".booking-step");

        steps.forEach((step) => {
          gsap.from(step, {
            opacity: 0,
            y: 35,
            duration: 0.7,
            ease: "power3.out",

            scrollTrigger: {
              trigger: step,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          });
        });

        gsap.from(".booking-button", {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          ease: "back.out(1.4)",

          scrollTrigger: {
            trigger: ".booking-button",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".booking-contact", {
          opacity: 0,
          y: 30,
          duration: 0.75,
          ease: "power2.out",

          scrollTrigger: {
            trigger: ".booking-contact",
            start: "top 94%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, section);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="booking"
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
        md:py-32
      "
    >
      {/* ==================================================
          FUNDO
      =================================================== */}

      <div
        className="
          booking-background
          pointer-events-none
          absolute
          left-1/2
          top-[34%]
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-white/[0.04]

          sm:h-[600px]
          sm:w-[600px]

          md:h-[900px]
          md:w-[900px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[35%]
          h-[300px]
          w-[300px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/[0.025]
          blur-[100px]

          md:h-[650px]
          md:w-[650px]
          md:blur-[180px]
        "
      />

      {/* GRID */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]

          [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]
          [background-size:50px_50px]

          md:[background-size:80px_80px]
        "
      />

      {/* TEXTO DE FUNDO */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[8%]
          left-0
          whitespace-nowrap
          text-[28vw]
          font-black
          leading-none
          tracking-[-0.1em]
          text-white/[0.01]

          md:text-[16vw]
        "
      >
        AGENDAR
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1600px]
        "
      >
        {/* ==================================================
            TOPO
        =================================================== */}

        <div
          className="
            booking-label
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
            09 / AGENDAMENTO
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
            HERO DO AGENDAMENTO
        =================================================== */}

        <div
          className="
            pt-16

            sm:pt-20

            md:pt-24
          "
        >
          <div
            className="
              mb-6
              flex
              items-center
              gap-4

              md:mb-8
            "
          >
            <div className="h-px w-8 bg-white/35 md:w-12" />

            <span
              className="
                text-[8px]
                tracking-[0.2em]
                text-white/40

                md:text-[9px]
              "
            >
              SEU PRÓXIMO VISUAL COMEÇA AQUI
            </span>
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-10

              md:grid-cols-[1fr_340px]
              md:items-end
              md:gap-16
            "
          >
            {/* TÍTULO */}

            <h2
              className="
                booking-title
                max-w-[1000px]
                text-[11vw]
                font-black
                uppercase
                leading-[0.86]
                tracking-[-0.065em]

                sm:text-[9vw]

                md:text-[5.6vw]
                md:leading-[0.84]
              "
            >
              <span className="booking-line block">
                PRONTO PARA
              </span>

              <span className="booking-line block text-white/30">
                MUDAR O VISUAL?
              </span>
            </h2>

            {/* TEXTO */}

            <div className="booking-info">
              <div className="mb-5 h-px w-10 bg-white/35" />

              <p
                className="
                  max-w-[340px]
                  text-[11px]
                  leading-[1.8]
                  text-white/50

                  sm:text-[12px]

                  md:text-[13px]
                "
              >
                Escolha seu serviço, encontre o profissional
                ideal e fale com a nossa equipe para reservar
                o melhor horário.
              </p>

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  gap-x-6
                  gap-y-3
                  text-[7px]
                  tracking-[0.16em]
                  text-white/30

                  md:text-[8px]
                "
              >
                <span>VILA MADALENA — SP</span>
                <span>EST. 2026</span>
                <span>COM HORA MARCADA</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            COMO FUNCIONA
        =================================================== */}

        <div className="booking-steps mt-20 md:mt-28">
          <div
            className="
              flex
              items-center
              gap-4
              border-b
              border-white/10
              pb-5
            "
          >
            <span
              className="
                whitespace-nowrap
                text-[8px]
                tracking-[0.2em]
                text-white/35
              "
            >
              COMO FUNCIONA
            </span>

            <div className="h-px flex-1 bg-white/10" />

            <span
              className="
                text-[8px]
                tracking-[0.18em]
                text-white/25
              "
            >
              3 PASSOS
            </span>
          </div>

          <div
            className="
              grid
              grid-cols-1

              md:grid-cols-3
            "
          >
            {steps.map((step, index) => (
              <article
                key={step.number}
                className={`
                  booking-step
                  group
                  relative
                  min-h-[220px]
                  overflow-hidden
                  border-b
                  border-white/10
                  py-8

                  md:min-h-[280px]
                  md:border-b-0
                  md:py-10
                  md:px-8

                  ${index === 0 ? "md:pl-0" : ""}
                  ${index < 2 ? "md:border-r" : ""}
                  ${index === 2 ? "md:pr-0" : ""}
                `}
              >
                <div
                  className="
                    pointer-events-none
                    absolute
                    right-2
                    top-2
                    text-[90px]
                    font-black
                    leading-none
                    tracking-[-0.08em]
                    text-white/[0.025]

                    md:right-5
                    md:top-5
                    md:text-[120px]
                  "
                >
                  {step.number}
                </div>

                <div className="relative z-10">
                  <span
                    className="
                      text-[8px]
                      tracking-[0.22em]
                      text-white/30
                    "
                  >
                    {step.number}
                  </span>

                  <div
                    className="
                      mt-7
                      h-px
                      w-8
                      bg-white/30

                      transition-all
                      duration-500

                      md:group-hover:w-14
                      md:group-hover:bg-white/70
                    "
                  />

                  <h3
                    className="
                      mt-7
                      max-w-[300px]
                      text-[22px]
                      font-black
                      uppercase
                      leading-[0.95]
                      tracking-[-0.04em]

                      sm:text-[25px]

                      md:text-[28px]
                    "
                  >
                    {step.title}
                  </h3>

                  <p
                    className="
                      mt-5
                      max-w-[320px]
                      text-[11px]
                      leading-[1.8]
                      text-white/40

                      sm:text-[12px]
                    "
                  >
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ==================================================
            CTA PRINCIPAL
        =================================================== */}

        <div
          className="
            mt-20
            grid
            grid-cols-1
            gap-10
            border-y
            border-white/10
            py-10

            sm:py-12

            md:mt-28
            md:grid-cols-[1fr_auto]
            md:items-center
            md:gap-16
            md:py-16
          "
        >
          <div>
            <span
              className="
                text-[8px]
                tracking-[0.2em]
                text-white/30
              "
            >
              RESERVE SEU HORÁRIO
            </span>

            <h3
              className="
                mt-5
                max-w-[760px]
                text-[9vw]
                font-black
                uppercase
                leading-[0.9]
                tracking-[-0.055em]

                sm:text-[7vw]

                md:text-[3.8vw]
              "
            >
              SEU ESTILO.
              <br />

              <span className="text-white/30">
                SEU MOMENTO.
              </span>
            </h3>

            <p
              className="
                mt-6
                max-w-[500px]
                text-[11px]
                leading-[1.8]
                text-white/45

                sm:text-[12px]

                md:text-[13px]
              "
            >
              Fale diretamente com a equipe NØVA pelo
              WhatsApp para consultar os horários disponíveis
              e confirmar seu atendimento.
            </p>

            <a
              href="#services"
              className="
                group
                mt-7
                inline-flex
                items-center
                gap-3
                text-[8px]
                tracking-[0.2em]
                text-white/50
                transition-colors
                duration-300

                hover:text-white
              "
            >
              VER SERVIÇOS

              <span
                className="
                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </a>
          </div>

          {/* ==================================================
              BOTÃO WHATSAPP
          =================================================== */}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar horário pelo WhatsApp"
            className="
              booking-button
              group
              relative
              flex
              h-[165px]
              w-[165px]
              shrink-0
              items-center
              justify-center
              justify-self-end
              overflow-hidden
              rounded-full
              border
              border-white/30
              text-white

              transition-all
              duration-500

              active:scale-95
              active:bg-white
              active:text-black

              sm:h-[180px]
              sm:w-[180px]

              md:h-[220px]
              md:w-[220px]
              md:justify-self-auto

              md:hover:scale-105
              md:hover:border-white
              md:hover:bg-white
              md:hover:text-black
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                inset-3
                rounded-full
                border
                border-white/[0.1]

                transition-all
                duration-700

                group-hover:inset-5
                group-hover:border-black/10
              "
            />

            <div
              className="
                relative
                z-10
                flex
                flex-col
                items-center
                text-center
              "
            >
              <span
                className="
                  text-[9px]
                  font-medium
                  tracking-[0.2em]

                  md:text-[10px]
                "
              >
                AGENDAR
              </span>

              <span
                className="
                  mt-1
                  text-[9px]
                  tracking-[0.2em]
                "
              >
                AGORA
              </span>

              <span
                className="
                  mt-4
                  text-xl

                  transition-transform
                  duration-500

                  md:text-2xl
                  md:group-hover:rotate-45
                "
              >
                ↗
              </span>

              <span
                className="
                  mt-3
                  text-[6px]
                  tracking-[0.16em]
                  text-white/35

                  group-hover:text-black/45
                "
              >
                VIA WHATSAPP
              </span>
            </div>
          </a>
        </div>

        {/* ==================================================
            CONTATO RÁPIDO
        =================================================== */}

        <div
          className="
            booking-contact
            mt-14

            md:mt-20
          "
        >
          <div
            className="
              flex
              items-center
              gap-4
              border-b
              border-white/10
              pb-5
            "
          >
            <span
              className="
                whitespace-nowrap
                text-[8px]
                tracking-[0.2em]
                text-white/35
              "
            >
              CONTATO RÁPIDO
            </span>

            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div
            className="
              grid
              grid-cols-1

              sm:grid-cols-2

              lg:grid-cols-4
            "
          >
            {/* WHATSAPP */}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                flex
                min-h-[105px]
                items-center
                justify-between
                gap-4
                border-b
                border-white/10
                py-6

                sm:px-5

                lg:border-r
              "
            >
              <div>
                <span
                  className="
                    block
                    text-[7px]
                    tracking-[0.18em]
                    text-white/25
                  "
                >
                  WHATSAPP
                </span>

                <span
                  className="
                    mt-2
                    block
                    text-[10px]
                    tracking-[0.1em]
                    text-white/65

                    transition-colors

                    group-hover:text-white
                  "
                >
                  (11) 99999-9999
                </span>
              </div>

              <span className="text-white/30">
                ↗
              </span>
            </a>

            {/* INSTAGRAM */}

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                flex
                min-h-[105px]
                items-center
                justify-between
                gap-4
                border-b
                border-white/10
                py-6

                sm:px-5

                lg:border-r
              "
            >
              <div>
                <span
                  className="
                    block
                    text-[7px]
                    tracking-[0.18em]
                    text-white/25
                  "
                >
                  INSTAGRAM
                </span>

                <span
                  className="
                    mt-2
                    block
                    text-[10px]
                    tracking-[0.1em]
                    text-white/65

                    transition-colors

                    group-hover:text-white
                  "
                >
                  @NOVABARBER
                </span>
              </div>

              <span className="text-white/30">
                ↗
              </span>
            </a>

            {/* E-MAIL */}

            <a
              href="mailto:contato@novabarber.com.br"
              className="
                group
                flex
                min-h-[105px]
                items-center
                justify-between
                gap-4
                border-b
                border-white/10
                py-6

                sm:px-5

                lg:border-r
              "
            >
              <div className="min-w-0">
                <span
                  className="
                    block
                    text-[7px]
                    tracking-[0.18em]
                    text-white/25
                  "
                >
                  E-MAIL
                </span>

                <span
                  className="
                    mt-2
                    block
                    break-all
                    text-[9px]
                    tracking-[0.06em]
                    text-white/65

                    transition-colors

                    group-hover:text-white
                  "
                >
                  contato@novabarber.com.br
                </span>
              </div>

              <span className="shrink-0 text-white/30">
                ↗
              </span>
            </a>

            {/* LOCALIZAÇÃO */}

            <a
              href="https://www.google.com/maps/search/?api=1&query=Rua+Harmonia+Vila+Madalena+São+Paulo+SP"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                flex
                min-h-[105px]
                items-center
                justify-between
                gap-4
                border-b
                border-white/10
                py-6

                sm:px-5
              "
            >
              <div>
                <span
                  className="
                    block
                    text-[7px]
                    tracking-[0.18em]
                    text-white/25
                  "
                >
                  LOCALIZAÇÃO
                </span>

                <span
                  className="
                    mt-2
                    block
                    text-[10px]
                    tracking-[0.1em]
                    text-white/65

                    transition-colors

                    group-hover:text-white
                  "
                >
                  VILA MADALENA — SP
                </span>
              </div>

              <span className="text-white/30">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* ==================================================
            RODAPÉ FINAL
        =================================================== */}

        <footer
          className="
            mt-20
            border-t
            border-white/10
            pt-8

            md:mt-28
            md:pt-10
          "
        >
          <div
            className="
              grid
              grid-cols-1
              gap-10

              md:grid-cols-[1fr_auto]
              md:items-end
              md:gap-16
            "
          >
            <div>
              <span
                className="
                  text-[8px]
                  tracking-[0.22em]
                  text-white/30
                "
              >
                FUTURE BARBER CLUB
              </span>

              <div
                className="
                  mt-3
                  text-[18vw]
                  font-black
                  uppercase
                  leading-[0.75]
                  tracking-[-0.085em]
                  text-white

                  sm:text-[14vw]

                  md:text-[8vw]
                "
              >
                NØVA
              </div>
            </div>

            <div
              className="
                flex
                flex-col
                gap-5

                md:items-end
              "
            >
              <div
                className="
                  flex
                  flex-wrap
                  gap-x-6
                  gap-y-3
                  text-[8px]
                  tracking-[0.15em]
                  text-white/35
                "
              >
                <a
                  href="#services"
                  className="transition-colors hover:text-white"
                >
                  SERVIÇOS
                </a>

                <a
                  href="#equipe"
                  className="transition-colors hover:text-white"
                >
                  EQUIPE
                </a>

                <a
                  href="#espaco"
                  className="transition-colors hover:text-white"
                >
                  ESPAÇO
                </a>

                <a
                  href="#localizacao"
                  className="transition-colors hover:text-white"
                >
                  LOCALIZAÇÃO
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById("home")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }}
                className="
                  group
                  flex
                  items-center
                  gap-3
                  text-[8px]
                  tracking-[0.18em]
                  text-white/40

                  transition-colors
                  hover:text-white
                "
              >
                VOLTAR AO INÍCIO

                <span
                  className="
                    transition-transform
                    duration-300

                    group-hover:-translate-y-1
                  "
                >
                  ↑
                </span>
              </button>
            </div>
          </div>

          <div
            className="
              mt-10
              flex
              flex-col
              gap-4
              border-t
              border-white/10
              pt-5

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  relative
                  flex
                  h-3
                  w-3
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    absolute
                    h-3
                    w-3
                    animate-ping
                    rounded-full
                    bg-white/15
                  "
                />

                <div
                  className="
                    relative
                    h-[5px]
                    w-[5px]
                    rounded-full
                    bg-white/70
                  "
                />
              </div>

              <span
                className="
                  text-[7px]
                  tracking-[0.16em]
                  text-white/30
                "
              >
                AGENDAMENTOS DISPONÍVEIS
              </span>
            </div>

            <span
              className="
                text-[7px]
                tracking-[0.16em]
                text-white/20
              "
            >
              NØVA BARBER CLUB / 2026
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}