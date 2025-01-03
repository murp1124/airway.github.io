let startTime;
let timerInterval;

function initFromURL() {

    const currState = new URLSearchParams(window.location.search);
    const savedStartTime = currState.get('startTime');
    
    if (savedStartTime) {
        startTime = parseInt(savedStartTime);
        timerInterval = setInterval(updateElapsedTime, 100);
       
        const options = {

            timeZone: "America/Chicago",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        };

        const startTimeStr = new Date(startTime);
        const test = startTimeStr.toLocaleString('en-US', options);
        document.getElementById('startTimeValue').textContent = test;

        updateElapsedTime();

        switchButton1.disabled = false;
    }
    

    const noMedsState = currState.get('noMeds');

    if (noMedsState === "true"){

        createReset();
    
        noMeds.disabled = true;
        document.getElementById('noRSIMeds').style.color = 'black';
    
        switchButton0.disabled = true;
        switchButton1.disabled = false;
        
        noMedRoute = true;
    }


    const rsiMedsPushed = currState.get('rsiMedsPushed');

    if (rsiMedsPushed === "true") {

        createReset();

        const rsiMedsPushedTime = currState.get('rsiMedsPushedTime');
        const rsiMedsElapsedTime = currState.get('rsiMedsElapsedTime');

        document.getElementById('rsiMedsPushedValue').textContent = 
            `${rsiMedsElapsedTime} at ${rsiMedsPushedTime}`;
        document.getElementById('firstRSIPush').style.color = 'black';
        
        noMeds.disabled = true;
        switchButton0.disabled = true;
        switchButton1.disabled = false;
    }


    const bladeInserted = currState.get('bladeInserted');

    if (bladeInserted === "true") {
        const bladeInsertTime = currState.get('bladeInsertTime');
        const bladeElapsedTime = currState.get('bladeElapsedTime');

        document.getElementById('bladeInsertedValue').textContent = 
            `${bladeElapsedTime} at ${bladeInsertTime}`;
        document.getElementById('switchButton1').style.color = 'black';
        switchButton1.disabled = true;
        switchButtonTube.disabled = false;
    }


    const tubeInserted = currState.get('tubeInserted');

    if (tubeInserted === 'true') {
        const tubeInsertedTime = currState.get('tubeInsertedTime');
        const tubeInsertedElapsed = currState.get('tubeInsertedElapsed');

        document.getElementById('tubeInsertedValue').textContent = 
            `${tubeInsertedElapsed} at ${tubeInsertedTime}`;
        document.getElementById('switchButtonTube').style.color = 'black';
        switchButtonTube.disabled = true;
        switchButton2.disabled = false;
    }


    const bladeRemoved = currState.get('bladeRemoved');

    if (bladeRemoved === "true") {
        const bladeRemovalTime = currState.get('bladeRemovalTime');
        const bladeRemElapsedTime = currState.get('bladeRemElapsedTime');

        document.getElementById('bladeRemovedValue').textContent = 
            `${bladeRemElapsedTime} at ${bladeRemovalTime}`;
        document.getElementById('switchButton2').style.color = 'black';
        switchButton2.disabled = true;
        switchButton3.disabled = false;

    }

    const breathDelivered = currState.get('breathDelivered');

    if (breathDelivered === "true") {
        const breathDeliveredTime = currState.get('breathDeliveredTime');
        const breathElapsedTime = currState.get('breathElapsedTime');
        const progressBoxes = currState.get('progressBoxes');

        document.getElementById('breathDeliveredValue').textContent = 
            `${breathElapsedTime} at ${breathDeliveredTime}`;
        document.getElementById('switchButton3').style.color = 'black';
        switchButton3.disabled = true;

        //TODO: Deprecate.
        // for (let box = 1; box <= 5; box ++) {
        //     document.getElementById(`box${box}`).style.backgroundColor = "#cccccc";
        //     document.getElementById('dataProgressBar').animate([
        //         {
        //             opacity: 0
        //         },
        //         {
        //             opacity: 0.3
        //         },
        //         {
        //             opacity: 1
        //         }], {duration: 1000});
        // }

        // const boxesStr = progressBoxes || -1;
        // const boxes = parseInt(boxesStr)

        //TODO: FIX.
        const five_minutes = 5 * 60 * 1000;
        const glowEffect = document.querySelector('.borderGlow');
    
        // const breathTime = new Date(startTime + parseTimeString(breathElapsedTime) * 1000);
        // const lastBreathTime = Date.now() - breathTime.getTime();
        // const alignment = lastBreathTime % five_minutes;
        // const nextBoxTime = five_minutes - alignment;

        // if (boxes >= 0) {
        //     for (let i = 0; i <= boxes; i++) {
        //         document.getElementById(`box${i + 1}`).style.backgroundColor = "#50C878";
        //     }
        // }

        // Refactor this beast some other day *phewwww*

        // if (boxes === -1) {

        //     for (let i = 0; i < 5; i++) {

        //         currBox = boxes + 1
        //         const delayVal = i === currBox ?
        //             nextBoxTime : nextBoxTime + (i - currBox) * five_minutes;

        //         setTimeout(() => {
        //             for (let pings = 0; pings < 3; pings++) {
        //                 setTimeout(() => {
        //                     if (document.getElementById('soundToggle').checked) {
        //                         ping.play();
        //                     }
        //                     glowEffect.classList.add('glow-active');                    
        //                     setTimeout(() => {
        //                         glowEffect.classList.remove('glow-active');
        //                     }, 1000);
        //                 }, 1500 * pings);
        //             }

        //            document.getElementById(`box${i+1}`).style.backgroundColor = "#50C878";

        //         }, delayVal);
        //     }

        // } else {
    
        //     currBox = boxes + 1
        //     for (let i = currBox; i < 5; i++) {
    
        //         const delayVal = i === currBox ?
        //             nextBoxTime : nextBoxTime + (i - currBox) * five_minutes;
    
        //         setTimeout(() => {
        //             for (let pings = 0; pings < 3; pings++) {
        //                 setTimeout(() => {
        //                     if (document.getElementById('soundToggle').checked) {
        //                         ping.play();
        //                     }
        //                     glowEffect.classList.add('glow-active');                    
        //                     setTimeout(() => {
        //                         glowEffect.classList.remove('glow-active');
        //                     }, 1000);
        //                 }, 1500 * pings);
        //             }
        
        //             document.getElementById(`box${i+1}`).style.backgroundColor = "#50C878";
    
        //         }, delayVal);
        //     }
        // }
    }

    function parseTimeString(timeStr) {
        const [hours, minutes, seconds] = timeStr.split(':').map(Number);
        return (hours * 3600) + (minutes * 60) + seconds;
    }

}


