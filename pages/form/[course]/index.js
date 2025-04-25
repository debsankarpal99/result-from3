import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const CFA_TOPICS = [
  'Corporate Finance',
  'Economics',
  'Equity',
  'Ethics',
  'Fixed Income',
  'FRA',
  'Portfolio',
  'Quants',
  'Others',
]
const FRM1_TOPICS = [
  'Foundations of Risk Management',
  'Quantitative Analysis',
  'Financial Markets and Products',
  'Valuation and Risk Management',
]
const FRM2_TOPICS = [
  'Market Risk',
  'Credit Risk',
  'Operational Risk',
  'Risk Management & investment Management',
  'Current Issues',
  'Liquidity Risk',
]

function Step2CFA({ title, sessionOptions, nextPath }) {
  const router = useRouter()
  const { course, email, name, userId, mobile } = router.query

  const [session, setSession] = useState(sessionOptions[0].value)
  const [performance, setPerformance] = useState('>')
  const [score, setScore] = useState('')
  const [percentiles, setPercentiles] = useState({})
  const [passFail, setPassFail] = useState('Pass')
  const [pathway, setPathway] = useState('')
  const [pathwayPct, setPathwayPct] = useState('')

  useEffect(() => {
    const init = {}
    CFA_TOPICS.forEach(t => (init[t] = ''))
    setPercentiles(init)
  }, [])

  const setBand = (topic, band) =>
    setPercentiles(p => ({ ...p, [topic]: band }))

  const onSubmit = e => {
    e.preventDefault()
    router.push({
      pathname: nextPath,
      query: {
        course,
        email,
        name,
        userId,
        mobile,
        session,
        performance,
        score,
        percentiles: JSON.stringify(percentiles),
        ...(course === 'cfa-3' ? { pathway, pathwayPct } : {}),
        passFail,
      },
    })
  }

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <h1>Results | Aswini Bajaj</h1>
        <h2>{title} – Step 2</h2>
      </div>

      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>Session *</legend>
          {sessionOptions.map(opt => (
            <label key={opt.value}>
              <input
                type="radio"
                name="session"
                value={opt.value}
                checked={session === opt.value}
                onChange={() => setSession(opt.value)}
              />{' '}
              {opt.label}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Overall Performance *</legend>
          {['<','=', '>'].map(sym => (
            <label key={sym}>
              <input
                type="radio"
                name="performance"
                value={sym}
                checked={performance === sym}
                onChange={() => setPerformance(sym)}
              />{' '}
              {sym} Minimum Passing Score
            </label>
          ))}
        </fieldset>

        <div className="form-group">
          <label>Your Score *</label>
          <input
            type="number"
            value={score}
            required
            onChange={e => setScore(e.target.value)}
          />
        </div>

        <fieldset>
          <legend>Percentiles *</legend>
          <table>
            <thead>
              <tr>
                <th>Topic Area</th>
                <th>Below 50</th>
                <th>50–70</th>
                <th>Above 70</th>
              </tr>
            </thead>
            <tbody>
              {CFA_TOPICS.map(t => (
                <tr key={t}>
                  <td>{t}</td>
                  {['below-50','50-70','above-70'].map(band => (
                    <td key={band}>
                      <input
                        type="radio"
                        name={t}
                        value={band}
                        checked={percentiles[t] === band}
                        required
                        onChange={() => setBand(t, band)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </fieldset>

        {title === 'CFA Level 3' && (
          <>
            <fieldset>
              <legend>Which Pathway? *</legend>
              {['Portfolio Management','Private Market','Private Wealth'].map(pw => (
                <label key={pw}>
                  <input
                    type="radio"
                    name="pathway"
                    value={pw}
                    checked={pathway === pw}
                    required
                    onChange={() => setPathway(pw)}
                  />{' '}
                  {pw}
                </label>
              ))}
            </fieldset>

            <fieldset>
              <legend>Pathway Percentile *</legend>
              {['below-50','50-70','above-70'].map(b => (
                <label key={b}>
                  <input
                    type="radio"
                    name="pathwayPct"
                    value={b}
                    checked={pathwayPct === b}
                    required
                    onChange={() => setPathwayPct(b)}
                  />{' '}
                  {b === 'below-50' ? 'Below 50' : b === '50-70' ? '50 to 70' : 'Above 70'}
                </label>
              ))}
            </fieldset>
          </>
        )}

        <fieldset>
          <legend>Pass / Fail *</legend>
          {['Pass','Fail'].map(opt => (
            <label key={opt}>
              <input
                type="radio"
                name="passFail"
                value={opt}
                checked={passFail === opt}
                onChange={() => setPassFail(opt)}
              />{' '}
              {opt}
            </label>
          ))}
        </fieldset>

        <div className="nav-buttons">
          <button type="button" className="btn-secondary" onClick={() => router.back()}>
            ← Back
          </button>
          <button type="submit" className="btn-primary">
            Next →
          </button>
        </div>
      </form>
    </div>
  )
}

export default function CourseForm() {
  const { query } = useRouter()
  const course = query.course

  switch (course) {
    case 'cfa-1':
      return (
        <Step2CFA
          title="CFA Level 1"
          sessionOptions={[{ value: 'feb-25', label: 'Feb 25' }]}
          nextPath="/form/cfa-1/step3"
        />
      )
    case 'cfa-2':
      return (
        <Step2CFA
          title="CFA Level 2"
          sessionOptions={[{ value: 'may-25', label: 'May 25' }]}
          nextPath="/form/cfa-2/step3"
        />
      )
    case 'cfa-3':
      return (
        <Step2CFA
          title="CFA Level 3"
          sessionOptions={[{ value: 'feb-25', label: 'Feb 25' }]}
          nextPath="/form/cfa-3/step3"
        />
      )
    case 'frm-1':
      return (
        <Step2FRM
          title="FRM Part 1"
          sessionOptions={[{ value: 'may-25', label: 'May 25' }]}
          topics={FRM1_TOPICS}
          nextPath="/form/frm-1/step3"
        />
      )
    case 'frm-2':
      return (
        <Step2FRM
          title="FRM Part 2"
          sessionOptions={[{ value: 'may-25', label: 'May 25' }]}
          topics={FRM2_TOPICS}
          nextPath="/form/frm-2/step3"
        />
      )
    default:
      return (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p>🎯 That course/step isn’t built yet.</p>
          <button onClick={() => window.location.href = '/form'}>
            Go back to Step 1
          </button>
        </div>
      )
  }
}
