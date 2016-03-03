/* This js is used for saving the properites of the object that is in non-JSON properties 
and must be stored and retrieved to put them in the original object so that the required object 
can be used for animation */

//object for stroing the non JSON properties to insert into required object later on
var invalidJSONProperties={},
    key;

//function for storing all the invalid properties in local storage object to retrive it later
function storeInvalidProperties(object,keyName){
    //iterating over the object properties to store invalid properties in invalidJSONProperties
    for(value in object){
        if(typeof object[value]=='function'){
            invalidJSONProperties[value] = object[value];
            if(key===undefined){
                key = keyName;
            }
        }
    }    
}

//function for inserting these invalid JSON properties into the original object with the respective key
function retrieveOriginalObject(obj,property){

            var oldObjects = [], //valid JSON objects
            newObjects = [];	//real objects after inserting required invalid JSON properties
            var identifier;	//identifier for the object in analysis

            //this private function inserts the required key with values into the object we want to modify

            (function insertProperty(value){
                if(Object.prototype.toString.apply(value) === '[object Object]'){
                   oldObjects.push(value);
                }

               if (Object.prototype.toString.apply(value) === '[object Array]') {
                for(var i = 0;i<value.length;i++){
                    insertProperty(value[i]);
                }
            }else{
                for(key in value){
                    if(key==property){
                        for(prop in invalidJSONProperties){
                            Object.defineProperty(value[key],prop,{
                                enumerable :true,
                                configurable : true,
                                writable :true,
                                value: invalidJSONProperties[prop]
                            });
                        }
                        newObjects.push(value);
                    }else if(typeof value[key]=='object' && !checkObject(value[key])){
                        insertProperty(value[key]);
                    }else if(typeof value[key]=='object'){
                        value[key] == returnObject(value[key]);
                    }
                }

            }

            //checks whether that object has already been stored ? if yes gives the identifier of that objec
            // else returns not inserted

            function checkObject(object){
                for(var i=0;i<oldObjects.length;i++){
                    if(oldObjects[i]===object){
                        identifier = i;
                        return true;
                    }
                }
                return false;
            }

            //returns the already changed object which has been encountered again

            function returnObject(object){ return newObjects[identifier];}

        })(obj);

        return obj;

    }   