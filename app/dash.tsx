import React, { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";



const colors = {
  background: "#0B1E39",
  card: "#142D4C",
  primary: "#5AD4E2",
  secondary: "#7EE3F2",
  text: "#FFFFFF",
  subtext: "#94A3B8",
  border: "#1E3A5F",
};

const POPULARES_BASE = [
  { label: "Front-End", value: 38, color: colors.primary },
  { label: "Data Science", value: 27, color: colors.secondary },
  { label: "DevOps", value: 18, color: "#A5F3FC" },
  { label: "Mobile", value: 17, color: "#2DD4BF" },
];

const CONCLUSOES_CURSOS = ["React Native", "SQL Básico", "Java OO"] as const;
type CursoKey = (typeof CONCLUSOES_CURSOS)[number];
const CONCLUSOES_SERIES: Record<
  CursoKey,
  { concluidos: number[]; desistencias: number[]; labels: string[] }
> = {
  "React Native": {
    labels: ["S1", "S2", "S3", "S4", "S5", "S6"],
    concluidos: [12, 15, 17, 20, 22, 25],
    desistencias: [6, 5, 7, 6, 5, 4],
  },
  "SQL Básico": {
    labels: ["S1", "S2", "S3", "S4", "S5", "S6"],
    concluidos: [8, 10, 11, 12, 13, 15],
    desistencias: [4, 4, 5, 5, 5, 4],
  },
  "Java OO": {
    labels: ["S1", "S2", "S3", "S4", "S5", "S6"],
    concluidos: [6, 8, 9, 11, 12, 12],
    desistencias: [5, 6, 7, 7, 6, 6],
  },
};

const DIFICULDADE_MAP = {
  Basico: [
    { label: "HTML/CSS", value: 22 },
    { label: "Lógica I", value: 18 },
    { label: "Git & GitHub", value: 16 },
  ],
  Intermediario: [
    { label: "React Native", value: 19 },
    { label: "SQL Consultas", value: 17 },
    { label: "REST APIs", value: 14 },
  ],
  Avancado: [
    { label: "Java OO", value: 13 },
    { label: "Pipelines de Dados", value: 9 },
    { label: "Arquitetura", value: 8 },
  ],
} as const;
type NivelKey = keyof typeof DIFICULDADE_MAP;

const CATEGORIAS = [
  { key: "Dev", value: 45, color: colors.primary, topLessons: ["React Hooks", "TypeScript no React", "Testes RTL"] },
  { key: "Mobile", value: 25, color: colors.secondary, topLessons: ["Expo Router", "RN Animations", "Offline-first"] },
  { key: "Data", value: 20, color: "#A5F3FC", topLessons: ["Pandas Iniciante", "SQL Avançado", "Scikit-Learn"] },
  { key: "Design", value: 10, color: "#2DD4BF", topLessons: ["UI Fundamentals", "Figma Básico", "Design Tokens"] },
];

function Section({ title, desc, children }: React.PropsWithChildren<{ title: string; desc: string }>) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDesc}>{desc}</Text>
      {children}
    </View>
  );
}
function Legend({ items }: { items: { c: string; t: string }[] }) {
  return (
    <View style={styles.legend}>
      {items.map((it) => (
        <View key={it.t} style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: it.c }]} />
          <Text style={styles.legendText}>{it.t}</Text>
        </View>
      ))}
    </View>
  );
}
function Dropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.dropdown}>
      <Pressable style={styles.dropBtn} onPress={() => setOpen((v) => !v)} accessibilityRole="button">
        <Text style={styles.dropText}>{label}: {value}</Text>
        <Text style={styles.chevron}>{open ? "▲" : "▼"}</Text>
      </Pressable>
      {open && (
        <View style={styles.dropList}>
          {options.map((opt) => (
            <Pressable key={opt} onPress={() => { onChange(opt); setOpen(false); }} style={styles.dropItem}>
              <Text style={styles.dropItemText}>{opt}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

export default function Dash() {
  /** 1) Populares (pizza + simular hora) */
  const [populares, setPopulares] = useState(POPULARES_BASE);
  const popularesPie = useMemo(
    () =>
      populares.map((p) => ({
        value: p.value,
        color: p.color,
        text: `${p.value}%`,
      })),
    [populares]
  );
  const randomizePopulares = () => {
    // redistribui 100% aleatoriamente mantendo 4 categorias
    const r = [Math.random(), Math.random(), Math.random(), Math.random()];
    const sum = r.reduce((a, b) => a + b, 0);
    const vals = r.map((x) => Math.round((x / sum) * 100));
    // Ajuste para somar 100
    const diff = 100 - vals.reduce((a, b) => a + b, 0);
    vals[0] += diff;
    setPopulares((old) => old.map((o, i) => ({ ...o, value: Math.max(1, vals[i]) })));
  };

  /** 2) Conclusões x Desistências (área + dropdown + toggle) */
  const [cursoSel, setCursoSel] = useState<CursoKey>("React Native");
  const [visao, setVisao] = useState<"Concluídos" | "Desistências">("Concluídos");
  const serie = CONCLUSOES_SERIES[cursoSel];
  const areaData = (visao === "Concluídos" ? serie.concluidos : serie.desistencias).map((v, i) => ({
    value: v,
    label: serie.labels[i],
  }));

  /** 3) Dificuldade (barras + filtro nível) */
  const [nivel, setNivel] = useState<NivelKey>("Basico");
  const difData = DIFICULDADE_MAP[nivel].map((d) => ({ value: d.value, label: d.label }));

  /** 4) Categorias (pizza -> lista de aulas) */
  const [catAtiva, setCatAtiva] = useState(CATEGORIAS[0].key);
  const categoriasPie = CATEGORIAS.map((c) => ({
    value: c.value,
    color: c.color,
    text: `${c.value}%`,
    onPress: () => setCatAtiva(c.key),
  }));
  const aulasDaCategoria = CATEGORIAS.find((c) => c.key === catAtiva)?.topLessons ?? [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../assets/images/download.png")} style={styles.logo} resizeMode="contain" />
      <Text style={styles.header}>Dashboards</Text>
      <Text style={styles.subheader}>Visualizações inspiradas no layout enviado — dados simulados.</Text>

      {/* 1) Cursos mais Populares */}
      <Section
        title="Cursos mais Populares"
        desc="Mostra, de forma direta, quais cursos têm maior número de acessos. Quanto maior a fatia, maior a procura."
      >
        <PieChart
          data={popularesPie}
          donut
          showText
          textColor={colors.text}
          radius={90}
          innerRadius={55}
        />
        <Legend items={populares.map((p) => ({ c: p.color, t: p.label }))} />
        <Pressable onPress={randomizePopulares} style={styles.btn}>
          <Text style={styles.btnText}>Simular próxima hora</Text>
        </Pressable>
      </Section>

      {/* 2) Conclusões x Desistências */}
      <Section
        title="Conclusões x Desistências"
        desc="Compare o engajamento entre cursos em duas visões simples."
      >
        <View style={styles.rowBetween}>
          <Dropdown label="Curso" options={[...CONCLUSOES_CURSOS]} value={cursoSel} onChange={(v) => setCursoSel(v as CursoKey)} />
          <View style={styles.toggle}>
            {(["Concluídos", "Desistências"] as const).map((t) => {
              const active = visao === t;
              return (
                <Pressable key={t} onPress={() => setVisao(t)} style={[styles.toggleBtn, active && styles.toggleBtnActive]}>
                  <Text style={[styles.toggleText, active && styles.toggleTextActive]}>{t}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <LineChart
          data={areaData}
          width={undefined}
          height={220}
          noOfSections={5}
          areaChart
          startFillColor={visao === "Concluídos" ? colors.primary : "#DC2626"}
          endFillColor={visao === "Concluídos" ? colors.secondary : "#F87171"}
          startOpacity={0.7}
          endOpacity={0.25}
          yAxisColor={"transparent"}
          xAxisColor={"transparent"}
          rulesColor={colors.border}
          curved
          isAnimated
        />
      </Section>

      {/* 3) Dificuldade */}
      <Section
        title="Nível de Dificuldade"
        desc="Acessos por nível — Básico, Intermediário e Avançado."
      >
        <Dropdown
          label="Nível"
          options={["Basico", "Intermediario", "Avancado"]}
          value={nivel}
          onChange={(v) => setNivel(v as NivelKey)}
        />
        <BarChart
          data={difData}
          barWidth={28}
          spacing={14}
          noOfSections={5}
          yAxisColor={"transparent"}
          xAxisColor={"transparent"}
          frontColor={colors.secondary}
          rulesColor={colors.border}
          isAnimated
        />
      </Section>

      {/* 4) Categorias */}
      <Section
        title="Categorias"
        desc="Selecione uma área e veja as aulas mais acessadas."
      >
        <PieChart
          data={categoriasPie}
          donut
          showText
          textColor={colors.text}
          radius={90}
          innerRadius={55}
          focusOnPress
        />
        <Legend items={CATEGORIAS.map((c) => ({ c: c.color, t: c.key }))} />
        <View style={styles.lessonBox}>
          <Text style={styles.lessonTitle}>Mais acessadas em {catAtiva}</Text>
          {aulasDaCategoria.map((a) => (
            <Text key={a} style={styles.lessonItem}>• {a}</Text>
          ))}
        </View>
      </Section>
    </ScrollView>
  );
}

/** ------------------- ESTILOS ------------------- **/
const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.background },
  logo: { alignSelf: "center", width: 220, height: 110, marginBottom: 10 },
  header: { fontSize: 24, fontWeight: "800", color: colors.text, textAlign: "center" },
  subheader: { fontSize: 14, color: colors.subtext, textAlign: "center", marginBottom: 16 },

  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: "800", marginBottom: 6 },
  cardDesc: { color: colors.secondary, fontSize: 13, marginBottom: 8 },

  legend: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 8, marginBottom: 4 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { color: colors.subtext, fontSize: 12 },

  btn: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  btnText: { color: colors.background, fontWeight: "800" },

  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 },
  toggle: { flexDirection: "row", backgroundColor: "#0F2746", borderRadius: 999, overflow: "hidden" },
  toggleBtn: { paddingVertical: 8, paddingHorizontal: 12 },
  toggleBtnActive: { backgroundColor: "#102C53" },
  toggleText: { color: colors.subtext, fontWeight: "700", fontSize: 12 },
  toggleTextActive: { color: colors.text },

  dropdown: { marginBottom: 8 },
  dropBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    backgroundColor: "#0F2746", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10,
  },
  dropText: { color: colors.text, fontWeight: "700" },
  chevron: { color: colors.secondary, fontWeight: "900" },
  dropList: {
    marginTop: 6, backgroundColor: "#0F2746", borderRadius: 12, borderWidth: 1, borderColor: colors.border,
  },
  dropItem: { paddingVertical: 10, paddingHorizontal: 12 },
  dropItemText: { color: colors.subtext, fontWeight: "700" },

  lessonBox: {
    marginTop: 10, backgroundColor: "#0F2746", borderRadius: 12, padding: 12,
  },
  lessonTitle: { color: colors.text, fontWeight: "800", marginBottom: 6 },
  lessonItem: { color: colors.subtext, marginBottom: 2 },
});
