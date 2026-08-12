import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Reveal } from "./motion";
import { waLink } from "./shared";

import regularizacionHero from "@/assets/regularizacion/regularizacion-hero.jpg";


import leyMono90A from "@/assets/regularizacion/ley-mono-90-01.jpg";
import leyMono90B from "@/assets/regularizacion/ley-mono-90-02.jpg";

import leyMono140A from "@/assets/regularizacion/ley-mono-140-01.jpg";
import leyMono140B from "@/assets/regularizacion/ley-mono-140-02.jpg";

import obraMenorA from "@/assets/regularizacion/obra-menor-01.jpg";
import obraMenorB from "@/assets/regularizacion/obra-menor-02.jpg";

import viviendaSocialA from "@/assets/regularizacion/vivienda-social-01.jpg";
import viviendaSocialB from "@/assets/regularizacion/vivienda-social-02.jpg";

import edificacionExistenteA from "@/assets/regularizacion/edificacion-existente-01.jpg";
import edificacionExistenteB from "@/assets/regularizacion/edificacion-existente-02.jpg";

type Faq = {
  pregunta: string;
  respuesta: string;
};

type EtapaDetalle = {
  numero: string;
  titulo: string;
  texto: string;
};

type Servicio = {
  id: string;
  numero: string;
  categoria: string;
  titulo: string;
  breve: string;
  detalle: string[];
  incluye: string[];
  subtitulo?: string;
  requisitos?: string[];
  documentos?: string[];
  beneficios?: string[];
  procesoDetalle?: EtapaDetalle[];
  faq?: Faq[];
  notaLegal?: string;
};

