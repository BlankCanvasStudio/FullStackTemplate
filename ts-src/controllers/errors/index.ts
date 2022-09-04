import { Response, Request } from "express";

const errorPage = async (req:Request, res:Response): Promise<void> => {
    try {
        res.status(200).json({error: 'it is'});
    } catch (error) {
        throw error;
    }
};

export { errorPage };
