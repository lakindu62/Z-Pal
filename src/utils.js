function getDate() {
    var currentDate = new Date();

    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Note: months are zero-based
    var year = currentDate.getFullYear();

    var formattedDate = day + '-' + month + '-' + year;
    return formattedDate
}

function getYesterdaysDate() {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - 1);
    return dateWithFormat(newDate)

}


function dateWithFormat(date){
    var day = date.getDate();
    var month = date.getMonth() + 1; // Note: months are zero-based
    var year = date.getFullYear();

    var formattedDate = day + '-' + month + '-' + year;
  
    return formattedDate
}



export {getDate , dateWithFormat ,getYesterdaysDate}
