var BowlingCalculator = function() {
  this.totalScore = 0;
  this.balls = [];
  this.frames = 10;
  this.throws = 2;
};

BowlingCalculator.prototype.endTurn = function() {
  this._addToScore(this._sumBalls());
  this._clearBalls();
  this._reduceFrames();
};

BowlingCalculator.prototype._addToScore = function(number) {
  this.totalScore += number
};

BowlingCalculator.prototype._sumBalls = function(){
  var sum = this.balls.reduce(function(a, b){
    return a + b;}, 0)
  return sum
};

BowlingCalculator.prototype._clearBalls = function(){
  this.balls = [];
};

BowlingCalculator.prototype._reduceFrames = function(){
  this.frames -= 1;
};

BowlingCalculator.prototype.throwBall = function(pins) {
  this._validateThrowBall(pins);
  this.balls.push(pins);
};

BowlingCalculator.prototype._validateThrowBall = function(number) {
  this._isNegativeNumber(number);
  this._isNotANumber(number);
  this._isHigherThanTen(number);
};

BowlingCalculator.prototype._isNegativeNumber = function(number) {
  if (number < 0) {
    throw new Error("Invalid input: negative number.");
  };
};

BowlingCalculator.prototype._isNotANumber = function(number) {
  if (isNaN(number)) {
    throw new Error("Invalid input: not a number.")
  };
};

BowlingCalculator.prototype._isHigherThanTen = function(number) {
  if (number > 10) {
    throw new Error("Invalid input: max score per throw is 10")
  }
};
