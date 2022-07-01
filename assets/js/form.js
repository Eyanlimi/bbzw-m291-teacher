const email = document.getElementById("email")
const fname = document.getElementById("fname")
const lname = document.getElementById("lname") 
const number = document.getElementById("number") 
const submit = document.getElementById("submit")
submit.disabled = true

function validateEmail(email) 
{ 
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log (re.test(email))
    return re.test(email);
 }

 function validateFname(fname) 
{ 
  var re = /^[A-Za-z]+$/;
  console.log (re.test(fname))
    return re.test(fname);
 }

 function validateNumber(number) 
{ 
  var re = /^\d+/;
  console.log (re.test(number))
    return re.test(number);
 }

 function validateLname(lname) 
 { 
   var re = /^[A-Za-z]+$/;
   console.log (re.test(lname))
     return re.test(lname);
  }

const validate = () => {
    if (!validateEmail(email.value) || !validateFname(fname.value) || !validateLname(lname.value)  || !validateNumber(number.value)) {
      submit.disabled = true
    } else {
      submit.disabled = false
    }
  }

email.addEventListener("keyup", (event) => {
    validate()
})
fname.addEventListener("keyup", (event) => {
    validate()
})
lname.addEventListener("keyup", (event) => {
    validate()
})
number.addEventListener("keyup", (event) => {
    validate()
})

submit.addEventListener("click", async (event) => {
    event.preventDefault()
    const result = await databaseClient.insertInto("users", ["email", "fname", "lname", "number"], [email.value, fname.value, lname.value, number.value])

    if (result.error) {
        alert("Datenbank Fehler: " + JSON.stringify(result.error, null, 2))
    }
    else {
        // Weiterleitung auf die Game Page  
        location.href = "./game.html"
    }

})

