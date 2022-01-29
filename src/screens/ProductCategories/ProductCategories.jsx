import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import Reactotron from "reactotron-react-native";
import { XMLParser } from "fast-xml-parser";

const ProductCategories = () => {
  const [catigories, setCatigories] = useState([]);
  const [loading, setLoadingStatus] = useState(false);

  const getData = async () => {
    setLoadingStatus(true);
    try {
      const parser = new XMLParser();
      const response = await fetch(
        "https://services.odata.org/V2/Northwind/Northwind.svc/Categories?$expand=Products"
      );
      let textResponse = await response.text();
      let responseObject = parser.parse(textResponse);
      await setCatigories(responseObject.feed.entry);
    } catch (error) {
      Reactotron.error(error);
    }
    setLoadingStatus(false);
  };

  const countProductsNumber = (productsDiscription) =>
    productsDiscription.indexOf(",") !== -1
      ? productsDiscription.split(",").length
      : productsDiscription.split("and").length;

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator animating={loading} size="large" color="#0000ff" />
      {catigories.map((category) => (
        <View>
          <Text>{`${
            category.content["m:properties"]["d:CategoryName"]
          }: ${countProductsNumber(
            category.content["m:properties"]["d:Description"]
          )}`}</Text>
        </View>
      ))}
    </View>
  );
};

export default ProductCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
