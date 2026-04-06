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

app.get('/api/search', (req, res) => {
    let isTv = req.query.isTv
    let name = req.query.q
    let imdb_id = req.query.imdb_id
    let tmdb_id = req.query.tmdb_id
    let year = req.query.year;
    if(isTv == "true"){
        let episode = req.query.episode
        let session = req.query.session
        let lang = req.query.lang
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
    }
    else{
        // Movie fetch 
        if(imdb_id == 'null'){
            os.subtitles({tmdb_id:tmdb_id,type:"movie"}).then((response2)=>{
                console.log(response2)
                if(response2.data.length < 1){
                    os.subtitles({query:name,type:"movie"}).then((response3)=>{
                        res.json(response3.data)
                    })
                }else{
                    res.json(response2.data)
                }

        })
        }else{
            os.subtitles({imdb_id:imdb_id,type:"movie"}).then((response)=>{
                if(response.data.length < 1){
                    os.subtitles({tmdb_id:tmdb_id,type:"movie"}).then((response2)=>{
                        if(response2.data.length < 1){
                            os.subtitles({query:name,type:"movie"}).then((response3)=>{
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
        }
    }

})

app.get('/api/download', (req, res) => {
    let fileId = req.query.fileId
    os.download({file_id:fileId}).then((response)=>{
        res.send(response)
    }).catch((error)=>{
        console.log(error)
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})