const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
const select = [];

function calResult(){
	var pointArray = [
		{ name: 'walk', value: 0, key:0},
		{ name: 'notwalk', value: 0, key:1},
		
	
	]
	// j는 사용자가 반복문을 통해 타입에 대해 반복
	// k는 포인트어레이를 반복

	for(let i = 0; i < endPoint; i++){
		var target = qnaList[i].a[select[i]];
		// for(let j = 0; j < target.type.length; j++){
		for(let k = 0; k < pointArray.length; k++){
			if(target.type[0] === pointArray[k].name){
				pointArray[k].value += 1;
			}
			// }
		}
	}
	// var resultArray = pointArray.sort(function(a, b){
	// 	if(a.value > b.value){
	// 		return -1;
	// 	}
	// 	if(a.value < b.value){
	// 		return 1;
	// 	}
	// 	return 0;
	// });
	// console.log(resultArray);
	// let resultword = resultArray[0].key;
	console.log(pointArray[0].value);
	return pointArray[0].value;
}

	function setResult(){
	  let point = calResult();
	  const resultName = document.querySelector('.resultname');
	  resultName.innerHTML = infoList[point].name;

	  var resultImg = document.createElement('img');
	  const imgDiv = document.querySelector('#resultImg');
	  var imgURL = 'img-' + point + '.png';
	  resultImg.src = imgURL;
	  resultImg.alt = point;
	  resultImg.classList.add('img-fluid');
	  imgDiv.appendChild(resultImg);

	const resultDesc = document.querySelector('.resultDesc');
	resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
	qna.style.WebkitAnimation = "fadeOut 1s";
	qna.style.animation = "fadeOut 0.5s";
	setTimeout(() => { 
		result.style.WebkitAnimation = "fadeIn 1s";
		result.style.animation = "fadeIn 0.5s";
	setTimeout(() => {
		qna.style.display = "none";
		result.style.display = "block";
	}, 200)})
	setResult();
	// console.log(select);
	calResult();
}

function addAnswer(answerText, qIdx, idx){
	var a = document.querySelector('.answerBox');
	var answer = document.createElement('button');
	answer.classList.add('answerList');
	answer.classList.add('my-3');
	answer.classList.add('py-5');
	answer.classList.add('mx-auto');
	a.appendChild(answer);
	answer.innerHTML = answerText;

	answer.addEventListener("click", function(){
		var children = document.querySelectorAll('.answerList')
		for(let i = 0; i < children.length; i++){
			children[i].disabled = true;
			children[i].style.display = 'none';
		}
		select[qIdx] = idx;
		goNext(++qIdx);
	}, false);
}

function goNext(qIdx){
	if(qIdx === endPoint){
		goResult();
		return;
	}

  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for(let i in qnaList[qIdx].a){
  	addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%';
}


function begin(){
	main.style.WebkitAnimation = "fadeOut 1s";
	main.style.animation = "fadeOut 0.5s";
	setTimeout(() => { 
		qna.style.WebkitAnimation = "fadeIn 1s";
		qna.style.animation = "fadeIn 0.5s";
	setTimeout(() => {
		main.style.display = "none";
		qna.style.display = "block";
	}, 200)
	let qIdx = 0;
	goNext(qIdx);
	}, 200); 
}