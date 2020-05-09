const maxHits = 10;

let hits = 0;
let hitsMiss = 0;
let firstHitTime = 0;

function declOfNum(number, titles) {  
    cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100 > 4 && number%100 < 20) ? 2 : cases[(number%10 < 5) ? number%10 : 5] ];  
}

function startGame() {
  $(".game-field").removeClass('d-none');
  $("#start-game").addClass('d-none');
  $("#button-reload").removeClass('d-none');

  round();
  firstHitTime = getTimestamp();
  $(".game-field").click(handleClick);
}

function round() {
  if (hits === maxHits) {
    $(".game-field").addClass('d-none');
    endGame();
  } else {
    $(".game-field").removeClass("target");
    $(".game-field").removeClass("miss");

    let divSelector = randomDivId();
    $(divSelector).addClass("target");
    $(".target").text(hits + 1);
  }
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits += 1;
    $(event.target).text("");
    round();
  } else {
    $(event.target).addClass("miss");
    hitsMiss -= 1;
  };
}

function endGame() {
  $('#game-fields').addClass("d-none");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  let totalPoints = hits + hitsMiss;

  let totalGreen = maxHits + declOfNum(maxHits, [' зелёный квадрат', ' зелёных квадрата', ' зелёных квадратов']);

  let $totalMessage = 'Вы нашли ' + totalGreen + ' за ' + totalPlayedSeconds + ' секунд'
  let $allPoints = 'Количество очков с учетом промахов ' + totalPoints + ' из ' + maxHits
 
  $("#total-message").text($totalMessage);
  $("#all-points").text($allPoints);
  $("#win-message").removeClass("d-none");
}

function init() {
  let $nameHeader = maxHits + declOfNum(maxHits, [' квадрат', ' квадрата', ' квадратов']);

  $("#name-header").text($nameHeader);
  $("#start-game").click(function() {
    startGame();
  });

  $("#button-reload").click(function() {
    location.reload();
  });

}

$(document).ready(init);