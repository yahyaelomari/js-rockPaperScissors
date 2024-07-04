    let computerMove='';
    let myMove='';


       let  score= JSON.parse(localStorage.getItem('scoreKey')) || {
           wins:0,
           loses:0,
           ties:0
       }

    function pickCompMove()
        {
            let randomNumber = Math.random();

            if (randomNumber >= 0 && randomNumber < 1/3) { console.log(randomNumber); computerMove= 'Rock';}
            if (randomNumber >= 1/3 && randomNumber < 2/3) {console.log(randomNumber); computerMove= 'Paper';}
            if (randomNumber >= 2/3 && randomNumber <= 1) {console.log(randomNumber); computerMove= 'Scissors';}
        }

    const jsScoreElem = document.querySelector('.js-score');
    const jsResultElem =document.querySelector('.js-resultPopUp');
    jsScoreElem.innerHTML=`Wins:${score.wins} | Ties:${score.ties} | Loses:${score.loses}`;


    function updateScoreElement()
    {jsScoreElem.innerHTML=`Wins:${score.wins} | Ties:${score.ties} | Loses:${score.loses}`;}

    function resultGeneration(moveToWin,moveToLose)
    {
        if(computerMove === myMove) {score.ties++; jsResultElem.innerHTML=` You <img class="rpsImg" src="rpsImages/${myMove}.png"> <img class="rpsImg" src="rpsImages/${computerMove}.png"> Computer  {tie}`;updateScoreElement()}
        if(computerMove === moveToWin) {score.wins++; jsResultElem.innerHTML=` You <img class="rpsImg" src="rpsImages/${myMove}.png"> <img class="rpsImg" src="rpsImages/${computerMove}.png"> Computer  {you win}`;updateScoreElement()}
        if(computerMove === moveToLose) {score.loses++; jsResultElem.innerHTML=` You <img class="rpsImg" src="rpsImages/${myMove}.png"> <img class="rpsImg" src="rpsImages/${computerMove}.png"> Computer  {you lose}`;updateScoreElement()}
        localStorage.setItem('scoreKey', JSON.stringify(score))//takes JSON version of score and puts it in localStorage to keep score even after refresh
    }

    function showScore() {
           localStorage.getItem('scoreKey');
        alert(`Wins:${score.wins} | Ties:${score.ties} | Loses:${score.loses}`);
    }

    function resetScore (){
        localStorage.removeItem('scoreKey')
        score.wins=0
        score.loses=0
        score.ties=0
        updateScoreElement()
        jsResultElem.innerHTML='';
       // alert(`Score is reset => Wins:${score.wins} | Ties:${score.ties} | Loses:${score.loses}`)

    }
