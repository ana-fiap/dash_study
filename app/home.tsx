import React, { useMemo } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

type DashKey = "populares" | "conclusoes" | "dificuldade" | "categorias";

const colors = {
  background: "#0B1E39",
  card: "#142D4C",
  cardAlt: "#1A3B63",
  primary: "#5AD4E2",
  secondary: "#7EE3F2",
  text: "#FFFFFF",
  subtext: "#94A3B8",
  border: "#1E3A5F",
};

const CARDS: { key: DashKey; title: string; description: string }[] = [
  {
    key: "populares",
    title: "Cursos mais Populares",
    description:
      "Mostra, de forma direta, quais cursos têm maior número de acessos, ajudando o aluno a decidir rapidamente por onde começar. A leitura é intuitiva: quanto maior o valor apresentado para um curso, maior a procura.",
  },
  {
    key: "conclusoes",
    title: "Conclusões x Desistências",
    description:
      "Compara o engajamento entre cursos a partir de duas visões simples: os mais concluídos e os mais abandonados. Serve para orientar escolhas mais seguras e identificar conteúdos que podem exigir preparo extra.",
  },
  {
    key: "dificuldade",
    title: "Nível de Dificuldade",
    description:
      "Apresenta acessos agrupados por nível — Básico, Intermediário e Avançado — permitindo ao aluno alinhar a trilha de estudos à sua maturidade atual.",
  },
  {
    key: "categorias",
    title: "Cursos por Categoria",
    description:
      "Organiza os cursos por áreas como Dev, Mobile, Data e Design, oferecendo busca e seleção rápida de categorias. Útil para mapear tendências e identificar “âncoras” de cada domínio.",
  },
];

export default function Home() {
  const cards = useMemo(() => CARDS, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo superior centralizada */}
      <Image
        source={require("../assets/images/download.png")}
        style={styles.logo}
        resizeMode="contain"
        accessible
        accessibilityLabel="StudyDash - logo"
      />

      <Text style={styles.header}>StudyDash — Resumos</Text>
      <Text style={styles.subheader}>
        Painel informativo com visão geral dos dashboards.
      </Text>

      {/* Cards empilhados, meramente informativos */}
      <View style={styles.list}>
        {cards.map((c, i) => (
          <View
            key={c.key}
            style={[
              styles.card,
              { backgroundColor: i % 2 === 0 ? colors.card : colors.cardAlt },
            ]}
          >
            <View style={styles.accent} />
            <Text style={styles.cardTitle}>{c.title}</Text>
            <Text style={styles.cardDesc}>{c.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  logo: {
    alignSelf: "center",
    width: 220,
    height: 110,
    marginTop: 8,
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
  },
  subheader: {
    fontSize: 14,
    color: colors.subtext,
    marginBottom: 14,
  },
  list: {
    gap: 12,
  },
  card: {
    borderRadius: 16,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  accent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    backgroundColor: colors.primary,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 10,
    marginBottom: 6,
  },
  cardDesc: {
    color: colors.secondary,
    fontSize: 13,
    lineHeight: 19,
    marginLeft: 10,
  },
});
