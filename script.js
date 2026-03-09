const container = document.getElementById("countries")
const search = document.getElementById("search")
const details = document.getElementById("details")
const toggle = document.getElementById("toggle")

let countriesData = []

fetch("https://restcountries.com/v3.1/all")
.then(res=>res.json())
.then(data=>{
countriesData = data
showCountries(data)
})

function showCountries(data){

container.innerHTML=""

data.forEach(country=>{

const card = document.createElement("div")
card.classList.add("card")

card.innerHTML=`

<img src="${country.flags.png}">

<div class="card-body">
<h3>${country.name.common}</h3>
<p>${country.region}</p>
</div>

`

card.addEventListener("click",()=>showDetails(country))

container.appendChild(card)

})

}

function showDetails(country){

let languages = Object.values(country.languages || {}).join(", ")
let currency = Object.values(country.currencies || {})[0]?.name

details.innerHTML=`

<h2>${country.name.common}</h2>

<p><b>Capital:</b> ${country.capital}</p>

<p><b>Population:</b> ${country.population}</p>

<p><b>Language:</b> ${languages}</p>

<p><b>Currency:</b> ${currency}</p>

`

}

search.addEventListener("input",()=>{

const value = search.value.toLowerCase()

const filtered = countriesData.filter(c =>
c.name.common.toLowerCase().includes(value)
)

showCountries(filtered)

})

toggle.addEventListener("click",()=>{

document.body.classList.toggle("dark")

})