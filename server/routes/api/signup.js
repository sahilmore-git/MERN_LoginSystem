const User =require('../../models/User');
const UserSession =require('../../models/UserSession');
//const bcrypt =require('bcrypt');


module.exports = (app) => {
   /* app.get('/api/counters', (req, res, next) => {
      Counter.find()
        .exec()
        .then((counter) => res.json(counter))
        .catch((err) => next(err));
    });
  
    app.post('/api/counters', function (req, res, next) {
      const counter = new Counter();
  
      counter.save()
        .then(() => res.json(counter))
        .catch((err) => next(err));*/

        
     app.post('/api/account/signup', (req, res, next)=> {  

        const {body}=req;
        const {
            firstName,
            lastName,
            password
        }=body;
        let{
            email
        }=body;

        if(!firstName || !lastName || !email || !password){
            return res.send({
                success:false,
                message:"Fields cannot be left blank"
            });
        }
        email=email.toLowerCase();

        User.find({
            email:email
      },(err,previousUsers)=>{
          if(err){
             return res.send({
                 success:false,
                 message:"Error : Server Errors."
             });
          }
          else if(previousUsers.length>0){
             return res.send({
                 success:false,
                 message:"Error : Account Already Exists."
             });
          }
         
          console.log("hell")
          //Save User
          const newUser= new User();
          newUser.email=email;
          newUser.firstName=firstName;
          newUser.lastName=lastName;
          newUser.password=password;
          //newUser.password=newUser.genrateHash(password);
         newUser.save((err,user)=>{
             if(err){
                 return res.send({
                     success:false,
                     message:"Error : Server Error"
                 }); 
             }
             return res.send({
                 success:true,
                 message:"Signed Up"
             });
         });
 
 
      });
     });


     app.post('/api/account/signin',(req, res, next)=> {  
        
        const {body}=req;
        const{
            password
        }=body;
        let{
            email
        }=body;

        if( !email || !password){
            return res.send({
                success:false,
                message:"Fields cannot be left blank"
            });
        }
        email=email.toLowerCase();

        User.find({
            email:email},
            (err,users)=>
            {
                if(err){
                    return res.send({
                        success:false,
                        message:"Server Error."
                    });
                }
                if(users.length !=1){
                    return res.send({
                        success:false,
                        message:"Error : Invalid"
                    });
                }

                const user=users[0];
                
                if(user.validPassword(password)){
                    return res.send({
                        success:false,
                        message:"Error : Invalid"
                    });

                }else{



                    userSession=new UserSession();
                    userSession.userId=user._id;
                    userSession.save((err,doc)=>{
                        if(err){
                            return res.send({
                                success:false,
                                message:"Error : Invalid"
                            }); 
                        }else{
                            return res.send({ 
                                success:true,
                                message:'Valid Sign In',
                                token:doc._id

                            });
                        }

                    });
                }

                   
                });
            });

            app.get('/api/account/verify',(req, res, next)=>{

                //Get Token
                const{query}=req;
                const {token}=query;

                //Verify Token
                UserSession.find({
                    _id:token,
                    isDeleted:false},(err,session)=>{

                        if(err){
                            return res.send({
                                success:false,
                                message:"Error : Invalid"
                        });
                    }
                    if(session.length !=1){
                        return res.send({
                            success:false,
                            message:"Error : Invalid"
                    });
                }else{
                    return res.send({
                        success:true,
                        message:"Good to go"
                });

                }

                    });


            });
            

            app.get('/api/account/logout',(req, res, next)=>{

                //Get Token
                const{query}=req;
                const {token}=query;

                //Verify Token
                UserSession.findOneAndUpdate({
                    _id:token,
                    isDeleted:false},
                    {  $set: {isDeleted:true} } ,null ,(err,session)=>{

                        if(err){
                            return res.send({
                                success:false,
                                message:"Error : Invalid"
                        });
                    }
                      else{
                    return res.send({
                        success:true,
                        message:"Good to go"
                });

                }

                    });


            });
            




}