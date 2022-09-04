import { Response, Request } from "express";
import { query_plz, user_pronouns } from "../../queries/users/get";

const query_plzController = async (req:Request, res:Response): Promise<void> => {
    try {
        query_plz();
        res.status(200).json({query: 'was made'});
    } catch (error) {
        throw error;
    }
};

const userPronouns = async (req:Request, res:Response): Promise<void> => {
    try {
        let pronouns:string = await user_pronouns(req.params.username);
        res.status(200).json({pronouns: pronouns});
    } catch (error) {
        throw error;
    }
};

export { query_plzController, userPronouns };
{}