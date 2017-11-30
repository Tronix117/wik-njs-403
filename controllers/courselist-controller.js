const express = require('express')
const router = express.Router()
const { find } = require('lodash')

const db = require('../data/db')
const courseListCollection = db.courseList

router.post('/', (req, res, next) => {
  if (!req.body.name) {
    res.status(400)
    return res.json({
      error: {
        code: 'VALIDATION',
        message: 'Missing name'
      }
    })
  }

  const name = req.body.name

  // Check for name uniqueness
  const result = find(courseListCollection, { name })
  if (result) {
    res.status(400)
    return res.json({
      error: {
        code: 'VALIDATION',
        message: 'Name should be unique'
      }
    })
  }

  const newCourseList = {
    id: courseListCollection.length + 1,
    name
  }

  courseListCollection.push(newCourseList)

  res.json({
    data: newCourseList
  })
})

module.exports = router