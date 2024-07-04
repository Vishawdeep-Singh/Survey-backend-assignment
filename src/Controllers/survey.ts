import express ,{ request, response } from "express";
import { Request,Response } from "express";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import * as dotenv from 'dotenv';
import { create } from "domain";
dotenv.config();

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate())


export const getListsurvey=async(req:Request,res:Response)=>{
try {
    const response = await prisma.surveys.findMany({
        select:{
            surveyName:true
        }
    });
    if(response){
        res.json(response)
    }
} catch (error:any) {
    res.json({
        message:"Error in getting all survey"+error.message})
}

}

export const getSurvey = async(req:Request,res:Response)=>{
    const id =  req.params.id
    try {
       const response =  await prisma.surveys.findUnique({
        where:{
            id:parseInt(id)
        },
        select: {
            id: true,           
            surveyName: true,   
            surveyQuestions: {   
              select: {
                id: true,        
                question: true,  
                Options: {      
                  select: {
                    id: true,      
                    optionName: true  
                  }
                }
              }
            }
          }
       })
       if(response){
        res.json(response)
       }

    } catch (error:any) {
        res.json({
            message:"Error in getting a  survey"+error.message})
    }
}


export const CreateSurvey = async (req:Request,res:Response)=>{
try {
    const newsurvey = req.body;
    const response = await prisma.surveys.create({
        data:{
            surveyName:newsurvey.surveyName,
            surveyQuestions:{
                create: newsurvey.surveyQuestions.map((question:any)=>({
                    question:question.question,
                    Options:{
                        create: question.Options.map((option:any)=>({
                            optionName:option
                        }))
                    }
                }))
            }
        },
        include:{
            surveyQuestions:{
               include:{
                Options:true
               }
            }
        }
    })
    if(response){
        res.json(response)
    }
} catch (error:any) {
    res.json({
        message:"Error in creating new survey"+error.message})
}
}
export const participateinSurvey = async (req:Request,res:Response)=>{
try {
    interface Answer{
        questionId:number,
        option:string
       }

    const answers:Answer[]=req.body.answers
  

  
  let result =  answers.map(async(answer:Answer)=>{
   let reply = await prisma.options.update({
        where:{
            questionId_optionName: { 
                questionId: answer.questionId,
                optionName: answer.option
              }
        },
        data:{
            votes:{
                increment:1
            }
        },
        select:{
            question:true,
            votes:true,
            optionName:true
        }
    })
    return reply
  })
  

const results = await Promise.all(result)
  res.json(results)
    
} catch (error:any) {
    res.json({
        message:"Error in voting survey"+error.message})



}
}






export const votingResults = async (req:Request,res:Response)=>{
try {
   
    const id =  req.params.id
    
  const response =  await prisma.surveys.findUnique({
where:{
    id:parseInt(id)
},
select:{
    surveyName:true,
    surveyQuestions:{
        select:{
            question:true,
            Options:{
                select:{
                    optionName:true,
                    votes:true
                }
            }
        }
    }
}
  })


  
 


  res.json(response)
    
} catch (error:any) {
    res.json({
        message:"Error in getting results of  survey"+error.message})
}
}