function startTimer() {

    startTime = Date.now();
    updateStartTime();
    updateElapsedTime();
    timerInterval = setInterval(updateElapsedTime, 100);

    switchButton1.disabled = false;

    const url = new URL(window.location);
    url.searchParams.set('startTime', startTime.toString());
    window.history.pushState({}, '', url);
}


function updateStartTime() {

    const options = {

        timeZone: "America/Chicago",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    };

    const cstTime = getCurrTime(undefined, options);
    document.getElementById('startTimeValue').textContent = cstTime;
}


function getCurrTime(date = new Date(), options = {
  
    timeZone: "America/Chicago",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false}) {

    return date.toLocaleString('en-US', options);
}


function updateElapsedTime() {

    const {hours, minutes, seconds } = getTimeComponents();

    document.getElementById('elapsedTimeValue').textContent =
        `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}


function padZero(num) {

    return num.toString().padStart(2, '0');
}


function getTimeComponents() {

    const milliseconds = Date.now() - startTime;

    // Ensures T+ output is accurate relative to 
    // recorded Start Time and Elapsed Time.
    const roundedSecs = Math.floor(milliseconds / 1000);

    const hours = Math.floor(roundedSecs / 3600);
    const minutes = Math.floor((roundedSecs % 3600) / 60);
    const seconds = roundedSecs % 60;

    return { hours, minutes, seconds };
}


function recordTime() {

    // Ensures T+ output is accurate relative to 
    // recorded Start Time and Elapsed Time.
    const milliseconds = Date.now() - startTime;
    const roundedMilli = Math.floor(milliseconds / 1000) * 1000;
    const currDate = new Date(Date.now() + roundedMilli - milliseconds); // Sheesh...

    const options = {
        timeZone: "America/Chicago",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    };

    const currTimeStr = getCurrTime(currDate, options);

    const {hours, minutes, seconds} = getTimeComponents();
    const elapsedTimeStr = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    
    return { elapsedTimeStr, currTimeStr };
}


function createReset() {
    const resetButton = document.createElement('button');
    resetButton.id = 'switchReset';
    resetButton.textContent = 'Reset';
    
    const spacer = document.createElement('br');
    const divContent = document.querySelector('.content');
    divContent.insertAdjacentElement('beforeEnd', spacer)
    divContent.insertAdjacentElement('beforeEnd', resetButton);

    let taps = 0;
    document.getElementById('switchReset').addEventListener('click', function() {
        taps++;
        
        if (taps === 1) {
            this.textContent = 'Confirm Reset';
            this.style.backgroundColor = 'rgb(255, 110, 250)';
            
            setTimeout(() => {
                taps = 0;
                this.textContent = 'Reset Timer';
                this.style.backgroundColor = 'rgb(255, 80, 80)';
            }, 3000);
    
        } else if (taps === 2) {
            initFromURL(true);
            this.style.backgroundColor = '';
            const baseURL = window.location.href.split('?')[0];
            window.parent.location = baseURL;
        }
    });
};


const switchButton0 = document.getElementById('firstRSIPush');

const noMeds = document.getElementById('noRSIMeds');
let noMedRoute = false;

const switchButton1 = document.getElementById('switchButton1');
switchButton1.disabled = true;

const switchButtonTube = document.getElementById('switchButtonTube');
switchButtonTube.disabled = true

const switchButton2 = document.getElementById('switchButton2');
switchButton2.disabled = true;

const switchButton3 = document.getElementById('switchButton3');
switchButton3.disabled = true;


noMeds.addEventListener('click', function (){
    
    document.getElementById('noRSIMeds').style.color = 'black';

    // Disable RSI Meds Route
    noMeds.disabled = true;
    switchButton0.disabled = true;

    // Start at Blade Entered
    switchButton1.disabled = false;
    noMedRoute = true;
    
    createReset();

    const url = new URL(window.location);
    url.searchParams.set('noMeds', true);
    window.history.pushState({}, '', url);
});

switchButton0.addEventListener('click', function() {
    
    startTimer();
    const {elapsedTimeStr, currTimeStr} = recordTime();
    document.getElementById('rsiMedsPushedValue').textContent = elapsedTimeStr + " at " + currTimeStr;
    this.style.color = 'black'; 
    this.disabled = true;
    noMeds.disabled = true;
    switchButton1.disabled = false;

    createReset();

    const url = new URL(window.location);
    url.searchParams.set('rsiMedsPushed', 'true');
    url.searchParams.set('rsiMedsPushedTime', currTimeStr);
    url.searchParams.set('rsiMedsElapsedTime', elapsedTimeStr);
    window.history.pushState({}, '', url);

});

switchButton1.addEventListener('click', function() {
    
    if (noMedRoute === true) {
        startTimer();
    }

    const {elapsedTimeStr, currTimeStr} = recordTime();
    document.getElementById('bladeInsertedValue').textContent = elapsedTimeStr + " at " + currTimeStr;
    document.getElementById('switchButton1').style.color = 'black';
    switchButton1.disabled = true;
    switchButtonTube.disabled = false;

    const url = new URL(window.location);
    url.searchParams.set('bladeInserted', 'true');
    url.searchParams.set('bladeInsertTime', currTimeStr);
    url.searchParams.set('bladeElapsedTime', elapsedTimeStr);
    window.history.pushState({}, '', url);
});

switchButtonTube.addEventListener('click', function() {
   
    const {elapsedTimeStr, currTimeStr} = recordTime();
    document.getElementById('tubeInsertedValue').textContent = elapsedTimeStr + " at " + currTimeStr;
    document.getElementById('switchButtonTube').style.color = 'black';
    switchButtonTube.disabled = true;
    switchButton2.disabled = false;

    const url = new URL(window.location);
    url.searchParams.set('tubeInserted', true);
    url.searchParams.set('tubeInsertedTime', currTimeStr);
    url.searchParams.set('tubeInsertedElapsed', elapsedTimeStr);
    window.history.pushState({}, '', url);

});

switchButton2.addEventListener('click', function() {
   
    const {elapsedTimeStr, currTimeStr} = recordTime();
    document.getElementById('bladeRemovedValue').textContent = elapsedTimeStr + " at " + currTimeStr;
    document.getElementById('switchButton2').style.color = 'black';
    switchButton2.disabled = true;
    switchButton3.disabled = false;

    const url = new URL(window.location);
    url.searchParams.set('bladeRemoved', true);
    url.searchParams.set('bladeRemovalTime', currTimeStr);
    url.searchParams.set('bladeRemElapsedTime', elapsedTimeStr);
    window.history.pushState({}, '', url);

});

switchButton3.addEventListener('click', function() {

    //TODO: Deprecate.
    // for (let box = 1; box <= 5; box ++) {
    //     document.getElementById(`box${box}`).style.backgroundColor = "#cccccc";
    //     document.getElementById('dataProgressBar').animate([
    //         {
    //             opacity: 0
    //         },
    //         {
    //             opacity: 0.3
    //         },
    //         {
    //             opacity: 1
    //         }], {duration: 1000});
    // }
   
    const {elapsedTimeStr, currTimeStr} = recordTime();
    document.getElementById('breathDeliveredValue').textContent = elapsedTimeStr + " at " + currTimeStr;
    document.getElementById('switchButton3').style.color = 'black';
    switchButton3.disabled = true;

    const url = new URL(window.location);
    url.searchParams.set('breathDelivered', 'true');
    url.searchParams.set('breathDeliveredTime', currTimeStr);
    url.searchParams.set('breathElapsedTime', elapsedTimeStr);
    window.history.pushState({}, '', url)

    // Testing:
    const five_minutes = 10000

    // const five_minutes = 5 * 60 * 1000;
    const glowEffect = document.querySelector('.borderGlow');

    for (let i = 0; i < 5; i++) {

        setTimeout(() => {

            //TODO: Deprecate.
            // document.getElementById(`box${i+1}`).style.backgroundColor = "#50C878";
            // url.searchParams.set('progressBoxes', i.toString());

            window.history.pushState({}, '', url);

            for (let pings = 0; pings < 3; pings++) {
                setTimeout(() => {

                    //TODO: Deprecate.
                    // if (document.getElementById('soundToggle').checked) {
                        // ping.play();
                    // }

                    glowEffect.classList.add('glow-active');                    
                    setTimeout(() => {
                        glowEffect.classList.remove('glow-active');
                    }, 1000);
                }, 1500 * pings);
            }

        }, five_minutes * (i + 1));
    }
});


document.addEventListener('DOMContentLoaded', initFromURL);