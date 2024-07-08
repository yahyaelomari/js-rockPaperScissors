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

            if (randomNumber >= 0 && randomNumber < 1/3) { console.log(randomNumber); computerMove= 'Rock'; return computerMove;}
            if (randomNumber >= 1/3 && randomNumber < 2/3) {console.log(randomNumber); computerMove= 'Paper';return computerMove;}
            if (randomNumber >= 2/3 && randomNumber <= 1) {console.log(randomNumber); computerMove= 'Scissors';return computerMove;}
        }

    const jsScoreElem = document.querySelector('.js-score');
    const jsResultElem =document.querySelector('.js-resultPopUp');
    jsScoreElem.innerHTML=`Wins:${score.wins} | Ties:${score.ties} | Loses:${score.loses}`;



    function updateScoreElement()
    {jsScoreElem.innerHTML=`Wins:${score.wins} | Ties:${score.ties} | Loses:${score.loses}`;}

    function resultGeneration(moveToWin,moveToLose)
    {
        if(computerMove === myMove)
        {   score.ties++;
            jsResultElem.innerHTML=`<div class="overAllResult"> <p>You <img class="rpsImg" src="rpsImages/${myMove}.png"> <img class="rpsImg" src="rpsImages/${computerMove}.png"> Computer  <div class="js-result">{tie}</div> </p> </div>`;

            updateScoreElement()
            return myMove;
        }
        if(computerMove === moveToWin)
        {
            score.wins++;
            jsResultElem.innerHTML=`<div class="overAllResult"> <p>You <img class="rpsImg" src="rpsImages/${myMove}.png"> <img class="rpsImg" src="rpsImages/${computerMove}.png"> Computer <div class="js-result">{you win}</div> </p> </div>`;

            updateScoreElement()
            return myMove;

        }
        if(computerMove === moveToLose)
        {
            score.loses++;
            jsResultElem.innerHTML=`<div class="overAllResult"> <p>You <img class="rpsImg" src="rpsImages/${myMove}.png"> <img class="rpsImg" src="rpsImages/${computerMove}.png"> Computer <div class="js-result">{you lose}</div> </p> </div>`;

            updateScoreElement()
            return myMove;

        }
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


    function myMoveBasedResultGener()
    {
        if(myMove==='Rock')
        {
            pickCompMove();
            resultGeneration('Scissors','Paper');
        }
        if(myMove==='Paper')
        {
            pickCompMove();
            resultGeneration('Rock','Scissors');
        }
        if(myMove==='Scissors')
        {
            pickCompMove();
            resultGeneration('Paper','Rock');
        }
    }

    function personnalStrat()
    {
        if (!document.querySelector('.js-result'))
            {
                myMove='Scissors';
                myMoveBasedResultGener();
            }
        if (document.querySelector('.js-result').innerHTML==='{you lose}') //I play what the opponent played in the previous round
            {
                myMove=computerMove;
                myMoveBasedResultGener();
            }

        else if (document.querySelector('.js-result').innerHTML==='{you win}' ||document.querySelector('.js-result').innerHTML==='{tie}' ) //I play the same move
            {
                myMoveBasedResultGener();
            }
    }


    let isAutoPlay = false;
    let autoPlayId ;

    const autoModeStatusElem = document.querySelector('.autoModeStatus');


    function autoMode()
    {
        if (!isAutoPlay)
        {
            isAutoPlay=true;
            autoPlayId=setInterval(personnalStrat,2000)
            autoModeStatusElem.innerHTML='Auto mode is on'
        }
        else
        {
            isAutoPlay=false;
            clearInterval(autoPlayId);
            autoModeStatusElem.innerHTML='Auto mode is off'
        }
    }




