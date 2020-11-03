document.addEventListener('DOMContentLoaded', () => { 
    console.log('ready')
    const jsonText = document.querySelector('#json')
    const submitJson = document.querySelector('#sendJson')

    //     const create = (json, successCB, errorCB = null) => {
        
    //     $.ajax({
    //       url: 'http://127.0.0.1:3000/json',
    //       type: 'POST',
    //       data: json,
    //       contentType: 'application/json',
    //       success: successCB,
    //       error: errorCB || function(error) {
    //         console.error('chatterbox: Failed to create messages', error);
    //       }
    //     });
    //   }
    
    const sendHttpRequest = (method, url, data) => {
        const promise = new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open(method, url);
      
          xhr.responseType = 'json';
      
          if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
          }
      
          xhr.onload = () => {
            if (xhr.status >= 400) {
              reject(xhr.response);
            } else {
              resolve(xhr.response);
            }
          }
      
          xhr.onerror = () => {
            reject('Something went wrong!');
          }
      
          xhr.send(data);
        })
        return promise
      }


      const sendData = (json) => {
        sendHttpRequest('POST', 'http://127.0.0.1:3000/json', json)
          .then(responseData => {
            console.log(responseData)
          })
          .catch(err => {
            console.log(err)
          })
      }




    let json = {}

    const handeChange = (e) => {
        json = e.target.value
        console.log(json)
        // create(json)
        sendData(json)

    }

    const handleSubmit = (e) => {
        e.preventDefault()

    }



    


    jsonText.addEventListener('change' , handeChange )
    submitJson.addEventListener('click' , handleSubmit)

    

})

