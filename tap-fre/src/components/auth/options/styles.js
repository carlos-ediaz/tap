import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 999,
    bottom: 0,
    padding: 5,
    right: 0,
    flex: 1,
    backgroundColor: "#075E54",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneNumber: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  whatsLogo: {
    padding: 5,
  },
});
export default styles;
