window.onload = function() {
    var result,
        humans,
        claws,
        outputAnswer = document.querySelector('.answer span'),
        inputHumans = document.querySelector('input[data-function="humans"]'),
        inputClaws = document.querySelector('input[data-function="claws"]');
        
    inputHumans.onchange = function() {
        readData();
        howManyPeopleLive(humans, claws);
    };

    inputClaws.onchange = function() {
        readData();
        howManyPeopleLive(humans, claws);
    };
    
    function readData() {
        humans = +document.querySelector('input[data-function="humans"]').value;
        claws = document.querySelector('input[data-function="claws"]').value.split(' ');
        claws = changeStringArrToNumber(claws);
    }

    
    function changeStringArrToNumber (arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i] = (+arr[i]);
        }

        return arr;
    }

    function  howManyPeopleLive(humans, claws) {        
        var humansLife = [];

        if (!checkConditions(humans, claws)) {
            outputAnswer.innerHTML = result;
            return;
        }        

        result = 0;

        for (var i = 0;  i < claws.length; i++) {
            humansLife[i] = true;
        }

        for (const key in claws) {
            for (var i = key - 1; i > (key - claws[key] - 1); i--) {
                if (i < 0) break;
                humansLife[i] = false;
            }
        }

        for (var i = 0;  i < humansLife.length; i++) {
            if (humansLife[i]) result++;
        }
        
        outputAnswer.innerHTML = result;
    }

    function checkConditions(humans, claws) {
        if (!humans || !claws) {
            result = 'Пожалуйста введите все данные.';
            return false;
        }

        if (humans < 1) {
            result = 'Неверно указали количество подсудимых.';
            return false;
        }

        if (humans != claws.length) {
            result = 'Вы указали данные не для всех подсудимых или дали лишние. Исправьте пожалуйста.';
            return false;
        }

        return true;
    }
};