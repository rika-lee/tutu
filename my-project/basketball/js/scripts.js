var computer = {
    score: 0,
    percent2: 0.5,
    percent3: 0.33
};

var user = {
    score: 0,
    percent2: 0.5,
    percent3: 0.33
};

var game = {
    isComputerTurn: true,
    shotsLeft: 15
};

function showText(s) {
    var $textElem = $('#text');
    $('#text').fadeOut(300, function() {
        $textElem.html(s);
        $textElem.fadeIn(100);
    });
}

function updateComputerScore(score) {
    var preScore = computer.score;
    computer.score += score;
    var $comScoreElem = $('#computer-score');
    $comScoreElem.html(computer.score);
    $comScoreElem
        .prop('number', preScore)
        .animateNumber({
            number: computer.score
        }, 200);
}

function updateUserScore(score) {
    var preScore = user.score;
    user.score += score;
    var $userScoreElem = $('#user-score');
    $userScoreElem.html(user.score);
    $userScoreElem
        .prop('number', preScore)
        .animateNumber({
            number: user.score
        }, 200);
}

function disableComputerButtons(flag) {
    $('.btn-computer').prop('disabled', flag);
}

function disableUserButtons(flag) {
    $('.btn-user').prop('disabled', flag);
}

function refreshButtons(flag) {
    $('.btn-refresh').prop('disabled', flag);
}

function updateAI() {
    var diff = user.score - computer.score;

    if (diff >= 10) {
        computer.percent2 = 0.7;
        computer.percent3 = 0.43;
    } else if (diff >= 6) {
        computer.percent2 = 0.6;
        computer.percent3 = 0.38;
    } else if (diff <= -10) {
        computer.percent2 = 0.3;
        computer.percent3 = 0.23;
    } else if (diff <= -6) {
        computer.percent2 = 0.4;
        computer.percent3 = 0.28;
    }
}

function onComputerShoot() {
    if (game.shotsLeft === 0)
        return;

    if (!game.isComputerTurn)
        return;

    updateAI();    

    var shootType = Math.random() < 0.5 ? 2 : 3;

    if (Math.random() < computer['percent' + shootType]) {
        showText('컴퓨터 ' + shootType + '점 슛 성공!');
        updateComputerScore(shootType);
    } else {
        showText('컴퓨터 ' + shootType + '점 슛 실패');
    }

    game.isComputerTurn = false;

    disableComputerButtons(true);
    disableUserButtons(false);
}

function onUserShoot(shootType) {

    if (game.shotsLeft === 0)
        return;

    if (game.isComputerTurn)
        return;

    if (Math.random() < user['percent' + shootType]) {
        showText(shootType + '점 슛 성공!');
        updateUserScore(shootType);
    } else {
        showText(shootType + '점 슛 실패');
    }

    game.isComputerTurn = true;

    disableComputerButtons(false);
    disableUserButtons(true);

    game.shotsLeft--;

    var $shotsLeftElem = $('#shots-left');
    $shotsLeftElem.html(game.shotsLeft);

    if (game.shotsLeft === 0) {
        setTimeout(function() {
            if (user.score > computer.score)
                showText('승리했습니다!');
            else if (user.score < computer.score)
                showText('아쉽게도 졌습니다...');
            else
                showText('비겼습니다.');
        }, 1000);

        disableComputerButtons(true);
        disableUserButtons(true);
        refreshButtons(false);        
    }
}

$(function() {
    showText(3);
    setTimeout(function() {
        showText(2);
        setTimeout(function() {
            showText(1);
            setTimeout(function() {
                showText('컴퓨터부터 시작합니다!')
                disableComputerButtons(false);
            }, 1000);
        }, 1000);
    }, 1000);
});

function reloadPage() {
    location.reload();
}