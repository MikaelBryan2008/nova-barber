"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const hours = [
  ["SEG", "09:00 — 20:00"],
  ["TER", "09:00 — 20:00"],
  ["QUA", "09:00 — 20:00"],
  ["QUI", "09:00 — 20:00"],
  ["SEX", "09:00 — 21:00"],
  ["SÁB", "09:00 — 19:00"],
  ["DOM", "FECHADO"],
];

const address =
  "Rua Harmonia, Vila Madalena, São Paulo - SP";

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Rua+Harmonia+Vila+Madalena+São+Paulo+SP";

const mapEmbedUrl =
  "https://www.google.com/maps?q=Rua%20Harmonia%2C%20Vila%20Madalena%2C%20S%C3%A3o%20Paulo%20-%20SP&output=embed";

const whatsappUrl =
  "https://wa.me/5511999999999";

const instagramUrl =
  "https://www.instagram.com/";

const emailUrl =
  "mailto:contato@novabarber.com.br";

export default function Location() {
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
        gsap.from(".location-top", {
          opacity: 0,
          y: 30,

          scrollTrigger: {
            trigger: ".location-top",
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        });

        gsap.from(".location-heading", {
          opacity: 0,
          y: 120,
          scale: 0.92,

          scrollTrigger: {
            trigger: ".location-heading",
            start: "top 90%",
            end: "top 45%",
            scrub: 1,
          },
        });

        gsap.from(".location-info", {
          opacity: 0,
          y: 60,

          scrollTrigger: {
            trigger: ".location-info",
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        });

        gsap.from(".hours-panel", {
          opacity: 0,
          x: 100,

          scrollTrigger: {
            trigger: ".location-content",
            start: "top 85%",
            end: "top 45%",
            scrub: 1,
          },
        });

        gsap.from(".hour-row", {
          opacity: 0,
          y: 25,
          stagger: 0.05,

          scrollTrigger: {
            trigger: ".hours-list",
            start: "top 90%",
            end: "top 55%",
            scrub: 1,
          },
        });

        gsap.fromTo(
          ".location-bg",
          {
            xPercent: 8,
          },
          {
            xPercent: -8,

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
        const elements = [
          ".location-top",
          ".location-heading",
          ".location-info",
          ".hours-panel",
        ];

        elements.forEach((selector) => {
          gsap.from(selector, {
            opacity: 0,
            y: 45,
            duration: 0.8,
            ease: "power3.out",

            scrollTrigger: {
              trigger: selector,
              start: "top 90%",
              toggleActions:
                "play none none reverse",
            },
          });
        });

        const rows =
          gsap.utils.toArray<HTMLElement>(
            ".hour-row"
          );

        rows.forEach((row) => {
          gsap.from(row, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out",

            scrollTrigger: {
              trigger: row,
              start: "top 94%",
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
      id="localizacao"
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
          FUNDO
      =================================================== */}

      <div
        className="
          location-bg

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
        LOCALIZAÇÃO
      </div>

      <div
        className="
          pointer-events-none
          absolute

          right-[-180px]
          top-[25%]

          h-[450px]
          w-[450px]

          rounded-full

          bg-white/[0.02]
          blur-[120px]

          md:right-[-300px]

          md:h-[750px]
          md:w-[750px]

          md:blur-[180px]
        "
      />

      <div className="relative z-10 mx-auto max-w-[1600px]">

        {/* ==================================================
            TOPO
        =================================================== */}

        <div
          className="
            location-top

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
            08 / LOCALIZAÇÃO
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

        <div className="mt-14 sm:mt-16 md:mt-24">
          <h2
            className="
              location-heading

              max-w-[900px]

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
            VENHA
            <br />

            <span className="text-white/30">
              NOS VISITAR.
            </span>
          </h2>
        </div>

        {/* ==================================================
            CONTEÚDO
        =================================================== */}

        <div
          className="
            location-content

            mt-14

            grid
            grid-cols-1

            border-t
            border-white/10

            md:mt-20
            md:grid-cols-2
          "
        >
          {/* ==================================================
              LOCALIZAÇÃO
          =================================================== */}

          <div
            className="
              location-info

              border-b
              border-white/10

              py-10

              md:border-b-0
              md:border-r

              md:py-14
              md:pr-12

              lg:pr-16
            "
          >
            <span
              className="
                text-[8px]
                tracking-[0.22em]
                text-white/30
              "
            >
              01 / ENDEREÇO
            </span>

            <h3
              className="
                mt-7

                max-w-[650px]

                text-[9vw]
                font-black
                uppercase
                leading-[0.9]
                tracking-[-0.055em]

                sm:text-[7vw]

                md:text-[3.4vw]
              "
            >
              VILA
              <br />

              <span className="text-white/35">
                MADALENA.
              </span>
            </h3>

            <div className="mt-7 max-w-[440px]">
              <div
                className="
                  mb-5

                  h-px
                  w-8

                  bg-white/35
                "
              />

              <p
                className="
                  text-[11px]
                  leading-[1.8]
                  text-white/50

                  sm:text-[12px]

                  md:text-[13px]
                "
              >
                Rua Harmonia
                <br />

                Vila Madalena — São Paulo, SP
                <br />

                Localização demonstrativa
              </p>
            </div>

            {/* ==================================================
                GOOGLE MAPS
            =================================================== */}

            <div
              className="
                relative

                mt-10

                h-[300px]

                overflow-hidden

                border
                border-white/10

                bg-[#111]

                sm:h-[360px]

                md:h-[400px]
              "
            >
              <iframe
                src={mapEmbedUrl}
                title="Mapa da NØVA Barber Club"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="
                  absolute
                  inset-0

                  h-full
                  w-full

                  border-0
                "
              />

              {/* Identidade discreta sobre o mapa */}

              <div
                className="
                  pointer-events-none

                  absolute
                  left-4
                  top-4
                  z-10

                  rounded-full

                  border
                  border-black/10

                  bg-black/75

                  px-3
                  py-2

                  backdrop-blur-md
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      h-[5px]
                      w-[5px]

                      rounded-full

                      bg-white
                    "
                  />

                  <span
                    className="
                      text-[7px]
                      tracking-[0.18em]
                      text-white/90
                    "
                  >
                    NØVA / VILA MADALENA
                  </span>
                </div>
              </div>

              <div
                className="
                  pointer-events-none

                  absolute
                  bottom-4
                  right-4
                  z-10

                  rounded-full

                  bg-black/75

                  px-3
                  py-2

                  text-[7px]
                  tracking-[0.15em]
                  text-white/75

                  backdrop-blur-md
                "
              >
                SÃO PAULO / BRASIL
              </div>
            </div>

            {/* ==================================================
                ABRIR MAPS
            =================================================== */}

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${address} no Google Maps`}
              className="
                mt-5

                flex
                min-h-12
                w-full

                items-center
                justify-between

                border
                border-white/20

                px-5

                text-[8px]
                tracking-[0.2em]
                text-white/70

                transition-all
                duration-300

                active:bg-white
                active:text-black

                md:w-fit
                md:min-w-[270px]

                md:hover:bg-white
                md:hover:text-black
              "
            >
              ABRIR NO GOOGLE MAPS

              <span className="text-sm">
                ↗
              </span>
            </a>
          </div>

          {/* ==================================================
              HORÁRIOS
          =================================================== */}

          <div
            className="
              hours-panel

              py-10

              md:py-14
              md:pl-12

              lg:pl-16
            "
          >
            <span
              className="
                text-[8px]
                tracking-[0.22em]
                text-white/30
              "
            >
              02 / HORÁRIOS
            </span>

            <h3
              className="
                mt-7

                text-[9vw]
                font-black
                uppercase
                leading-[0.9]
                tracking-[-0.055em]

                sm:text-[7vw]

                md:text-[3.4vw]
              "
            >
              ESCOLHA
              <br />

              <span className="text-white/35">
                SEU HORÁRIO.
              </span>
            </h3>

            {/* ==================================================
                HORÁRIOS
            =================================================== */}

            <div
              className="
                hours-list

                mt-10

                border-t
                border-white/10
              "
            >
              {hours.map(
                ([day, time], index) => (
                  <div
                    key={day}
                    className="
                      hour-row

                      flex
                      min-h-[58px]

                      items-center
                      justify-between

                      border-b
                      border-white/10

                      py-4

                      md:min-h-[64px]
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-4
                      "
                    >
                      <span
                        className="
                          text-[7px]
                          tracking-[0.2em]
                          text-white/25
                        "
                      >
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <span
                        className="
                          text-[9px]
                          tracking-[0.22em]
                          text-white/65

                          md:text-[10px]
                        "
                      >
                        {day}
                      </span>
                    </div>

                    <span
                      className={`
                        text-[9px]
                        tracking-[0.16em]

                        ${
                          time ===
                          "FECHADO"
                            ? "text-white/25"
                            : "text-white/55"
                        }
                      `}
                    >
                      {time}
                    </span>
                  </div>
                )
              )}
            </div>

            {/* ==================================================
                STATUS
            =================================================== */}

            <div
              className="
                mt-8

                flex
                items-center
                gap-4

                border
                border-white/10

                p-5
              "
            >
              <div
                className="
                  relative

                  flex
                  h-3
                  w-3

                  shrink-0

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

                    bg-white/20
                  "
                />

                <div
                  className="
                    relative

                    h-[5px]
                    w-[5px]

                    rounded-full

                    bg-white/80
                  "
                />
              </div>

              <div>
                <span
                  className="
                    block

                    text-[8px]
                    tracking-[0.18em]
                    text-white/65
                  "
                >
                  AGENDAMENTO RECOMENDADO
                </span>

                <span
                  className="
                    mt-1
                    block

                    text-[7px]
                    tracking-[0.12em]
                    text-white/30
                  "
                >
                  ATENDIMENTO SUJEITO À
                  DISPONIBILIDADE
                </span>
              </div>
            </div>

            {/* ==================================================
                CONTATO
            =================================================== */}

            <div className="mt-12">
              <span
                className="
                  text-[8px]
                  tracking-[0.22em]
                  text-white/30
                "
              >
                03 / CONTATO
              </span>

              <div
                className="
                  mt-5

                  border-t
                  border-white/10
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
                    items-center
                    justify-between
                    gap-5

                    border-b
                    border-white/10

                    py-5
                  "
                >
                  <span
                    className="
                      text-[8px]
                      tracking-[0.16em]
                      text-white/30
                    "
                  >
                    WHATSAPP
                  </span>

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <span
                      className="
                        text-[9px]
                        tracking-[0.12em]
                        text-white/65

                        transition-colors

                        md:text-[10px]
                        md:group-hover:text-white
                      "
                    >
                      (11) 99999-9999
                    </span>

                    <span
                      className="
                        text-white/35

                        transition-transform
                        duration-300

                        md:group-hover:-translate-y-0.5
                        md:group-hover:translate-x-0.5
                      "
                    >
                      ↗
                    </span>
                  </div>
                </a>

                {/* TELEFONE */}

                <a
                  href="tel:+5511999999999"
                  className="
                    group

                    flex
                    items-center
                    justify-between
                    gap-5

                    border-b
                    border-white/10

                    py-5
                  "
                >
                  <span
                    className="
                      text-[8px]
                      tracking-[0.16em]
                      text-white/30
                    "
                  >
                    TELEFONE
                  </span>

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <span
                      className="
                        text-[9px]
                        tracking-[0.12em]
                        text-white/65

                        transition-colors

                        md:text-[10px]
                        md:group-hover:text-white
                      "
                    >
                      (11) 99999-9999
                    </span>

                    <span className="text-white/35">
                      ↗
                    </span>
                  </div>
                </a>

                {/* INSTAGRAM */}

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group

                    flex
                    items-center
                    justify-between
                    gap-5

                    border-b
                    border-white/10

                    py-5
                  "
                >
                  <span
                    className="
                      text-[8px]
                      tracking-[0.16em]
                      text-white/30
                    "
                  >
                    INSTAGRAM
                  </span>

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <span
                      className="
                        text-[9px]
                        tracking-[0.12em]
                        text-white/65

                        transition-colors

                        md:text-[10px]
                        md:group-hover:text-white
                      "
                    >
                      @NOVABARBER
                    </span>

                    <span className="text-white/35">
                      ↗
                    </span>
                  </div>
                </a>

                {/* E-MAIL */}

                <a
                  href={emailUrl}
                  className="
                    group

                    flex
                    items-center
                    justify-between
                    gap-5

                    border-b
                    border-white/10

                    py-5
                  "
                >
                  <span
                    className="
                      text-[8px]
                      tracking-[0.16em]
                      text-white/30
                    "
                  >
                    E-MAIL
                  </span>

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <span
                      className="
                        text-right
                        text-[9px]
                        tracking-[0.08em]
                        text-white/65

                        transition-colors

                        md:text-[10px]
                        md:group-hover:text-white
                      "
                    >
                      contato@novabarber.com.br
                    </span>

                    <span className="text-white/35">
                      ↗
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* ==================================================
                CTA WHATSAPP
            =================================================== */}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group

                mt-8

                flex
                min-h-[54px]
                w-full

                items-center
                justify-between

                bg-white

                px-5

                text-[8px]
                font-medium
                tracking-[0.2em]
                text-black

                transition-all
                duration-300

                active:scale-[0.99]

                md:hover:bg-white/90
              "
            >
              AGENDAR PELO WHATSAPP

              <span
                className="
                  text-base

                  transition-transform
                  duration-300

                  md:group-hover:-translate-y-0.5
                  md:group-hover:translate-x-1
                "
              >
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* ==================================================
            FINAL
        =================================================== */}

        <div
          className="
            mt-6

            flex
            items-center
            justify-between
            gap-5

            text-[7px]
            tracking-[0.18em]
            text-white/25

            md:mt-8
            md:text-[8px]
          "
        >
          <span>
            NØVA / SÃO PAULO
          </span>

          <span>
            08 / LOCALIZAÇÃO
          </span>
        </div>
      </div>
    </section>
  );
}