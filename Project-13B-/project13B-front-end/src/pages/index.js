import React, { useState } from "react"
import { useQuery, gql, useMutation } from "@apollo/client"
import shortid from "shortid"
import './style.css'

const GET_BOOKS = gql`
  query {
    getBookmark {
      id
      title
      url
    }
  }
`
const CREATE_BOOKS = gql`
  mutation createBookmark($bookmarks: BookInput!) {
    addBookmark(bookmarks: $bookmarks) {
      id
      title
      url
    }
  }
`

const DELETE_BOOKS = gql`
  mutation deleteBookmark($bookId: String!) {
    deleteBookmark(bookId: $bookId)
  }
`

export default function Home() {
  const [title, setTitle] = useState("")
  const [bookurl, setBookurl] = useState("")

  const { loading, error, data } = useQuery(GET_BOOKS)
  //console.log("data",data)
  const [createlibrary] = useMutation(CREATE_BOOKS)
  const [deletelibrary] = useMutation(DELETE_BOOKS)

  const handleSubmit = async () => {
    const bookmarks = {
      id: shortid.generate(),
      title: title,
      url: bookurl,
    }
    setTitle("")
    setBookurl("")

    await createlibrary({
      variables: {
        bookmarks,
      },
      refetchQueries: [{ query: GET_BOOKS }],
    })
  }

  const handleDelete = id => {
    deletelibrary({
      variables: {
        bookId: id,
      },
      refetchQueries: [{ query: GET_BOOKS }],
    })
  }

  return (
    <div className="container">
      {loading && <h1>loading...</h1>}
      {error && <h1>new error</h1>}
         
      <h2>ADD NEW BOOKMARK</h2>

      <label>
        BOOK NAME
        <input
          type="text"
          onChange={({ target }) => setTitle(target.value)}
          value={title}
        />{" "}
        <br />
        BOOK URL
        <input
          type="text"
          onChange={({ target }) => setBookurl(target.value)}
          value={bookurl}
        />
      </label>
      <br />
      <button onClick={() => handleSubmit()}>ADD BOOK</button>
        <div className='card-container'>
      {!loading &&
        data &&
        data.getBookmark.map(item => (
          <div style={{ marginLeft: "1rem", marginTop: "2rem" }} key={item.id}>
            id: {item.id} title: {item.title} url:
            {item.url}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
        </div>
    </div>
  )
}
