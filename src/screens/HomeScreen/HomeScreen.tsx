import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import {
  List,
  Divider,
  Provider,
  IconButton,
  ActivityIndicator,
  Banner,
  Text,
} from "react-native-paper";

import { HomeScreenProps } from "./HomeScreenType";
import db from "../../utils/fbinit";
import { Todo } from "../../slices/todoSlices";
import useFBGetAll from "../../api/useFBGetAll";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [shouldRefetch, refetch] = useState({});
  const { loading, data, error } = useFBGetAll("todos", shouldRefetch);

  if (loading) {
    return (
      <View style={styles.spinnerContainerStyle}>
        <ActivityIndicator testID="spinner" size="large" />
      </View>
    );
  }
  return (
    <>
      {error ? (
        <Banner
          visible={true}
          actions={[
            {
              label: "Reload",
              onPress: () => refetch({}),
            },
          ]}
        >
          There was a problem loading the todo list
        </Banner>
      ) : null}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <>
              <List.Item
                title={item.title}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon="dots-horizontal"
                    onPress={() =>
                      navigation.navigate("Detail", { id: item.id })
                    }
                    accessibilityLabel="more-button"
                  />
                )}
              />
              <Divider />
            </>
          );
        }}
      />
    </>
  );
};

//

export default HomeScreen;

const styles = StyleSheet.create({
  spinnerContainerStyle: {
    justifyContent: "center",
    flex: 1,
  },
});
