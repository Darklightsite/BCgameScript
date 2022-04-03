var config = {
    bet: { label: 'Javasolt tét', value: (Math.round(currency.amount/15000000 * 100000000) / 100000000), type: 'number' },

bettype: {
    value: 'auto', type: 'radio', label: 'Válassz Tét típust!',
    options: [
      { value: 'auto', label: 'Automata, bank alapján ' },
      { value: 'manual', label: 'Veszteség stopp alapján ' }
    ], 
  }, 
stopploss: { label: "veszteség stopp/kockáztatott tőke", value:-1.5, type:'number' }, 

profitszazalek: { label: "Terv Bank%", value: 50, type: "number"}, 
}
function main() {
    
    var bet = config.bet.value;
    var mainBet = config.bet.value;
    var payout = 10;
    var mainPayout = payout;
    var multiBetting = 1.5;
var multiBettings = multiBetting ;
    var loseStreakToChange = 30;
    var payoutChange = 4.25;    
    var paying = payout;
    var loseStreak = 0;
    var maxLoseStreak = 0;
    var winStreak = 0;
    var profit = 0;
    var winPrice = 0;
    var timeStart = "";
var startbalance = currency.amount;
var finishbalance = 0;
var profitszazalek = config.profitszazalek.value;
var szazalek = profitszazalek/100;
var loseStreak2 = 0;
var maxLoseStreak2 =0;
var aktualprofit=0.00;
var bettype=config.bettype.value;
var stopploss=config.stopploss.value;
var egyenleg=0;
if(bettype==="manual" ) {  egyenleg=stopploss*(-1);
}
 if(bettype==="auto" ) { egyenleg=currency.amount; 
}
bet=Math.round(egyenleg/15000000 * 100000000) / 100000000; 
mainBet=bet;
    var takeprofit = (Math.round(egyenleg * szazalek * 100000000) / 100000000);
startegyenleg=egyenleg;
    timeStart = getTime();
    log.info("Start: " + timeStart);
log.info("Terv: " + takeprofit);
log.info("Egyenleg:" + egyenleg) ;
log.info("Tipus:" +bettype) ;
game.onBet = function () {
        payout = paying;
        game.bet(bet, payout).then(function (payout) {
            if (payout > 1) {
                winPrice = Math.round((bet * (payout - 1)) * 100000000) / 100000000;
                profit += winPrice;
                loseStreak = 0;
loseStreak2 = 0;
                winStreak += 1;
multiBetting = multiBettings;
                log.success("Nyert " + winPrice + ", Profit: " + Math.round(profit * 100000000) / 100000000);
aktualprofit = Math.round(profit/(egyenleg/100)*1000)/1000;
log.success("Aktuális: " + aktualprofit + "%") ;
                bet = mainBet
                paying = mainPayout;
            }
            else {
                lostP = Math.round(bet * 100000000) / 100000000;
                profit -= lostP;
                winStreak = 0;
                log.error("Vesztett " + lostP + ", Profit: " + Math.round(profit * 100000000) / 100000000);
aktualprofit = Math.round(profit/(egyenleg/100)*1000)/1000;
log.success("Aktuális: " + aktualprofit + "%") ;
                loseStreak += 1;loseStreak2 += 1;
                if(maxLoseStreak < loseStreak){
                    maxLoseStreak = loseStreak;
                }
if(maxLoseStreak2 < loseStreak2){ 
maxLoseStreak2 = loseStreak2;
                }
                if(loseStreak >= 6){
loseStreak=0;
if(paying<=3.5){paying=3.5;}else{
                    paying -=1.2;}
payoutChange=paying;
                    bet = Math.round(bet * (mainPayout/payoutChange)* 100000000) / 100000000;
                }
                else{
                    bet = Math.round(bet * multiBetting* 100000000) / 100000000;
                }
                log.info("Vesztes sorozat: Max: " + maxLoseStreak2 + " - Jelenleg: " + loseStreak );                
                }
        });
aktualprofit = Math.round(profit/(egyenleg/100)*1000)/1000;
if (aktualprofit >= profitszazalek || aktualprofit<=-40) {
log.success("Start egyenleg:" +egyenleg) ;
log.success("Start idő :" + timeStart) ;
finishbalance =egyenleg+profit;
log.success("Végső egyenleg:" + finishbalance);
log.success("Befejezés ideje:" + getTime()) ;
log.success("Profit: " + profit+"  //  "+aktualprofit+"%") ;
game.stop(); 
    }
    }
    
}

function getTime() {
    var d = new Date();
    var time = addZero(d.getHours()) + ":" + addZero(d.getMinutes());
    return time;
}
function addZero(num) {
    if (num < 10) {
        return "0" + num;
    }
    else {
        return "" + num;
    }
}
