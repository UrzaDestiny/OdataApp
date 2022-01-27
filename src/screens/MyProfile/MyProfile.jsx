import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const MyProfile = () => {
  return (
    <View style={styles.container}>
      <Text>First name</Text>
      <Text>Last name</Text>
      <Image source={require("../../../assets/profileImage.png")} />
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
