import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import Reactotron from "reactotron-react-native";
import { XMLParser } from "fast-xml-parser";

const ProductCategories = () => {
  const [catigories, setCatigories] = useState([]);
  const [content, setContent] = useState({});

  const getData = async () => {
    try {
      const parser = new XMLParser();
      const response = await fetch(
        "https://services.odata.org/V2/Northwind/Northwind.svc/Categories?$expand=Products"
      );
      let textResponse = await response.text();
      let obj = parser.parse(textResponse);
      await setCatigories(obj.feed.entry);
      Reactotron.log(catigories);
      await setContent(obj.feed.entry[0].content["m:properties"]);
      Reactotron.log(content);
    } catch (error) {
      Reactotron.error(error);
    }
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