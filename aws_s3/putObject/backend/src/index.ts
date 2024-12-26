import express from 'express'
import { Response,Request } from 'express';
import { getObjectURL } from './getObject';
import { putObject } from './putObject';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

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


app.post('/generatePutURL', async (req: Request, res: Response): Promise<any> => {
    const { contentType, fileData } = req.body; 
    const fileName = `${Date.now()}_${fileData}`;

    if (!fileName || !contentType) {
        return res.status(400).json({
            message: "fileName and contentType are required",
        });
    }

    try {
        const { url, key } = await putObject(fileName, contentType);
        return res.status(200).json({
            status: "Success",
            message: "Use this URL to upload your file",
            url,
            key,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});