const router = require('express').Router();
const {Office,Schedule}=require('../db')

router.get("/", async (req,res,next)=>{
    try {
        const schedule=await Schedule.findAll()
        res.send(schedule);
    } catch (error) {
        next(error)
    }
})
router.post("/",async (req,res,next)=>{
    try {
        const schedule=await Schedule.create({
            date:req.body.schedule,
            officeId: req.body.officeId,
            userId: req.body.userId
        })
        res.send(schedule);
    } catch (error) {
        next(error);
    }
})
router.delete("/:id",async (req,res,next)=>{
    console.log(req.params.id)
    try {
        const office=await Schedule.destroy({where:{id:req.params.id}})
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
})
module.exports = router;