const SERVICIOS: Servicio[] = [
  {
    id: "ley-mono-90",
    numero: "01",
    categoria: "Ley 20.898 · Modalidad 1",
    titulo: "Vivienda hasta 90 m²",
    subtitulo: "Permiso de Edificación y Recepción Definitiva simultáneos",
    breve:
      "Regularización simplificada para viviendas o ampliaciones construidas antes del 04 de febrero de 2016.",
    detalle: [
      "Esta modalidad permite tramitar simultáneamente el Permiso de Edificación y la Recepción Definitiva cuando la propiedad cumple los requisitos legales y técnicos.",
      "Antes de ingresar la solicitud revisamos superficie, avalúo, ubicación, antecedentes jurídicos y condiciones de habitabilidad, seguridad y estabilidad.",
    ],
    requisitos: [
      "La vivienda o ampliación debe haber sido construida antes del 04 de febrero de 2016.",
      "La superficie total no debe superar los 90 m², salvo la excepción asociada a determinados subsidios MINVU.",
      "El avalúo fiscal no debe superar las 1.000 UF, validado con el certificado correspondiente al primer semestre de 2016.",
      "El terreno no debe encontrarse en áreas de riesgo, protección, utilidad pública o bienes nacionales de uso público.",
      "No deben existir reclamaciones escritas pendientes ante la DOM o el Juzgado de Policía Local.",
      "La edificación debe cumplir condiciones mínimas de habitabilidad, seguridad contra incendios, estabilidad e instalaciones interiores.",
    ],
    procesoDetalle: [
      {
        numero: "01",
        titulo: "Evaluación inicial",
        texto:
          "Revisamos el avalúo fiscal del año 2016 y comprobamos que la propiedad cumpla los requisitos legales.",
      },
      {
        numero: "02",
        titulo: "Levantamiento",
        texto:
          "Visitamos la vivienda, tomamos medidas y verificamos el estado de la construcción.",
      },
      {
        numero: "03",
        titulo: "Certificación profesional",
        texto:
          "Emitimos el informe técnico arquitectónico sobre habitabilidad, seguridad y estabilidad.",
      },
      {
        numero: "04",
        titulo: "Expediente e ingreso",
        texto:
          "Elaboramos planimetría, especificaciones técnicas, formularios y la carpeta para la DOM.",
      },
      {
        numero: "05",
        titulo: "Seguimiento",
        texto:
          "Monitoreamos el expediente durante la revisión municipal y gestionamos las observaciones.",
      },
      {
        numero: "06",
        titulo: "Aprobación",
        texto:
          "El proceso culmina con el certificado de permiso de edificación y recepción definitiva.",
      },
    ],
    documentos: [
      "Certificado de avalúo fiscal correspondiente al primer semestre de 2016.",
      "Título de dominio o antecedente que acredite la propiedad.",
      "Certificado de Informaciones Previas, cuando corresponda.",
      "Planos y antecedentes existentes de la vivienda, si están disponibles.",
      "Certificados o antecedentes de instalaciones interiores.",
      "Formularios, declaraciones e informe técnico profesional.",
    ],
    beneficios: [
      "Permiso de Edificación y Recepción Definitiva en una misma tramitación.",
      "Pago del 25% de los derechos municipales cuando el avalúo es de hasta 400 UF.",
      "Pago del 50% de los derechos municipales cuando el avalúo está entre 400 y 1.000 UF.",
      "Exención de derechos para propietarios de 65 años o más, según las condiciones indicadas en la ley.",
      "Exención cuando un residente está inscrito en el Registro Nacional de Discapacidad, según corresponda.",
    ],
    faq: [
      {
        pregunta: "¿Hasta cuándo se puede ingresar esta solicitud?",
        respuesta:
          "El documento indica que el plazo de ingreso fue extendido hasta el 31 de diciembre de 2027.",
      },
      {
        pregunta: "¿Cuánto demora la revisión municipal?",
        respuesta:
          "El documento señala un plazo legal de revisión de 90 días hábiles, sin perjuicio de observaciones o antecedentes pendientes.",
      },
      {
        pregunta: "¿Puede superar los 90 m²?",
        respuesta:
          "Solo en la excepción indicada para viviendas beneficiadas por determinados subsidios MINVU de mejoramiento o ampliación.",
      },
      {
        pregunta: "¿La evaluación garantiza la aprobación?",
        respuesta:
          "No. La aprobación final corresponde a la Dirección de Obras Municipales después de revisar el expediente.",
      },
    ],
    incluye: [
      "Revisión normativa y documental",
      "Visita y levantamiento arquitectónico",
      "Informe técnico profesional",
      "Planimetría y especificaciones",
      "Ingreso y seguimiento ante la DOM",
    ],
    notaLegal:
      "La factibilidad definitiva depende de la revisión técnica, documental y normativa de cada propiedad.",
  },
  {
    id: "ley-mono-140",
    numero: "02",
    categoria: "Ley 20.898 · Modalidad 2",
    titulo: "Vivienda hasta 140 m²",
    subtitulo: "Regularización simplificada para viviendas de mayor superficie",
    breve:
      "Modalidad para viviendas o ampliaciones de hasta 140 m² y avalúo fiscal de hasta 2.000 UF.",
    detalle: [
      "Esta modalidad permite obtener el Permiso de Edificación y la Recepción Definitiva de forma simultánea, con ciertas flexibilidades urbanísticas.",
      "Además de los requisitos generales, debemos revisar posibles exigencias de cálculo estructural y la aplicación de la Ley de Aportes al Espacio Público.",
    ],
    requisitos: [
      "La edificación debe haber sido construida antes del 04 de febrero de 2016.",
      "La superficie edificada total no puede exceder los 140 m².",
      "El avalúo fiscal del predio debe ser de hasta 2.000 UF, validado con el certificado del primer semestre de 2016.",
      "No puede emplazarse en áreas de riesgo, protección, utilidad pública o bienes nacionales de uso público.",
      "En áreas rurales, no debe provenir de subdivisiones agrícolas aprobadas conforme al Decreto Ley N.º 3.516 de 1980.",
      "No deben existir reclamaciones pendientes ante la DOM o el Juzgado de Policía Local.",
    ],
    procesoDetalle: [
      {
        numero: "01",
        titulo: "Evaluación inicial",
        texto:
          "Revisamos certificados de avalúo y verificamos impedimentos normativos o legales.",
      },
      {
        numero: "02",
        titulo: "Levantamiento y estudio",
        texto:
          "Realizamos el levantamiento y verificamos habitabilidad, estabilidad y seguridad conforme a la OGUC.",
      },
      {
        numero: "03",
        titulo: "Planimetría y cálculo",
        texto:
          "Elaboramos planos de arquitectura y emplazamiento, además del cálculo estructural cuando corresponda.",
      },
      {
        numero: "04",
        titulo: "Aportes al espacio público",
        texto:
          "Gestionamos el cálculo y los antecedentes requeridos por la Ley 20.958.",
      },
      {
        numero: "05",
        titulo: "Ingreso a la DOM",
        texto:
          "Compilamos informes, especificaciones, formularios y presentamos el expediente municipal.",
      },
      {
        numero: "06",
        titulo: "Aprobación",
        texto:
          "Monitoreamos el proceso hasta la entrega del certificado final.",
      },
    ],
    documentos: [
      "Certificado de avalúo fiscal correspondiente al primer semestre de 2016.",
      "Título de dominio y antecedentes del propietario.",
      "Certificado de Informaciones Previas.",
      "Planos de arquitectura a escala 1:50.",
      "Plano de emplazamiento a escala 1:500.",
      "Proyecto de cálculo estructural, cuando corresponda.",
      "Certificado de avalúo fiscal detallado para aportes al espacio público.",
    ],
    beneficios: [
      "Permiso y Recepción Definitiva simultáneos.",
      "Flexibilidad respecto de antejardines y estacionamientos.",
      "Flexibilidad para cierros de hasta 2,20 metros.",
      "Flexibilidad del coeficiente de constructibilidad para viviendas de hasta dos pisos.",
      "Flexibilidad del coeficiente de ocupación de suelo hasta 0,8.",
    ],
    faq: [
      {
        pregunta: "¿Esta modalidad tiene rebajas automáticas de derechos?",
        respuesta:
          "No. El documento indica que se debe pagar el 1,5% del presupuesto de la obra, además de los aportes o cesiones que correspondan.",
      },
      {
        pregunta: "¿Siempre se necesita cálculo estructural?",
        respuesta:
          "No necesariamente. Se desarrolla cuando corresponde conforme a la OGUC y a las características de la construcción.",
      },
      {
        pregunta: "¿Hasta cuándo está vigente el ingreso?",
        respuesta:
          "El documento indica como plazo vigente el 31 de diciembre de 2027.",
      },
      {
        pregunta: "¿Cuánto demora la revisión municipal?",
        respuesta:
          "El documento señala un plazo legal de revisión de 90 días hábiles.",
      },
    ],
    incluye: [
      "Evaluación normativa y legal",
      "Levantamiento planimétrico",
      "Planos de arquitectura y emplazamiento",
      "Cálculo estructural cuando corresponda",
      "Gestión de aportes e ingreso ante la DOM",
    ],
    notaLegal:
      "Las flexibilidades indicadas operan únicamente cuando la propiedad cumple todos los requisitos de la modalidad.",
  },
  {
    id: "obra-menor",
    numero: "03",
    categoria: "Permiso de ampliación",
    titulo: "Ampliación de obra menor",
    subtitulo: "Ampliaciones de hasta 100 m²",
    breve:
      "Permiso de Edificación y Recepción Definitiva para ampliaciones que no alteran la estructura de la edificación original.",
    detalle: [
      "Este procedimiento está destinado a ampliaciones de menor escala desarrolladas sobre una edificación existente con recepción definitiva.",
      "El proyecto debe cumplir el instrumento de planificación territorial, la LGUC y la OGUC aplicables al inmueble.",
    ],
    requisitos: [
      "La intervención debe ejecutarse sobre una edificación existente con recepción definitiva.",
      "La ampliación no debe alterar la estructura de la edificación original.",
      "La superficie ampliada acumulada no puede superar los 100 m².",
      "Puede considerar cambios en la carga de ocupación, destino o actividad del inmueble.",
      "Debe respetar los usos de suelo y las normas del Plan Regulador Comunal.",
      "Debe cumplir íntegramente la LGUC y la OGUC.",
    ],
    procesoDetalle: [
      {
        numero: "01",
        titulo: "Evaluación en terreno",
        texto:
          "Realizamos una visita técnica para confirmar la factibilidad normativa del proyecto.",
      },
      {
        numero: "02",
        titulo: "Ingreso a la DOM",
        texto:
          "Preparamos e ingresamos el expediente completo para solicitar formalmente el permiso.",
      },
      {
        numero: "03",
        titulo: "Revisión municipal",
        texto:
          "La DOM dispone de 5 días hábiles para la admisión y hasta 25 días hábiles para la revisión y pronunciamiento.",
      },
      {
        numero: "04",
        titulo: "Observaciones",
        texto:
          "Subsanamos los requerimientos técnicos dentro del plazo máximo indicado de 60 días.",
      },
      {
        numero: "05",
        titulo: "Permiso",
        texto:
          "Una vez aprobado el proyecto y pagados los derechos, la DOM concede el permiso de edificación.",
      },
      {
        numero: "06",
        titulo: "Recepción definitiva",
        texto:
          "Verificamos lo construido, reunimos certificados y coordinamos la inspección hasta obtener la recepción.",
      },
    ],
    documentos: [
      "Recepción definitiva de la edificación existente.",
      "Título de dominio o acreditación del propietario.",
      "Certificado de Informaciones Previas.",
      "Levantamiento de la situación existente.",
      "Planos y especificaciones técnicas de la ampliación.",
      "Certificados de instalaciones definitivas, cuando corresponda.",
    ],
    beneficios: [
      "Permite ampliar legalmente una propiedad existente.",
      "Define anticipadamente la factibilidad normativa del proyecto.",
      "Facilita posteriores ventas, créditos y trámites asociados al inmueble.",
      "Incluye el cierre legal mediante Recepción Definitiva.",
      "Acompañamiento frente a observaciones municipales.",
    ],
    faq: [
      {
        pregunta: "¿Puedo usar este trámite si la vivienda original no tiene recepción?",
        respuesta:
          "No según la descripción del documento. La ampliación debe ejecutarse sobre una edificación existente con recepción definitiva.",
      },
      {
        pregunta: "¿Puede alterar la estructura original?",
        respuesta:
          "No. Una condición central de esta categoría es que la ampliación no altere la estructura de la edificación original.",
      },
      {
        pregunta: "¿Cuál es el máximo permitido?",
        respuesta:
          "La superficie ampliada, ejecutada de una vez o sucesivamente, puede alcanzar hasta 100 m².",
      },
      {
        pregunta: "¿El permiso completa todo el proceso?",
        respuesta:
          "No. Después de construir debe tramitarse la Recepción Definitiva para cerrar legalmente la ampliación.",
      },
    ],
    incluye: [
      "Visita técnica",
      "Estudio normativo",
      "Proyecto y expediente municipal",
      "Gestión de observaciones",
      "Recepción definitiva",
    ],
    notaLegal:
      "Los plazos municipales pueden variar por observaciones, antecedentes faltantes o características particulares del proyecto.",
  },
  {
    id: "vivienda-social",
    numero: "04",
    categoria: "Declaración jurada",
    titulo: "Vivienda social y económica",
    subtitulo: "Ampliaciones y proyectos de hasta 140 m²",
    breve:
      "Procedimiento acelerado que reemplaza el permiso tradicional por declaraciones juradas profesionales.",
    detalle: [
      "Este sistema permite iniciar y cerrar legalmente determinadas obras mediante declaraciones juradas presentadas por el profesional competente.",
      "Aplica a los tipos de proyectos y condiciones de emplazamiento definidos en el documento técnico.",
    ],
    requisitos: [
      "Aplica a ampliaciones de viviendas sociales, viviendas progresivas e infraestructuras sanitarias.",
      "También puede aplicar a obras nuevas financiadas con subsidios DS N.º 10 bajo la tipología Construcción en Sitio del Residente.",
      "El terreno no debe estar afecto a utilidad pública.",
      "No debe encontrarse en áreas de riesgo o franjas de restricción.",
      "No debe situarse en zonas de protección de recursos naturales.",
      "No debe emplazarse en zonas de protección patrimonial cultural.",
    ],
    procesoDetalle: [
      {
        numero: "01",
        titulo: "Evaluación técnica",
        texto:
          "Visitamos la propiedad y confirmamos la factibilidad para acogerse al sistema acelerado.",
      },
      {
        numero: "02",
        titulo: "Desarrollo del proyecto",
        texto:
          "Elaboramos planimetría, especificaciones y antecedentes exigidos por la OGUC.",
      },
      {
        numero: "03",
        titulo: "Declaración de inicio",
        texto:
          "Redactamos e ingresamos el formulario que certifica el cumplimiento normativo del proyecto.",
      },
      {
        numero: "04",
        titulo: "Habilitación",
        texto:
          "La DOM emite el giro de derechos dentro del plazo señalado y, presentado el pago, se habilita el inicio de obras.",
      },
      {
        numero: "05",
        titulo: "Ejecución",
        texto:
          "La obra debe construirse fielmente conforme al proyecto y antecedentes declarados.",
      },
      {
        numero: "06",
        titulo: "Declaración de término",
        texto:
          "Presentamos la declaración final, cuyo archivo se considera como Recepción Definitiva.",
      },
    ],
    documentos: [
      "Antecedentes que acrediten la condición de vivienda social, progresiva o proyecto subsidiado.",
      "Título de dominio o acreditación del propietario.",
      "Certificado de Informaciones Previas.",
      "Planimetría y especificaciones técnicas.",
      "Declaración Jurada de Inicio de Obras.",
      "Comprobante de pago de derechos municipales.",
      "Declaración Jurada de Término de Ejecución.",
    ],
    beneficios: [
      "Procedimiento acelerado sin esperar un permiso tradicional.",
      "La DOM debe emitir el giro de derechos dentro del plazo señalado de 3 días hábiles.",
      "Permite comenzar las obras una vez archivada la declaración y acreditado el pago.",
      "El cierre se realiza mediante Declaración Jurada de Término.",
      "El archivo de la declaración final equivale a la Recepción Definitiva.",
    ],
    faq: [
      {
        pregunta: "¿Se puede comenzar a construir de inmediato?",
        respuesta:
          "Se puede iniciar una vez presentada la declaración, emitido y pagado el giro de derechos, y archivados los antecedentes por la DOM.",
      },
      {
        pregunta: "¿Se necesita una recepción municipal tradicional?",
        respuesta:
          "Según el documento, el archivo de la Declaración Jurada de Término se considera legalmente como Recepción Definitiva.",
      },
      {
        pregunta: "¿Aplica a cualquier vivienda?",
        respuesta:
          "No. Solo a los tipos de proyectos y condiciones de emplazamiento señalados para esta modalidad.",
      },
      {
        pregunta: "¿Quién asume la responsabilidad técnica?",
        respuesta:
          "El profesional competente certifica mediante declaración jurada que el proyecto cumple la normativa vigente.",
      },
    ],
    incluye: [
      "Evaluación de factibilidad",
      "Planimetría y especificaciones",
      "Declaración Jurada de Inicio",
      "Gestión ante la DOM",
      "Declaración Jurada de Término",
    ],
    notaLegal:
      "La aplicación del procedimiento depende de acreditar el tipo de vivienda, subsidio y condiciones de emplazamiento exigidas.",
  },
  {
    id: "edificacion-existente",
    numero: "05",
    categoria: "Regularización general",
    titulo: "Edificación existente",
    subtitulo: "Vivienda o local comercial construido sin permiso",
    breve:
      "Regularización general para construcciones existentes que deben ajustarse a la normativa urbanística actual.",
    detalle: [
      "Gestionamos el Permiso de Edificación y la Recepción Definitiva de viviendas o locales comerciales construidos sin autorización municipal.",
      "A diferencia de las leyes simplificadas, lo construido debe cumplir las normas vigentes del Plan Regulador, la LGUC, la OGUC y las exigencias de instalaciones.",
    ],
    requisitos: [
      "La construcción debe cumplir las normas del Plan Regulador Comunal indicadas en el CIP.",
      "Debe respetar usos de suelo, distanciamientos, rasantes, alturas y demás normas urbanísticas aplicables.",
      "El propietario debe acreditar el dominio mediante inscripción vigente.",
      "Las instalaciones de agua, alcantarillado, electricidad y gas deben estar regularizadas.",
      "La realidad construida debe poder adaptarse técnica y normativamente al expediente.",
      "Deben subsanarse las observaciones que formule la Dirección de Obras Municipales.",
    ],
    procesoDetalle: [
      {
        numero: "01",
        titulo: "Evaluación en terreno",
        texto:
          "Levantamos la construcción y analizamos su cumplimiento con la LGUC, OGUC y el CIP.",
      },
      {
        numero: "02",
        titulo: "Expediente e ingreso",
        texto:
          "Preparamos planimetría, informes y documentos para presentar la solicitud ante la DOM.",
      },
      {
        numero: "03",
        titulo: "Revisión",
        texto:
          "El documento indica 5 días hábiles para admisión y hasta 25 días hábiles para revisión y pronunciamiento.",
      },
      {
        numero: "04",
        titulo: "Observaciones",
        texto:
          "Subsanamos técnicamente las observaciones municipales dentro de los plazos legales.",
      },
      {
        numero: "05",
        titulo: "Permiso",
        texto:
          "Después del cumplimiento normativo y pago de derechos, la DOM emite el permiso de edificación.",
      },
      {
        numero: "06",
        titulo: "Recepción definitiva",
        texto:
          "Verificamos lo construido, reunimos certificados y coordinamos la inspección final.",
      },
    ],
    documentos: [
      "Título de dominio inscrito en el Conservador de Bienes Raíces.",
      "Certificado de Informaciones Previas.",
      "Levantamiento planimétrico de la edificación existente.",
      "Planos, informes y especificaciones técnicas.",
      "Certificados de agua, alcantarillado, electricidad y gas.",
      "Antecedentes de la notificación municipal, si existe.",
    ],
    beneficios: [
      "Legalizar una vivienda o local construido sin permiso.",
      "Reducir riesgos de multas y observaciones municipales.",
      "Facilitar la venta, financiamiento o transferencia del inmueble.",
      "Avanzar en la obtención de patente comercial cuando corresponda.",
      "Obtener Permiso de Edificación y Recepción Definitiva.",
    ],
    faq: [
      {
        pregunta: "¿Se puede regularizar cualquier construcción existente?",
        respuesta:
          "No. La construcción debe cumplir o poder ajustarse a la normativa urbanística y técnica vigente.",
      },
      {
        pregunta: "¿Sirve para obtener patente comercial?",
        respuesta:
          "La regularización puede ser un antecedente necesario para avanzar en la patente, pero la aprobación comercial depende de otros requisitos y autoridades.",
      },
      {
        pregunta: "¿Qué ocurre si existen observaciones?",
        respuesta:
          "Se analizan y subsanan técnicamente cuando resulta viable dentro del marco normativo aplicable.",
      },
      {
        pregunta: "¿El permiso basta para dejarla aprobada?",
        respuesta:
          "No. El cierre legal exige tramitar también la Recepción Definitiva.",
      },
    ],
    incluye: [
      "Levantamiento técnico",
      "Estudio de normativa vigente",
      "Expediente de permiso",
      "Gestión de observaciones",
      "Recepción definitiva",
    ],
    notaLegal:
      "La viabilidad depende de que la construcción cumpla o pueda ajustarse a la normativa vigente del sector.",
  },
];

