import exp from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { adminRouter } from './Backend/API/admin.router.js'
import { connectDatabase } from './Backend/Config/database.js'
import { viewerRouter } from './Backend/API/viewer.router.js'

dotenv.config()
const app = exp()

const PORT = process.env.PORT || 3000

//Body-Parser middleware
app.use(exp.json())
app.use(cookieParser())

app.use('/api/admin', adminRouter)
app.use('/api/viewer', viewerRouter)

//Connect to DB
const connectDB = async () => {
    try{
        await connectDatabase()
        console.log('MongoDB connected successfully')
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }catch(err){
        console.error('Error connecting to MongoDB:', err)
        process.exit(1)
    }
}

//Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Internal Server Error' })
})

connectDB()