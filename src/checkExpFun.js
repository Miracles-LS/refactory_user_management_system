//验证手机号
const checkPhone=(phone)=>{
    // 中国移动：China Mobile
    // 134,135,136,137,138,139,147,150,151,152,157,158,159,170[5],178,182,183,184,187,188
    let CM_NUM = "^((13[4-9])|(147)|(15[0-2,7-9])|(17[8])|(18[2-4,7-8]))\\d{8}|(170[5])\\d{7}$";
    
    //中国联通：China Unicom
    //130,131,132,145,155,156,170[4,7-9],171,175,176,185,186
    let CU_NUM = "^((13[0-2])|(145)|(15[5-6])|(17[156])|(18[5,6]))\\d{8}|(170[4,7-9])\\d{7}$";

    // 中国电信：China Telecom
    // 133,149,153,170[0-2],173,177,180,181,189
    let  CT_NUM = "^((133)|(149)|(153)|(17[3,7])|(18[0,1,9]))\\d{8}|(170[0-2])\\d{7}$";
    //match return true/false
    let isMatchCM = phone.match(CM_NUM); //匹配移动
    let isMatchCU = phone.match(CU_NUM); //匹配联通
    let isMatchCT = phone.match(CT_NUM); //匹配电信
    if(isMatchCM || isMatchCU ||isMatchCT){
        return true;
    }else{
        return false;
    }
}
//验证邮箱
const checkEmail=(email)=>{
    let reg = "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$";
    if(email.match(reg)){
        return true
    }else{
        return false
    }
}
export default {
    checkPhone,checkEmail
}