function createUser() {
    let fname = fullname.value;
    let mob = mobile.value;
    let cty = city.value;
    let uname=username.value;
    let pwd=password.value;
    let user = {
        fname:fname,
        mob:mob,
        cty:cty,
        uname:uname,
        pwd:pwd
    }
    localStorage.setItem(uname, JSON.stringify(user));
    alert("User Created");
    location.reload(true);
}

function signIn() {
    let usname = usename.value;
    let pswd = pasword.value;
    
    if (usname in localStorage) {
        let usr = JSON.parse(localStorage.getItem(usname));
        if (usr.pwd == pswd) {
            sessionStorage.setItem("usr", usname);
            alert("Logged in succesfully")
            window.location.href = "home.html";
        }
        else {
            alert("incorrect password")
        }
    }
    else {
        alert("Invalid username or password!!!")
    }
}

let cuser = sessionStorage.getItem("usr");
if (cuser) {
    
    prof.innerHTML = `Logout ${cuser}`;
}

function logout() {
    console.log("clicked");
    let usr = sessionStorage.getItem("usr");
    
    sessionStorage.removeItem(usr);
    location.href = "index.html";
}

function viewDetails(){

    
    //let html_data="";
    let usr = sessionStorage.getItem("usr");
    let data = JSON.parse(localStorage.getItem(usr));
    
    html_data=`<div class="card" style="width: 18rem;">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">${data.fname}</li>
      <li class="list-group-item">${data.mob}</li>
      <li class="list-group-item">${data.cty}</li>
    </ul>
  </div>`;
    
     res.innerHTML=html_data;
     fetchWeather(data.cty);

}

function populate(city){
    let name=city.name;
    let temp=city.main.temp;
    let hum=city.main.humidity;

    let html_data=`<div >
      ${name}<br>
      <i class="bi bi-cloud-hail">Temperateure  ${temp} C</i><br>
      Humidity  ${hum}
      
    </div>`
    result.innerHTML=html_data;
    }
    function fetchWeather(city){
        let city_name=city
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=e874510c447dbaf705105cf2712f9f25`
        fetch(url).then(res=>res.json()).then(data=>populate(data))

    }