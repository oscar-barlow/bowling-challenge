'use strict';

var BowlingCalculator = function() {
  this.score = [];
  this.currentBalls = [];
  this.frames = 10;
  this.throws = 2;
};

BowlingCalculator.prototype.endTurn = function() {
  this.score.push(this.currentBalls);
  this._clearCurrentTurn();
  this._reduceFrames();
  this._resetThrows();
};

BowlingCalculator.prototype._clearCurrentTurn = function(){
  this.currentBalls = [];
};

BowlingCalculator.prototype._reduceFrames = function(){
  this.frames -= 1;
};

BowlingCalculator.prototype._resetThrows = function(){
  this.throws = 2;
}

BowlingCalculator.prototype.throwBall = function(pins) {
  this._hasFramesLeft();
  this._hasThrowsLeft();
  this._validateThrowBall(pins);
  this.currentBalls.push(pins);
  this._reduceThrows();
};

BowlingCalculator.prototype._hasFramesLeft = function() {
  if (this.frames === 0) {
    throw new Error("No frames left.");
  };
};

BowlingCalculator.prototype._hasThrowsLeft = function() {
  if (this.throws === 0) {
    throw new Error("No throws left.");
  };
};

BowlingCalculator.prototype._validateThrowBall = function(number) {
  this._isNotANegativeNumber(number);
  this._isNotANumber(number);
  this._isNotHigherThanTen(number);
  this._doesNotSumToMoreThanTen(number);
};

BowlingCalculator.prototype._isNotANegativeNumber = function(number) {
  if (number < 0) {
    throw new Error("Invalid input: negative number.");
  };
};

BowlingCalculator.prototype._isNotANumber = function(number) {
  if (isNaN(number)) {
    throw new Error("Invalid input: not a number.")
  };
};

BowlingCalculator.prototype._isNotHigherThanTen = function(number) {
  if (number > 10) {
    throw new Error("Invalid input: max score per throw is 10")
  }
};

BowlingCalculator.prototype._doesNotSumToMoreThanTen = function(number) {
  if (number + this.currentBalls[0] > 10) {
    throw new Error("Invalid input: trying to score more than 10 pins")
  }
};

BowlingCalculator.prototype._reduceThrows = function(){
  this.throws -= 1;
};

BowlingCalculator.prototype.totalScore = function(){
  if (this.frames === 10) {
    return 0;
  } else {
    var flattenedScore = this.score.reduce(function(a, b) {
      return a.concat(b);})

    var sum = flattenedScore.reduce(function(a, b){
      return a + b;
    }, 0);
    return sum;
  }
};

BowlingCalculator.prototype._isStrikeLastTurn = function() {
  var lastItemIndex = this.score.length - 1;
  if (this.score[lastItemIndex] == 10) {
    return true;
  } else {
    return false;
  };
};

BowlingCalculator.prototype._isSpareLastTurn = function() {
  var lastItemIndex = this.score.length - 1;
  var sum = this.score[lastItemIndex].reduce(function(a, b) {
    return a + b;
  }, 0);
  if (sum == 10) {
    return true;
  } else {
    return false;
  };
};
