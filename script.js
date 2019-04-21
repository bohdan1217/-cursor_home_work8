const container = document.getElementById("container");
class Timer {
    constructor(setMin, setSec, launch = false, delay = 1000) {
        this.setMin = setMin;
        this.setSec = setSec;
        this.launch = launch;
        this.delay = delay;
        this.render();
    }

    createCounter(){
        this.counter = document.createElement('div');
        this.counter.textContent = `${this.setMin}:${this.setSec}`;
        this.counter.classList.add('progressbar');

        return this.counter;
    }

    createButton(){
        this.button = document.createElement("button");
        this.button.classList.add('button-to-start-timer');
        this.launch = this.launch ? this.button.textContent= "start" : this.button.textContent= "stop";

        return this.button;
    }

    createline(){
        this.line = document.createElement('div');
        this.line.classList.add('line');
        return this.line;
    }

    lifeInterval(){
        this.progres = setInterval(()=>{
            const currentWidth = this.line.offsetWidth;
            this.line.style.width = currentWidth - this.percent + "px";
        }, this.delay);
    }

    countDown() {
        this.secondsInterval = 1;
        this.timeIntervalFirst = setInterval(() =>  {
            if (this.setMin === 0 && this.seconds === 0) {
                this.counter.textContent = this.setMin+":"+this.setSec;
                this.seconds = this.setSec;
                this.button.textContent = "start";
                this.line.style.width = this.width+"px";
                clearInterval(this.progres);
                clearInterval(this.timeIntervalFirst);
            }else{
                if (this.seconds <= 0) {
                    this.seconds = 60;
                    this.setMin--;
                } else {
                    this.seconds = this.seconds - this.secondsInterval ;
                }
                this.counter.innerHTML = `${this.setMin}:` + (this.seconds < 10 ? "0" : "") + String(this.seconds);
            }
        }, this.delay);
    }


    changeButtons(){
        if(this.button.textContent === "start"){
            this.button.textContent = "stop";
            this.countDown();
            this.lifeInterval();
        }else if(this.button.textContent === "stop"){
            this.button.textContent = "start";
            clearInterval(this.progres);
            clearInterval(this.timeIntervalFirst);
        }
    }

    render() {
        container.append(this.createCounter());
        container.append(this.createButton());
        container.append(this.createline());

        this.seconds = this.setSec;
        this.width = this.line.offsetWidth; // 1704
        this.percent = (this.width / this.setSec / (1 / (this.delay/1000)));

        this.changeButtons();
        this.button.addEventListener("click", this.changeButtons.bind(this));
    }

}

const timerFirst = new Timer(0,20, false, 1000);
const timerSecond = new Timer(0,60, true, 1000);