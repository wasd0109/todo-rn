import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/ReactNavigationType";

type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Detail"
>;
type DetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

export type DetailScreenProps = {
  navigation: DetailScreenNavigationProp;
  route: DetailScreenRouteProp;
};
