import React from "react";
import { View, Text } from "react-native";

import DataEntryComponent from "@/utils/components/dataEntry";

const modal = () => {
  return (
    <View style={{ flex: 1 }}>
      <DataEntryComponent />
    </View>
  );
};

export default modal;
