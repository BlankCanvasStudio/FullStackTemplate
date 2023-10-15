import { Response, Request } from "express";

const welcomeController = async (req:Request, res:Response): Promise<void> => {
    try{
        res.sendFile(process.env.appRoot + "/static/html/welcome.html");
    } catch (error) {
        throw error;
    }
};

export { welcomeController };