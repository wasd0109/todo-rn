import React, { useState } from "react";
import { Text, Button, TextInput, View } from "react-native";
import useFBGetAll from "./useFBGetAll";

function UseFBGetAllTest() {
  const [collectionName, setCollectionName] = useState("");
  const [value, setValue] = useState("");
  const [shouldRefetch, refresh] = useState({});
  const { data, error, loading } = useFBGetAll(collectionName, shouldRefetch);

  const handleRefresh = () => {
    refresh({});
  };

  return (
    <View>
      <TextInput
        placeholder="Collection"
        value={collectionName}
        onChangeText={(text) => setValue(text)}
      />
      <Text>{JSON.stringify(data)}</Text>
      <Text>{error}</Text>
      <Text>{loading}</Text>
      <Button title="Submit" onPress={() => setCollectionName(value)} />
      <Button title="Refresh" onPress={handleRefresh} />
    </View>
  );
}

export default UseFBGetAllTest;
