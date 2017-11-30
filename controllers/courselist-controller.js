const express = require('express')
const router = express.Router()
const BadRequestError = require('../errors/bad-request')
const { find } = require('lodash')

const db = require('../data/db')
const courseListCollection = db.courseList

router.post('/', (req, res, next) => {
  if (!req.body.name) {
    return next(new BadRequestError('VALIDATION', 'Missing name'))
  }

  const name = req.body.name

  // Check for name uniqueness
  const result = find(courseListCollection, { name })
  if (result) {
    return next(new BadRequestError('VALIDATION', 'Name should be unique'))
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