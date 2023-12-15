import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "white",
  },
  uploadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputText: {
    paddingVertical: 10,
    marginRight: 20,
    fontSize: 20,
    flex: 1,
  },
  formContainer: {
    margin: 20,
    flexDirection: "row",
  },
  mediaPreview: {
    aspectRatio: 9 / 16,
    backgroundColor: "black",
    width: 100,
  },
  buttonsContainer: {
    marginHorizontal: 20,
    marginVertical: 20,

    flexDirection: "row",
  },
  cancelButton: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "black",
    marginHorizontal: 2,
  },
  cancelButtonText: {
    color: "white",
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 15,
  },
  postButton: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "gray",
    marginHorizontal: 2,
  },
  postButtonText: {
    color: "white",
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 15,
  },
  space: {
    flex: 1,
  },
});
export default styles;
