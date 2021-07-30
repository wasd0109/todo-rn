import { ParamListBase, Route } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Scene } from "@react-navigation/stack/lib/typescript/src/types";

interface AppBarProps {
  navigation: StackNavigationProp<ParamListBase, string>;
  previous: Scene<Route<string, object | undefined>> | undefined;
  scene: Scene<Route<string, object | undefined>> | undefined;
}

export { AppBarProps };
