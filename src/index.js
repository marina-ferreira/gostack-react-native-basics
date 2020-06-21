import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from 'react-native'

import api from './services/api'

const App = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data)
    })
  }, [])

  const handleCreateProject = async () => {
    const project = {
      title: `New Project ${Date.now()}`,
      owner: 'Marina Ferreira'
    }

    const response = await api.post('/projects', project)
    setProjects([...projects, response.data])
  }

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

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={handleCreateProject}
        >
          <Text style={styles.buttonText}>Add Project</Text>
        </TouchableOpacity>
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
  },
  button: {
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
