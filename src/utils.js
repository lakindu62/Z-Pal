function getDate() {
    var currentDate = new Date();

    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Note: months are zero-based
    var year = currentDate.getFullYear();

    var formattedDate = day + '-' + month + '-' + year;
    return formattedDate
}


export {getDate}