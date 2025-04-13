import React, { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

type Props = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
}>;

const Dialog = ({ open, onClose, children }: Props) => {
  return (
    <ThemedView style={styles.centeredView}>
      <Modal isVisible={open}>
        <ThemedView style={styles.children}>{children}</ThemedView>
        <ThemedView style={styles.footer}>
          <TouchableOpacity onPress={onClose}>
            <ThemedText type="link">Close</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
};

export default Dialog;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  children: {
    padding: 16,
  },
  footer: {
    padding: 16,
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
});
