import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem";

export default function App() {
  const [todo, setTodo] = useState([
    { text: "Buy a coffee", key: "1" },
    { text: "Complete homework", key: "2" },
    { text: "Take key while go outside", key: "3" },
  ]);

  const pressHandler = (key) => {
    setTodo((prevTodos) => {
      return prevTodos.filter((todo) => todo.key != key);
    });
  };

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodo((prevTodos) => {
        return [{ text, key: Math.random().toString() }, ...prevTodos];
      });
    } else {
      Alert.alert("OOPS", "Todo must be over 3 characters long", [
        { text: "Understood", onPress: () => console.log("Alert Closed") },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log("Dismissed");
      }}
    >
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todo}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 40,
    flex: 1,
  },
  list: {
    marginTop: 20,
    flex: 1,
  },
});
