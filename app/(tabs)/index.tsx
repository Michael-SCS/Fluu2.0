import FloatingAddButton from "@/components/FloatingAddButton";
import FocusSection from "@/components/FocusSection";
import HabitsSection from "@/components/HabitsSection";
import TasksSection from "@/components/TasksSection";
import { useHabitStore } from "@/store/habitStore";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Constantes de fecha ───────────────────────────────────────────────────────
const today = new Date();

const dateString = today.toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

// Íconos SVG-inline como texto Unicode para las tabs
const TAB_ICONS = ["✓", "◎", "⏱"];
const TAB_LABELS = ["Tasks", "Habits", "Focus"];

// ─── Componente principal ──────────────────────────────────────────────────────
export default function TodayScreen() {
  const pagerRef = useRef<PagerView>(null);
  const [page, setPage] = useState(1);

  // Animación del indicador deslizante de tabs
  const indicatorAnim = useRef(new Animated.Value(1)).current;

  const resetDailyProgress = useHabitStore((state) => state.resetDailyProgress);

  useEffect(() => {
    resetDailyProgress();
  }, []);

  // Navega a una página y anima el indicador
  const goToPage = (index: number) => {
    pagerRef.current?.setPage(index);
    setPage(index);
    Animated.spring(indicatorAnim, {
      toValue: index,
      useNativeDriver: false,
      tension: 60,
      friction: 10,
    }).start();
  };

  // Cuando el usuario swipea, sincronizamos el indicador
  const onPageSelected = (e: any) => {
    const pos = e.nativeEvent.position;
    setPage(pos);
    Animated.spring(indicatorAnim, {
      toValue: pos,
      useNativeDriver: false,
      tension: 60,
      friction: 10,
    }).start();
  };

  // El indicador ocupa 1/3 del ancho del contenedor de tabs
  const indicatorLeft = indicatorAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["0%", "33.33%", "66.66%"],
  });

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>

      {/* ── STATUS BAR visible con íconos oscuros sobre fondo claro ── */}
      <StatusBar style="dark" backgroundColor="#F5F6FA" translucent={false} />

      {/* ── ENCABEZADO ─────────────────────────────────────────────────── */}
      <View style={styles.headerContainer}>
        {/* Etiqueta pequeña de contexto */}
        <Text style={styles.overline}>MY DAY</Text>

        {/* Título principal */}
        <Text style={styles.header}>Today</Text>

        {/* Fecha con separador decorativo */}
        <View style={styles.dateRow}>
          <View style={styles.dateDot} />
          <Text style={styles.date}>{dateString}</Text>
        </View>
      </View>

      {/* ── TABS con indicador animado ──────────────────────────────────── */}
      <View style={styles.tabsWrapper}>
        <View style={styles.tabsContainer}>

          {/* Píldora deslizante de fondo (animated) */}
          <Animated.View style={[styles.tabIndicator, { left: indicatorLeft }]} />

          {/* Botones de tab */}
          {TAB_LABELS.map((label, index) => {
            const isActive = page === index;
            return (
              <TouchableOpacity
                key={label}
                style={styles.tabButton}
                onPress={() => goToPage(index)}
                activeOpacity={0.7}
              >
                {/* Ícono de tab */}
                <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
                  {TAB_ICONS[index]}
                </Text>
                {/* Etiqueta de tab */}
                <Text style={[styles.tabText, isActive && styles.activeText]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ── CONTENIDO paginado ─────────────────────────────────────────── */}
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={1}
        onPageSelected={onPageSelected}
      >
        <TasksSection key="1" />
        <HabitsSection key="2" />
        <FocusSection key="3" />
      </PagerView>

      {/* ── BOTÓN FLOTANTE de acción ───────────────────────────────────── */}
      <FloatingAddButton />

    </SafeAreaView>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({

  // Fondo general levemente cálido, lejos del blanco puro
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },

  // ── Encabezado ──────────────────────────────────────────────────────────────
  headerContainer: {
    paddingHorizontal: 28,
    paddingTop: 10,
    marginBottom: 20,
    //Centrar
    alignItems: "center",
  },

  // Etiqueta de contexto en mayúsculas pequeñas
  overline: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2.5,
    color: "#A78BFA",          // violeta suave — acento de marca
    marginBottom: 4,
    textTransform: "uppercase",
  },

  // Título grande y bold
  header: {
    fontSize: 40,
    fontWeight: "800",
    color: "#0F0F14",
    letterSpacing: -1.2,
    lineHeight: 44,
  },

  // Fila con punto decorativo + fecha
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 8,
  },

  // Punto de acento junto a la fecha
  dateDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#A78BFA",
  },

  date: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.2,
  },

  // ── Tabs ────────────────────────────────────────────────────────────────────
  tabsWrapper: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  // Contenedor de fondo con borde sutil
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#ECEEF5",
    borderRadius: 18,
    padding: 5,
    position: "relative",
    borderWidth: 1,
    borderColor: "#E2E4EE",
  },

  // Píldora animada de fondo para el tab activo
  tabIndicator: {
    position: "absolute",
    top: 5,
    bottom: 5,
    width: "33.33%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,

    // Sombra pronunciada para dar profundidad
    shadowColor: "#6D28D9",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  // Cada botón de tab ocupa 1/3 del espacio
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    gap: 2,
    zIndex: 1,             // encima del indicador para recibir toques
  },

  // Ícono Unicode pequeño arriba del label
  tabIcon: {
    fontSize: 13,
    color: "#9CA3AF",
  },

  tabIconActive: {
    color: "#7C3AED",      // violeta oscuro cuando está activo
  },

  tabText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9CA3AF",
    letterSpacing: 0.3,
  },

  activeText: {
    color: "#0F0F14",
  },

  // ── Paginador ───────────────────────────────────────────────────────────────
  pager: {
    flex: 1,
  },
});