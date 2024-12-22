import express from 'express'
import { Response,Request } from 'express';
import { getObjectURL } from './getObject';

const app = express();
app.use(express.json());

app.post('/getObject',async(req:Request,res:Response): Promise<any> =>{
    const { objectName }= req.body;

    if (!objectName) {
       return  res.status(400).json({
            message: "objectName is required"
        });
    }

    
    try{
        const url = await getObjectURL(objectName);

        return res.status(200).json({
            status:"Success",
            message:"URL will be expired after 20 seconds",
            url
        })
    }
    catch(error){
        console.error(error);
       return res.status(500).json({
            message:"Internal server error",
            error
        })
    }

})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});