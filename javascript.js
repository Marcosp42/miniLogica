
const itens = document.querySelector(".itens")
const dropzone = document.querySelector(".dropzone")
const output = document.querySelector(".output")

itens.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("text/plain", event.target.classList[1])
})
dropzone.addEventListener("dragover", function (event) {
    dropzone.dropzone = "true"
    dropzone.addEventListener("drop", ab)
    event.preventDefault();
})

const newId = {
    _id: 0,
    get id() {
        this._id++
        return this._id
    }
}

function ab(event) {
    let temp = document.querySelector(`.${event.dataTransfer.getData("text")}`)

    div = temp.cloneNode()
    div.innerHTML = temp.innerHTML
    div.id = `block-${newId.id}`
    div.classList[1] == "item3" ? item3(div) : 0
    dropzone.appendChild(div)

    function item3(s) {
        div.classList.add("bloco")
        s.children[0].addEventListener("dragover", (event) => {
            event.preventDefault()
        })

        s.children[0].addEventListener("drop", function (event) {
            dropzone.removeEventListener("drop", ab)
            let temp = document.querySelector(`.${event.dataTransfer.getData("text")}`)
            div = temp.cloneNode()
            div.classList.remove(div.classList[0], div.classList[1])
            div.innerHTML = temp.innerHTML
            div.id = `block${newId.id}`
            div.classList.add("blockExe")
            div.classList.add(temp.classList[1])
            this.appendChild(div)
        })
    }
}
const remover = document.querySelector("#removerBlock")
dropzone.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", event.target.id)
    remover.src = "./img/icons8-remover-40 (1).png"

})
remover.addEventListener("dragover", function (event) {
    remover.dropzone = "true"
    event.preventDefault()
})
remover.addEventListener("drop", function (event) {
    let temp = document.getElementById(event.dataTransfer.getData("text"))
    temp.parentNode.removeChild(temp)
    remover.src = "./img/icons8-remover-40.png"

})
dropzone.addEventListener("dragend", () => {
    remover.src = "./img/icons8-remover-40.png"

})
//  bloco


function iniciar() {
    const Action = document.querySelectorAll(".dropzone .blockAction")
    const sequencia = []

    sequencia.exe = function () {
        for (let i = 0; i < sequencia.length; i++) {
            if (sequencia[i].type == "item1") {
                sequencia[i].fn(sequencia[++i].fn)
            } else {
                sequencia[i].fn()
            }
        }

    }

    function construirExecutavel(percorrer, vetor) {
        percorrer.forEach(element => {
            try {
                let valorInput

                switch (element.classList[1]) {

                    case ("item1"):
                        valorInput = element.children[0].children[0].value
                        vetor.push({
                            type: element.classList[1],
                            valorInput: valorInput,
                            fn(f1) {
                                for (let i = 0; i < valorInput; i++) {
                                    f1()
                                }
                            }
                        })
                        break

                    case ("item2"):
                        valorInput = element.children[0].children[0].value
                        vetor.push({
                            type: element.classList[1],
                            valorInput: valorInput,
                            fn() {
                                output.innerHTML += `<p>=> ${valorInput}</p>\n`
                            }
                        })
                        break

                    case ("item3"):
                        valorInput = element.children[0].children[0].value
                        let blocoV = document.querySelectorAll(`#${element.id} .blockExe`)
                        const bloco = []
                        bloco.exe = function () {
                            bloco.forEach(e => {
                                e.fn()
                            })
                        }
                        construirExecutavel(blocoV, bloco)

                        vetor.push({
                            type: element.classList[1],
                            fn: () => {
                                bloco.exe()
                            }

                        })
                        break
                }
            }
            catch { }
        })
    }
    construirExecutavel(Action, sequencia)
    sequencia.exe()
}


function limpar() {
    output.innerHTML = " "
}
