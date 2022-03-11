const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Post =  mongoose.model("Post")


router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
        .populate("postedBy","_id name pic")
        .populate("comments.postedBy","_id name")
        .sort('-createdAt')
        .then((posts)=>{
            res.json({posts})
        }).catch(err=>{
        console.log(err)
    })

})

router.get("/test", requireLogin, async (req, res) => {

    const catName = req.query.cat;
    try {
        if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            }).populate("postedBy","_id name pic")
                .populate("comments.postedBy","_id name")
                .sort('-createdAt');
        } else {
            posts = await Post.find() .populate("postedBy","_id name pic")
                .populate("comments.postedBy","_id name")
                .sort('-createdAt');
        }
        res.status(200).json({posts});
    } catch (err) {
        res.status(500).json(err);
    }
});




router.get('/post/:id',requireLogin,(req,res)=>{

    Post.findById(req.params.id)
        .populate("postedBy","_id name pic" ,)
        .populate("comments.postedBy","_id name")

        .then((posts)=>{
            res.json({posts})
        }).catch(err=>{
        console.log(err)
    })

})




router.get('/getsubpost',requireLogin,(req,res)=>{

    // if postedBy in following
    Post.find({postedBy:{$in:req.user.following}})
        .populate("postedBy","_id name")
        .populate("comments.postedBy","_id name")
        .sort('-createdAt')
        .then(posts=>{
            res.json({posts})
        })
        .catch(err=>{
            console.log(err)
        })
})

router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body,pic, categories
    } = req.body

    if(!title || !body || !pic){
        return  res.status(422).json({error:"Plase add all the fields"})
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo:pic,
        categories,
        postedBy:req.user
    })
    post.save().then(result=>{

        res.json({post:result})
    })
        .catch(err=>{
            console.log(err)
        })
})

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
        .populate("postedBy","_id name pic")
        .populate("comments.postedBy","_id name")
        .sort('-createdAt')
        .then(mypost=>{
            res.json({mypost})
        })
        .catch(err=>{
            console.log(err)
        })
})


router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true

    }) .populate("postedBy","_id name pic")
        .populate("comments.postedBy","_id name")
        .sort('-createdAt')
        .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }) .populate("postedBy","_id name pic")
        .populate("comments.postedBy","_id name")
        .sort('-createdAt')
        .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


router.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
        .populate("postedBy","_id name pic")
        .populate("comments.postedBy","_id name")
        .sort('-createdAt')
        .exec((err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }else{
                res.json(result)
            }
        })
})

router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
        .populate("postedBy","_id")
        .exec((err,post)=>{
            if(err || !post){
                return res.status(422).json({error:err})
            }
            if(post.postedBy._id.toString() === req.user._id.toString()){
                post.remove()
                    .then(result=>{
                        res.json(result)
                    }).catch(err=>{
                    console.log(err)
                })
            }
        })
})

router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.name === req.body.name) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can update only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router