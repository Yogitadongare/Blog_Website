/*const express = require('express')
const mongoose = require('mongoose')
const articlerouter = require('./routes/articles')
const Article = require('./models/article')
const app = express()
mongoose.connect("mongodb://localhost/articledb")

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
    const articles = [{
        title: 'Test article 1',
        createdat: new Date(),
        description: 'Test description'
    },
    {
        title: 'Test article 1',
        createdat: new Date(),
        description: 'Test description'
    }]
    res.render('articles/index', { articles: articles })


})
app.use('/articles', articlerouter)
app.listen(3000)
console.log("listening on port 3000")*/


const express = require('express')
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const connectionstring = 'mongodb://127.0.0.1:27017/blogdb'
mongoose.connect(connectionstring)
//mongoose.connect('mongodb://localhost/bharatInternDatabase')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(3000)