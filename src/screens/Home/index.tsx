import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

type Task = {
  id: number;
  title: string;
  done: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [itemName, setItemName] = useState("");
  const totalItemsCreated = tasks.length;

  const doneComplete = tasks.filter((task) => { //retorna a contagem para marcar as tarefas conclúidas
    return task.done !== false;
  });

  function handleAddTask(newTaskTitle: string) {
    if (typeof newTaskTitle === "string" && newTaskTitle !== "") {
      const task: Task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      };

      setTasks((oldState) => [...oldState, task]);
      setItemName("");
    } else {
      Alert.alert("Opa", "Digite algo!");
    }
    console.log(itemName);
  }

  function handleToDoRemove(name: string) {
    setTasks((prevState) => prevState.filter((item) => item.title !== name));
  }

  function handleMarkTaskAsDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task })); // Para não perder a imutabilidade

    const taskToBeMarkedAsDone = updatedTasks.find((task) => task.id === id);

    if (!taskToBeMarkedAsDone) return;

    taskToBeMarkedAsDone.done = !taskToBeMarkedAsDone.done;
    setTasks(updatedTasks);
    console.log(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <View style={styles.image}>
            <Image source={require("../../../assets/logo.png")} />
          </View>
        </View>

        <View style={styles.headerContent}>
          <TextInput
            onChangeText={setItemName}
            value={itemName}
            style={styles.input}
            placeholder="Adicione uma nova tarefa"
            placeholderTextColor="#6B6B6B"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAddTask(itemName)}
          >
            <Image source={require("../../../assets/icon_button.png")} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentList}>
          <View style={styles.sectionState}>
            <View style={styles.counterStyle}>
              <Text style={styles.textStyle}>Criadas</Text>
              <View style={styles.numberSection}>
                <Text style={styles.numberStyle}>{totalItemsCreated}</Text>
              </View>
            </View>
            <View style={styles.counterStyle}>
              <Text style={styles.textStyle2}>Concluídas</Text>
              <View style={styles.numberSection}>
              <Text style={styles.numberStyle}>{doneComplete.length}</Text>
              </View>
            </View>
          </View>

          <FlatList
            ListEmptyComponent={() => (
              <>
                <View style={styles.separator} />
                <View style={styles.imageStyle}>
                  <Image
                    source={require("../../../assets/clipboard_icon.png")}
                  />
                </View>
                <Text style={styles.listEmptyText}>
                  Você ainda não tem tarefas cadastradas
                </Text>
                <Text style={styles.listEmptyText2}>
                  Crie tarefas e organize seus itens a fazer
                </Text>
              </>
            )}
            showsVerticalScrollIndicator={false}
            data={tasks}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View style={styles.box}>
                <View style={styles.icon}>
                  <TouchableOpacity
                    onPress={() => handleMarkTaskAsDone(item.id)}
                  >
                    <View
                      style={
                        item.done ? styles.taskMarkerDone : styles.taskMarker
                      }
                    >
                      {item.done && (
                        <MaterialIcons name="done" size={12} color="white" />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.card}>
                  <Text style={styles.textBox} key={item.id}>
                    {item.title}
                  </Text>
                </View>
                <View style={styles.icon2}>
                  <TouchableOpacity
                    onPress={() => handleToDoRemove(item.title)}
                  >
                    <Image source={require("../../../assets/trash_icon.png")} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}