const PROCESO = [
  {
    numero: "01",
    titulo: "Revisión inicial",
    texto: "Analizamos documentos, antecedentes y condiciones generales del inmueble.",
  },
  {
    numero: "02",
    titulo: "Diagnóstico técnico",
    texto: "Definimos la viabilidad, el procedimiento aplicable y los requisitos.",
  },
  {
    numero: "03",
    titulo: "Desarrollo",
    texto: "Preparamos planos, formularios y documentación técnica.",
  },
  {
    numero: "04",
    titulo: "Tramitación",
    texto: "Ingresamos el expediente y realizamos seguimiento ante la DOM.",
  },
];

const easing = [0.22, 1, 0.36, 1] as const;

export function Regularizacion() {
  const [activo, setActivo] = useState<Servicio | null>(null);
  const [progresoModal, setProgresoModal] = useState(0);
  const [imagenActiva, setImagenActiva] = useState(0);
  const modalScrollRef = useRef<HTMLDivElement | null>(null);

  const IMAGENES_POR_SERVICIO: Record<string, string[]> = {
    "ley-mono-90": [leyMono90A, leyMono90B],
    "ley-mono-140": [leyMono140A, leyMono140B],
    "obra-menor": [obraMenorA, obraMenorB],
    "vivienda-social": [viviendaSocialA, viviendaSocialB],
    "edificacion-existente": [edificacionExistenteA, edificacionExistenteB],
  };

  const ACENTOS_POR_SERVICIO: Record<
    string,
    {
      fondo: string;
      brillo: string;
      etiqueta: string;
    }
  > = {
    "ley-mono-90": {
      fondo: "from-[#071625] via-[#0b2338] to-[#0f3b5e]",
      brillo: "bg-[#2f8fd8]/20",
      etiqueta: "Azul técnico",
    },
    "ley-mono-140": {
      fondo: "from-[#151a20] via-[#29313a] to-[#4a5562]",
      brillo: "bg-white/10",
      etiqueta: "Gris estructural",
    },
    "obra-menor": {
      fondo: "from-[#251f19] via-[#4c4032] to-[#8a7258]",
      brillo: "bg-[#d8b98d]/20",
      etiqueta: "Arena material",
    },
    "vivienda-social": {
      fondo: "from-[#10241e] via-[#1b3a31] to-[#355f4f]",
      brillo: "bg-[#78b99d]/18",
      etiqueta: "Verde habitacional",
    },
    "edificacion-existente": {
      fondo: "from-[#050505] via-[#141414] to-[#2a2a2a]",
      brillo: "bg-white/8",
      etiqueta: "Negro urbano",
    },
  };

  const imagenesModal = activo
    ? IMAGENES_POR_SERVICIO[activo.id] ?? [leyMono90A, leyMono90B]
    : [leyMono90A, leyMono90B];

  const acentoModal = activo
    ? ACENTOS_POR_SERVICIO[activo.id] ?? ACENTOS_POR_SERVICIO["ley-mono-90"]
    : ACENTOS_POR_SERVICIO["ley-mono-90"];

  useEffect(() => {
    if (!activo) return;

    setImagenActiva(0);

    const intervalo = window.setInterval(() => {
      setImagenActiva((actual) => (actual + 1) % imagenesModal.length);
    }, 2000);

    return () => window.clearInterval(intervalo);
  }, [activo?.id]);

  const actualizarProgresoModal = () => {
    const elemento = modalScrollRef.current;

    if (!elemento) return;

    const recorrido = elemento.scrollHeight - elemento.clientHeight;
    const progreso = recorrido > 0 ? (elemento.scrollTop / recorrido) * 100 : 0;

    setProgresoModal(progreso);
  };

  return (
    <div className="relative overflow-hidden bg-[#f5f6f7]">
      {/* Cuadrícula arquitectónica */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.027]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,93,168,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(15,93,168,0.55) 1px, transparent 1px)",
          backgroundSize: "82px 82px",
        }}
      />

      {/* Luz decorativa */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-220px] top-40 h-[520px] w-[520px] rounded-full bg-[#0f5da8]/[0.045] blur-3xl"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        {/* Apertura visual con fotografías */}
        <section className="relative left-1/2 -mt-20 w-screen -translate-x-1/2 overflow-hidden bg-[#071625] sm:-mt-24 lg:-mt-28">
          <div className="relative min-h-[calc(100vh-72px)] overflow-hidden">
            {/* Imagen principal */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.08 }}
              animate={{
                scale: [1.08, 1.14, 1.08],
                x: [0, -18, 0],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={regularizacionHero}
                alt="Oficina del estudio de arquitectura"
                className="h-full w-full object-cover object-center"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-r from-[#061727]/88 via-[#061727]/46 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061727]/75 via-transparent to-[#061727]/15" />

            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.045]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "88px 88px",
              }}
            />

            {/* Contenido principal */}
            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] max-w-[1500px] flex-col justify-between px-5 py-12 sm:px-8 lg:px-12 lg:py-14">
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easing }}
                className="flex items-center gap-4"
              >
                <span className="h-px w-10 bg-[#70b7ff]" />
                <span className="text-[9px] uppercase tracking-[0.26em] text-white/60">
                  Regularización y permisos
                </span>
              </motion.div>

              <div className="max-w-[790px] pb-16 lg:pb-8">
                <h2 className="text-[3.4rem] font-light leading-[0.98] tracking-[-0.055em] text-white sm:text-[5rem] lg:text-[6.5rem]">
                  <span className="block overflow-hidden">
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ delay: 0.12, duration: 0.95, ease: easing }}
                      className="block"
                    >
                      Regularizar
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ delay: 0.23, duration: 0.95, ease: easing }}
                      className="block text-[#8fc8ff]"
                    >
                      es proyectar
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ delay: 0.34, duration: 0.95, ease: easing }}
                      className="block"
                    >
                      con certeza.
                    </motion.span>
                  </span>
                </h2>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: easing }}
                  className="mt-7 max-w-[560px] text-sm leading-[1.9] text-white/62 sm:text-base"
                >
                  Revisamos antecedentes, evaluamos la normativa y desarrollamos
                  cada expediente con precisión técnica y seguimiento permanente.
                </motion.p>
              </div>

              <div className="grid border-l border-t border-white/15 sm:grid-cols-3">
                {[
                  ["01", "Evaluación"],
                  ["02", "Expediente"],
                  ["03", "Seguimiento"],
                ].map(([numero, titulo], index) => (
                  <motion.div
                    key={numero}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.58 + index * 0.1,
                      duration: 0.65,
                      ease: easing,
                    }}
                    className="group border-b border-r border-white/15 bg-[#071625]/35 px-5 py-5 backdrop-blur-sm transition-colors duration-300 hover:bg-[#0b2a45]/65"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] tracking-[0.2em] text-[#70b7ff]">
                        {numero}
                      </span>
                      <span className="h-px w-7 bg-white/25 transition-all duration-300 group-hover:w-12" />
                    </div>
                    <p className="mt-4 text-sm font-light text-white">{titulo}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.span
              aria-hidden="true"
              className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 text-2xl text-white/45"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              ⌄
            </motion.span>
          </div>

        </section>

        {/* Bloque técnico animado */}
        <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#eef3f7] py-14 lg:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.32]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(23,59,93,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(23,59,93,0.08) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />

          <motion.div
            aria-hidden="true"
            className="absolute -left-24 top-10 h-[360px] w-[360px] rounded-full bg-[#0f5da8]/10 blur-3xl"
            animate={{
              x: [0, 80, 0],
              y: [0, 24, 0],
              opacity: [0.25, 0.5, 0.25],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16 lg:px-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: easing }}
                className="flex items-center gap-4"
              >
                <span className="h-px w-10 bg-[#0f5da8]" />
                <span className="text-[9px] font-medium uppercase tracking-[0.26em] text-[#0f5da8]">
                  Regularización y permisos
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ delay: 0.08, duration: 0.85, ease: easing }}
                className="mt-7 max-w-[650px] text-[2.8rem] font-light leading-[1.02] tracking-[-0.05em] text-[#111827] sm:text-[3.9rem] lg:text-[4.8rem]"
              >
                Regularizar es
                <span className="block text-[#173b5d]">ordenar lo existente.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18, duration: 0.7, ease: easing }}
                className="mt-6 max-w-[560px] text-sm leading-[1.85] text-[#667085] sm:text-[15px]"
              >
                Revisamos antecedentes, evaluamos la normativa y construimos un
                expediente claro antes de iniciar cualquier tramitación municipal.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.28, duration: 0.7, ease: easing }}
                className="mt-8 grid max-w-[580px] gap-px overflow-hidden border border-[#173b5d]/10 bg-[#173b5d]/10 sm:grid-cols-3"
              >
                {[
                  ["01", "Evaluación"],
                  ["02", "Expediente"],
                  ["03", "Seguimiento"],
                ].map(([numero, titulo]) => (
                  <div
                    key={numero}
                    className="group bg-white/85 px-5 py-5 backdrop-blur-sm transition-colors duration-300 hover:bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] tracking-[0.2em] text-[#0f5da8]">
                        {numero}
                      </span>
                      <span className="h-px w-6 bg-[#0f5da8]/30 transition-all duration-300 group-hover:w-10" />
                    </div>
                    <p className="mt-4 text-sm font-light text-[#344054]">{titulo}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Plano técnico animado */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: easing }}
              className="relative min-h-[420px] overflow-hidden border border-[#173b5d]/12 bg-[#0b2033] p-5 shadow-[0_24px_70px_rgba(23,59,93,0.14)] sm:min-h-[520px] sm:p-8"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.16]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(143,200,255,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(143,200,255,0.22) 1px, transparent 1px)",
                  backgroundSize: "36px 36px",
                }}
              />

              <svg
                viewBox="0 0 700 500"
                className="absolute inset-0 h-full w-full p-8 sm:p-12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M80 90H430V180H590V420H240V330H80V90Z"
                  stroke="#8FC8FF"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.9 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                />
                <motion.path
                  d="M160 90V330M240 180H590M430 90V420M80 250H430"
                  stroke="#8FC8FF"
                  strokeWidth="1.2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.55 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35, duration: 2.4, ease: "easeInOut" }}
                />
                <motion.path
                  d="M120 130H200V210H120V130ZM470 220H550V300H470V220ZM270 280H380V380H270V280Z"
                  stroke="#67B7FF"
                  strokeWidth="1.3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.7 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.65, duration: 2.2, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="430"
                  cy="180"
                  r="11"
                  stroke="#67B7FF"
                  strokeWidth="1.4"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.85 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.1, duration: 0.45 }}
                />
                <motion.line
                  x1="70"
                  y1="455"
                  x2="610"
                  y2="455"
                  stroke="#8FC8FF"
                  strokeWidth="1"
                  strokeDasharray="7 9"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.35 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9, duration: 1.8 }}
                />
              </svg>

              <motion.div
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#67b7ff] to-transparent"
                animate={{ y: [0, 500, 0], opacity: [0, 0.8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="absolute left-6 top-6 sm:left-8 sm:top-8">
                <span className="text-[8px] uppercase tracking-[0.24em] text-[#8fc8ff]/60">
                  Plano de regularización
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 sm:bottom-8 sm:left-8 sm:right-8">
                <div>
                  <p className="text-sm font-light text-white/90">Levantamiento técnico</p>
                  <p className="mt-2 text-[11px] leading-[1.6] text-white/42">
                    Representación esquemática del proceso.
                  </p>
                </div>
                <span className="text-[8px] tracking-[0.2em] text-[#8fc8ff]/55">03</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Proceso resumido */}
        <div className="mt-0 grid border-l border-t border-black/10 bg-white sm:grid-cols-3">
          {[
            {
              numero: "01",
              titulo: "Diagnóstico",
              texto: "Revisión técnica, normativa y documental del inmueble.",
            },
            {
              numero: "02",
              titulo: "Expediente",
              texto: "Desarrollo de planos, formularios y antecedentes municipales.",
            },
            {
              numero: "03",
              titulo: "Seguimiento",
              texto: "Acompañamiento durante la revisión y resolución ante la DOM.",
            },
          ].map((item, index) => (
            <Reveal
              key={item.numero}
              delay={index * 0.08}
              className="group min-h-[170px] border-b border-r border-black/10 bg-white p-6 sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] tracking-[0.2em] text-[#0f5da8]">
                  {item.numero}
                </span>
                <span className="h-px w-8 bg-[#0f5da8]/25 transition-all duration-300 group-hover:w-14" />
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-light tracking-[-0.02em] text-[#101828] sm:text-2xl">
                  {item.titulo}
                </h3>
                <p className="mt-4 max-w-[320px] text-sm leading-[1.75] text-[#667085]">
                  {item.texto}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Introducción */}
        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="text-[9px] uppercase tracking-[0.23em] text-[#98a2b3]">
                Servicios disponibles
              </span>

              <p className="mt-6 max-w-[420px] text-xl font-light leading-[1.5] tracking-[-0.025em] text-[#1d2939] sm:text-2xl">
                Cada propiedad requiere una revisión particular antes de definir
                el procedimiento correcto.
              </p>

              <p className="mt-6 max-w-[420px] text-sm leading-[1.85] text-[#667085]">
                Selecciona un servicio para conocer su alcance, las etapas
                generales y los antecedentes que podemos gestionar.
              </p>

              <div className="mt-9 overflow-hidden border border-black/10 bg-white shadow-[0_18px_55px_rgba(23,59,93,0.07)]">
                <div className="border-b border-black/10 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#0f5da8]">
                      Orientación inicial
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0f5da8]/10 text-xs text-[#0f5da8]">
                      ?
                    </span>
                  </div>
                </div>

                <div className="space-y-4 px-5 py-5">
                  {[
                    "Tipo de propiedad",
                    "Superficie construida",
                    "Estado municipal actual",
                  ].map((item, index) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#0f5da8]/20 text-[9px] text-[#0f5da8]">
                        {index + 1}
                      </span>
                      <span className="text-xs text-[#475467]">{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={waLink(
                    "Hola, necesito orientación para saber qué servicio de regularización corresponde a mi propiedad.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-12 items-center justify-between bg-[#0f5da8] px-5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white"
                >
                  Evaluar mi caso
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Lista de servicios */}
          <div className="border-l border-t border-black/10">
            {SERVICIOS.map((servicio, index) => (
              <Reveal
                key={servicio.id}
                delay={index * 0.05}
                className="group relative"
              >
                <button
                  type="button"
                  onClick={() => setActivo(servicio)}
                  className="relative flex w-full flex-col overflow-hidden border-b border-r border-black/10 bg-white px-5 py-7 text-left sm:px-7 lg:grid lg:min-h-[165px] lg:grid-cols-[90px_1fr_220px_40px] lg:items-center lg:gap-6 lg:px-8"
                >
                  <span className="absolute inset-0 translate-x-[-101%] bg-[#173b5d] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="absolute left-0 top-0 h-full w-[3px] origin-bottom scale-y-0 bg-[#0f5da8] transition-transform duration-500 group-hover:scale-y-100" />
                  <span className="absolute right-7 top-5 text-[4rem] font-light leading-none tracking-[-0.08em] text-[#173b5d]/[0.035] transition-colors duration-300 group-hover:text-white/[0.045]">
                    {servicio.numero}
                  </span>

                  <span className="relative z-10 text-[10px] tracking-[0.2em] text-[#0f5da8] transition-colors duration-300 group-hover:text-white/60">
                    {servicio.numero}
                  </span>

                  <div className="relative z-10 mt-5 lg:mt-0">
                    <span className="text-[8px] uppercase tracking-[0.2em] text-[#98a2b3] transition-colors duration-300 group-hover:text-white/50">
                      {servicio.categoria}
                    </span>

                    <h3 className="mt-2 text-xl font-light tracking-[-0.025em] text-[#101828] transition-colors duration-300 group-hover:text-white sm:text-2xl">
                      {servicio.titulo}
                    </h3>
                  </div>

                  <p className="relative z-10 mt-4 max-w-[520px] text-sm leading-[1.7] text-[#667085] transition-colors duration-300 group-hover:text-white/70 lg:mt-0">
                    {servicio.breve}
                  </p>

                  <span className="relative z-10 mt-6 flex h-10 w-10 items-center justify-center rounded-full border border-[#0f5da8]/20 text-lg text-[#0f5da8] transition-all duration-300 group-hover:translate-x-1 group-hover:border-white/30 group-hover:bg-white group-hover:text-[#173b5d] lg:mt-0">
                    →
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA inferior */}
        <Reveal className="mt-20 lg:mt-28">
          <div className="relative overflow-hidden bg-[#173b5d] px-6 py-12 text-white sm:px-10 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-14 lg:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.055]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />

            <div className="relative z-10">
              <span className="text-[9px] uppercase tracking-[0.24em] text-white/55">
                Evaluación inicial
              </span>

              <h3 className="mt-5 max-w-[760px] text-3xl font-light leading-[1.15] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                ¿Necesitas regularizar una propiedad y no sabes por dónde
                comenzar?
              </h3>

              <p className="mt-5 max-w-[620px] text-sm leading-[1.8] text-white/65 sm:text-base">
                Cuéntanos tu situación y revisaremos cuál es el camino más
                adecuado para tu proyecto.
              </p>
            </div>

            <div className="relative z-10 mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col">
            <a
              href={waLink(
                "Hola, necesito orientación para regularizar una propiedad.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-14 items-center justify-center overflow-hidden bg-white px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#173b5d]"
            >
              <span className="absolute inset-0 translate-y-full bg-[#0f5da8] transition-transform duration-500 ease-out group-hover:translate-y-0" />

              <span className="relative z-10 flex items-center gap-4 transition-colors duration-300 group-hover:text-white">
                Hablar por WhatsApp
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>

            <span className="text-center text-[8px] uppercase tracking-[0.18em] text-white/45">
              Evaluación técnica personalizada
            </span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Modal de detalle */}
      <AnimatePresence>
        {activo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex items-end justify-end bg-[#071625]/55 backdrop-blur-sm sm:p-5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-detail-title"
          >
            <button
              type="button"
              aria-label="Cerrar detalle"
              onClick={() => setActivo(null)}
              className="absolute inset-0 cursor-default"
            />

            {/* Visual arquitectónico lateral */}
            <motion.div
              key={activo.id}
              initial={{ opacity: 0, x: -45, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -45, scale: 0.985 }}
              transition={{ duration: 0.7, ease: easing }}
              className="pointer-events-none absolute inset-y-5 left-5 hidden overflow-hidden lg:block lg:w-[calc(100%-980px)]"
            >
              <div
                className={`relative h-full min-h-[520px] overflow-hidden bg-gradient-to-br ${acentoModal.fondo} shadow-[0_30px_100px_rgba(7,22,37,0.25)]`}
              >
                <motion.div
                  aria-hidden="true"
                  className={`absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl ${acentoModal.brillo}`}
                  animate={{
                    x: [0, -22, 0],
                    y: [0, 26, 0],
                    scale: [1, 1.12, 1],
                    opacity: [0.45, 0.75, 0.45],
                  }}
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <AnimatePresence mode="wait">
                  <motion.img
                    key={imagenesModal[imagenActiva]}
                    src={imagenesModal[imagenActiva]}
                    alt=""
                    initial={{
                      opacity: 0,
                      scale: 1.02,
                      x: imagenActiva % 2 === 0 ? -12 : 12,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1.11,
                      x: imagenActiva % 2 === 0 ? 12 : -12,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      opacity: { duration: 0.8, ease: easing },
                      scale: { duration: 6, ease: "linear" },
                      x: { duration: 6, ease: "linear" },
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-[#071625]/88 via-[#071625]/20 to-[#071625]/18" />
                <div className="absolute inset-0 bg-[#0f5da8]/10 mix-blend-multiply" />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.09]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                  }}
                />

                <motion.svg
                  aria-hidden="true"
                  viewBox="0 0 800 800"
                  className="absolute inset-0 h-full w-full opacity-[0.22]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.22 }}
                  transition={{ duration: 1.2, ease: easing }}
                >
                  <motion.path
                    d="M120 160 H520 V420 H260 V650 H120 Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeDasharray="7 9"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.8, ease: easing }}
                  />
                  <motion.path
                    d="M260 160 V420 M390 160 V420 M120 300 H520 M260 520 H650"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    strokeDasharray="5 8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.2, duration: 1.8, ease: easing }}
                  />
                  <motion.circle
                    cx="580"
                    cy="220"
                    r="88"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeDasharray="6 10"
                  />
                </motion.svg>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.7, ease: easing }}
                  className="absolute right-7 top-24 w-[250px] border border-white/15 bg-white/[0.08] p-5 backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] uppercase tracking-[0.2em] text-white/45">
                      Ficha técnica
                    </span>
                    <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_20px_rgba(110,231,183,0.8)]" />
                  </div>

                  <div className="mt-5 space-y-4">
                    <div>
                      <span className="text-[8px] uppercase tracking-[0.18em] text-white/35">
                        Modalidad
                      </span>
                      <p className="mt-1 text-xs text-white/80">
                        {activo.categoria}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                      <div>
                        <span className="text-[8px] uppercase tracking-[0.18em] text-white/35">
                          Estado
                        </span>
                        <p className="mt-1 text-xs text-white/80">Evaluación</p>
                      </div>

                      <div>
                        <span className="text-[8px] uppercase tracking-[0.18em] text-white/35">
                          Visual
                        </span>
                        <p className="mt-1 text-xs text-white/80">
                          {acentoModal.etiqueta}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="absolute left-8 right-8 top-8 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.24em] text-white/65">
                    Referencia visual · {activo.titulo}
                  </span>

                  <div className="flex items-center gap-4">
                    <span className="text-[8px] tracking-[0.2em] text-white/45">
                      {String(imagenActiva + 1).padStart(2, "0")} /{" "}
                      {String(imagenesModal.length).padStart(2, "0")}
                    </span>

                    <div className="flex gap-2">
                      {imagenesModal.map((_, index) => (
                        <span
                          key={index}
                          className={`h-[2px] transition-all duration-500 ${
                            index == imagenActiva
                              ? "w-10 bg-white"
                              : "w-5 bg-white/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 right-8">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-white/50">
                    {activo.categoria}
                  </span>

                  <h3 className="mt-4 max-w-[560px] text-3xl font-light leading-[1.08] tracking-[-0.035em] text-white xl:text-5xl">
                    {activo.titulo}
                  </h3>

                  <p className="mt-5 max-w-[500px] text-sm leading-[1.8] text-white/65">
                    Evaluación, levantamiento y documentación técnica para una
                    tramitación clara y ordenada.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 80,
                y: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                x: 80,
              }}
              transition={{
                duration: 0.55,
                ease: easing,
              }}
              ref={modalScrollRef}
              onScroll={actualizarProgresoModal}
              className="relative z-10 max-h-[92vh] w-full overflow-y-auto bg-[#f8f8f7] p-6 shadow-[0_30px_100px_rgba(7,22,37,0.3)] sm:max-w-[920px] sm:p-10 lg:p-12"
            >
              <div className="sticky left-0 top-0 z-30 -mx-6 -mt-6 h-[3px] bg-black/5 sm:-mx-10 sm:-mt-10 lg:-mx-12 lg:-mt-12">
                <motion.div
                  className="h-full origin-left bg-[#0f5da8]"
                  animate={{ scaleX: progresoModal / 100 }}
                  transition={{ duration: 0.12, ease: "linear" }}
                />
              </div>

              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute right-[-110px] top-24 h-72 w-72 rounded-full bg-[#0f5da8]/10 blur-3xl"
                animate={{
                  y: [0, 30, 0],
                  scale: [1, 1.08, 1],
                  opacity: [0.35, 0.65, 0.35],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute right-7 top-20 text-[7rem] font-light leading-none tracking-[-0.08em] text-[#173b5d]/[0.035] sm:text-[10rem]"
                initial={{ opacity: 0, x: 35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: easing }}
              >
                {activo.numero}
              </motion.span>
              <div className="flex items-center justify-between border-b border-black/10 pb-6">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] tracking-[0.2em] text-[#0f5da8]">
                    {activo.numero}
                  </span>

                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#98a2b3]">
                    {activo.categoria}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActivo(null)}
                  className="group flex h-11 w-11 items-center justify-center border border-black/10 text-lg text-[#173b5d] transition-colors hover:bg-[#173b5d] hover:text-white"
                  aria-label="Cerrar"
                >
                  ×
                </button>
              </div>

              <motion.h2
                id="service-detail-title"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: easing }}
                className="relative mt-10 text-3xl font-light leading-[1.1] tracking-[-0.035em] text-[#101828] sm:text-4xl"
              >
                {activo.titulo}
                <motion.span
                  className="absolute -bottom-3 left-0 h-px bg-[#0f5da8]"
                  initial={{ width: 0 }}
                  animate={{ width: 72 }}
                  transition={{ delay: 0.35, duration: 0.8, ease: easing }}
                />
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.65, ease: easing }}
                className="mt-8 max-w-[760px] text-base leading-[1.8] text-[#0f5da8]"
              >
                {activo.breve}
              </motion.p>

              {activo.subtitulo && (
                <p className="mt-3 text-sm uppercase tracking-[0.16em] text-[#173b5d]/65">
                  {activo.subtitulo}
                </p>
              )}

              <div className="mt-9 space-y-5 border-t border-black/10 pt-8">
                {activo.detalle.map((parrafo) => (
                  <p
                    key={parrafo}
                    className="text-sm leading-[1.85] text-[#667085] sm:text-base"
                  >
                    {parrafo}
                  </p>
                ))}
              </div>

              {activo.requisitos && (
                <section className="mt-12">
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.22em] text-[#98a2b3]">
                        Evaluación preliminar
                      </span>
                      <h3 className="mt-3 text-2xl font-light tracking-[-0.03em] text-[#101828] sm:text-3xl">
                        ¿Cumples con estos requisitos?
                      </h3>
                    </div>
                    <span className="hidden text-[10px] tracking-[0.18em] text-[#0f5da8] sm:block">
                      01 — REQUISITOS
                    </span>
                  </div>

                  <div className="mt-7 grid border-l border-t border-black/10 sm:grid-cols-2">
                    {activo.requisitos.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.06 * index,
                          duration: 0.55,
                          ease: easing,
                        }}
                        whileHover={{
                          y: -5,
                          transition: { duration: 0.22 },
                        }}
                        className="group min-h-[150px] border-b border-r border-black/10 bg-white p-5 transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(23,59,93,0.10)] sm:p-6"
                      >
                        <div className="flex items-start gap-4">
                          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0f5da8]/10 text-xs text-[#0f5da8] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0f5da8] group-hover:text-white">
                            ✓
                          </span>
                          <div>
                            <span className="text-[9px] tracking-[0.16em] text-[#98a2b3]">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <p className="mt-3 text-sm leading-[1.75] text-[#344054]">
                              {item}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {activo.procesoDetalle && (
                <section className="mt-12 border-t border-black/10 pt-10">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#98a2b3]">
                    02 — Proceso
                  </span>
                  <h3 className="mt-3 text-2xl font-light tracking-[-0.03em] text-[#101828] sm:text-3xl">
                    De la evaluación a la aprobación.
                  </h3>

                  <div className="mt-7 border-t border-black/10">
                    {activo.procesoDetalle.map((etapa, index) => (
                      <motion.div
                        key={etapa.numero}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.07 * index,
                          duration: 0.5,
                          ease: easing,
                        }}
                        className="group relative grid gap-4 overflow-hidden border-b border-black/10 py-6 sm:grid-cols-[70px_190px_1fr] sm:items-start"
                      >
                        <span className="absolute bottom-0 left-0 h-px w-0 bg-[#0f5da8] transition-all duration-500 group-hover:w-full" />
                        <span className="text-[10px] tracking-[0.2em] text-[#0f5da8]">
                          {etapa.numero}
                        </span>
                        <h4 className="text-base font-medium tracking-[-0.015em] text-[#101828]">
                          {etapa.titulo}
                        </h4>
                        <p className="text-sm leading-[1.75] text-[#667085]">
                          {etapa.texto}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {(activo.documentos || activo.beneficios) && (
                <div className="mt-12 grid gap-8 border-t border-black/10 pt-10 lg:grid-cols-2">
                  {activo.documentos && (
                    <section>
                      <span className="text-[9px] uppercase tracking-[0.22em] text-[#98a2b3]">
                        03 — Documentación
                      </span>
                      <h3 className="mt-3 text-2xl font-light tracking-[-0.03em] text-[#101828]">
                        Antecedentes habituales
                      </h3>

                      <div className="mt-6 border-t border-black/10">
                        {activo.documentos.map((item) => (
                          <div
                            key={item}
                            className="flex gap-4 border-b border-black/10 py-4"
                          >
                            <span className="text-[#0f5da8]">+</span>
                            <p className="text-sm leading-[1.7] text-[#475467]">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {activo.beneficios && (
                    <section>
                      <span className="text-[9px] uppercase tracking-[0.22em] text-[#98a2b3]">
                        04 — Beneficios
                      </span>
                      <h3 className="mt-3 text-2xl font-light tracking-[-0.03em] text-[#101828]">
                        ¿Qué permite resolver?
                      </h3>

                      <div className="mt-6 border-t border-black/10">
                        {activo.beneficios.map((item) => (
                          <div
                            key={item}
                            className="flex gap-4 border-b border-black/10 py-4"
                          >
                            <span className="text-[#0f5da8]">✓</span>
                            <p className="text-sm leading-[1.7] text-[#475467]">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}

              {activo.faq && (
                <section className="mt-12 border-t border-black/10 pt-10">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#98a2b3]">
                    05 — Preguntas frecuentes
                  </span>
                  <h3 className="mt-3 text-2xl font-light tracking-[-0.03em] text-[#101828] sm:text-3xl">
                    Antes de iniciar.
                  </h3>

                  <div className="mt-7 border-t border-black/10">
                    {activo.faq.map((item, index) => (
                      <motion.details
                        key={item.pregunta}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.05 * index,
                          duration: 0.45,
                          ease: easing,
                        }}
                        className="group border-b border-black/10"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left">
                          <span className="text-sm font-medium text-[#344054] sm:text-base">
                            {item.pregunta}
                          </span>
                          <span className="text-lg text-[#0f5da8] transition-transform duration-300 group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <p className="max-w-[720px] pb-6 pr-10 text-sm leading-[1.8] text-[#667085]">
                          {item.respuesta}
                        </p>
                      </motion.details>
                    ))}
                  </div>
                </section>
              )}

              <div className="mt-12">
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#98a2b3]">
                  El servicio puede incluir
                </span>

                <div className="mt-5 grid border-l border-t border-black/10 sm:grid-cols-2">
                  {activo.incluye.map((item, index) => (
                    <div
                      key={item}
                      className="flex min-h-[88px] items-center justify-between gap-5 border-b border-r border-black/10 bg-white px-5 py-4"
                    >
                      <span className="text-sm text-[#344054]">{item}</span>

                      <span className="text-[9px] tracking-[0.15em] text-[#0f5da8]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {activo.notaLegal && (
                <div className="mt-8 border-l-2 border-[#0f5da8] bg-[#0f5da8]/[0.045] px-5 py-4">
                  <p className="text-xs leading-[1.75] text-[#667085]">
                    {activo.notaLegal}
                  </p>
                </div>
              )}

              <a
                href={waLink(
                  `Hola, quiero solicitar información sobre el servicio: ${activo.titulo}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-10 flex min-h-14 w-full items-center justify-center overflow-hidden bg-[#0f5da8] px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
              >
                <span className="absolute inset-0 translate-y-full bg-[#173b5d] transition-transform duration-500 ease-out group-hover:translate-y-0" />

                <span className="relative z-10 flex items-center gap-4">
                  Consultar por WhatsApp

                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </span>
              </a>

              <p className="mt-4 text-center text-[9px] uppercase tracking-[0.16em] text-[#98a2b3]">
                La factibilidad definitiva se determina después de revisar los
                antecedentes.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
