import React,{useState,useEffect,useContext} from 'react'
import Posts from './Posts.js'
import Side from './SideNav.js'
import Follow from './Follow'
import GetCategory from './GetCategories'



const Home = ()=>{




  


   return (
    <div className='container'>
 <div className='row ' >

     <div className="col-md-3  sticky-top">
         <div className="sticky-top">
             <GetCategory/>
         </div>

     </div>
   <div class="col-lg-6  ">
      <Posts   /> 
     </div>


     <div className="col-lg-3 mt-3">
         <div className="sticky-top">
             <Side/>
             <Follow/>

         </div>

     </div>
 
                  
     
</div>
    </div>
   
        
   )
}


export default Home