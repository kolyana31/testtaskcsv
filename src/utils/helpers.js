
import statesList from "../assets/json/stateList.json";

const ValidateAge = (age) =>{
    if (+age && Number.isInteger(+age) && +age>21) {
        return age
    }
    return null;
}

const ValidateExperience = (exp,age) =>{
    if (+age && +exp && +exp>=0 && +exp<+age) {
        return exp
    }
    return null;
} 

const ValidateYearlyIncome = (incomeValue)=>{
    if ( +incomeValue && +incomeValue>0 && +incomeValue<1000000 ) {
        return new Number(incomeValue).toFixed(2);
    }
    else if(!incomeValue?.trim()){
        return "00.00"
    }
    return null;
}

const ValidateChilds = (data)=>{
    if ( data.toLowerCase()==="true"|| data.toLowerCase()==="false" ) {
        return data.toUpperCase();
    }
    else if(!data?.trim()){
        return "FALSE";
    }
    return null;
}

const validateEmail = (email) => {
    if(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        return email;
    };
    return null;
}

const validatePhone = (phone)=>{
    if(/^(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/.test(phone)){
        return "+1"+phone;
    }
    else if(/^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/.test(phone)){
        return "+" + phone;
    }
    else if(/^\+?(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/.test(phone)){
        return phone;
    }
    return null;
}

const validateExpDate = (date)=>{
    const arr1match = date.match(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/); // MM/DD/YYYY
    const arr2match = date.match(/^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/); // YYYY-MM-DD
   
    if (((arr1match && +arr1match[1]<=12 && +arr1match[2]<=31 && arr1match[3]!="0000") ||
         (arr2match && arr2match[1]!="0000" && +arr2match[2]<=12 && +arr2match[3]<=31)) &&
         new Date(date) > new Date()) {
        return date;
    }

    return null;
}

const validateFullName = (FullName)=>{
    return FullName;
}

const validateLicenseStates = (License)=>{
    let arr = License.split("|"), result,resultArr=[];
    arr.forEach(el => {
        result = statesList.find(el2=>el?.trim()==el2.abbreviation || el?.trim()==el2.name);        
        
        if (result!==undefined){
            resultArr.push(result.abbreviation)
        }
    });

    if (resultArr?.length>0) {
        return (Array.from(new Set(resultArr))).join(",")
    }

    return null;
}

const validateLicenseNumber = (License)=>{
    if (/^\w{6}$/.test(License)) {
        return License;
    }
    return null;
}


export const getType = (key) =>{
    let res = typeList.find(el=>
        el.key.toLowerCase() === key.toLowerCase() 
    );

    return {
        type: res?.type,
        valFuc: res?.valFuc
    }
}

const typeList = [
    {
        key:"Full Name",
        type:1,
        valFuc:validateFullName
    },
    {
        key:"Phone",
        type:2,
        valFuc:validatePhone
    },
    {
        key:"Email",
        type:3,
        valFuc:validateEmail
    },
    {
        key:"age",
        type:4,
        valFuc:ValidateAge
    },
    {
        key:"Experience",
        type:5,
        valFuc:ValidateExperience
    },
    {
        key:"Yearly Income",
        type:6,
        valFuc:ValidateYearlyIncome
    },
    {
        key:"Has children",
        type:7,
        valFuc:ValidateChilds
    },
    {
        key:"License states",
        type:8,
        valFuc:validateLicenseStates
    },
    {
        key:"Expiration date",
        type:9,
        valFuc:validateExpDate
    },
    {
        key:"License number",
        type:10,
        valFuc:validateLicenseNumber
    }
]