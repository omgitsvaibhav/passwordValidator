import PasswordDao from "../passwordDao.js";
import bcrypt from 'bcryptjs';

const saltRounds = 10;

export default class PasswordCtrl{
    static async apiStorePassword(req,res,next){
        
            const passwordValue = req.body.password;
            //console.log(passwordValue);

            bcrypt.hash(passwordValue, saltRounds).then(async function(hashValue){
                //console.log(hashValue);
                const dbResponse = await PasswordDao.storePassword(hashValue);
                //console.log(dbResponse.acknowledged);
                if(dbResponse.acknowledged){
                    console.log(`successfully stored password in database`);
                    res.status(200).json({message: 'success'});
                }
            }).catch(error =>{
                console.error(`error hashing the password: ${error}`);
                res.status(500).json({message: error});
            });
        }
    }
