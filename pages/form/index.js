import { useState } from 'react'
import { useRouter } from 'next/router'

export default function FormStep1() {
  const router = useRouter()
  const [email, setEmail]   = useState('')
  const [name, setName]     = useState('')
  const [userId, setUserId] = useState('')
  const [mobile, setMobile] = useState('')
  const [course, setCourse] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!course) return alert('Please select a course')
    router.push({
      pathname: `/form/${course}`,
      query: { email, name, userId, mobile }
    })
  }

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <h1>Results | Aswini Bajaj</h1>
        <p>Kindly fill in the details below</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            value={name}
            required
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>User ID *</label>
          <input
            type="text"
            value={userId}
            required
            onChange={e => setUserId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Registered Mobile Number *</label>
          <input
            type="tel"
            value={mobile}
            required
            onChange={e => setMobile(e.target.value)}
          />
        </div>

        <fieldset>
          <legend>Course *</legend>
          {[
            { val: 'cfa-1', label: 'CFA – Level 1' },
            { val: 'cfa-2', label: 'CFA – Level 2' },
            { val: 'cfa-3', label: 'CFA – Level 3' },
            { val: 'frm-1', label: 'FRM – Part 1' },
            { val: 'frm-2', label: 'FRM – Part 2' },
          ].map(c => (
            <label key={c.val}>
              <input
                type="radio"
                name="course"
                value={c.val}
                onChange={() => setCourse(c.val)}
              />{' '}
              {c.label}
            </label>
          ))}
        </fieldset>

        <div className="nav-buttons">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => router.replace('/')}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Next →
          </button>
        </div>
      </form>
    </div>
  )
}
