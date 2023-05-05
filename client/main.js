const complimentBtn = document.getElementById("complimentButton")

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

complimentBtn.addEventListener('click', getCompliment)
function display(response) {
    if(response.data.length) {
        steps.innerHTML = ""
        rewriteList.innerHTML = ""
        removeList.innerHTML = ""
        for (let index in response.data) {
            let item = document.createElement("li")
            item.innerHTML = response.data[index]
            steps.appendChild(item)
            let rewriteOption = document.createElement("option")
            rewriteOption.innerHTML = response.data[index]
            rewriteOption.value = index
            rewriteList.appendChild(rewriteOption)
            let removeOption = document.createElement("option")
            removeOption.innerHTML = response.data[index]
            removeOption.value = index
            removeList.appendChild(removeOption)
        }
        options.id = ""
    } else {
        options.id = "hide"
    }
}
document.querySelector("#fortune").addEventListener("click", function(event) {
    event.preventDefault()
    axios.get("http://localhost:4000/api/fortune").then(function(response) {
        alert(response.data)
    })
})
document.querySelector("#addForm").addEventListener("submit", function(event) {
    event.preventDefault()
    let step = addInput.value
    if (step) {
        addInput.value = ""
        axios.post("http://localhost:4000/api/steps", [step]).then(display)
    }
})
document.querySelector("#rewriteForm").addEventListener("submit", function(event) {
    event.preventDefault()
    let step = rewriteInput.value
    if (step) {
        rewriteInput.value = ""
        axios.put("http://localhost:4000/api/steps", { "index": rewriteList.value, "content": step }).then(display)
    }
})
document.querySelector("#removeButton").addEventListener("click", function(event) {
    event.preventDefault()
    axios.delete("http://localhost:4000/api/steps/" + removeList.value).then(display)
})
let steps = document.querySelector("ol")
let options = document.querySelector("div")
let addInput = document.querySelector("#addInput")
let rewriteList = document.querySelector("#rewriteList")
let removeList = document.querySelector("#removeList")
let rewriteInput = document.querySelector("#rewriteInput")
axios.get("http://localhost:4000/api/steps").then(display)