import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

const FirstScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="My profile"
        onPress={() => navigation.navigate("MyProfile")}
      />
      <Button
        title="Product Categories"
        onPress={() => navigation.navigate("Product Categories")}
      />
      <Button
        title="Customers"
        onPress={() => navigation.navigate("Customers")}
      />
      <StatusBar style="auto" />
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
