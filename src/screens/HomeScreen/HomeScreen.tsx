import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import {
  List,
  Divider,
  IconButton,
  ActivityIndicator,
  Banner,
  FAB,
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
      <FAB
        style={styles.addBtnStyle}
        icon="plus"
        accessibilityLabel="Add button"
        onPress={() => navigation.navigate("AddTodo")}
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
  addBtnStyle: { position: "absolute", margin: 40, right: 0, bottom: 0 },
});
