import { DayPlan } from '../types';

export const WEEKLY_PROGRESSION_TEMPLATES = {
  1: "Carga moderada, concéntrate en la técnica perfecta.",
  2: "Sube ligeramente el peso respecto a la semana pasada (+1-2kg).",
  3: "Máxima intensidad. Usa el peso más alto que domines con seguridad.",
  4: "Descarga. Baja el peso un 20%, pero sube a la máxima velocidad posible."
};

export const trainingPlan: DayPlan[] = [
  {
    id: 'lunes',
    name: 'Lunes',
    title: 'Fuerza General y Estabilidad',
    focus: 'Ganar masa muscular de base, fuerza y estabilidad en el tren inferior y superior para aguantar choques hombro a hombro.',
    blocks: [
      {
        id: 'calentamiento-lunes',
        name: 'Calentamiento Dinámico',
        durationLabel: '10 min',
        elements: [
          {
            isSuperserie: false,
            exercise: {
              id: 'lunes-cal-1',
              name: 'Movilidad articular general',
              muscle: 'Cadera, rodillas y tobillos',
              series: 1,
              reps: '3 minutos sin prisa',
              rest: 0,
              ascii: `
   ( )  <- Rotación de hombros y cadera
  /||\\  
  /  \\
 /    \\ <- Círculos con los tobillos
              `,
              instructions: 'Realizar giros suaves de tobillo hacia ambos lados, rotaciones de rodilla juntas, círculos de cadera amplios y giros de hombros para lubricar articulaciones.',
              safety: 'Ejecuta movimientos lentos y controlados, sin forzar rangos de dolor.',
              weeklyProgression: {
                1: 'Enfócate en despertar los tobillos tras todo el día de estudio/trabajo.',
                2: 'Añade rotación de torso para mayor movilidad espinal.',
                3: 'Aumenta un poco el rango articular manteniendo la estabilidad.',
                4: 'Foco en respirar y relajar las articulaciones para la sesión de descarga.'
              }
            }
          },
          {
            isSuperserie: false,
            exercise: {
              id: 'lunes-cal-2',
              name: 'Comba clásica',
              muscle: 'Pantorrillas, tobillos y cardio',
              series: 1,
              reps: '3 minutos a ritmo alegre',
              rest: 30,
              ascii: `
     ( )  <- Mirada al frente
    /||\\  
   ( /  \\ ) <- Gira la cuerda con muñecas
  *  |  |  *
    /    \\
   =========  <- Saltos cortos de metatarso
              `,
              instructions: 'Saltos de comba cortos y elásticos. Mantén las rodillas ligeramente flexionadas y salta sobre la punta de los pies (metatarsos), minimizando el tiempo de contacto.',
              safety: 'No saltes demasiado alto para no sobrecargar los gemelos. Mantén los codos pegados al cuerpo.',
              weeklyProgression: {
                1: 'Ritmo suave, recupera la coordinación si hace tiempo que no saltas.',
                2: 'Añade intervalos cortos de saltos rápidos (10s rápido / 20s suave).',
                3: 'Intenta saltar con un solo pie de forma alterna si te sientes ágil.',
                4: 'Ritmo relajado continuo, solo para subir temperatura corporal.'
              }
            }
          },
          {
            isSuperserie: false,
            exercise: {
              id: 'lunes-cal-3',
              name: 'Plancha abdominal tradicional',
              muscle: 'Abdomen profundo, transverso y lumbares',
              series: 2,
              reps: '45 segundos',
              rest: 15,
              ascii: `
    ( )    <- Cabeza alineada con la espalda
   //||\\\\====
  //=========\\___ <- Codos apoyados a 90 grados
 /           \\
              `,
              instructions: 'Apoya antebrazos y puntas de los pies. Mantén una línea perfectamente recta desde la cabeza hasta los talones. Aprieta abdomen y glúteos intensamente.',
              safety: 'No permitas que la cadera se caiga ni se eleve demasiado. Evita arquear la zona lumbar.',
              weeklyProgression: {
                1: 'Logra aguantar los 45s con técnica excelente.',
                2: 'Aprieta los puños e intenta "empujar" el suelo hacia tus pies con fuerza.',
                3: 'Alterna micro-desplazamientos adelante y atrás sobre las puntas.',
                4: 'Mantén los 45s de forma cómoda controlando la respiración.'
              }
            }
          }
        ]
      },
      {
        id: 'principal-lunes',
        name: 'Bloque Principal (Superseries)',
        durationLabel: '45 min',
        elements: [
          {
            isSuperserie: true,
            name: 'Superserie 1: Sentadilla Goblet + Press de Banca con Mancuernas',
            exercises: [
              {
                id: 'lunes-ex-1a',
                name: 'Sentadilla Goblet con mancuerna al pecho',
                muscle: 'Cuádriceps, glúteos, core',
                series: 4,
                reps: '8 repeticiones',
                rest: 45, // rest before next exercise in superset
                ascii: `
     ( )--M  <- Mancuerna vertical al pecho
    /||\\   
   |/  \\|  
   /|  |\\  <- Muslos rompen paralelo
  _/_  _\\_ <- Talones pegados al suelo
                `,
                instructions: 'Sujeta una mancuerna verticalmente pegada al pecho. Desciende controladamente tirando la cadera atrás y abajo. Rompe la línea de las rodillas (paralelo) y sube de forma explosiva.',
                safety: 'Evita a toda costa el valgo de rodilla (que las rodillas apunten hacia dentro). Empújalas hacia fuera en todo momento.',
                weeklyProgression: {
                  1: 'Carga moderada, concéntrate en la técnica perfecta.',
                  2: 'Sube ligeramente el peso respecto a la semana pasada (+1-2kg).',
                  3: 'Máxima intensidad. Usa el peso más alto que domines con seguridad.',
                  4: 'Descarga. Baja el peso un 20%, pero sube a la máxima velocidad posible.'
                }
              },
              {
                id: 'lunes-ex-1b',
                name: 'Press de banca con mancuernas',
                muscle: 'Pectoral mayor, tríceps, deltoides anterior',
                series: 4,
                reps: '8 repeticiones',
                rest: 90, // longer rest after finishing the superset loop
                ascii: `
     [M]   [M]   <- Mancuernas arriba en paralelo
      |     |
    \\=( )====( )=/ <- Codos a 45 grados (no a 90)
      |======|   <- Banco plano
     /        \\
   ===        === <- Pies estables en el suelo
                `,
                instructions: 'Túmbate en un banco plano. Empuja las mancuernas desde la altura de los pectorales hasta extender los brazos. Baja lentamente controlando el peso.',
                safety: 'Mantén las escápulas retraídas (hombros pegados al banco) y los codos a 45° respecto al cuerpo para proteger los hombros.',
                weeklyProgression: {
                  1: 'Carga moderada, concéntrate en la técnica perfecta.',
                  2: 'Sube ligeramente el peso respecto a la semana pasada (+1-2kg).',
                  3: 'Máxima intensidad. Usa el peso más alto que domines con seguridad.',
                  4: 'Descarga. Baja el peso un 20%, pero sube a la máxima velocidad posible.'
                }
              }
            ]
          },
          {
            isSuperserie: true,
            name: 'Superserie 2: Zancadas Atrás + Remo con Mancuerna',
            exercises: [
              {
                id: 'lunes-ex-2a',
                name: 'Zancadas hacia atrás con mancuernas',
                muscle: 'Cuádriceps, glúteos, isquiotibiales',
                series: 3,
                reps: '10 reps por pierna',
                rest: 45,
                ascii: `
     ( )
    /||\\   <- Espalda recta y erguida
   / |/ \\  
  M  /   \\  <- Mancuernas cuelgan a los lados
    /     \\__ <- Rodilla trasera roza el suelo
   _\\_
                `,
                instructions: 'De pie, con una mancuerna en cada mano, da un paso largo hacia atrás. Baja la cadera verticalmente hasta que la rodilla trasera casi toque el suelo. Empuja con la pierna delantera para volver al inicio.',
                safety: 'Mantén el torso erguido. Que la rodilla delantera no supere excesivamente la punta del pie ni se meta hacia dentro.',
                weeklyProgression: {
                  1: 'Carga moderada, concéntrate en la técnica perfecta.',
                  2: 'Sube ligeramente el peso respecto a la semana pasada (+1-2kg).',
                  3: 'Máxima intensidad. Usa el peso más alto que domines con seguridad.',
                  4: 'Descarga. Baja el peso un 20%, pero sube a la máxima velocidad posible.'
                }
              },
              {
                id: 'lunes-ex-2b',
                name: 'Remo con mancuerna a una mano',
                muscle: 'Dorsal ancho, redondo mayor, bíceps',
                series: 3,
                reps: '10 reps por brazo',
                rest: 90,
                ascii: `
     ( )  <- Mirada neutra hacia abajo
    /||\\________   <- Espalda recta y paralela al banco
   / |  \\   |   |  <- Mano y rodilla apoyados
  M  |   \\__|___|  <- Mancuerna sube hacia la cadera
     /   /  /   /
                `,
                instructions: 'Apoya una rodilla y la mano del mismo lado en el banco. Con la espalda paralela al suelo, sujeta la mancuerna con el brazo libre. Tira de ella llevando el codo hacia la cadera.',
                safety: 'No curvees la columna ni rotes el torso para subir la mancuerna. El movimiento debe nacer del codo.',
                weeklyProgression: {
                  1: 'Carga moderada, concéntrate en la técnica perfecta.',
                  2: 'Sube ligeramente el peso respecto a la semana pasada (+1-2kg).',
                  3: 'Máxima intensidad. Usa el peso más alto que domines con seguridad.',
                  4: 'Descarga. Baja el peso un 20%, pero sube a la máxima velocidad posible.'
                }
              }
            ]
          }
        ]
      },
      {
        id: 'vuelta-lunes',
        name: 'Core Final y Vuelta a la Calma',
        durationLabel: '15 min',
        elements: [
          {
            isSuperserie: false,
            exercise: {
              id: 'lunes-core-1',
              name: 'Paseo del granjero (Farmer\'s Walk)',
              muscle: 'Agarre (antebrazos), core, trapecio, estabilidad general',
              series: 3,
              reps: '45 segundos caminando',
              rest: 45,
              ascii: `
    ( )
   /||\\   <- Tronco erguido, hombros encajados
  M |  M  <- Mancuernas pesadas a los lados
   /  \\
  |    |  <- Caminar con pasos cortos y firmes
              `,
              instructions: 'Sujeta dos mancuernas pesadas a los lados del cuerpo. Mantén el pecho arriba y los hombros atrás. Camina lentamente con paso firme apretando fuertemente el abdomen.',
              safety: 'Evita balancear las mancuernas de lado a lado. Mantén la postura perfecta aunque sientas fatiga en el agarre.',
              weeklyProgression: {
                1: 'Usa mancuernas que te desafíen a partir de los 30 segundos.',
                2: 'Intenta aumentar el peso de las mancuernas ligeramente.',
                3: 'Máximo peso disponible, concéntrate en no perder la verticalidad.',
                4: 'Baja el peso un 30%, camina erguido y a paso muy estable.'
              }
            }
          },
          {
            isSuperserie: false,
            exercise: {
              id: 'lunes-core-2',
              name: 'Plancha lateral',
              muscle: 'Oblicuos, cuadrado lumbar, glúteo medio',
              series: 3,
              reps: '30 segundos por lado',
              rest: 60,
              ascii: `
      ( )
     /||\\===== <- Cabeza, torso y piernas alineados
    /=========\\_ <- Codo apoyado justo bajo el hombro
   _/_
              `,
              instructions: 'Apóyate sobre el codo y el lateral de los pies. Eleva la cadera para formar una diagonal perfecta. El brazo libre puede ir a la cadera o apuntar al techo.',
              safety: 'No permitas que la cadera se caiga hacia el suelo ni que el hombro de apoyo se hunda. Empuja activamente el suelo.',
              weeklyProgression: {
                1: 'Completar los 30 segundos de forma controlada.',
                2: 'Eleva el brazo superior al cielo para aumentar el desafío de equilibrio.',
                3: 'Intenta realizar elevaciones de la pierna superior (estrella) si es posible.',
                4: 'Mantén la posición estática concentrado en activar el abdomen de forma limpia.'
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'miercoles',
    name: 'Miércoles',
    title: 'Potencia y Pliometría',
    focus: 'Desarrollar la potencia de despegue y la elasticidad del tendón ( stiffness ) para aumentar la aceleración y agilidad en el campo.',
    blocks: [
      {
        id: 'calentamiento-miercoles',
        name: 'Calentamiento Dinámico',
        durationLabel: '10 min',
        elements: [
          {
            isSuperserie: false,
            exercise: {
              id: 'miercoles-cal-1',
              name: 'Movilidad de cadera y tobillos',
              muscle: 'Cadera (flexores, rotadores) y flexión dorsal de tobillo',
              series: 1,
              reps: '3 minutos',
              rest: 0,
              ascii: `
     ( )  <- Tronco hacia delante
    /||\\  
   // | \\
  //  |__\\_ <- Rodilla avanza sobre la punta del pie
              `,
              instructions: 'Realizar zancadas profundas manteniendo el talón delantero en el suelo para ganar flexión de tobillo. Realizar rotaciones en posición de caballero.',
              safety: 'No dejes que el talón delantero se despegue. El estiramiento debe ser activo, no pasivo.',
              weeklyProgression: {
                1: 'Explora rangos de movimiento con calma.',
                2: 'Insiste en los tobillos si los sientes rígidos.',
                3: 'Añade rotación torácica profunda al estirar la cadera.',
                4: 'Foco en respiración relajada y lubricación articular.'
              }
            }
          },
          {
            isSuperserie: false,
            exercise: {
              id: 'miercoles-cal-2',
              name: 'Comba reactiva (Rebote rápido)',
              muscle: 'Tendón de Aquiles, fascia plantar, gemelos',
              series: 1,
              reps: '3 minutos',
              rest: 30,
              ascii: `
      ( )
     /||\\  <- Saltos súper rápidos y bajitos
    * |  | *
     /    \\
    =========== <- Mínimo contacto con el suelo
              `,
              instructions: 'Salta a la comba reduciendo al máximo la flexión de rodilla. El salto se produce mediante la flexión y rebote reactivo del tobillo ( stiffness ).',
              safety: 'Evita caer sobre el talón. Todo el impacto debe ser absorbido por el metatarso y el tendón.',
              weeklyProgression: {
                1: 'Busca un sonido seco y rápido de los pies sobre el suelo.',
                2: 'Intenta realizar pequeños saltos alternando pies muy rápido.',
                3: 'Busca la máxima velocidad de rebote de forma intermitente.',
                4: 'Salto suave pero manteniendo la reactividad del tobillo.'
              }
            }
          },
          {
            isSuperserie: false,
            exercise: {
              id: 'miercoles-cal-3',
              name: 'Pasos laterales con goma elástica',
              muscle: 'Glúteo medio, estabilizadores de cadera',
              series: 2,
              reps: '15 pasos por lado',
              rest: 45,
              ascii: `
     ( )  <- Posición de semi-sentadilla
    /||\\  
    /  \\   <- Piernas separadas en tensión
   |-GG-|  <- Goma elástica rodeando tobillos
  _/_  _\\_
              `,
              instructions: 'Coloca una goma elástica alrededor de los tobillos. En posición de media sentadilla, da pasos laterales controlados manteniendo la tensión constante en la goma.',
              safety: 'Asegúrate de que tus rodillas no colapsen hacia dentro durante los pasos. Mantén el torso erguido.',
              weeklyProgression: {
                1: 'Usa una goma de resistencia media para despertar el glúteo.',
                2: 'Intenta dar pasos más amplios sin perder la postura.',
                3: 'Sube la resistencia de la goma si el estímulo es muy bajo.',
                4: 'Goma ligera, concéntrate en mantener el paralelo de las rodillas.'
              }
            }
          }
        ]
      },
      {
        id: 'principal-miercoles',
        name: 'Bloque Principal (Potencia)',
        durationLabel: '45 min',
        elements: [
          {
            isSuperserie: false,
            exercise: {
              id: 'miercoles-ex-1',
              name: 'Salto al cajón (Box Jumps)',
              muscle: 'Extensores de cadera, cuádriceps, potencia pliométrica',
              series: 4,
              reps: '6 saltos',
              rest: 90,
              ascii: `
      ( )  -> Salto parabólico explosivo
     /||\\ 
   _/_||_\\_
  |  [Caja]| <- Recepción suave flexionando cadera
  |________| 
              `,
              instructions: 'Párate frente a la caja. Realiza un balanceo rápido de brazos con flexión de cadera y salta explosivamente, amortiguando la caída en la caja con una flexión de rodillas suave (caída silenciosa como un gato). Baja dando un paso atrás.',
              safety: 'NUNCA saltes hacia atrás para bajar del cajón; esto expone al tendón de Aquiles a lesiones graves. Baja siempre caminando.',
              weeklyProgression: {
                1: 'Caja de altura moderada, concéntrate en aterrizar con las rodillas alineadas.',
                2: 'Usa la altura superior si dominas la caída silenciosa.',
                3: 'Mantén la máxima altura. Busca la máxima velocidad de despegue.',
                4: 'Altura moderada. Enfócate en el despegue inmediato y la técnica de caída.'
              }
            }
          },
          {
            isSuperserie: false,
            exercise: {
              id: 'miercoles-ex-2',
              name: 'Drop Jump (Salto de caída reactiva)',
              muscle: 'Reactividad elástica muscular, tendón de Aquiles',
              series: 4,
              reps: '5 repeticiones',
              rest: 120,
              ascii: `
  [Caja]  
    |      -> Déjate caer (no saltes)
   ( )  
   /||\\   -> ¡Rebote explosivo al tocar el suelo!
   /  \\
  ========= <- Mínimo tiempo de contacto en suelo
              `,
              instructions: 'Déjate caer desde un cajón (de unos 30-40cm). Al tocar el suelo, rebota de forma inmediata e instintiva hacia el cielo, buscando la máxima altura con el mínimo contacto posible.',
              safety: 'No permitas que tus rodillas colapsen ni que los talones absorban todo el peso contra el suelo. Mantén los tobillos rígidos.',
              weeklyProgression: {
                1: 'Caída desde altura baja (30cm). Foco en la inmediatez del rebote.',
                2: 'Aumenta un poco la altura si logras un contacto seco.',
                3: 'Foco en la reactividad. Imagina que el suelo es lava ardiendo.',
                4: 'Caída desde altura baja. Mantén el rebote reactivo de forma fluida.'
              }
            }
          },
          {
            isSuperserie: false,
            exercise: {
              id: 'miercoles-ex-3',
              name: 'Saltos laterales sobre goma/línea',
              muscle: 'Estabilizadores de tobillo, agilidad, potencia lateral',
              series: 3,
              reps: '20 segundos a tope',
              rest: 60,
              ascii: `
      ( )   <- Salto rápido de lado a lado
     /||\\
     /  \\
   =============== <- Línea o goma en el suelo
  <--->  <---> <- Velocidad máxima de oscilación
              `,
              instructions: 'Con los pies juntos, salta lateralmente de un lado al otro de la línea a la máxima velocidad posible durante el tiempo indicado. Mantén los tobillos elásticos.',
              safety: 'Mantén el core compacto para no perder el equilibrio. No busques saltar alto, sino muy rápido.',
              weeklyProgression: {
                1: 'Busca un ritmo regular continuo durante los 20 segundos.',
                2: 'Intenta aumentar la velocidad de cambio de dirección.',
                3: 'Foco en batir tu récord personal de saltos en 20s.',
                4: 'Saltos suaves, priorizando la estabilidad lateral del tobillo.'
              }
            }
          },
          {
            isSuperserie: false,
            exercise: {
              id: 'miercoles-ex-4',
              name: 'Press militar con mancuernas de pie',
              muscle: 'Hombros, tríceps, estabilidad de core',
              series: 3,
              reps: '8 repeticiones',
              rest: 75,
              ascii: `
     [M]  [M]
      |    |   <- Brazos completamente extendidos arriba
     \\(--)/  
      /||\   <- Core e isquios en tensión para evitar balanceo
      /  \
              `,
              instructions: 'De pie, sujeta las mancuernas a la altura de los hombros. Empújalas verticalmente hacia arriba hasta que tus brazos queden completamente extendidos sobre tu cabeza sin arquear la espalda.',
              safety: 'Aprieta glúteos y abdomen durante el empuje para evitar sobrecargar la zona lumbar. No impulses con las rodillas.',
              weeklyProgression: {
                1: 'Carga moderada, concéntrate en la técnica perfecta.',
                2: 'Sube ligeramente el peso respecto a la semana pasada (+1-2kg).',
                3: 'Máxima intensidad. Usa el peso más alto que domines con seguridad.',
                4: 'Descarga. Baja el peso un 20%, pero sube a la máxima velocidad posible.'
              }
            }
          }
        ]
      },
      {
        id: 'vuelta-miercoles',
        name: 'Vuelta a la Calma',
        durationLabel: '5 min',
        elements: [
          {
            isSuperserie: false,
            exercise: {
              id: 'miercoles-calma-1',
              name: 'Estiramientos suaves de tren inferior',
              muscle: 'Cuádriceps, gemelos e isquiotibiales',
              series: 1,
              reps: '5 minutos de relajación',
              rest: 0,
              ascii: `
     ( )  <- Estiramiento estático sin rebotes
    /||/\\
   / |  \\
  /  |   \\  <- Estirar el cuádriceps hacia atrás
              `,
              instructions: 'Estira suavemente los cuádriceps de pie tirando del empeine hacia el glúteo. Estira gemelos empujando la pared y flexores de cadera con una zancada profunda estática.',
              safety: 'No realices estiramientos dolorosos. Debes sentir tensión placentera, nunca pinchazos.',
              weeklyProgression: {
                1: 'Foco en relajar el tendón de Aquiles después de la pliometría.',
                2: 'Sostén cada postura 30s de forma estática profunda.',
                3: 'Relaja la musculatura liberando tensión acumulada.',
                4: 'Sesión suave para incentivar la regeneración tisular.'
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'viernes',
    name: 'Viernes',
    title: 'Extremo Explosivo y Prevención',
    focus: 'Potenciar la aceleración en las arrancadas de sprint y blindar los isquiotibiales y rodillas contra lesiones de velocidad.',
    blocks: [
      {
        id: 'calentamiento-viernes',
        name: 'Calentamiento Dinámico',
        durationLabel: '10 min',
        elements: [
          {
            isSuperserie: false,
            exercise: {
              id: 'viernes-cal-1',
              name: 'Carrera suave o Jumping Jacks',
              muscle: 'Cardiovascular general y calentamiento global',
              series: 1,
              reps: '4 minutos',
              rest: 0,
              ascii: `
     ( )  <- Movimiento alegre de brazos y piernas
    /||\\ 
    /  \\
   /    \\
              `,
              instructions: 'Realiza carrera continua suave o alterna con Jumping Jacks coordinados para elevar la temperatura interna del cuerpo.',
              safety: 'No busques fatiga, solo calentar la musculatura profunda.',
              weeklyProgression: {
                1: 'Comienza despacio, subiendo el ritmo en el último minuto.',
                2: 'Añade skipping bajo intermitente.',
                3: 'Eleva rodillas en tramos cortos para mayor activación.',
                4: 'Trote muy ligero y respiración controlada.'
              }
            }
          },
          {
            isSuperserie: false,
            exercise: {
              id: 'viernes-cal-2',
              name: 'Puente de glúteo en esterilla',
              muscle: 'Glúteos, isquiotibiales y core posterior',
              series: 2,
              reps: '12 repeticiones',
              rest: 30,
              ascii: `
       ( ) <- Cabeza apoyada en la esterilla
     //||\\\\
    //=======\\ <- Cadera elevada apretando glúteos
   /         \\ <- Pies plantados en el suelo
              `,
              instructions: 'Tumbado boca arriba en la esterilla, flexiona rodillas apoyando talones. Eleva la cadera activando con fuerza los glúteos hasta alinear rodillas, cadera y hombros.',
              safety: 'Evita hiper-extender la zona lumbar al subir. Sube contrayendo los glúteos, no arqueando la espalda.',
              weeklyProgression: {
                1: 'Mantén la contracción 2 segundos arriba en cada repetición.',
                2: 'Intenta realizarlo a una sola pierna (6 reps por lado).',
                3: 'A una sola pierna (8 reps por lado) con contracción intensa.',
                4: 'Dos piernas, movimiento fluido y consciente.'
              }
            }
          },
          {
            isSuperserie: false,
            exercise: {
              id: 'viernes-cal-3',
              name: 'Plancha alta tocando hombro contrario',
              muscle: 'Core anti-rotación, estabilidad escapular y hombros',
              series: 1,
              reps: '3 minutos (alternando)',
              rest: 30,
              ascii: `
     ( )   <- Toca hombro izquierdo con mano derecha
    /||\\=========   <- Posición de flexión alta
   /=============\\
  /               \\
              `,
              instructions: 'En posición de flexión con las manos bajo los hombros. Toca de forma alterna tu hombro izquierdo con la mano derecha y viceversa, controlando la rotación de la cadera.',
              safety: 'Mantén la cadera perfectamente inmóvil. Imagina que tienes un vaso de agua en la espalda y no debe derramarse.',
              weeklyProgression: {
                1: 'Tocas lentos, controlando el balanceo corporal.',
                2: 'Sostén un segundo el toque de hombro antes de bajar la mano.',
                3: 'Realiza el toque lo más despacio posible.',
                4: 'Foco en la estabilidad abdominal sin prisa.'
              }
            }
          }
        ]
      },
      {
        id: 'principal-viernes',
        name: 'Bloque Principal (Explosivo & Prevención)',
        durationLabel: '45 min',
        elements: [
          {
            isSuperserie: false,
            exercise: {
              id: 'viernes-ex-1',
              name: 'Peso Muerto Rumano con mancuernas',
              muscle: 'Cadena posterior (isquiotibiales, glúteos), erectores espinales',
              series: 4,
              reps: '10 repeticiones',
              rest: 90,
              ascii: `
     ( )  <- Hombros atrás, pecho abierto
    /|| \\   <- Bisagra de cadera hacia atrás
   M |   \\   <- Mancuernas bajan pegadas al muslo
    /     \\_  <- Rodillas semi-flexionadas (no rígidas)
  _/_     _\\_ <- Espalda completamente recta
              `,
              instructions: 'De pie con mancuernas. Empuja la cadera hacia atrás mientras inclinas el torso, rozando tus muslos con las mancuernas hasta notar tensión en los isquiotibiales. Vuelve arriba contrayendo glúteos.',
              safety: 'NUNCA dejes que la espalda se curve. La columna debe permanecer neutral para evitar lesiones lumbares. Es un seguro de vida contra roturas al correr.',
              weeklyProgression: {
                1: 'Carga moderada, concéntrate en la técnica perfecta.',
                2: 'Sube ligeramente el peso respecto a la semana pasada (+1-2kg).',
                3: 'Máxima intensidad. Usa el peso más alto que domines con seguridad.',
                4: 'Descarga. Baja el peso un 20%, pero sube a la máxima velocidad posible.'
              }
            }
          },
          {
            isSuperserie: false,
            exercise: {
              id: 'viernes-ex-2',
              name: 'Sentadilla Búlgara con mancuernas',
              muscle: 'Cuádriceps, glúteos, estabilizadores de rodilla',
              series: 3,
              reps: '8 reps por pierna',
              rest: 90, // 45s between legs, 90s between sets
              ascii: `
     ( )  <- Torso erguido o ligerísimamente inclinado adelante
    /||\\  
   / |/ \\   [Caja] <- Pie trasero apoyado en el cajón
  M  |   \\___|___
    /
  _/_  <- Rodilla delantera alineada (no valgo)
              `,
              instructions: 'Coloca un pie atrás apoyado sobre un banco o cajón. Con mancuernas a los lados, desciende flexionando la rodilla delantera de forma que tu cadera baje recta. Empuja con fuerza para subir.',
              safety: 'La rodilla delantera debe estar perfectamente alineada con el segundo dedo del pie; no dejes que colapse hacia dentro.',
              weeklyProgression: {
                1: 'Carga moderada, concéntrate en la técnica perfecta.',
                2: 'Sube ligeramente el peso respecto a la semana pasada (+1-2kg).',
                3: 'Máxima intensidad. Usa el peso más alto que domines con seguridad.',
                4: 'Descarga. Baja el peso un 20%, pero sube a la máxima velocidad posible.'
              }
            }
          },
          {
            isSuperserie: true,
            name: 'Superserie 3: Elevación Lateral + Press Pallof',
            exercises: [
              {
                id: 'viernes-ex-3a',
                name: 'Elevaciones laterales con mancuernas',
                muscle: 'Deltoides lateral (hombros para soporte al chocar)',
                series: 3,
                reps: '12 repeticiones',
                rest: 45,
                ascii: `
     [M] --- ( ) --- [M]  <- Elevación hasta la horizontal
             /||\\   <- Codos con microflexión para evitar tensión
             /  \\
            _/_ _\\_
                `,
                instructions: 'De pie con mancuernas a los lados. Eleva los brazos hacia los costados de forma semicircular hasta que queden paralelos al suelo. Baja de manera controlada.',
                safety: 'No eleves los brazos por encima de la línea de los hombros y evita dar tirones con el torso.',
                weeklyProgression: {
                  1: 'Carga moderada, concéntrate en la técnica perfecta.',
                  2: 'Sube ligeramente el peso respecto a la semana pasada (+1-2kg).',
                  3: 'Máxima intensidad. Usa el peso más alto que domines con seguridad.',
                  4: 'Descarga. Baja el peso un 20%, pero sube a la máxima velocidad posible.'
                }
              },
              {
                id: 'viernes-ex-3b',
                name: 'Press Pallof con goma elástica',
                muscle: 'Core (oblicuos, transverso), fuerza anti-rotación',
                series: 3,
                reps: '10 reps por lado',
                rest: 60,
                ascii: `
    Anclaje ====[O]--( )  <- Brazos estirados al frente aguantando tensión
                     /||\\  <- Alineamiento perfecto del torso
                     /  \\
                    _/_ _\\_
                `,
                instructions: 'De pie, de lado a un punto de anclaje de la goma elástica. Sujeta la goma con ambas manos contra el pecho. Empuja los brazos adelante de forma recta y resiste la tracción lateral de la goma.',
                safety: 'El cuerpo no debe moverse ni rotarse en absoluto. Mantén las caderas y hombros cuadrados.',
                weeklyProgression: {
                  1: 'Goma de tensión moderada, concéntrate en la técnica perfecta.',
                  2: 'Aléjate unos centímetros para aumentar la tensión de la goma.',
                  3: 'Mantén la máxima tensión. Usa una goma de mayor densidad.',
                  4: 'Descarga. Tensión ligera, realiza el movimiento a velocidad explosiva.'
                }
              }
            ]
          },
          {
            isSuperserie: false,
            exercise: {
              id: 'viernes-ex-4',
              name: 'Nordi-goma / Isquios excéntricos',
              muscle: 'Fuerza excéntrica de isquiotibiales (prevención de roturas)',
              series: 3,
              reps: '8 repeticiones',
              rest: 60,
              ascii: `
       ( )  <- Boca arriba, rodillas flexionadas, talones apoyados
     //||\\\\
    //=======\\ <- Elevar cadera levemente
   /         \\
  <----------> <- Estirar las piernas de forma lenta y excéntrica
              `,
              instructions: 'Tumbado boca arriba en la esterilla, talones apoyados en el rodillo o suelo deslizante. Eleva la cadera y lentamente desliza/frena la extensión de tus piernas tardando al menos 4 segundos en completarla.',
              safety: 'La fase de extensión debe ser controlada al máximo. Si notas amago de calambre, reduce el rango de movimiento inmediatamente.',
              weeklyProgression: {
                1: 'Extensión excéntrica lenta de 4 segundos.',
                2: 'Intenta frenar la bajada excéntrica durante 5 segundos enteros.',
                3: 'Intenta realizar la fase excéntrica con un pequeño lastre sobre la cadera.',
                4: 'Extensión controlada de 3 segundos, suave y regenerativa.'
              }
            }
          }
        ]
      },
      {
        id: 'vuelta-viernes',
        name: 'Vuelta a la Calma',
        durationLabel: '5 min',
        elements: [
          {
            isSuperserie: false,
            exercise: {
              id: 'viernes-calma-1',
              name: 'Estiramientos estáticos profundos',
              muscle: 'Isquiotibiales, glúteos y lumbares',
              series: 1,
              reps: '5 minutos',
              rest: 0,
              ascii: `
     ( )   <- Plegarse hacia delante sentado
   //||\\\\_
  //======\\__ <- Estirar la parte posterior de los muslos
              `,
              instructions: 'Sentado en la esterilla, estira una pierna al frente y flexiona la otra. Inclínate suavemente hacia el pie estirado sintiendo el estiramiento en el isquiotibial.',
              safety: 'Mantén la respiración lenta y profunda. El músculo debe relajarse progresivamente, no tensarse ante dolor agudo.',
              weeklyProgression: {
                1: 'Relajación muscular general.',
                2: 'Sostén cada pierna durante 45 segundos respirando.',
                3: 'Añade estiramientos de espalda baja (postura del niño).',
                4: 'Estiramientos muy suaves de descarga regenerativa.'
              }
            }
          }
        ]
      }
    ]
  }
];
