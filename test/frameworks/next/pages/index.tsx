import { useState } from "react"
import { api } from "../../../api"

const [catNoise, setCatNoise] = useState('')
api.cat.meow().then(([value]) => setCatNoise(String(value)))

export default function Home() {
  return (
    <div>
      Hello. {catNoise}
    </div>
  )
}
