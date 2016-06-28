var C, D = 0;

angular.module('myApp', [])
  .controller('mainController', ['$scope', function($scope) {
    $scope.tasksList = [];
    $scope.counter = 0;
    document.querySelector("#counterM").innerHTML = "0:00:00";

    $scope.go = function() {
      D = 1;

      var sec = 0;
      var min = 0;
      var hour = 0;
      var output = document.querySelector("#counterM");
      output.innerHTML = hour + ":0" + min + ":0" + sec;

      var a = setInterval(function() {
        sec++;

        if (sec == 60) {
          sec = 0;
          min++;
        } else if (min == 60) {
          min = 0;
          hour++;
        }

        if (sec < 10) {
          brS = ":0";
        } else {
          brS = ":";
        }

        if (min < 10) {
          brM = ":0";
        } else {
          brM = ":";
        }
        output.innerHTML = hour + brM + min + brS + sec;
        $scope.counter = hour + brM + min + brS + sec;

        $scope.hour = hour;
        $scope.min = min;
        $scope.sec = sec;
      }, 1000);

      $scope.brk = function() {
        clearInterval(a);
        document.querySelector("#counterM").innerHTML = "0:00:00";
      };
    };

    $scope.nameUpdate = function(N, rowIndex) {
      R = rowIndex;

      angular.element(document.querySelector("#tasksTable").rows[R + 1].cells[C].children[2]).css("display", "none");
      $scope.showUpdate(R);
    };

    $scope.nameUpdated = function(N, rowIndex) {
      R = rowIndex;

      if ($scope.updateName === undefined || $scope.updateName.length === 0) {
        $scope.tasksList[R]['name'] = angular.element(document.querySelector("#tasksTable").rows[R + 1].cells[C].children[1].children[0].children[0])[0].value;

        angular.element(document.querySelector("#tasksTable").rows[R + 1].cells[C].children[2]).css("display", "initial");
        $scope.hideUpdate(R);
      } else {
        $scope.tasksList[R]['name'] = $scope.updateName;

        $scope.hideUpdate(R);
        angular.element(document.querySelector("#tasksTable").rows[R + 1].cells[C].children[2]).css("display", "initial");
      }
    };

    $scope.quantityUpdate = function(N, rowIndex) {
      R = rowIndex;

      angular.element(document.querySelector("#tasksTable").rows[R + 1].cells[C].children[2]).css("display", "none");
      $scope.showUpdate(R);
    };

    $scope.showUpdate = function() {
      angular.element(document.querySelector("#tasksTable").rows[R + 1].cells[C].children[0]).css("display", "none");
      angular.element(document.querySelector("#tasksTable").rows[R + 1].cells[C].children[1]).css("display", "initial");
    };

    $scope.hideUpdate = function() {
      angular.element(document.querySelector("#tasksTable").rows[R + 1].cells[C].children[0]).css("display", "initial");
      angular.element(document.querySelector("#tasksTable").rows[R + 1].cells[C].children[1]).css("display", "none");
    };

    $scope.hiddenCheckGo = function() {
      var check = (D === 0) ? 'nothidden' : 'hidden';
      return check;
    };

    $scope.hiddenCheckStop = function() {
      var check = (D === 0) ? 'hidden' : 'notHidden';
      return check;
    };

    $scope.hiddenCheckName = function(L) {
      var check = (L.task.name.length !== 0) ? 'hidden' : 'notHidden';
      return check;
    };

    $scope.hiddenCheckQuantity = function(L) {
      var check = (L.task.quantity.length !== 0) ? 'hidden' : 'notHidden';
      return check;
    };

    $scope.hiddenCheckProfit = function(L) {
      var check = isNaN(L.task.profit) ? 'hidden' : 'notHidden';
      return check;
    };

    $scope.stopSave = function() {
      if ($scope.counter < 1) {
        alert("таймер ещё и не поработал толком)");
      } else {
        if ($scope.myForm.$valid === false) {
          alert("ограничтесь цифрами и/или двумя знаками после запятой");
        } else {
          var newTask = [];

          if ($scope.quantity === undefined || $scope.quantity === null) {
            newTask = {
              name: $scope.name,
              quantity: $scope.quantity,
              counter: $scope.counter,
              timetime: $scope.hour * 3600 + $scope.min * 60 + $scope.sec,
              profit: Math.round((($scope.hour * 3600 + $scope.min * 60 + $scope.sec) * ($scope.quantity / 3600)) * 100) / 100
            };
          } else {
            newTask = {
              name: $scope.name,
              quantity: Math.round($scope.quantity.replace(',', '.') * 100) / 100,
              counter: $scope.counter,
              time: $scope.hour * 3600 + $scope.min * 60 + $scope.sec,
              profit: Math.round((($scope.hour * 3600 + $scope.min * 60 + $scope.sec) * ($scope.quantity.replace(',', '.') / 3600)) * 100) / 100
            };
          }
          $scope.tasksList.push(newTask);
          localStorage.setItem('tasksList', JSON.stringify($scope.tasksList));

          $scope.counter = 0;
          $scope.brk();
          D = 0;
          myForm.reset();
          $scope.name = null;
          $scope.quantity = null;
        }
      }
    };
  }])
  .controller('сhildController', ['$scope', function($scope) {
    $scope.quantityUpdated = function(N, rowIndex) {
      R = rowIndex;
      if ($scope.myQuantityUpdateFormHidden.$valid === false) {
        alert("ограничтесь цифрами и/или двумя знаками после запятой");
      } else {
        if ($scope.updateQuantity === undefined || $scope.updateQuantity.length === 0) {
          $scope.tasksList[R]['quantity'] = angular.element(document.querySelector("#tasksTable").rows[R + 1].cells[C].children[1].children[0].children[0])[0].value;
          $scope.tasksList[R]['profit'] = Math.round((($scope.hour * 3600 + $scope.min * 60 + $scope.sec) * (angular.element(document.querySelector("#tasksTable").rows[R + 1].cells[C].children[1].children[0].children[0])[0].value / 3600)) * 100) / 100;

          angular.element(document.querySelector("#tasksTable").rows[R + 1].cells[C].children[2]).css("display", "initial");
          $scope.hideUpdate(R);
        } else {
          $scope.tasksList[R]['quantity'] = $scope.updateQuantity.replace(',', '.');
          $scope.tasksList[R]['profit'] = Math.round((($scope.hour * 3600 + $scope.min * 60 + $scope.sec) * ($scope.updateQuantity.replace(',', '.') / 3600)) * 100) / 100;

          $scope.hideUpdate(R);
          angular.element(document.querySelector("#tasksTable").rows[R + 1].cells[C].children[2]).css("display", "initial");
        }
      }
    };
  }]);