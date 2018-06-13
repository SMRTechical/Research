export function handleError(error){
    var errorText = 'There was problem, please try again';
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
       console.log('1');
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.statusText);
        console.log(error.response.headers);
        errorText = error.response.statusText
        errorText = error.response ? error.response.statusText: 'Something went wrong, please try again.'
        if (errorText == 'Bad Request')
            errorText = "Please fill in all required fields."
        if (errorText == 'Not Found')
            errorText = "No records found"
    } else if (error.request) {
        console.log('2');
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        errorText = error.request;
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('3');
        errorText = error.message;
    }

    var error = new Error(errorText);
    throw error
}

export function handleErrorMessage(error){
    var errorText = 'There was problem, please try again';
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.statusText);
        // console.log(error.response.headers);
        errorText = error.response.statusText
        errorText = error.response ? error.response.statusText: 'Something went wrong, please try again.'
        if (errorText == 'Bad Request')
            errorText = "Please fill in all required fields."
        if (errorText == 'Not Found')
            errorText = "No records found"
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        errorText = 'Please try again'//error.request;
    } else {   
        // Something happened in setting up the request that triggered an Error
        errorText = error.message;
    }
    //console.log(errorText)
   return errorText
}
