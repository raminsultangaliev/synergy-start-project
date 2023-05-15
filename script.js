const date = new Date()

let startBtn = document.createElement('button')
startBtn.classList.add('btn')
startBtn.textContent = 'Начать игру'
document.body.append(startBtn)

startBtn.addEventListener('click', () => {
    document.body.removeChild(startBtn)
    startBtn.textContent = 'След. уровень'
    let toFirstBtn = startBtn.cloneNode(true)
    firstLevel(toFirstBtn)
})

function formatDate() {
    let dd = date.getDate();
    dd = (dd < 10) ? '0' + dd : dd

    let mm = date.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm

    return dd + '.' + mm
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    return Math.round(rand)
}

function firstLevel(nextBtn) {
    function changeColor(elem) {
        let $ = elem.classList
        if ($.contains('red')) {
            $.replace('red', 'green')
        } else if ($.contains('green')) {
            $.replace('green', 'blue')
        } else if ($.contains('blue')) {
            $.replace('blue', 'red')
        }
        ifWin()
    }

    function ifWin() {
        function $(elem) {
            return elem.classList.value
        }

        nextBtn.style.visibility = ($(cube1) == $(cube2) && $(cube2) == $(cube3)) ? 'visible' : 'hidden'
    }

    let label1 = document.createElement('h2')
    label1.textContent = 'Уровень 1: Три в ряд'
    label1.classList.add('label')
    document.body.append(label1)

    let container = document.createElement('div')
    container.classList.add('lvl1-cont')
    document.body.append(container)

    let cube1 = document.createElement('div')
    let cube2 = cube1.cloneNode(false)
    let cube3 = cube1.cloneNode(false)
    cube1.classList.add('lvl1-cube', 'red')
    cube2.classList.add('lvl1-cube', 'green')
    cube3.classList.add('lvl1-cube', 'blue')
    container.append(cube1, cube2, cube3)

    nextBtn.style.visibility = 'hidden'
    document.body.append(nextBtn)

    cube1.addEventListener('click', () => changeColor(cube1))
    cube2.addEventListener('click', () => changeColor(cube2))
    cube3.addEventListener('click', () => changeColor(cube3))

    nextBtn.addEventListener('click', () => {
        let toSecondBtn = nextBtn.cloneNode(true)
        document.body.innerHTML = ''
        secondLevel(toSecondBtn)
    })
}

function secondLevel(nextBtn) {
    let label2 = document.createElement('h2')
    label2.textContent = 'Уровень 2: Дата?'
    label2.classList.add('label')
    document.body.append(label2)

    let inp2 = document.createElement('input')
    inp2.classList.add('inp')
    inp2.placeholder = '01.01'
    inp2.maxLength = 5
    document.body.append(inp2)

    nextBtn.style.visibility = 'hidden'
    document.body.append(nextBtn)

    inp2.addEventListener('input', () => {
        nextBtn.style.visibility = (inp2.value == formatDate()) ? 'visible' : 'hidden'
    })

    nextBtn.addEventListener('click', () => {
        let toThirdBtn = nextBtn.cloneNode(true)
        document.body.innerHTML = ''
        thirdLevel(toThirdBtn)
    })
}

function thirdLevel(nextBtn) {
    function type() {
        if (isNaN(+inp3.value) || +inp3.value == 0) {
            inp3.value = ''
        }
        if (inp3.value.length == 2) {
            inp3.type = 'button'
            isBtn = true
        }
    }

    function ifWin() {
        if (inp3.value == 0) nextBtn.style.visibility = 'visible'
    }

    let label3 = document.createElement('h2')
    label3.textContent = 'Уровень 3: Кликер'
    label3.classList.add('label')
    document.body.append(label3)

    let inp3 = document.createElement('input')
    inp3.classList.add('inp')
    inp3.placeholder = 'от 10 до 99'
    inp3.maxLength = 2
    document.body.append(inp3)

    nextBtn.style.visibility = 'hidden'
    document.body.append(nextBtn)

    let isBtn = false
    inp3.addEventListener('input', () => type())

    inp3.addEventListener('click', () => {
        if (isBtn && inp3.value > 0) {
            inp3.value = +inp3.value - 1
            ifWin()
        }
    })

    nextBtn.addEventListener('click', () => {
        let toFourthBtn = nextBtn.cloneNode(true)
        document.body.innerHTML = ''
        fourthLevel(toFourthBtn)
    })
}

function fourthLevel(nextBtn) {
    let rand = randomInteger(1, 10)

    function type() {
        if (isNaN(+inp4.value) || +inp4.value == 0) {
            inp4.value = ''
        }
        nextBtn.style.visibility = (+inp4.value == rand) ? 'visible' : 'hidden'
    }

    let label4 = document.createElement('h2')
    label4.textContent = 'Уровень 4: Угадай число'
    label4.classList.add('label')
    document.body.append(label4)

    let inp4 = document.createElement('input')
    inp4.classList.add('inp')
    inp4.placeholder = 'от 1 до 10'
    inp4.maxLength = 2
    document.body.append(inp4)

    nextBtn.style.visibility = 'hidden'
    document.body.append(nextBtn)

    inp4.addEventListener('input', () => type())

    nextBtn.addEventListener('click', () => {
        let toFifthBtn = nextBtn.cloneNode(true)
        document.body.innerHTML = ''
        fifthLevel(toFifthBtn)
    })
}

function fifthLevel(nextBtn) {
    let label5 = document.createElement('h2')
    label5.textContent = 'Уровень 5: Поймай кнопку'
    label5.classList.add('label')
    document.body.append(label5)

    let inp5 = document.createElement('input')
    inp5.classList.add('inp')
    inp5.type = 'button'
    inp5.value = 10
    document.body.append(inp5)

    nextBtn.textContent = 'Завершить игру'
    document.body.append(nextBtn)

    inp5.addEventListener('input', () => type())

    nextBtn.addEventListener('click', () => {
        nextBtn.style.transform = `translate(${randomInteger(-500, 500)}px)`
        if (inp5.value < 1) {
            document.body.innerHTML = ''
            final()
        } else inp5.value--
    })

    window.setInterval(() => {
        inp5.value++
    }, 2000)
}

function final() {
    let date1 = new Date()
    let label6 = document.createElement('h2')
    label6.textContent = `Поздравляю! Вы прошли мою игру за ${Math.round((+date1-(+date))/1000)} секунд`
    label6.classList.add('label')
    document.body.append(label6)
}