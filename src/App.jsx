import { useState } from "react"
import "./scss/index.scss"
import LogoDesktop from "./img/logo-desktop.png"
import SliceHeader from "./img/slice-header.png"
import SliceSidebar from "./img/slice-sidebar.png"

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

      <div className="desktop">
        <div className="desktop__header">
          {/* <div className="desktop__header__logo">
            <img src={LogoDesktop} alt="YouTube Logo" />
          </div> */}
          <img src={SliceHeader} />
        </div>
        <div className="desktop__main">
          <div className="desktop__main__sidebar">
            <img src={SliceSidebar} />
          </div>
          <div className="desktop__main__content">
            {/* preview area will go here... */}
            {thumb && <img src={thumb} width={192} />}
          </div>
        </div>
      </div>
      <hr />
      <p>play with the source code on Github 👇</p>
      <p>
        <a
          href="https://github.com/tamalweb/yt-thumb-previewer"
          target="_blank"
        >
          github.com/tamalweb/yt-thumb-previewer
        </a>
      </p>
    </div>
  )
}
