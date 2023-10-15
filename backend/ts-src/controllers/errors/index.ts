import { Response, Request } from "express";

const errorPage = async (req:Request, res:Response): Promise<void> => {
    try {
        res.status(200).json({error: 'it is'});
    } catch (error) {
        res.status(500).json({
            message:"Unknown Critical Error Encountered. Please Contact Staff"
        });
        throw error;
    }
};

export { errorPage };
