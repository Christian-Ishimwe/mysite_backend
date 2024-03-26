const {BlogPost} = require("../models/blogsModel")


const getBlogs = async (req, res) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    try{
        const blogs = await BlogPost.find({isPublished: false})
            .select('title content image date summary')
            .exec()
        if(blogs.length>=1){
            return res.status(200).json({
                message: "all Blogs",
                blogs
            })
        }else{
            return res.status(401).json({
                message: "No Blogs Published Yet!"
            })
        }
    }catch(err){
        console.log("Error: ", err)
        return res.status(500).json({
            message: "Internal Server error"
        })
    }
}

const getOneBlog= async (req, res) =>{
  //  res.setHeader("Access-Control-Allow-Origin", "*");
    const {id} = req.params
    const currentblog = await BlogPost.findById(id)
    let blog= null
    if(currentblog.allowComments){
         blog=await BlogPost.findById(id)
        .select('title content summary date image comments allowComments')
        .exec()
       
    }else{
         blog=await BlogPost.findById(id)
        .select("image title content summary date")
        .exec()
    }
     return res.status(200).json(blog)
    
}

const commentBlog = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const { id } = req.params;
    const blog = await BlogPost.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    if (!blog.allowComments) {
      return res.status(403).json({
        message: "Comments not allowed on this blog"
      });
    }

    const { comment } = req.body;
    const name = req.user.name; // Assuming req.user contains the user object with a 'name' field

    const newComment = {
      name,
      comment
    };

    blog.comments.push(newComment);
    await blog.save();

    return res.status(201).json({
      message: "Comment added successfully",
      blog
    });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({
      message: "Internal Server error!"
    });
  }
};


module.exports={getBlogs, getOneBlog, commentBlog}