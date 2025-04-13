import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export function Collapsible({
  children,
  title,
  top,
  onMove,
  onClick,
  isOpen,
}: PropsWithChildren & {
  title: string;
  top: boolean;
  isOpen: boolean;
  onMove: () => void;
  onClick: () => void;
}) {
  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView style={styles.container}>
      <View style={styles.heading}>
        <TouchableOpacity
          style={styles.expandArea}
          onPress={onClick}
          activeOpacity={0.8}
        >
          <IconSymbol
            name="chevron.right"
            size={18}
            weight="medium"
            color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
            style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
          />
          <ThemedText type="defaultSemiBold" style={styles.title}>
            {title}
          </ThemedText>
        </TouchableOpacity>

        {!top && (
          <TouchableOpacity onPress={onMove} style={styles.moveButton}>
            <IconSymbol
              name="vertical.align.top"
              size={18}
              weight="medium"
              color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
            />
          </TouchableOpacity>
        )}
      </View>

      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
  },
  expandArea: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  title: {
    marginLeft: 8,
  },
  moveButton: {
    padding: 4,
    zIndex: 10,
  },
  content: {
    marginTop: 6,
    marginHorizontal: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
});
