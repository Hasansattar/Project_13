import React from "react"
import Lolly from "./lolly"
import { useQuery, gql } from "@apollo/client"
import { navigate } from "gatsby"
import "./style.css"

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
export default function Detail() {
  const { loading, error, data } = useQuery(GET_LOLLY)
  console.log("queary data", data)
  if (loading) return <h2>loading..</h2>
  if (error) return <h2>error</h2>
  return (
    <>
      <div>
        <h1>Share lolly with this link:</h1>
        {data.getLolly.map((d, i) => {
          console.log(d)

          return (
            <>
              <div className="container-lolly">
                <div key={d.id} className="display-lolly">
                  <div className="lol">
                    <Lolly top={d.c1} middle={d.c2} bottom={d.c3} />
                    <h1>{`http://localhost:8888/${d.link}`}</h1>
                  </div>
                  <div className="resultCard">
                    <p className="reciever">To:{d.rec}</p>
                    <p className="message">Message:{d.msg}</p>
                    <p className="sender">From:{d.sennder}</p>
                  </div>
                </div>
              </div>{" "}
            </>
          )
        })}

        <button onClick={() => navigate("/Home")}>Go Back</button>
      </div>
    </>
  )
}
