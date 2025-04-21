const speedControls = () => {
    let start = 228;
    let end = 492;
    let decelerationInterval;
    let arrowIntervals = {};

    const accelerate = () => {
        console.log("Accelerating");
        if (start != end) {
            document.querySelector(".mph").style.transform = `rotate(${start}deg)`;
            start += 1;
        }
        clearInterval(decelerationInterval);
    }

    const holdSpeed = () => {
        clearInterval(decelerationInterval);
    }

    const brake = () => {
        if (start >= 228) {
            console.log("Braking");
            document.querySelector(".mph").style.transform = `rotate(${start}deg)`;
            start -= 4;
        }

        if (start < 228) {
            clearInterval(decelerationInterval);
            start = 228;
        }
    }

    const decelerate = (target) => {
        clearInterval(decelerationInterval);
        decelerationInterval = setInterval(() => {
            if (start > target) {
                console.log("Decelerating");
                document.querySelector(".mph").style.transform = `rotate(${start}deg)`;
                start -= 1;
            } else {
                start = target;
                document.querySelector(".mph").style.transform = `rotate(${start}deg)`;
                clearInterval(decelerationInterval);
            }
        }, 30);
    }

    const changeArrowLightColor = (arrowDirection) => {
        const intervalKey = `${arrowDirection}Interval`;
        if (!arrowIntervals[intervalKey]) {
            arrowIntervals[intervalKey] = setInterval(() => arrowIndicator(arrowDirection), 500);
        }
    };
    
    const arrowIndicator = (arrowDirection) => {
        const arrowLight = document.querySelector(`.arrow-${arrowDirection}-light`);
        if (arrowLight) {
            arrowLight.classList.toggle('active');
            console.log(`${arrowDirection} turn`);
        }
    };

    const stopArrowIndicator = (arrowDirection) => {
        const intervalKey = `${arrowDirection}Interval`;
        clearInterval(arrowIntervals[intervalKey]);
        delete arrowIntervals[intervalKey];
        const arrowLight = document.querySelector(`.arrow-${arrowDirection}-light`);
        if (arrowLight) {
            arrowLight.classList.remove('active');
        }
    };

    const changeBrakeLightColor = (actionEvent) => {
        const brakeLight = document.querySelector('.brake-light');
        if (actionEvent === 'on') {
            brakeLight.classList.add('active');
        }
        if (actionEvent === 'off') {
            brakeLight.classList.remove('active');
        }
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === 'ArrowUp') {
            accelerate();
        }

        if (event.key === 'ArrowDown') {
            brake();
            changeBrakeLightColor('on');
        }

        if (event.key === 'ArrowLeft') {
            changeArrowLightColor('left');
            decelerate(228);
        }

        if (event.key === 'ArrowRight') {
            changeArrowLightColor('right');
            decelerate(228);
        }

        if (event.key === 'Shift') {
            holdSpeed();
        }
    });

    document.addEventListener("keyup", (event) => {
        if (event.key === 'ArrowUp') {
            decelerate(228);
        }

        if (event.key == 'ArrowDown') {
            decelerate(228);
            changeBrakeLightColor('off');
        }

        if (event.key === 'ArrowLeft') {
            stopArrowIndicator('left');
            decelerate(228);
        }

        if (event.key === 'ArrowRight') {
            stopArrowIndicator('right');
            decelerate(228);
        }

        if (event.key == 'Shift') {
            holdSpeed();
        }
    });
}

speedControls();