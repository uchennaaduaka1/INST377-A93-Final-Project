

// To hold our data
const rawdata = [];

/* Get data from server into our array as a json. This will get 2D array.
rawdata[0] will have course data and rawdata[1] will have professors data.
*/
async function getDatafromserver()
{

        fetch('/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then((fromServer) => fromServer.json())
          .then((jsonFromServer) => rawdata.push(...jsonFromServer))
          .then(console.log(rawdata))
          .catch((err) => {
            console.log(err);
          });
}

getDatafromserver()
const course_data = rawdata[0];
const professors_data = rawdata[1];


/* Function to get course grade based on parameter */

// Problem here is that the api does not allow access like this from the browser for security reasons.

async function getCourseGrades(course_name)
{
    const headers = {
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Origin': '*',
      'Accept':'application/json', 'Content-Type': ' application/json',
    };
    
    await fetch('https://api.planetterp.com/v1/grades?course=' + course_name,
    {
      method: 'GET',
      headers: headers
    })
    .then(function(res) {
        return res.json();
    }).then(function(body) {
        console.log(body);
    }).catch((err) => {
      console.log(err);
    });
  
}

// Testing with INST377
const test_grade = getCourseGrades('INST377');