export type LocaleCode = "en" | "es" | "pt" | "zh";

interface CountryMeta {
  title: string;
  description: string;
}

const COUNTRY_METADATA: Record<string, Record<LocaleCode, CountryMeta>> = {
  spain: {
    en: { title: "Moving to Spain in 2026 | Visa, Taxes & Cost of Living | Relocate2Day", description: "Everything you need to move to Spain in 2026: visa options, the Beckham Law tax regime, cost of living, healthcare, and banking, all in one place." },
    es: { title: "Mudarse a España en 2026 | Visado, Impuestos y Coste de Vida | Relocate2Day", description: "Todo lo que necesitas para mudarte a España en 2026: opciones de visado, la Ley Beckham, coste de vida, sanidad y banca, todo en un solo lugar." },
    pt: { title: "Mudar para a Espanha em 2026 | Visto, Impostos e Custo de Vida | Relocate2Day", description: "Tudo o que precisa para se mudar para a Espanha em 2026: opções de visto, regime fiscal, custo de vida, saúde e banca, tudo num só lugar." },
    zh: { title: "2026年移居西班牙指南 | 签证、税务与生活成本 | Relocate2Day", description: "移居西班牙所需了解的一切：签证选择、贝克汉姆税收制度、生活成本、医疗与银行服务，一站式指南。" },
  },
  gibraltar: {
    en: { title: "Moving to Gibraltar in 2026 | Visa, Taxes & Cost of Living | Relocate2Day", description: "Everything you need to move to Gibraltar in 2026: residency options, tax advantages, cost of living, healthcare, and banking, all in one place." },
    es: { title: "Mudarse a Gibraltar en 2026 | Visado, Impuestos y Coste de Vida | Relocate2Day", description: "Todo lo que necesitas para mudarte a Gibraltar en 2026: opciones de residencia, ventajas fiscales, coste de vida, sanidad y banca, todo en un solo lugar." },
    pt: { title: "Mudar para Gibraltar em 2026 | Visto, Impostos e Custo de Vida | Relocate2Day", description: "Tudo o que precisa para se mudar para Gibraltar em 2026: opções de residência, vantagens fiscais, custo de vida, saúde e banca, tudo num só lugar." },
    zh: { title: "2026年移居直布罗陀指南 | 签证、税务与生活成本 | Relocate2Day", description: "移居直布罗陀所需了解的一切：居留选择、税收优势、生活成本、医疗与银行服务，一站式指南。" },
  },
  portugal: {
    en: { title: "Moving to Portugal in 2026 | Visa, Taxes & Cost of Living | Relocate2Day", description: "Everything you need to move to Portugal in 2026: the D7 visa, tax rules, cost of living, healthcare, and banking, all in one place." },
    es: { title: "Mudarse a Portugal en 2026 | Visado, Impuestos y Coste de Vida | Relocate2Day", description: "Todo lo que necesitas para mudarte a Portugal en 2026: el visado D7, normas fiscales, coste de vida, sanidad y banca, todo en un solo lugar." },
    pt: { title: "Mudar para Portugal em 2026 | Visto, Impostos e Custo de Vida | Relocate2Day", description: "Tudo o que precisa para se mudar para Portugal em 2026: o visto D7, regras fiscais, custo de vida, saúde e banca, tudo num só lugar." },
    zh: { title: "2026年移居葡萄牙指南 | 签证、税务与生活成本 | Relocate2Day", description: "移居葡萄牙所需了解的一切：D7签证、税务规定、生活成本、医疗与银行服务，一站式指南。" },
  },
  italy: {
    en: { title: "Moving to Italy in 2026 | Visa, Taxes & Cost of Living | Relocate2Day", description: "Everything you need to move to Italy in 2026: the digital nomad visa, tax rules, cost of living, healthcare, and banking, all in one place." },
    es: { title: "Mudarse a Italia en 2026 | Visado, Impuestos y Coste de Vida | Relocate2Day", description: "Todo lo que necesitas para mudarte a Italia en 2026: visado nómada digital, normas fiscales, coste de vida, sanidad y banca, todo en un solo lugar." },
    pt: { title: "Mudar para a Itália em 2026 | Visto, Impostos e Custo de Vida | Relocate2Day", description: "Tudo o que precisa para se mudar para a Itália em 2026: visto de nómada digital, regras fiscais, custo de vida, saúde e banca, tudo num só lugar." },
    zh: { title: "2026年移居意大利指南 | 签证、税务与生活成本 | Relocate2Day", description: "移居意大利所需了解的一切：数字游民签证、税务规定、生活成本、医疗与银行服务，一站式指南。" },
  },
  malta: {
    en: { title: "Moving to Malta in 2026 | Visa, Taxes & Cost of Living | Relocate2Day", description: "Everything you need to move to Malta in 2026: residency programs, tax treatment, cost of living, healthcare, and banking, all in one place." },
    es: { title: "Mudarse a Malta en 2026 | Visado, Impuestos y Coste de Vida | Relocate2Day", description: "Todo lo que necesitas para mudarte a Malta en 2026: programas de residencia, tratamiento fiscal, coste de vida, sanidad y banca, todo en un solo lugar." },
    pt: { title: "Mudar para Malta em 2026 | Visto, Impostos e Custo de Vida | Relocate2Day", description: "Tudo o que precisa para se mudar para Malta em 2026: programas de residência, regime fiscal, custo de vida, saúde e banca, tudo num só lugar." },
    zh: { title: "2026年移居马耳他指南 | 签证、税务与生活成本 | Relocate2Day", description: "移居马耳他所需了解的一切：居留计划、税务处理、生活成本、医疗与银行服务，一站式指南。" },
  },
  bulgaria: {
    en: { title: "Moving to Bulgaria in 2026 | Visa, Taxes & Cost of Living | Relocate2Day", description: "Everything you need to move to Bulgaria in 2026: residency options, low flat tax, cost of living, healthcare, and banking, all in one place." },
    es: { title: "Mudarse a Bulgaria en 2026 | Visado, Impuestos y Coste de Vida | Relocate2Day", description: "Todo lo que necesitas para mudarte a Bulgaria en 2026: opciones de residencia, bajo impuesto fijo, coste de vida, sanidad y banca, todo en un solo lugar." },
    pt: { title: "Mudar para a Bulgária em 2026 | Visto, Impostos e Custo de Vida | Relocate2Day", description: "Tudo o que precisa para se mudar para a Bulgária em 2026: opções de residência, imposto fixo baixo, custo de vida, saúde e banca, tudo num só lugar." },
    zh: { title: "2026年移居保加利亚指南 | 签证、税务与生活成本 | Relocate2Day", description: "移居保加利亚所需了解的一切：居留选择、低税率、生活成本、医疗与银行服务，一站式指南。" },
  },
  greece: {
    en: { title: "Moving to Greece in 2026 | Visa, Taxes & Cost of Living | Relocate2Day", description: "Everything you need to move to Greece in 2026: residency routes, tax incentives, cost of living, healthcare, and banking, all in one place." },
    es: { title: "Mudarse a Grecia en 2026 | Visado, Impuestos y Coste de Vida | Relocate2Day", description: "Todo lo que necesitas para mudarte a Grecia en 2026: vías de residencia, incentivos fiscales, coste de vida, sanidad y banca, todo en un solo lugar." },
    pt: { title: "Mudar para a Grécia em 2026 | Visto, Impostos e Custo de Vida | Relocate2Day", description: "Tudo o que precisa para se mudar para a Grécia em 2026: vias de residência, incentivos fiscais, custo de vida, saúde e banca, tudo num só lugar." },
    zh: { title: "2026年移居希腊指南 | 签证、税务与生活成本 | Relocate2Day", description: "移居希腊所需了解的一切：居留途径、税收优惠、生活成本、医疗与银行服务，一站式指南。" },
  },
  netherlands: {
    en: { title: "Moving to the Netherlands in 2026 | Visa, Taxes & Cost of Living | Relocate2Day", description: "Everything you need to move to the Netherlands in 2026: visa options, the 30% ruling, cost of living, healthcare, and banking, all in one place." },
    es: { title: "Mudarse a los Países Bajos en 2026 | Visado, Impuestos y Coste de Vida | Relocate2Day", description: "Todo lo que necesitas para mudarte a los Países Bajos en 2026: opciones de visado, la regla del 30%, coste de vida, sanidad y banca, todo en un solo lugar." },
    pt: { title: "Mudar para os Países Baixos em 2026 | Visto, Impostos e Custo de Vida | Relocate2Day", description: "Tudo o que precisa para se mudar para os Países Baixos em 2026: opções de visto, o regime dos 30%, custo de vida, saúde e banca, tudo num só lugar." },
    zh: { title: "2026年移居荷兰指南 | 签证、税务与生活成本 | Relocate2Day", description: "移居荷兰所需了解的一切：签证选择、30%税收优惠政策、生活成本、医疗与银行服务，一站式指南。" },
  },
  romania: {
    en: { title: "Moving to Romania in 2026 | Visa, Taxes & Cost of Living | Relocate2Day", description: "Everything you need to move to Romania in 2026: residency options, low cost of living, tax rules, healthcare, and banking, all in one place." },
    es: { title: "Mudarse a Rumanía en 2026 | Visado, Impuestos y Coste de Vida | Relocate2Day", description: "Todo lo que necesitas para mudarte a Rumanía en 2026: opciones de residencia, bajo coste de vida, normas fiscales, sanidad y banca, todo en un solo lugar." },
    pt: { title: "Mudar para a Roménia em 2026 | Visto, Impostos e Custo de Vida | Relocate2Day", description: "Tudo o que precisa para se mudar para a Roménia em 2026: opções de residência, baixo custo de vida, regras fiscais, saúde e banca, tudo num só lugar." },
    zh: { title: "2026年移居罗马尼亚指南 | 签证、税务与生活成本 | Relocate2Day", description: "移居罗马尼亚所需了解的一切：居留选择、低生活成本、税务规定、医疗与银行服务，一站式指南。" },
  },
};

