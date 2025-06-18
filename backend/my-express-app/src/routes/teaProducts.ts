import  express  from "express";

import { getTeaProducts } from "../services/TeaStorage.service";

const router = express.Router();


router.get('/', (req, res) =>{
    res.json(getTeaProducts())
})


// function getProductById(id: number){
//     const index = teaProducts.findIndex(p => p.id === id)
// }


export default router;