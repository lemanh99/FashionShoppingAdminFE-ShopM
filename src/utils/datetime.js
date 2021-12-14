export const convert_datetime_from_timestamp=(timestamps)=> {
    if (timestamps==null) return null;
    var a = new Date(timestamps * 1000);
    var year = a.getFullYear();
    var month = a.getMonth();
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}


export const convert_date_from_timestamp=(timestamps)=> {
    if (timestamps==null) return null;
    if(timestamps.toString().length>10){
        var a = new Date(timestamps);
    }else{
        var a = new Date(timestamps * 1000);
    }
    
    var year = a.getFullYear();
    var month = a.getMonth();
    var date = a.getDate();
    var time = date + '/' + month + '/' + year;
    return time;
}