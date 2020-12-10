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
  const classes = rawdata[0];
  const teachers= rawdata[1];
  console.log("Rawdata from server, ", rawdata.length);
  console.log("classes", classes);
  console.log("teachers", teachers);
  //ne
  
  const textInput = document.querySelector("#textInput");
  const suggestions = document.querySelector(".suggestions");
  if (textInput !== null) {
  textInput.addEventListener("change", (evt) => {
    var typesearch = document.getElementById("textInput").getAttribute("placeholder");
        
    if(document.getElementById('course_search').checked){
    displaymatches(evt, classes);
    console.log(typesearch);
    }
    else{
    displaymatches(evt, teachers); 
    }
  })
}
}

mainThread().catch(err => {console.error(err)});



// try -> catch (if we wanted)

function displaymatches(evt, rawdata){
  const suggestions = document.querySelector(".suggestions");
  const value = evt.target.value;
  const matchArray = findMatches(value, rawdata);
  const html = matchArray.map(course => { 
    if (course.department) {
      console.log(matchArray);
      
     return `
      <li>
      <h4 class= "courses">${course.department}${course.course_number}</h4>
      <p class="category">${course.title}</p>
      </li>
      `;
      
    }
    else {
      console.log(matchArray);
      console.log("Rating:", course.reviews[0]);
      if (course.reviews[0]){
        return `
      <li>
          <h4 class="name">Professor ${course.name}</h4>
          <p class="category">${course.courses}</p>
          <p class = "reviews"> Rating: ${course.reviews[0].rating}</p>
          <p class = "reviews"> Expected Grade: ${course.reviews[0].expected_grade}</p>
      </li>
      `;
      }
      else{
        return `
      <li>
          <h4 class="name">${course.type} ${course.name}</h4>
          <p class="category">${course.courses}</p>
          <p class = "reviews">No Rating Availiable</p>
      </li>
      `;
      } 
    }
  }).join('');
  suggestions.innerHTML = html;
  var more = document.getElementsByClassName("courses");
  for (let i = 0; i < more.length; i++) {
    more[i].onclick = function(e) {
      const newpage = document.querySelector(".newpage");
      mo=more[i].innerHTML;
      var z = mo.match(/[\d\.]+|\D+/g);
      console.log(z[1]);
      var result = rawdata.filter((person)=>(person.course_number == z[1]));
      const newhtml = result.map(course => { 
        console.log(result);
        
       return `
       <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <link rel="stylesheet" type="text/css" href="styles.css" />
     <title>Group A93 Final Project</title>
     </head>
       <body>
       <div class= "de">
       <li>
         <h4>${course.department}${course.course_number}</h4>
         <p class="category">${course.title}</p>
         <p class="category">${course.credits}</p>
         <p class="category">${course.department}</p>
         <p class="category">${course.professors}</p>
       </li>
        </div>
         </body>`; 
        
      }).join('');
      newpage.innerHTML=newhtml;
     
    }
  }
 
  
}


function filterFunctionCourse(string, rawdata){
  return rawdata.filter(f => {
    const regex = new RegExp(string, "gi"); // g means global and i means insensitive
    if (f.department) {return f.department.match(regex)}
    else {return f.name.match(regex)}
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
