export function getFromStorage(key){
    if(!key){
        return null;
    }

    try{

        const valuseStr=localStorage.getItem(key);
        if(valuseStr)
        {
            return JSON.parse(valuseStr);
        }
        return null;
    }catch(err){return null;}

}

export function setInStorage(key,obj){
    if(!key){
        console.error('Error: Key is Missing');
    }
    try{
        localStorage.setItem(key,JSON.stringify(obj));
    }catch(err){
        console.error(err);
    }

}