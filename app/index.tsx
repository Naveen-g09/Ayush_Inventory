import NoConnection from "@/components/screens/NoConnection";
import useInternet from "@/utils/hooks/useInternet";
import { Redirect } from "expo-router";
import { View, Text } from "react-native";
import React from 'react'

const index = () => {
 const { isConnected } = useInternet();
    if (isConnected === null) {
    return <Text>Loading...</Text>;
    }
    if (!isConnected) {
    return <NoConnection />;
    }
    return <Redirect href={'/(tabs)/'} />;
}

export default index