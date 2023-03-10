window.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById("github-form")
    const userList = document.getElementById("user-list")
    const repoList = document.getElementById("repos-list")

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        ///console.log("event", event);

        fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
            .then((response) => response.json())
            .then(response => {
                //login, avatar_url, url, 
                //console.log("login", response.item)

                showUserProfile(response)

            })
    })

    function showUserProfile(userData) {
        userList.innerHTML = ""
        repoList.innerHTML = ""

        userData.items.map(item => {
            const li = document.createElement("li")
            const h2 = document.createElement("h2")
            h2.textContent = item.login
            h2.addEventListener("click", (e) => showUserRepos(item.login, e))
            const img = document.createElement("img")
            img.src = item.avatar_url
            img.addEventListener("click", (e) => showUserRepos(item.login, e))


            li.append(h2, img)
            userList.append(li)
        })
        form.reset()
    }

    function showUserRepos(username, e) {
        repoList.innerHTML = ""
        e.preventDefault()

        // console.log("username", username)
        fetch(`https://api.github.com/users/${username}/repos`)
            .then(response => response.json())
            .then(response => {
                //console.log("user repos", response)
                response.map(repo => {
                    const li = document.createElement("li")
                    const h1 = document.createElement("h1")
                    h1.textContent = repo.name

                    li.append(h1)
                    repoList.append(li)
                })

            })
    }




})








/*
window.addEventListener('DOMContentLoaded', () => {

var headers = {
    Accept: application/vnd.github.v3+json
}

const userUrl = 'https://api.github.com/users'

const userUl = document.getElementById("user-list")
console.log (userUl)

//Get fetch request
fetch(userUrl)
    .then ((response) => response.json())
    // .then ((response) => console.log(response, typeof response))
    .then ((userData => appendUser(userData)
    ))
    
let form = document.getElementById('github-form')
console.log(form)
form.addEventListener('submit', filterUsers)



function appendUser (users) {
    // console.log(users)
    // const userList = document.getElementById("user-list")
     for(let uNames of users) {
       const li = document.createElement('li')
       li.textContent = uNames.login
       //console.log(uNames.login)
       userUl.appendChild(li)
      }
}

function filterUsers (e) {
    e.preventDefault();
    let selectUser = e.target.search.value
    form.reset()

}




})
*/