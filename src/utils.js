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

function deepArrayCompare(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false; // Arrays have different lengths, so they are not equal
    }
  
    for (let i = 0; i < arr1.length; i++) {
      const obj1 = arr1[i];
      const obj2 = arr2[i];
  
      if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        // The elements at index i are not objects, so they cannot be compared
        return false;
      }
  
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
  
      if (keys1.length !== keys2.length) {
        // Objects have different numbers of keys, so they are not equal
        return false;
      }
  
      for (let j = 0; j < keys1.length; j++) {
        const key = keys1[j];
  
        if (!obj2.hasOwnProperty(key)) {
          // obj2 doesn't have the same key as obj1, so they are not equal
          return false;
        }
  
        const val1 = obj1[key];
        const val2 = obj2[key];
  
        if (typeof val1 === 'object' && typeof val2 === 'object') {
          if (!deepArrayCompare([val1], [val2])) {
            // Recursive call to deepArrayCompare for nested objects
            return false;
          }
        } else if (val1 !== val2) {
          // Values are not equal
          return false;
        }
      }
    }
  
    return true; // Arrays are deep equal
  }
  






export {getDate , dateWithFormat ,getYesterdaysDate , deepArrayCompare}
