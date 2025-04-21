const utilitySpeedometer = (container) => {
  const dynamic = container.querySelector(".dynamic-number");
  const dynamicTick = container.querySelector(".dynamic-tick");

  const kph = (n) => {
    let kph = document.createElement("div");
    let kphNumber = document.createTextNode(n);
    kph.appendChild(kphNumber);
    kph.classList.add('kph-number');
    position(kph, n / 320, 145);
    dynamic.appendChild(kph);
  };

  const mph = (n) => {
    let mph = document.createElement("div");
    let mphNumber = document.createTextNode(n);
    mph.appendChild(mphNumber);
    mph.classList.add('mph-number');
    position(mph, n / 220, 176);
    dynamic.appendChild(mph);
  };

  const createTick = (n, isMajor) => {
    let tick = document.createElement("div");
    tick.classList.add('tick');
    tick.classList.add(isMajor ? 'major' : 'minor');
    isMajor ? positionTick(tick, n / 220, 148) :
      positionTick(tick, n / 220, 148);
    dynamicTick.appendChild(tick);
  }

  const positionTick = (element, phase, r) => {
    let theta = phase * (2 * Math.PI) + 44.82;
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;
    element.className === 'tick major' ?
      element.style.top = (centerY + r * Math.cos(theta) - 26).toFixed(1) + "px" :
      element.style.top = (centerY + r * Math.cos(theta) - 16).toFixed(1) + "px";
    element.style.left = (centerX - r * Math.sin(theta)).toFixed(1) + "px";
    element.style.transform += ` rotate(${theta * 180 / Math.PI}deg)`; // Rotate the tick
  }

  const position = (element, phase, r) => {
    let theta = phase * (2 * Math.PI) + 44.82;
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;
    element.style.top = (centerY + r * Math.cos(theta)).toFixed(1) + "px";
    element.style.left = (centerX - r * Math.sin(theta)).toFixed(1) + "px";
  };

  for (let i = 0; i <= 160; i += 5) {
    if (i % 10 === 0) {
      mph(i);
      createTick(i, true);
    }
    else {
      createTick(i, false);
    }
  }
}

const speedometer = document.querySelector("#utility-speedometer");
utilitySpeedometer(speedometer);