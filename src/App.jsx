import { useState } from "react"
import "./scss/index.scss"

export default function App() {
  // thumb is the base64 converted string
  const [thumb, setThumb] = useState(undefined)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState("idle") // idle, loading, error, success

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
      if (!allowedTypes.includes(file.type)) {
        window.alert("Only jpg & png image files are allowed!")
        return
      }
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleUpload = (event) => {
    // Do something with this file
    getBase64(event.currentTarget.files[0]).then((imageData) => {
      return setThumb(imageData)
    })
  }

  return (
    <div className="app">
      <h1>YouTube Thumbnail Previewer</h1>
      <p>See how your thumbnail will look like across YouTube</p>
      <form>
        <label htmlFor="thumb">Upload your YouTube thumbnail</label>
        <input type="file" name="thumb" id="thumb" onChange={handleUpload} />
      </form>

      {/* preview area will go here... */}
      {thumb && <img src={thumb} width={300} />}
    </div>
  )
}
