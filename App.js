import{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput,  FlatList } from 'react-native';
import {StatusBar} from 'expo-status-bar';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  
  function startAddGoalHandler() {
    setModalIsVisible(true);
  }
  function endAddGoalHandler() {
    setModalIsVisible(false);
  }
  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [...currentCourseGoals, {text:enteredGoalText, key: Math.random().toString() }]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id){
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }
  return (
    <>
    <StatusBar style='light'/>
    <View style={styles.appContainer}>
      <Button title = 'Add New Goal' color={'#5e0acc'} onPress={startAddGoalHandler}/>
      <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onDeleteItem={deleteGoalHandler} onCancel={endAddGoalHandler}/>
      <View style={styles.goalsContainer}>
        <FlatList data={courseGoals} renderItem={(itemData) => {
          return <GoalItem text = {itemData.item.text} id={itemData.item.id} onDeleteItem={deleteGoalHandler}/>
          }}/> 
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer:{
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor:'#1e085a'
  },
  goalsContainer:{
    flex: 5,
  },
  
});
