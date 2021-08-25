const { Router} = require('express');
const {Office,Schedule,Product,Stock}=require('../db')
const { Op } = require('sequelize');
const router = Router();

router.get("/",(_req,res,next)=>{
    //incluido el calendario
    return Office.findAll({order: [['codesuc', 'ASC']],include:[{model:Stock},{model:Schedule}]}).then(response=>res.send(response)).catch(err=>next(err))
});
router.post("/",async(req,res,next)=>{
    const newOffice=req.body
    //const schedule=["9:00-10:00","10:00-11:00","11:00-12:00","12:00-1:00","17:00-18:00" ,"18:00-19:00", "19:00-20:00"]
    try {
        const [office,created]=await Office.findOrCreate({
            where:{address:newOffice.address},
            defaults:{
                name:newOffice.name,
                codesuc:newOffice.codesuc,
                address:newOffice.address,
                phone:newOffice.phone,
                shift: newOffice.shift
            }   
        })
    
        //await office.addSchedules(newSchedule)
        res.send(office)
    } catch (error) {
        next(error)
    }
    try {
        
    } catch (error) {
        
    }
})
router.put("/",async (req,res,next)=>{
    try {
        const office=await Office.update(req.body.changes,{where:{id:req.body.id}})
        res.send(office)
    } catch (error) {
        next(error)
    }
})

router.delete("/:id",async (req,res,next)=>{
    console.log(req.params.id)
    try {
        const office=await Office.destroy({where:{id:req.params.id}})
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
})

module.exports = router;