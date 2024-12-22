import express from 'express'
import { Response,Request } from 'express';
import { getObjectURL } from './getObject';

const app = express();
app.use(express.json());

app.post('/getObject',async(req:Request,res:Response): Promise<any> =>{
    const { objectName }= req.body;

    if (!objectName) {
         res.status(400).json({
            message: "objectName is required"
        });
        return;
    }

    
    try{
        const url = await getObjectURL(objectName);

        res.status(200).json({
            status:"Success",
            message:"URL will be expired after 20 seconds",
            url
        })
        return;
    }
    catch(error){
        console.error(error);
       res.status(500).json({
            message:"Internal server error",
            error
        })
        return;
    }

})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});