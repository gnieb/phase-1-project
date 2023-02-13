fetch("http://localhost:3000/drinks")
.then(r => r.json())
.then(data => console.log(data))