import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/ReactNavigationType";

type AddTodoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddTodo"
>;

export type AddTodoScreenProps = {
  navigation: AddTodoScreenNavigationProp;
};
