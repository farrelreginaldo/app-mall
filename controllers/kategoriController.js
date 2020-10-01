const express = require('express');
const router = express.Router()
const Kategori = require('../models/kategoriProduk')

router.get('/',async (req,res)=>{
    try{
        const kategori = await Kategori.find()
  res.render('kategori',{
  data:kategori}
  )
    }catch(err){
        res.status(400).json({message: 'error', error: err.message});
    }
})

router.post('/add',async (req,res)=>{

    const{nama,sub} = req.body;
    const kategori = new Kategori({nama,sub})

    try{
        const tambahKategori = await kategori.save()
        res.redirect('/kategori')
    }catch(err){
        res.status(400).json({message: 'error', error: err.message})
    }
})

router.put("/edit/:id", async(req, res) => {
    try {
        const editKategori = await Produk.findByIdAndUpdate({_id: req.params.id},req.body)
        res.status(200).json({ message: "Berhasil Mengubah Data kategori", data: editKategori});
    } catch (err) {
        res.status(400).json({message: 'error', error: err.message});
    }
});

router.get("/delete/:id", async(req, res) => {
    try {
        await Kategori.deleteOne({_id:req.params.id});
        res.redirect('/kategori')
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


module.exports = router;