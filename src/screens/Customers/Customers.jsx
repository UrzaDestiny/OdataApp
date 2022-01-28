import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Reactotron from "reactotron-react-native";
import { XMLParser } from "fast-xml-parser";
import Geocoder from "react-native-geocoding";
import Geolocation from "@react-native-community/geolocation";
import { getDistance } from "geolib";

import { requestPermissions } from "../../helpers/permissions";

Geocoder.init("xxxxxxxxxxxxxxxxxxxxxxxxxx");

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({});
  const [customerLocations, setCustomersLocations] = useState([]);
  const [distances, setDistances] = useState([]);

  const getData = async () => {
    try {
      const parser = new XMLParser();
      const response = await fetch(
        "https://services.odata.org/V2/Northwind/Northwind.svc/Customers"
      );
      let textResponse = await response.text();
      let obj = parser.parse(textResponse);
      await setCustomers([
        ...obj.feed.entry.map((key) => key.content["m:properties"]),
      ]);
    } catch (error) {
      Reactotron.error(error);
    }
  };

  const getAddressLocation = async (address) => {
    return Geocoder.from(address).then(
      (json) => json.results[0].geometry.location
    );
  };

  const getCustomersLocations = async () => {
    let res = [];
    try {
      for (const customer of customers) {
        res.push(
          await getAddressLocation(
            `${customer["d:City"]}, ${customer["d:Address"]}`
          )
        );
      }
    } catch (error) {
      Reactotron.error(error);
    }
    setCustomersLocations(res);
  };

  const getDistanceToLocations = async () => {
    let result = [];
    try {
      for (let customerLocation of customerLocations) {
        result.push(
          getDistance(
            {
              latitude: currentPosition.latitude,
              longitude: currentPosition.longitude,
            },
            {
              latitude: customerLocation.lat,
              longitude: customerLocation.lng,
            }
          )
        );
      }
    } catch (error) {
      Reactotron.error(error);
    }
    setDistances(result);
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition(position.coords);
      },
      () => {
        alert("Position could not be determined.");
      }
    );
  }, []);

  useEffect(() => {
    getData();
    getCustomersLocations();
    getDistanceToLocations();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        {customers.map((customer) => (
          <View>
            <Text>{`${customer["d:CustomerID"]}`}</Text>
          </View>
        ))}
      </View>
      <View>
        {distances.map((distance) => (
          <View>
            <Text>{`${distance / 1000} km`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Customers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
