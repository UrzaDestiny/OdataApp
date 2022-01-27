import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Reactotron from "reactotron-react-native";
import { XMLParser } from "fast-xml-parser";
import Geocoder from "react-native-geocoding";
import Geolocation from '@react-native-community/geolocation';

Geocoder.init("AIzaSyA-B1CGynFhr6DbXybc-WgRZ6TTMq02zXQ");

Geocoder.from("Colosseum")
  .then((json) => {
    var location = json.results[0].geometry.location;
    Reactotron.log(location);
  })
  .catch((error) => Reactotron.warn(error));

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  const getData = async () => {
    try {
      const parser = new XMLParser();
      const response = await fetch(
        "https://services.odata.org/V2/Northwind/Northwind.svc/Customers"
      );
      let textResponse = await response.text();
      let obj = parser.parse(textResponse);
      Reactotron.log(obj);
      await setCustomers([
        ...obj.feed.entry.map((key) => key.content["m:properties"]),
      ]);
      Reactotron.log(customers);
    } catch (error) {
      Reactotron.error(error);
    }
  };

  Geocoder.from("Obere Str. 57, Berlin")
    .then((json) => {
      var location = json.results[0].geometry.location;
    //   Reactotron.log(location);
    })
    .catch((error) => Reactotron.warn(error));

    Geolocation.getCurrentPosition(info => Reactotron.log(info));

//   Geolocation.getCurrentPosition(
//     (position) => {
//       const currentLongitude = JSON.stringify(position.coords.longitude);
//       Reactotron.log(currentLongitude);
//       const currentLatitude = JSON.stringify(position.coords.latitude);
//       Reactotron.log(currentLatitude);
//     },
//     (error) => alert(error.message),
//     {
//       enableHighAccuracy: true,
//       timeout: 20000,
//       maximumAge: 1000,
//     }
//   );

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {customers.map((customer) => (
        <View>
          <Text>{`${customer["d:CustomerID"]}`}</Text>
        </View>
      ))}
    </View>
  );
};

export default Customers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
