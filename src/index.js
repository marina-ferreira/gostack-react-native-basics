import React, { useState, useEffect } from 'react'
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar } from 'react-native'

import api from './services/api'

const App = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data)
    })
  }, [])

  return (
    <>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.title}>{project.title}</Text>
          )}
        />
      </SafeAreaView>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  title: {
    color: '#f5f5f5',
    fontSize: 32,
    fontWeight: 'bold'
  }
})
