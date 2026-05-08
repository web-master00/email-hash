import express from 'express'

const app = express()
app.use(express.json())

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// GET docs endpoint
app.get('/functions/maskEmail', (req, res) => {
  res.send({
    name: 'maskEmail',
    description: 'Masks the username part of an email address',
    input: {
      type: 'string',
      description: 'Email address to mask',
      example: 'john@example.com'
    },
    output: {
      type: 'string',
      description: 'Masked email address',
      example: 'j***@example.com'
    }
  })
})

// POST function endpoint
app.post('/functions/maskEmail', (req, res) => {
  const { input } = req.body

  if (typeof input !== 'string') {
    return res.send({
      output: 'Invalid input: expected string'
    })
  }

  if (!isValidEmail(input)) {
    return res.send({
      output: 'Invalid email format'
    })
  }

  const atIndex = input.indexOf('@')

  let masked = input[0]

  for (let i = 1; i < input.length; i++) {
    if (i < atIndex) {
      masked += '*'
    } else {
      masked += input[i]
    }
  }

  res.send({
    output: masked
  })
})

app.listen(3000)