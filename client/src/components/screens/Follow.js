import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
const Follow  = ()=>{
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
  
    useEffect(()=>{
       fetch('/allusers',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setData(result.users)
       })
    },[])
   

 
   return (
//     <div>
//
// <div class="rightbarProfileImgContainer " >
//     <div class="row">
//         <div class=" layout-spacing">
//             <div class="">
//                 <div class="widget-header">
//                     <div class="row">
//                         {/* <div class="col-xl-12 col-md-12 col-sm-12 col-12">
//                             <h4 class="pb-0">Stories</h4>
//                         </div> */}
//                     </div>
//                 </div>
//                 <div class="widget-content widget-content-area">
//                     <div class="row">
//                         <div class="col-lg-12 col-md-12 col-sm-12">
//                             <div id="content_2" class="tabcontent">
//                                 <div class="story-container-2">
//                                     <p class="">Recently Added</p>
//
//                                     {
//                                        data.map(item=>{
//                                             return(
//                                                 <div>
//
//
//
//                                                 <div>
//                                                             {item._id !== state._id
//                                                                 ? <div class="single-story">
//                                                                 <div class="story-dp unseen">
//                                                                 <img src={item.pic}/>
//                                                                 </div>
//                                                                 <div class="story-author">
//                                                                 <Link to={`/profile/${item._id}`} style={{textDecoration: 'none'}}> <p class="name">{item.name}</p></Link>
//                                                                     <p class="time">{item.followers.length} followers</p>
//                                                                 </div>
//                                                             </div>
//                                                                 : <div></div>
//                                                             }
//                                                     </div>
//
//
//
//
//
//
//
//
//                                                 </div>
//
//                                             )
//                                         })
//                                     }
//                                    <div class=" ">
//
// <Link to="/update"><a class="text-primary strong" href="#">View All</a></Link>
//
//
//
//
//                 </div>
//
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//             </div>
//         </div>
//     </div>
// </div>
//
//
//
//     </div>

       <div>
           <div className="  mb-2 author">
               <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse ">
                   <div className="position-sticky">
                       <div className="list-group list-group-flush mx-3 ">
                           <div className="col-lg-12 col-md-12 col-sm-12">
                               <div id="content_2" className="tabcontent">
                                   <div className="story-container-2">
                                       <p className="">Recently Added</p>

                                       {
                                           data.map(item => {
                                               return (
                                                   <div>


                                                       <div>
                                                           {item._id !== state._id
                                                               ? <div className="single-story">
                                                                   <div className="story-dp unseen">
                                                                       <img src={item.pic}/>
                                                                   </div>
                                                                   <div className="story-author">
                                                                       <Link to={`/profile/${item._id}`}
                                                                             style={{textDecoration: 'none'}}><p
                                                                           className="name">{item.name}</p></Link>
                                                                       <p className="time">{item.followers.length} followers</p>
                                                                   </div>
                                                               </div>
                                                               : <div></div>
                                                           }
                                                       </div>


                                                   </div>

                                               )
                                           })
                                       }
                                       <div className=" ">

                                           <Link to="/update"><a className="text-primary strong" href="#">View
                                               All</a></Link>


                                       </div>

                                   </div>
                               </div>
                           </div>


                       </div>
                   </div>
               </nav>


           </div>
       </div>

   )
}


export default Follow

{/* <div>
<div class=" mt-5 d-flex justify-content-center">
<div class="card p-3">
   <h5>Popular Profiles</h5>

   <div class="d-flex justify-content-between mt-2 align-items-center">
       <div class="d-flex flex-row"> <img src="https://i.imgur.com/o5uMfKo.jpg" class="rounded-circle" width="40"/>
           <div class="d-flex flex-column ml-1 about"> <span class="font-weight-bold">Madison</span> <small>585 posts</small> </div>
       </div> <button class="btn btn-outline-success btn-sm follow">Follow</button>
   </div>
   <hr/>

</div>
</div>
</div>  */}