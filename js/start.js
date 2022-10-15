const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 12;
const select = [];

function calResult() {
    var pointArray = [
        { name: 'ENFJ', value: 0, key: 0 },
        { name: 'ENFP', value: 0, key: 1 },
        { name: 'ENTJ', value: 0, key: 2 },
        { name: 'ENTP', value: 0, key: 3 },
        { name: 'ESFJ', value: 0, key: 4 },
        { name: 'ESFP', value: 0, key: 5 },
        { name: 'ESTJ', value: 0, key: 6 },
        { name: 'ESTP', value: 0, key: 7 },
        { name: 'INFJ', value: 0, key: 8 },
        { name: 'INFP', value: 0, key: 9 },
        { name: 'INTJ', value: 0, key: 10 },
        { name: 'INTP', value: 0, key: 11 },
        { name: 'ISFJ', value: 0, key: 12 },
        { name: 'ISFP', value: 0, key: 13 },
        { name: 'ISTJ', value: 0, key: 14 },
        { name: 'ISTP', value: 0, key: 15 },
    ]

    for(let i = 0; i < endPoint; i++) {
        var target = qnaList[i].a[select[i]];
        for(let j = 0; j < target.type.length; j++) {
            for(let k = 0; k < pointArray.length; k++) {
                if(target.type[j] === pointArray[k].name) {
                    pointArray[k].value += 1;
                }
            }
        }
    }

    var resultArray = pointArray.sort(function (a,b) {
        if(a.value > b.value) {
            return -1;
        }
        if(a.value < b.value) {
            return 1;
        }
        return 0;
    });
    console.log(resultArray);
    let resultword = resultArray[0].key;
    return resultword;
}

function goResult() {
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)})

        calResult();
}

function addAnswer(answerText, qIdx, idx) {
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button'); //html요소를 만들어 반환//
    answer.classList.add('answerList') //class 값 부여//
    answer.classList.add('my-4');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');

    a.appendChild(answer); //answer가 a에 속함//
    answer.innerHTML = answerText;

    answer.addEventListener("click", function() {
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++) {
            children[i].disabled = true;
            main.style.WebkitAnimation = "fadeOut 0.5s";
            main.style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            select[qIdx] = idx;
            for(let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        },450)
    }, false);
}

function goNext(qIdx) {
    if(qIdx === endPoint) {
        goResult();
        return;
    }

    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

function begin() {
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
}