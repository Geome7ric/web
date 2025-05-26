import { create } from "zustand";
import { BlogProps } from "@/components/Blog";

interface BlogStore {
  blogs: BlogProps[];
  // eslint-disable-next-line no-unused-vars
  getBlogBySlug: (slug: string) => BlogProps | undefined;
}

export const useBlogStore = create<BlogStore>((set, get) => ({
  blogs: [
    {
      title:
        "Cómo automatizar tareas repetitivas para mejorar la productividad en tu negocio",
      previewTitle: "Automatización de tareas repetitivas",
      slug: "automatizar-tareas-productividad",
      seoTitle: "Automatización de tareas repetitivas | Geome7ric",
      seoDescription:
        "Descubrí cómo automatizar tareas repetitivas para liberar tiempo, reducir errores y mejorar la eficiencia de tu negocio.",
      socialDescription:
        "Liberá horas de trabajo diario con automatización inteligente: menos errores, más foco estratégico y crecimiento real.",
      heroImage: {
        src: "/assets/blogs/automatizar-tareas-productividad/hero.png",
        alt: "Ilustración digital de procesos empresariales automatizados fluyendo desde un dashboard con íconos tecnológicos",
        caption: "Dashboard que muestra tareas completándose automáticamente",
      },
      heroVideo:
        "/assets/blogs/automatizar-tareas-productividad/hero_video.mp4",
      intermediateImage: {
        src: "/assets/blogs/automatizar-tareas-productividad/section.png",
        alt: "Antes y después de la automatización: persona abrumada con papeles vs persona concentrada en un sistema automatizado",
        caption: "De la sobrecarga manual a la eficiencia automatizada",
      },
      publishedAt: "2025-05-21",
      readingTimeMinutes: 6,
      tags: [
        "automatización",
        "productividad",
        "tareas repetitivas",
        "eficiencia",
      ],
      sections: [
        {
          type: "intro",
          content:
            "¿Te has preguntado cuántas horas se escapan semanalmente en tareas repetitivas? En lugar de dedicar recursos valiosos a procesos manuales, existe la posibilidad de liberar ese tiempo y redirigirlo a iniciativas estratégicas. En este artículo descubrirás cómo la automatización transforma rutinas monótonas en flujos inteligentemente orquestados, mejorando la productividad sin sumar más personal.",
        },
        {
          type: "highlight",
          content:
            "La repetición sin fin es un freno al crecimiento; la automatización, un acelerador de resultados.",
        },
        {
          type: "problem",
          title: "El problema de las tareas manuales",
          content:
            "Cada día, empleados ingresan datos, envían recordatorios manuales y revisan información dispersa entre múltiples sistemas. Estas tareas no solo consumen tiempo: multiplican el riesgo de fallos humanos, provocan demoras en la toma de decisiones y generan frustración en tu equipo. Al no tener procesos centralizados, los errores se propagan y la eficiencia se ve comprometida.",
        },
        {
          type: "solution",
          title: "Cómo lo resolvemos en Geome7ric",
          content:
            "En Geome7ric diseñamos soluciones a medida que integran tus sistemas y automatizan los pasos clave: desde la generación automática de reportes hasta las notificaciones en tiempo real. Implementamos dashboards intuitivos, triggers configurables y alertas proactivas que liberan a tu equipo de tareas rutinarias, permitiendo enfocarse en lo que realmente impulsa tu negocio.",
        },
        {
          type: "benefits",
          title: "Beneficios de la automatización",
          items: [
            "Ahorro de tiempo real: libera a tu equipo de tareas repetitivas.",
            "Precisión garantizada: minimiza errores humanos con reglas automatizadas.",
            "Enfoque estratégico: dedica recursos a actividades de alto valor.",
            "Escalabilidad sencilla: crece sin aumentar la carga operativa.",
          ],
        },
        {
          type: "testimonial",
          quote:
            "La automatización de reportes con Geome7ric nos ahorró más de 30 horas al mes.",
          author: "Ana Gómez, Gerente de Finanzas",
        },
        {
          type: "cta",
          title: "Listo para llevar tu equipo al siguiente nivel?",
          buttonText: "Solicitá tu demo gratuita",
          buttonLink: "/contacto",
        },
        {
          type: "conclusion",
          content:
            "Automatizar no es simplemente digitalizar: es diseñar procesos inteligentes que escalan a tu ritmo y potencian a tu equipo. Con Geome7ric, transformás la forma de trabajar de tu empresa, liberás tiempo y asegurás resultados consistentes día tras día.",
        },
      ],
      related: [
        {
          slug: "beneficios-digitalizacion-software-medida",
          title:
            "Los beneficios de la digitalización: ¿Por qué tu empresa necesita un software a medida?",
          reason:
            "Para entender cómo una solución personalizada puede potenciar aún más tu operación automatizada.",
        },
        {
          slug: "optimizar-flujo-reducir-errores",
          title: "Cómo optimizar el flujo de trabajo y reducir errores",
          reason:
            "Porque antes de optimizar tu flujo conviene automatizar las tareas que lo componen.",
        },
      ],
    },
    {
      title:
        "Los beneficios de la digitalización: ¿Por qué tu empresa necesita un software a medida?",
      previewTitle: "Beneficios del software a medida",
      slug: "beneficios-digitalizacion-software-medida",
      seoTitle: "Beneficios del software a medida | Geome7ric",
      seoDescription:
        "Descubrí cómo un software personalizado puede mejorar la eficiencia, el control y la escalabilidad de tu empresa.",
      socialDescription:
        "Deja atrás herramientas genéricas: un software a medida te da control, visibilidad y velocidad para escalar sin límites.",
      heroImage: {
        src: "/assets/blogs/beneficios-digitalizacion-software-medida/hero.png",
        alt: "Concepto de trabajo digital personalizado: equipo usando un sistema unificado en lugar de múltiples herramientas desordenadas",
        caption:
          "De sistemas dispersos a una plataforma centralizada diseñada para tu negocio",
      },
      heroVideo: null,
      intermediateImage: {
        src: "/assets/blogs/beneficios-digitalizacion-software-medida/section.png",
        alt: "Comparación visual: caos con herramientas genéricas vs orden y eficiencia con software a medida",
        caption:
          "El cambio de plataformas desarticuladas a un flujo integrado y escalable",
      },
      publishedAt: "2025-05-21",
      readingTimeMinutes: 7,
      tags: [
        "software a medida",
        "digitalización",
        "tecnología personalizada",
        "crecimiento empresarial",
      ],
      sections: [
        {
          type: "intro",
          content:
            "En un mercado cada vez más competitivo, seguir operando con herramientas genéricas puede resultar un freno al crecimiento. Formularios independientes, planillas desconectadas y soluciones estándar terminan imponiendo procesos ajenos a tu forma de trabajar. En este artículo descubrirás por qué un software diseñado específicamente para tus flujos, tu equipo y tus metas genera un impacto inmediato en la eficiencia, la colaboración y tu capacidad para escalar de manera sostenible.",
        },
        {
          type: "highlight",
          content:
            "Un sistema pensado para tu negocio no sólo se adapta: potencia cada resultado.",
        },
        {
          type: "problem",
          title: "El límite de las soluciones genéricas",
          content:
            "Las plataformas universales suelen requerir concesiones: flujos rígidos, campos inútiles y adaptaciones forzadas que terminan en parches manuales. Cada nuevo módulo sumado complica la curva de aprendizaje y multiplica los puntos de falla. Al mismo tiempo, tus datos quedan fragmentados, perdiendo trazabilidad y ralentizando la toma de decisiones. Este desorden genera cuellos de botella operativos, costosos retrasos y una experiencia de usuario interna que desmotiva al equipo.",
        },
        {
          type: "solution",
          title: "Cómo lo resolvemos en Geome7ric",
          content:
            "En Geome7ric empezamos con un diagnóstico de tus procesos clave y las casuísticas de tu empresa. A partir de allí, definimos una arquitectura modular, intuitiva y escalable, donde cada componente encaja con tus necesidades reales. Integramos tus fuentes de datos, automatizamos validaciones y desplegamos dashboards personalizados. Todo en un ciclo iterativo donde recibís demos frecuentes, aportás feedback y garantizas que la solución final refleje tu operación sin salirse del presupuesto ni de los plazos acordados.",
        },
        {
          type: "benefits",
          title: "Beneficios de un software a medida",
          items: [
            "Alineación total con tus procesos: nada de funcionalidad sobrante ni faltante.",
            "Escalabilidad bajo demanda: sumá usuarios y módulos sin reprocesos.",
            "Visibilidad en tiempo real: datos centralizados para decisiones más rápidas.",
            "Mayor adopción interna: interfaces y flujos diseñados para tu equipo.",
            "Reducción de costos ocultos: adiós a integraciones y manuales extra.",
            "Rapidez de implementación: enfoque ágil que minimiza interrupciones.",
          ],
        },
        {
          type: "testimonial",
          quote:
            "Desde que migramos a la plataforma diseñada por Geome7ric, reducimos un 40 % los tiempos de cierre mensual y todos los equipos trabajan con la misma información.",
          author:
            "Javier Amusquibar, Director de Operaciones en Distribuidora Amusquibar",
        },
        {
          type: "cta",
          title: "¿Listo para dar el salto digital con tu propio software?",
          buttonText: "Hablá con un especialista",
          buttonLink: "/contacto",
        },
        {
          type: "conclusion",
          content:
            "Optar por un desarrollo a medida es una inversión estratégica: no solo mejoras la eficiencia actual, sino que preparás tu empresa para adaptarse a nuevos desafíos con agilidad. En Geome7ric acompañamos cada etapa, desde la definición de requisitos hasta el soporte post-lanzamiento, para que tu software evolucione contigo y siga impulsando tu crecimiento.",
        },
      ],
      related: [
        {
          slug: "automatizar-tareas-productividad",
          title:
            "Cómo automatizar tareas repetitivas para mejorar la productividad",
          reason:
            "Fundamental para liberar recursos antes de digitalizar procesos a gran escala.",
        },
        {
          slug: "optimizar-flujo-reducir-errores",
          title: "Cómo optimizar el flujo de trabajo y reducir errores",
          reason:
            "Con un sistema a medida podrás guiar cada paso de tu flujo con total precisión.",
        },
      ],
    },
    {
      title:
        "Cómo optimizar el flujo de trabajo y reducir los errores humanos con tecnología",
      previewTitle: "Optimiza tus flujos de trabajo",
      slug: "optimizar-flujo-reducir-errores",
      seoTitle: "Optimización de procesos y reducción de errores | Geome7ric",
      seoDescription:
        "Descubrí cómo diseñar flujos de trabajo digitales que disminuyen los errores humanos y aumentan la eficiencia operativa de tu empresa.",
      socialDescription:
        "Transformá tus procesos: minimizá errores humanos y ganá eficiencia diseñando flujos de trabajo digitales claros y conectados.",
      heroImage: {
        src: "/assets/blogs/optimizar-flujo-reducir-errores/hero.png",
        alt: "Diagrama de flujo de trabajo digital con alertas automáticas y validaciones integradas",
        caption:
          "Flujos digitales que guían cada paso para evitar errores y agilizar procesos",
      },
      heroVideo: null,
      intermediateImage: {
        src: "/assets/blogs/optimizar-flujo-reducir-errores/section.png",
        alt: "Línea de tiempo horizontal con iconos de tareas conectadas por flechas y marcas de verificación",
        caption:
          "Visualización paso a paso de un proceso optimizado y libre de errores",
      },
      publishedAt: "2025-05-21",
      readingTimeMinutes: 7,
      tags: [
        "flujos de trabajo",
        "errores humanos",
        "optimización operativa",
        "automatización",
      ],
      sections: [
        {
          type: "intro",
          content:
            "Imaginá que cada tarea de tu equipo avanza sola, sin depender de recordatorios manuales ni controles interminables. Muchas empresas viven atrapadas en cadenas de chequeos, revisiones y devoluciones: un simple olvido o un dato mal ingresado puede desencadenar retrasos en cascada. En este artículo descubriremos cómo reemplazar esos procesos frágiles por flujos de trabajo digitales que guían a tu equipo paso a paso, reducen errores humanos y liberan horas de atención operativa cada semana.",
        },
        {
          type: "highlight",
          content:
            "Los errores dejan de repetirse cuando cada paso está validado por un flujo digital transparente.",
        },
        {
          type: "problem",
          title: "El caos operativo y sus consecuencias",
          content:
            "Sin un diseño claro de pasos, las tareas se solapan: cada miembro del equipo usa su propio método, perdemos visibilidad y los datos se dispersan en planillas, chats y correos. Esto genera cuellos de botella (esperas de revisión), duplicaciones (múltiples personas corrigiendo lo mismo) y una montaña de retrabajo que consume recursos y genera tensión interna. A medida que la empresa crece, estos errores se multiplican y erosionan la confianza en la información, retrasan proyectos clave y afectan la satisfacción del cliente.",
        },
        {
          type: "solution",
          title: "Cómo lo resolvemos en Geome7ric",
          content:
            "Nuestro enfoque parte de mapear tu flujo actual: identificamos cada paso, validación y posible punto de fallo. A continuación diseñamos un workflow digital donde cada tarea dispara la siguiente automáticamente, con validaciones incorporadas (por ejemplo, checks de datos) y alertas proactivas si algo no coincide. Implementamos dashboards para seguimiento en tiempo real y paneles de control que muestran el estado de cada proceso. El resultado: un ciclo cerrado donde nadie pierde tiempo preguntando “¿dónde quedó esto?” y la información confiable fluye de punta a punta.",
        },
        {
          type: "benefits",
          title: "Beneficios de un flujo de trabajo digital",
          items: [
            "Menos errores y retrabajo: validaciones automáticas en cada paso.",
            "Visibilidad total: dashboards que muestran el estado exacto de las tareas.",
            "Mayor velocidad: cada acción dispara la siguiente sin intervención manual.",
            "Coordinación ágil: notificaciones inteligentes mantienen al equipo sincronizado.",
            "Escalabilidad sin fricción: el mismo flujo sirve para 10 o 1.000 usuarios.",
            "Mejora continua: métricas integradas para optimizar el proceso con datos reales.",
          ],
        },
        {
          type: "testimonial",
          quote:
            "Antes revisábamos manualmente cada entrega y siempre algo se escapaba. Con el flujo digital de Geome7ric, nuestros ciclos de aprobación se redujeron un 50 % y los errores casi desaparecieron.",
          author:
            "Marcela Díaz, Responsable Administrativa en ITEN Centro Integral",
        },
        {
          type: "cta",
          title: "¿Querés flujos sin errores y sin demoras?",
          buttonText: "Solicitá una demo personalizada",
          buttonLink: "/#calendly",
        },
        {
          type: "conclusion",
          content:
            "Optimizar tu flujo de trabajo es mucho más que digitalizar: es diseñar procesos inteligentes, medibles y fiables. Con esa claridad, reducís errores humanos, liberás tiempo de tu equipo y creás una base sólida para crecer. En Geome7ric transformamos tu operación en un motor de eficiencia continua.",
        },
      ],
      related: [
        {
          slug: "automatizar-tareas-productividad",
          title:
            "Cómo automatizar tareas repetitivas para mejorar la productividad",
          reason:
            "Antes de optimizar el flujo, conviene automatizar los procesos que lo componen.",
        },
        {
          slug: "beneficios-digitalizacion-software-medida",
          title:
            "Los beneficios de la digitalización: ¿Por qué tu empresa necesita un software a medida?",
          reason:
            "Un software a medida te da la plataforma para diseñar y controlar flujos sin errores.",
        },
      ],
    },
    {
      title:
        "Transformación digital en pymes: de la intuición al control operativo",
      previewTitle: "Transformación digital en pymes",
      slug: "transformacion-digital-pymes-control-operativo",
      seoTitle: "Transformación digital en pymes | Geome7ric",
      seoDescription:
        "Descubrí cómo la transformación digital permite a las pymes pasar de decisiones intuitivas a un control operativo basado en datos, mejorando la eficiencia y competitividad.",
      socialDescription:
        "Pasá de la intuición al control operativo: cómo la transformación digital impulsa la eficiencia y competitividad de tu pyme.",
      heroImage: {
        src: "/assets/blogs/transformacion-digital-pymes/hero.png",
        alt: "Equipo de trabajo utilizando herramientas digitales para el control operativo",
        caption:
          "De la intuición al control operativo: transformación digital en pymes",
      },
      heroVideo: null,
      intermediateImage: {
        src: "/assets/blogs/transformacion-digital-pymes/section.png",
        alt: "Dashboard mostrando métricas clave de una pyme en tiempo real",
        caption: "Visualización en tiempo real para decisiones estratégicas",
      },
      publishedAt: "2025-05-24",
      readingTimeMinutes: 7,
      tags: [
        "transformación digital",
        "pymes",
        "control operativo",
        "eficiencia empresarial",
      ],
      sections: [
        {
          type: "intro",
          content:
            "En un entorno empresarial cada vez más competitivo, las pymes enfrentan el desafío de tomar decisiones basadas en datos precisos en lugar de intuiciones. La transformación digital ofrece las herramientas necesarias para lograr un control operativo efectivo y sostenible.",
        },
        {
          type: "highlight",
          content:
            "La transformación digital permite a las pymes pasar de decisiones intuitivas a un control operativo basado en datos, mejorando la eficiencia y competitividad.",
        },
        {
          type: "problem",
          title: "El desafío de la gestión intuitiva",
          content:
            "Muchas pymes toman decisiones basadas en la experiencia o intuición, lo que puede llevar a errores, ineficiencias y oportunidades perdidas. Sin sistemas adecuados, es difícil tener una visión clara y en tiempo real de las operaciones.",
        },
        {
          type: "solution",
          title: "Cómo lo resolvemos en Geome7ric",
          content:
            "En Geome7ric, implementamos soluciones digitales personalizadas que permiten a las pymes monitorizar sus operaciones en tiempo real, automatizar procesos y tomar decisiones informadas basadas en datos precisos y actualizados.",
        },
        {
          type: "benefits",
          title: "Beneficios de la transformación digital",
          items: [
            "Decisiones basadas en datos reales y actuales.",
            "Automatización de procesos repetitivos, liberando recursos.",
            "Mejora en la eficiencia y reducción de errores.",
            "Mayor competitividad en el mercado.",
          ],
        },
        {
          type: "testimonial",
          quote:
            "Desde que implementamos las soluciones de Geome7ric, nuestras decisiones son más acertadas y hemos mejorado significativamente nuestra eficiencia operativa.",
          author: "Laura Martínez, Gerente General de PymeTech",
        },
        {
          type: "cta",
          title: "¿Listo para transformar tu pyme?",
          buttonText: "Solicitá tu asesoría gratuita",
          buttonLink: "/contacto",
        },
        {
          type: "conclusion",
          content:
            "La transformación digital no es una opción, es una necesidad para las pymes que buscan crecer y mantenerse competitivas. En Geome7ric, te acompañamos en cada paso hacia un control operativo eficiente y basado en datos.",
        },
      ],
      related: [
        {
          slug: "automatizar-tareas-productividad",
          title:
            "Cómo automatizar tareas repetitivas para mejorar la productividad",
          reason:
            "Descubrí cómo la automatización puede liberar recursos y mejorar la eficiencia en tu pyme.",
        },
        {
          slug: "optimizar-flujo-reducir-errores",
          title: "Cómo optimizar el flujo de trabajo y reducir errores",
          reason:
            "Aprendé a diseñar flujos de trabajo digitales que minimicen errores y aumenten la eficiencia operativa.",
        },
      ],
    },
  ],
  getBlogBySlug: (slug: string) => {
    const { blogs } = get();
    return blogs.find((blog) => blog.slug === slug);
  },
}));