const HOME_METADATA: Record<LocaleCode, CountryMeta> = {
  en: { title: "Relocate2Day | Compare Visas, Taxes & Cost of Living Across Europe", description: "Thinking of moving to Europe? Compare countries, understand your visa options and plan your relocation, all in one place." },
  es: { title: "Relocate2Day | Compara Visados, Impuestos y Coste de Vida en Europa", description: "¿Piensas mudarte a Europa? Compara países, entiende tus opciones de visado y planifica tu mudanza, todo en un solo lugar." },
  pt: { title: "Relocate2Day | Compare Vistos, Impostos e Custo de Vida na Europa", description: "A pensar em mudar-se para a Europa? Compare países, perceba as suas opções de visto e planeie a sua mudança, tudo num só lugar." },
  zh: { title: "Relocate2Day | 比较欧洲各国签证、税务与生活成本", description: "考虑移居欧洲？比较各国、了解签证选择并规划您的搬迁，一站式解决。" },
};

export function getCountryMetadata(country: string, locale: string): CountryMeta {
  const loc = (["en", "es", "pt", "zh"].includes(locale) ? locale : "en") as LocaleCode;
  const entry = COUNTRY_METADATA[country];
  if (!entry) return HOME_METADATA[loc];
  return entry[loc];
}

export function getHomeMetadata(locale: string): CountryMeta {
  const loc = (["en", "es", "pt", "zh"].includes(locale) ? locale : "en") as LocaleCode;
  return HOME_METADATA[loc];
}
