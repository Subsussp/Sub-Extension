const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 3000
let token;
const OS = require('opensubtitles.com')
const os = new OS({
  apikey: process.env.OPENSUBTITLES_API,
  useragent: 'Overlaysubtitles v1.0'
})
os.login({
  username: process.env.SUB_NAME ,
  password: process.env.PASS_WORD 
}).then((response) => {
    token = response.token
}).catch(console.error)

app.get('/api', (req, res) => {
    let year = req.query.year;
    let name = req.query.q
    let episode = req.query.episode
    let session = req.query.session
    let lang = req.query.lang
    let tmdb_id = req.query.tmdb_id
    let imdb_id = req.query.imdb_id

    os.subtitles({parent_imdb_id:imdb_id,episode_number:+episode,season_number:+session}).then((response)=>{
        console.log("first")
        if(response.data.length < 1){
            os.subtitles({parent_tmdb_id:tmdb_id,season_number:+session,episode_number:+episode}).then((response2)=>{
                    console.log("second")
                    if(response2.data.length < 1){
                        os.subtitles({query:name,season_number:+session,episode_number:+episode}).then((response3)=>{
                              res.json(response3.data)
                        })
                    }else{
                          res.json(response2.data)
                    }

                })
        }else{
            res.json(response.data)

        }
    }).catch(console.error)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})