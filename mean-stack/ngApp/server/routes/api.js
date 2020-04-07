const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Video = require('../models/video')

const db = "mongodb://localhost:27017/videoplayer"

mongoose.connect(db, { useNewUrlParser: true }, function(err){
  if(err){
    console.error("Error!" + err)
  }
  else{
    console.log("Connection Successful")
  }
})

router.get('/videos', function(req, res){
  console.log('Get request for all videos')
  Video.find(function(err, videos){
    if(err){
      console.error('Error retrieving videos', err)
    }
    else{
      res.json(videos)
      console.log(videos)
    }
  })
})

router.get('/videos/:id', function(req, res){
  console.log('Get request for single video')
  Video.findById(req.params.id, function(err, video){
    if(err){
      console.error('Error retrieving video', err)
    }
    else{
      res.json(video)
      console.log(video)
    }
  })
})

router.post('/video', function(req, res){
  console.log('Post a video')
  var newVideo = new Video()
  newVideo.title = req.body.title
  newVideo.link = req.body.link
  newVideo.desc = req.body.desc
  newVideo.save(function(err, insertedVideo){
    if(err){
      console.error('Error saving video', err)
    }
    else{
      res.json(insertedVideo)
    }
  })
})

router.put('/video/:id', function(req, res){
  console.log('Update a video')
  Video.findByIdAndUpdate(req.params.id, {
    $set: {title: req.body.title, link: req.body.link, desc: req.body.desc}
  },
  { new: true },
  function(err, updatedVideo){
    if(err){
      res.send('Error updating video' + err)
    }
    else{
      res.json(updatedVideo)
    }
  })
})

router.delete('/video/:id', function(req, res){
  console.log('Deleting a video')
  Video.findByIdAndRemove(req.params.id, function(err, deletedVideo){
    if(err){
      res.send('Error deleting video')
    }
    else{
      res.json(deletedVideo)
    }
  })
})

module.exports = router
