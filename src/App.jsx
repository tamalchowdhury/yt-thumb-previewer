import { useState } from "react"
import "./scss/index.scss"
import LogoDesktop from "./img/logo-desktop.png"
import SliceHeader from "./img/slice-header.png"
import SliceSidebar from "./img/slice-sidebar.png"
import SampleThumbnail1 from "./img/sample1.jpg"
import SampleLogo1 from "./img/samplelogo.jpg"

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
            {thumb && <Video thumb={thumb} />}
            <Video />
            <Video />
            <Video />
            <Video />
            <Video />
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

function Video({ thumb }) {
  return (
    <>
      <div className="video">
        <div className="video_thumbnail">
          {thumb ? <img src={thumb} /> : <img src={SampleThumbnail1} />}
        </div>
        <div className="video__meta">
          <div className="video__meta__logo">
            <img src={SampleLogo1} alt="" />
          </div>
          <div className="video__meta__texts">
            <div className="video__meta__title">My Video Title</div>
            <div className="video__meta__channel_name">Channel Name</div>
            <div className="video__meta__stats">125K views . 1 day ago</div>
          </div>
        </div>
      </div>
    </>
  )
}
