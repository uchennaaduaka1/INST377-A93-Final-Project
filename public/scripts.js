


// To hold our data
const rawdata = [];

/* Get data from server into our array as a json. This will get 2D array.
rawdata[0] will have course data and rawdata[1] will have professors data.
*/

async function getDatafromserver()
{

        return fetch('/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then((fromServer) => fromServer.json())
          .then((jsonFromServer) => jsonFromServer)
          .catch((err) => {
            console.log(err);
          });
}
async function mainThread(){
  const rawdata = await getDatafromserver()
  const usableData = rawdata[0].concat(rawdata[1]);
  console.log("Rawdata from server, ", rawdata.length);
  console.log("Usable Data", usableData.length);

  const textInput = document.querySelector(".textInput");
  const suggestions = document.querySelector(".suggestions");
  textInput.addEventListener("change", (evt) => {
    displaymatches(evt, usableData);
  })
}

mainThread().catch(err => {console.error(err)});
// const course_data = rawdata[0];
// const professors_data = rawdata[1];


/* Function to get course grade based on parameter */

// Problem here is that the api does not allow access like this from the browser for security reasons.
/*
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
*/
// Testing with INST377
// const test_grade = getCourseGrades('INST377');
/*
async function getCourseGrade(department, course_number)
{
  grade_data = fetch('https://api.planetterp.com/v1/grade$course=' + department + course_number)
  .then(function(res) {
      return res.json();
  }).then(function(body) {
      console.log(body);
  });
    //console.log(grade_data);
    return grade_data;
}
*/
// Testing with INST377
// const test_grade = getCourseGrade("INST", "377");

// try -> catch (if we wanted)

function displaymatches(evt, rawdata){
  const suggestions = document.querySelector(".suggestions");
  const value = evt.target.value;
  const matchArray = findMatches(value, rawdata);
  console.log(value)
  const html = matchArray.map(course => {
      return `
      <li>
          <h4 class="name">${course.department} ${course.course_number}</h4>
          <p class="category">${course.title}</p>
      </li>
      `;
  }).join('');
  suggestions.innerHTML = html;
}

function filterFunctionCourse(string, rawdata){
  console.log("String: ", string, rawdata)
  return rawdata.filter(f => {
    console.log("F: ", f)
    const regex = new RegExp(string, "gi"); // g means global and i means insensitive
    console.log("f.department: ", f.department);
    if (f.department) {return f.department.match(regex)}
    else {return f.slug.match(regex)}
  })
}

// Looking at the course object, there are a ton of nested arrays in the object so i'm having a lot of difficulty
// being able to compare wordToMatch to a department
function findMatches(wordToMatch, rawdata) {
  return filterFunctionCourse(wordToMatch, rawdata);
  /*
  return rawdata.filter((course) => {
    console.log(Object.entries(course))
    // Here we need to figure out if name or category that matches what has been searched
    const regex = new RegExp(wordToMatch, "gi"); // g means global and i means insensitive
    return Object.entries(course).department.match(regex); // || course.course_number.match(regex);
  }); */
}

