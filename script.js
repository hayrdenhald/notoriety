const links = [
  "a",
  "b",
  "aa",
];

let query;
let ul;

document.addEventListener("DOMContentLoaded", () => {
  ul = document.getElementById("links");

  search = document.getElementById("search")
  query = document.getElementById("query")

  search.addEventListener("click", onSearchQuery)

})

const onSearchQuery = (e) => {
  e.preventDefault()

  // console.log(query.value)

  const matches = links.filter(x => x === query.value);

  console.log(matches);

  // for (const match of matches) {

  // }

  matches.forEach(x => {
    const li = document.createElement("li")
    li.textContent = x
    ul.appendChild(li)
  })
}