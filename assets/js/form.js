const submit = document.getElementById("submit")
const email = document.getElementById("email")
const fname = document.getElementById("fname")
const lname = document.getElementById("lname")
const number = document.getElementById("number")
submit.disabled = true





const validate = () => {
    if (email.value == "") {
        submit.disabled = true
    } else {
        submit.disabled = false
    }
}

email.addEventListener("keyup", (event) => {
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