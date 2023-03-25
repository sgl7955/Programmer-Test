const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 12;
const select = [];

function calResult() {
    const pointArray = [
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

    const url = "/page/result-";
    const html = ".html"

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

    const resultArray = pointArray.sort(function (a,b) {
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
    location.href = url + resultword + html;
    return resultword;
}


// function callResult() {
//     location.href = "/page/result-.html";
// }



function setResult() {
    let point = calResult();
    const resultName = document.querySelector('.resumtname');
    resultName.innerHTML = infoList[point].name;

    const resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    const imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
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
        setResult();
        calResult();
}

function addAnswer(answerText, qIdx, idx) {
    const a = document.querySelector('.answerBox');
    const answer = document.createElement('button'); //버튼 html요소를 만들어 반환//
    answer.classList.add('answerList') //class 값 부여//
    answer.classList.add('my-4');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');

    a.appendChild(answer); //answer가 a에 속함//
    answer.innerHTML = answerText;

    answer.addEventListener("click", function() { //클릭할 때 호출할 함수를 지정//
        const children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++) {
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
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

    const q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    const status = document.querySelector('.statusBar');
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