import { calculateFinancialScore } from "../services/financialScore.service.js";

export const getFinancialScore = async(req,res)=>{

    const score = await calculateFinancialScore(req.user.id);

    res.json({

        success:true,

        score

    });

};