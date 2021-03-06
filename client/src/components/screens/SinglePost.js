
import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link, useParams} from 'react-router-dom'
import { useLocation } from "react-router";
import {Button,Modal} from 'react-bootstrap'
import GetCategory from './GetCategories'
import axios from 'axios'

const SinglePost = ()=>{

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
  const [titles, setTitles] = useState("");
  const [bodys, setBodys] = useState("");
  const [pic, setPic] = useState("");
  const [id, setId] = useState("");
  const [user, setUser] = useState("");
  const [mycomment, setMyComment] = useState("");

  const [comments, setComments] = useState([]);
  const [userpic, setUserPic] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tit, setTitle] = useState("");
  const [body, setBody] = useState("");


    const {userid} = useParams()

  useEffect(()=>{
     fetch('/post/' + path,{
         headers:{
             "Authorization":"Bearer "+localStorage.getItem("jwt")
         }

     }).then(res=>res.json())
     .then(result=>{
     setTitle(result.posts.title)
     setBody(result.posts.body)
   setPic(result.posts.photo)
   setId(result.posts._id)
   setUserPic(result.posts.postedBy.pic)
   setComments(result.posts.comments)
   setUser(result.posts.postedBy.name)

  })
  },[])


    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
            .then(result=>{
                console.log(result)
                const newData = data.map(item=>{
                    if(item._id==result._id){
                        return result
                    }else{
                        return item
                    }
                })
                setData(newData)
            }).catch(err=>{
            console.log(err)
        })
    }


const handleUpdate = () => {

  const article = { title:titles,body:bodys };
  console.log(article)
  const headers = {
      Authorization:"Bearer "+localStorage.getItem("jwt")
  };
  axios.put('/' + path, article, { headers })
      .then((response)=>{
        console.log(response)
        setTitle(response.data.title)
     setBody(response.data.body)
      }).then(()=>{
        setShow(false)
      })
  }


   return (
<main class=" mb-5 mt-5">
<div class="container ">

  <div class="row">

    <div class="col-md-8 mb-4">

      <section class="border-bottom mb-4">
        <img src={pic}
          class="img-fluid shadow-2-strong rounded-5 mb-4 singlepost-img" width="100%" alt="" />
<div >
      <h1 class="mb-0 h4">{tit}</h1>
    </div>
        <div class="row align-items-center mb-4 mt-3">
          <div class="col-lg-6  text-lg-start mb-3 m-lg-0">
            <img src={userpic} class="rounded-5 shadow-1-strong me-2  rounded-circle"
              height="35" width="40" alt="" loading="lazy" />

            <a href="" class="text-dark">{user}</a>
          </div>

          <div class="  text-lg-end">

              {/*{id === state._id &&*/}
              {/*<span onClick={handleShow}><a><i className="fa fa-edit" ></i></a></span>*/}
              {/*}*/}



            {/*<button type="button" class="btn  px-3 me-1"  style={{float:"right"}}>*/}
            {/*  <i className="fa fa-edit" onClick={handleShow}></i>*/}
            {/*</button>*/}
            <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                  <div>
                  <input type="text" id="form3Example4" class="form-control form-control-lg"
                placeholder="Title"
                value={titles}
                onChange={(e)=>setTitles(e.target.value)}


                />
                  </div>
               <div>
               <br/>
               <input type="text" id="form3Example4" class="form-control form-control-lg"
                placeholder=" body"
                value={bodys}
                onChange={(e)=>setBodys(e.target.value)}


                />
               </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                        <Button  onClick={handleUpdate}        variant="primary">
                        Save Changes
                        </Button>
                    </Modal.Footer>
                    </Modal>


          </div>
        </div>
      </section>

      <section>
        <p>
          {body}
        </p>


      </section>





      <div class=" mt-5">
    <div class="d-flex row">
        <div class="col-md-8">
          <h5 style={{color:"black"}}>Advice for crab</h5>

            {/*<form onSubmit={(e)=>{*/}
            {/*    e.preventDefault()*/}
            {/*    makeComment(id)*/}
            {/*}}>*/}
            {/*    <div className="d-flex ">*/}
            {/*        <div className="form-outline w-100">*/}
            {/*            <input type="text"   id="" className="form-control form-control-md mw-100"*/}
            {/*                   placeholder="leave  an advice" />*/}
            {/*            /!*<label className="form-label" for="textAreaExample">Write a comment</label>*!/*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</form>*/}
            <div class="d-flex flex-column comment-section">


            {
                                    comments.map(record=>{
                                        return(
                                          <div class=" p-2" key={record._id}>
                                          <div class="d-flex flex-row user-info">
                                              <a href="">
                                                  <img src={record.postedBy.pic}
                                                       width="40"
                                                       className="border rounded-circle me-2" alt="Avatar" style={{height: '40px'}} />
                                              </a>
                                              <div class="d-flex flex-column justify-content-start ml-2"><span class="d-block font-weight-bold name">{record.postedBy.name}</span>
                                                  <p className="comment-text">{record.text}</p>
                                              </div>
                                          </div>

                                      </div>
                                        )
                                    })
                                }




            </div>

        </div>
    </div>
</div>
      <section>


        <div>










        </div>
      </section>

    </div>



    <div class="col-md-4 mb-4">

    <GetCategory/>
    </div>





  </div>

</div>
</main>

   )
}


export default SinglePost


















