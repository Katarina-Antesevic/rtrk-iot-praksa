const exp = require('express');
const router = exp.Router();

router.get('*',(req,res)=>{
    const path = require('path');
    res.sendFile(path.resolve(__dirname, '../client_app', 'build', 'index.html'))
})


module.exports = router;