import React, { useRef, useState } from "react"
import { useQuery, gql, useMutation } from "@apollo/client"
//import gql from 'graphql-tag';
import { navigate } from "gatsby"
import Lolly from "./lolly"
import shortid from "shortid"

const GET_LOLLY = gql`
  query {
    getLolly {
      id
      c1
      c2
      c3
      rec
      sennder
      msg
      link
    }
  }
`

const ADD_LOLLY = gql`
  mutation addLolly($lollys: LollyInput!) {
    addLolly(lollys: $lollys) {
      id
      c1
      c2
      c3
      rec
      sennder
      msg
      link
    }
  }
`

export default function Home() {
  const [c1, setC1] = useState("#deaa43")
  const [c2, setC2] = useState("#e95946")
  const [c3, setC3] = useState("#d52358")
  const { loading, data } = useQuery(GET_LOLLY)

  console.log("loading", loading)
  console.log("data", data)
  const [createLolly] = useMutation(ADD_LOLLY)

  const handleSubmit = () => {
    console.log(senderField.current.value)
    console.log(msgField.current.value)
    console.log(receiverField.current.value)

    const lollys = {
      id: shortid.generate(),
      c1: c1,
      c2: c2,
      c3: c3,
      rec: receiverField.current.value,
      sennder: senderField.current.value,
      msg: msgField.current.value,
      link: shortid.generate(),
    }
    createLolly({
      variables: {
        lollys: lollys,
      },
    })
    navigate("/Detail")
  }

  const senderField = useRef()
  const receiverField = useRef()
  const msgField = useRef()

  return (
    <div>
      <div className="container">
        <h1>CREATE LOLLY</h1>
        <div className="main-container">
          <div>
            <Lolly top={c1} middle={c2} bottom={c3} />
            <br />
            <input
              type="color"
              value={c1}
              onChange={e => setC1(e.target.value)}
            />
            <input
              type="color"
              value={c2}
              onChange={e => setC2(e.target.value)}
            />
            <input
              type="color"
              value={c3}
              onChange={e => setC3(e.target.value)}
            />
          </div>

          <div className="form-container">
            <input type="text" placeholder="To" ref={receiverField} />
            <textarea
              placeholder="Enter YOur Message"
              ref={msgField}
            ></textarea>
            <input type="text" placeholder="Form" ref={senderField} />

            <button onClick={handleSubmit}>Freeze Lolly</button>
          </div>
        </div>
      </div>
    </div>
  )
}
