import React, { useEffect, useState } from "react"
import { useQuery, gql, useMutation } from "@apollo/client"
import shortid from "shortid"

const GET_TODOS = gql`
  query {
    getTodos {
      id
      title
      done
    }
  }
`
const CREATE_TODO = gql`
  mutation createTodo($todo: TodoInput!) {
    addTodo(todo: $todo) {
      id
      title
      done
    }
  }
`
const UPDATE_TODO = gql`
  mutation updateTodo($todo: TodoInput!) {
    updateTodo(todo: $todo) {
      id
      title
      done
    }
  }
`

const DELETE_TODO = gql`
  mutation deleteTodo($todoId: String!) {
    deleteTodo(todoId: $todoId)
  }
`

const Index = () => {
  const [title, setTitle] = useState("")
  const { data, loading } = useQuery(GET_TODOS)
  console.log("loading", loading) //if data is not found loading is true .when data found loading false
  console.log("data", data) // data
  const [createNote] = useMutation(CREATE_TODO)
  const [deleteNote] = useMutation(DELETE_TODO)
  const [updateNote] = useMutation(UPDATE_TODO)

  const handleSubmit = async () => {
    const todo = {
      id: shortid.generate(),
      title: title,
      done: true,
    }
    console.log("Creating Todo:", todo)
    setTitle("")
    await createNote({
      variables: {
        todo,
      },
      refetchQueries: [{ query: GET_TODOS }], //this refetching the date without screen refresh
    })
  }

  const handleDelete = id => {
    deleteNote({
      variables: {
        todoId: id,
      },
      refetchQueries: [{ query: GET_TODOS }],
    })
  }

  const handleUpdate = async item => {
    const todo = {
      id: item.id,
      title: item.title,

      done: item.done,
    }

    await updateNote({
      variables: {
        todo,
      },
      refetchQueries: [{ query: GET_TODOS }],
    })
    setTitle("")
  }

  return (
    <div>
      {loading && <h1>Loading ...</h1>}
      <label>
        Todo:
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </label>
      <button onClick={() => handleSubmit()}>Create Todo</button>
      {!loading &&
        data &&
        data.getTodos.map(item => (
          <div style={{ marginLeft: "1rem", marginTop: "2rem" }} key={item.id}>
            id: {item.id} title: {item.title} boolean:
            {item.done ? "DONE" : "NOT COMPLETED"}
            <button onClick={() => handleDelete(item.id)}>delete</button>
            <button onClick={() => handleUpdate(item)}>update</button>
          </div>
        ))}
    </div>
  )
}

export default Index
