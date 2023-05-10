const form = document.getElementById('booking-form');
const towerSelect = document.getElementById('tower-select');
const floorSelect = document.getElementById('floor-select');
const roomSelect = document.getElementById('room-select');
const dateInput = document.getElementById('date-input');
const startTimeInput = document.getElementById('start-time-input');
const endTimeInput = document.getElementById('end-time-input');
const commentTextarea = document.getElementById('comment-textarea');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateForm()) {
        const data = {
            tower: towerSelect.value,
            floor: floorSelect.value,
            room: roomSelect.value,
            date: dateInput.value,
            startTime: startTimeInput.value,
            endTime: endTimeInput.value,
            comment: commentTextarea.value
        };

        console.log(JSON.stringify(data));
        form.reset();
    } else {
        console.log('Форма заполнена неправильно!');
    }
});

form.addEventListener('reset', () => {
    towerSelect.selectedIndex = 0;
    floorSelect.selectedIndex = 0;
    roomSelect.selectedIndex = 0;
    dateInput.value = '';
    startTimeInput.value = '';
    endTimeInput.value = '';
    commentTextarea.value = '';
  
  towerSelect.classList.remove('valid', 'invalid');
floorSelect.classList.remove('valid', 'invalid');
roomSelect.classList.remove('valid', 'invalid');
dateInput.classList.remove('valid', 'invalid');
startTimeInput.classList.remove('valid', 'invalid');
endTimeInput.classList.remove('valid', 'invalid');
commentTextarea.classList.remove('valid', 'invalid');

});

// ----------



// --------------
const startTime = new Date();
startTime.setHours(9, 0, 0);

const endTime = new Date();
endTime.setHours(18, 0, 0);

// startTimeInput.value = startTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
// endTimeInput.value = endTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

startTimeInput.addEventListener('change', () => {
    const selectedStartTime = new Date(`1/1/2021 ${startTimeInput.value}`);
    const selectedEndTime = new Date(`1/1/2021 ${endTimeInput.value}`);

    if (selectedEndTime <= selectedStartTime) {
        const adjustedEndTime = new Date(selectedStartTime.getTime() + (60 * 60 * 1000));
        endTimeInput.value = adjustedEndTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }
});

endTimeInput.addEventListener('change', () => {
    const selectedStartTime = new Date(`1/1/2021 ${startTimeInput.value}`);
    const selectedEndTime = new Date(`1/1/2021 ${endTimeInput.value}`);

    if (selectedEndTime <= selectedStartTime) {
        const adjustedStartTime = new Date(selectedEndTime.getTime() - (60 * 60 * 1000));
        startTimeInput.value = adjustedStartTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }
});


// ---------------
const validateForm = () => {
    let isValid = true;

    if (towerSelect.selectedIndex === 0) {
        alert('Выберите башню');
        towerSelect.classList.add('invalid');
        isValid = false;
    } else {
        towerSelect.classList.remove('invalid');
        towerSelect.classList.add('valid');
    }

    if (floorSelect.selectedIndex === 0) {
        alert('Выберите этаж');
        floorSelect.classList.add('invalid');
        isValid = false;
    } else {
        floorSelect.classList.remove('invalid');
        floorSelect.classList.add('valid');
    }

    if (roomSelect.selectedIndex === 0) {
        alert('Выберите переговорку');
        roomSelect.classList.add('invalid');
        isValid = false;
    } else {
        roomSelect.classList.remove('invalid');
        roomSelect.classList.add('valid');
    }

    if (dateInput.value === '') {
        alert('Выберите дату');
        dateInput.classList.add('invalid');
        isValid = false;
    } else {
        dateInput.classList.remove('invalid');
        dateInput.classList.add('valid');
    }

    if (startTimeInput.value === '' || endTimeInput.value === '') {
        alert('Выберите время начала и конца бронирования');
        startTimeInput.classList.add('invalid');
        endTimeInput.classList.add('invalid');
        isValid = false;
    } else {
        const selectedStartTime = new Date(`1/1/2021 ${startTimeInput.value}`);
        const selectedEndTime = new Date(`1/1/2021 ${endTimeInput.value}`);
        const startOfWorkday = new Date(`1/1/2021 09:00:00`);
        const endOfWorkday = new Date(`1/1/2021 18:00:00`);

        if (selectedStartTime < startOfWorkday || selectedEndTime > endOfWorkday) {
            alert('Время бронирования должно быть в промежутке с 9:00 до 18:00');
            startTimeInput.classList.add('invalid');
            endTimeInput.classList.add('invalid');
            isValid = false;
        } else {
            startTimeInput.classList.remove('invalid');
            startTimeInput.classList.add('valid');
            endTimeInput.classList.remove('invalid');
            endTimeInput.classList.add('valid');
        }

        if (selectedEndTime <= selectedStartTime) {
            alert('Время окончания должно быть позже времени начала бронирования');
            startTimeInput.classList.add('invalid');
            endTimeInput.classList.add('invalid');
            isValid = false;
        } else {
            startTimeInput.classList.remove('invalid');
            startTimeInput.classList.add('valid');
            endTimeInput.classList.remove('invalid');
            endTimeInput.classList.add('valid');
        }
    }

    return isValid;
};





