window.onload = function() {
    var result,
        bottles,
        cola,
        volume,
        outputAnswer = document.querySelector('.answer span'),
        inputBottles = document.querySelector('input[data-function="bottles"]'),
        inputCola = document.querySelector('input[data-function="cola"]'),
        inputVolume = document.querySelector('input[data-function="volume"]');
        
    inputBottles.onchange = function() {
        readData();
        fitColaInTwoBottles(bottles, cola, volume);
    };

    inputCola.onchange = function() {
        readData();
        fitColaInTwoBottles(bottles, cola, volume);
    };

    inputVolume.onchange = function() {
        readData();
        fitColaInTwoBottles(bottles, cola, volume);
    };
    
    function readData() {
        bottles = +document.querySelector('input[data-function="bottles"]').value;
        cola = document.querySelector('input[data-function="cola"]').value.split(' ');
        cola = changeStringArrToNumber (cola);
        volume = document.querySelector('input[data-function="volume"]').value.split(' ');
        volume = changeStringArrToNumber (volume);
    }

    function changeStringArrToNumber (arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i] = (+arr[i]);
        }

        return arr;
    }

    function fitColaInTwoBottles(bottles, cola, volume) {
        var sumCola,
            volumeInTwoBottles;
        
        if (!checkConditions(bottles, cola, volume)) {
            outputAnswer.innerHTML = result;
            return;
        } 

        volumeInTwoBottles = findVolumeBiggestBottles(volume);
        sumCola = findVolumeOfCola(cola);

        sumCola <= volumeInTwoBottles ? result = 'Yes' : result = 'No';
        
        outputAnswer.innerHTML = result;
    }

    function findVolumeOfCola(cola) {
        return cola.reduce(function(previousValue, currentValue, index, array) {
            return previousValue + currentValue;
        });
    }

    function findVolumeBiggestBottles(volume) {
        var volumeInTwoBottles = 0;

        volumeInTwoBottles += Math.max.apply(null, volume);
        volume[volume.indexOf(volumeInTwoBottles)] = 0;
        volumeInTwoBottles += Math.max.apply(null, volume);

        return volumeInTwoBottles;
    }

    function checkConditions(bottles, cola, volume) {
        if (!bottles || !cola || !volume) {
            result = 'Пожалуйста введите все данные.';
            return false;
        }

        if (bottles < 1) {
            result = 'Неверно указали количество бутылок.';
            return false;
        }

        if (bottles != cola.length && bottles != volume.length) {
            result = 'Вы указали данные не для всех бутылок или дали лишние. Исправьте пожалуйста.';
            return false;
        }

        if (cola.length != volume.length) {
            result = 'Количество обьема колы и бутылок в целом не соответствуют друг другу. Пожалуйста проверьте ваши данные.';
            return false;
        }

        for (var i = 0; i < cola.length; i++) {
            if (cola[i] > volume[i]) {
                result = 'В ' + (i + 1) + '-й бутылке больше колы, чем её обьем. Исправьте пожалуйста.';
                return false;
            }
        }

        return true;
    }
};