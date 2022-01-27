import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Reactotron from "reactotron-react-native";

import { parse } from 'fast-xml-parser';


class FirstScreen extends React.Component {
  componentDidMount = async () => {

    const response = await fetch('https://services.odata.org/V2/Northwind/Northwind.svc/Customers');
    let textResponse = await response.text();
    Reactotron.log(textResponse);
    let obj = parse(textResponse);
    Reactotron.log(obj);
  };

  render() {
    Reactotron.log("TYT2");
    return (
      <View style={styles.container}>
        <Text>Hello test proj!</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
