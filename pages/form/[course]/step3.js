import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Step3() {
  const router = useRouter()
  const { course, passFail } = router.query
  const [file, setFile]      = useState(null)

  const handleFileChange = e => {
    setFile(e.target.files[0])
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!file) return alert('Please attach your screenshot.')
    alert(`Submitting for ${course} (${passFail}) with file ${file.name}`)
  }

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <h1>Results | Aswini Bajaj</h1>
        <h2>{passFail==='Pass'?'Congratulations !!':"Let's work hard again !!"}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {passFail==='Pass' ? (
            <>
              <p>Very happy to hear about your results.</p>
              <p>Keep working hard and strive for greater success.</p>
              <p>
                cbt-candidate-path – 
                <a href="https://www.cfainstitute.org/-/media/documents/factsheet/cbt-candidate-pathing-infographic.pdf" target="_blank" rel="noopener noreferrer">
                  infographic PDF
                </a>
              </p>
              <p>
                Watch the 1st lecture on YouTube. The syllabus is lengthy. 
                <a href="https://www.youtube.com/channel/UCyt8himITSzSOU9ktWlxc8g/playlists" target="_blank" rel="noopener noreferrer">
                  YouTube playlists
                </a>
              </p>
            </>
          ) : (
            <>
              <p>Please listen to the mentor note:</p>
              <p>
                <a href="https://www.dropbox.com/s/msdiw44ls2612p9/Did%20Not%20Clear.mp3?dl=0" target="_blank" rel="noopener noreferrer">
                  Mentor audio (Dropbox)
                </a>
              </p>
              <p>
                After that, fill out the analysis form. The output will be emailed to you: 
                <a href="https://study.aswinibajaj.com/inspect/" target="_blank" rel="noopener noreferrer">
                  introspection form
                </a>
              </p>
              <p>It is important to write down your thoughts.</p>
              <p>Don’t get disheartened. Study well and practice more.</p>
              <p>– Aswini Bajaj</p>
            </>
          )}
        </div>

        <fieldset>
          <legend>Please attach a screenshot of your result *</legend>
          <div className="form-group">
            <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
          </div>
        </fieldset>

        <div className="nav-buttons">
          <button type="button" className="btn-secondary" onClick={()=>router.back()}>
            ← Back
          </button>
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
