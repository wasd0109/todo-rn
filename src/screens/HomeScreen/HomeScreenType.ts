import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/ReactNavigationType";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};
