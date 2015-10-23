var clockWall = {
    time: null,
    blockWidth: 29,
    blockHeight: 10,

    getTime: function () {
        var date = new Date(),
            hours = date.getHours() > 10 ? date.getHours() : "0" + date.getHours(),
            minutes = date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes();
        return hours + ":" + minutes;
    },

    checkCommandExists: function (commandList, x, y) {
        var coordinates = [];
        for (var i = 0; i < commandList.length; i++) {
            coordinates.push(commandList[i][0] + ',' + commandList[i][1])
        }
        return coordinates.indexOf(x + ',' + y) !== -1;
    },

    getPositions: function () {
        var commands = this.getTimePositions(this.getTime());
        for (var row = 0; row < this.blockHeight; row++) {
            for (var column = 0; column < this.blockWidth; column++) {
                if (!this.checkCommandExists(commands, row, column)) {
                    commands.push([row, column, 45, 135]);
                }
            }
        }
        return commands;
    },

    getTimePositions: function (string) {
        var commands = [];
        var offsetX = 4;
        for (var i = 0; i < string.length; i++) {
            commands = commands.concat(this.getOffset(string[i], offsetX, 2));
            if (string[i] === ":") {
                offsetX += 2
            } else {
                offsetX += 5
            }
        }
        return commands;
    },

    getOffset: function (key, offsetX, offsetY) {
        var commands = this.getNumber(key);
        for (var i = 0; i < commands.length; i++) {
            commands[i][1] += offsetX;
            commands[i][0] += offsetY;
        }
        return commands;
    },

    getNumber: function (key) {
        var map = {
            "0": [
                [0, 0, 90, 180],
                [0, 1, 90, 90],
                [0, 2, 90, 90],
                [0, 3, 90, 90],
                [0, 4, 270, 180],
                [1, 0, 0, 180],
                [1, 1, 90, 180],
                [1, 2, 90, 90],
                [1, 3, 270, 180],
                [1, 4, 0, 180],
                [2, 0, 0, 180],
                [2, 1, 0, 180],
                [2, 3, 0, 180],
                [2, 4, 0, 180],
                [3, 0, 0, 180],
                [3, 1, 0, 180],
                [3, 3, 0, 180],
                [3, 4, 0, 180],
                [4, 0, 0, 180],
                [4, 1, 90, 0],
                [4, 2, 90, 90],
                [4, 3, 0, 90],
                [4, 4, 0, 180],
                [5, 0, 90, 0],
                [5, 1, 90, 90],
                [5, 2, 90, 90],
                [5, 3, 90, 90],
                [5, 4, 0, 90]
            ],
            "1": [
                [0, 2, 90, 180],
                [0, 3, 90, 90],
                [0, 4, 180, 90],
                [1, 2, 90, 0],
                [1, 3, 270, 180],
                [1, 4, 0, 180],
                [2, 3, 0, 180],
                [2, 4, 0, 180],
                [3, 3, 0, 180],
                [3, 4, 0, 180],
                [4, 3, 0, 180],
                [4, 4, 0, 180],
                [5, 3, 90, 0],
                [5, 4, 0, 90]
            ],
            "2": [
                [0, 0, 90, 180],
                [0, 1, 90, 90],
                [0, 2, 90, 90],
                [0, 3, 90, 90],
                [0, 4, 270, 180],
                [1, 0, 0, 270],
                [1, 1, 90, 90],
                [1, 2, 90, 90],
                [1, 3, 270, 180],
                [1, 4, 0, 180],
                [2, 0, 90, 180],
                [2, 1, 90, 90],
                [2, 2, 90, 90],
                [2, 3, 0, 90],
                [2, 4, 0, 180],
                [3, 0, 0, 180],
                [3, 1, 90, 180],
                [3, 2, 90, 90],
                [3, 3, 90, 90],
                [3, 4, 0, 90],
                [4, 0, 0, 180],
                [4, 1, 90, 0],
                [4, 2, 90, 90],
                [4, 3, 90, 90],
                [4, 4, 180, 90],
                [5, 0, 90, 0],
                [5, 1, 90, 90],
                [5, 2, 90, 90],
                [5, 3, 90, 90],
                [5, 4, 0, 90]
            ],
            "3": [
                [0, 0, 90, 180],
                [0, 1, 90, 90],
                [0, 2, 90, 90],
                [0, 3, 90, 90],
                [0, 4, 270, 180],
                [1, 0, 0, 270],
                [1, 1, 90, 90],
                [1, 2, 90, 90],
                [1, 3, 270, 180],
                [1, 4, 0, 180],
                [2, 0, 90, 180],
                [2, 1, 90, 90],
                [2, 2, 90, 90],
                [2, 3, 0, 90],
                [2, 4, 0, 180],
                [3, 0, 0, 270],
                [3, 1, 90, 90],
                [3, 2, 90, 90],
                [3, 3, 270, 180],
                [3, 4, 0, 180],
                [4, 0, 90, 180],
                [4, 1, 90, 90],
                [4, 2, 90, 90],
                [4, 3, 0, 90],
                [4, 4, 0, 180],
                [5, 0, 90, 0],
                [5, 1, 90, 90],
                [5, 2, 90, 90],
                [5, 3, 90, 90],
                [5, 4, 0, 90]
            ],
            "4": [
                [0, 0, 90, 180],
                [0, 1, 180, 90],
                [0, 2, 90, 180],
                [0, 3, 180, 90],
                [1, 0, 180, 0],
                [1, 1, 180, 0],
                [1, 2, 180, 0],
                [1, 3, 0, 180],
                [2, 0, 0, 180],
                [2, 1, 90, 0],
                [2, 2, 0, 90],
                [2, 3, 0, 270],
                [2, 4, 180, 90],
                [3, 0, 90, 0],
                [3, 1, 90, 90],
                [3, 2, 180, 90],
                [3, 3, 90, 180],
                [3, 4, 0, 90],
                [4, 2, 180, 0],
                [4, 3, 0, 180],
                [5, 2, 90, 0],
                [5, 3, 0, 90]
            ],
            "5": [
                [0, 0, 90, 180],
                [0, 1, 90, 90],
                [0, 2, 90, 90],
                [0, 3, 90, 90],
                [0, 4, 270, 180],
                [1, 0, 0, 180],
                [1, 1, 90, 180],
                [1, 2, 90, 90],
                [1, 3, 90, 90],
                [1, 4, 0, 90],
                [2, 0, 0, 180],
                [2, 1, 90, 0],
                [2, 2, 90, 90],
                [2, 3, 90, 90],
                [2, 4, 180, 90],
                [3, 0, 90, 0],
                [3, 1, 90, 90],
                [3, 2, 90, 90],
                [3, 3, 180, 90],
                [3, 4, 0, 180],
                [4, 0, 90, 180],
                [4, 1, 90, 90],
                [4, 2, 90, 90],
                [4, 3, 0, 90],
                [4, 4, 180, 0],
                [5, 0, 90, 0],
                [5, 1, 90, 90],
                [5, 2, 90, 90],
                [5, 3, 90, 90],
                [5, 4, 0, 90]
            ],
            "6": [
                [0, 0, 90, 180],
                [0, 1, 90, 90],
                [0, 2, 90, 90],
                [0, 3, 90, 90],
                [0, 4, 270, 180],
                [1, 0, 0, 180],
                [1, 1, 90, 180],
                [1, 2, 90, 90],
                [1, 3, 90, 90],
                [1, 4, 0, 90],
                [2, 0, 0, 180],
                [2, 1, 90, 0],
                [2, 2, 90, 90],
                [2, 3, 90, 90],
                [2, 4, 180, 90],
                [3, 0, 0, 180],
                [3, 1, 90, 180],
                [3, 2, 90, 90],
                [3, 3, 180, 90],
                [3, 4, 0, 180],
                [4, 0, 0, 180],
                [4, 1, 90, 0],
                [4, 2, 90, 90],
                [4, 3, 0, 90],
                [4, 4, 180, 0],
                [5, 0, 90, 0],
                [5, 1, 90, 90],
                [5, 2, 90, 90],
                [5, 3, 90, 90],
                [5, 4, 0, 90]
            ],
            "7": [
                [0, 0, 90, 180],
                [0, 1, 90, 90],
                [0, 2, 90, 90],
                [0, 3, 90, 90],
                [0, 4, 270, 180],
                [1, 0, 0, 270],
                [1, 1, 90, 90],
                [1, 2, 90, 90],
                [1, 3, 270, 135],
                [1, 4, 0, 135],
                [2, 1, 90, 180],
                [2, 2, 45, 90],
                [2, 3, 45, 270],
                [2, 4, 180, 90],
                [3, 1, 90, 0],
                [3, 2, 180, 90],
                [3, 3, 90, 180],
                [3, 4, 0, 90],
                [4, 2, 180, 0],
                [4, 3, 0, 180],
                [5, 2, 90, 0],
                [5, 3, 0, 90]
            ],
            "8": [
                [0, 0, 90, 180],
                [0, 1, 90, 90],
                [0, 2, 90, 90],
                [0, 3, 90, 90],
                [0, 4, 270, 180],
                [1, 0, 0, 180],
                [1, 1, 90, 180],
                [1, 2, 90, 90],
                [1, 3, 270, 180],
                [1, 4, 0, 180],
                [2, 0, 0, 180],
                [2, 1, 90, 0],
                [2, 2, 90, 90],
                [2, 3, 0, 90],
                [2, 4, 0, 180],
                [3, 0, 0, 180],
                [3, 1, 90, 180],
                [3, 2, 90, 90],
                [3, 3, 180, 90],
                [3, 4, 0, 180],
                [4, 0, 0, 180],
                [4, 1, 90, 0],
                [4, 2, 90, 90],
                [4, 3, 0, 90],
                [4, 4, 0, 180],
                [5, 0, 90, 0],
                [5, 1, 90, 90],
                [5, 2, 90, 90],
                [5, 3, 90, 90],
                [5, 4, 0, 90]
            ],
            "9": [
                [0, 0, 90, 180],
                [0, 1, 90, 90],
                [0, 2, 90, 90],
                [0, 3, 90, 90],
                [0, 4, 270, 180],
                [1, 0, 0, 180],
                [1, 1, 90, 180],
                [1, 2, 90, 90],
                [1, 3, 180, 90],
                [1, 4, 0, 180],
                [2, 0, 0, 180],
                [2, 1, 90, 0],
                [2, 2, 90, 90],
                [2, 3, 0, 90],
                [2, 4, 180, 0],
                [3, 0, 90, 0],
                [3, 1, 90, 90],
                [3, 2, 90, 90],
                [3, 3, 180, 90],
                [3, 4, 0, 180],
                [4, 0, 90, 180],
                [4, 1, 90, 90],
                [4, 2, 90, 90],
                [4, 3, 0, 90],
                [4, 4, 180, 0],
                [5, 0, 90, 0],
                [5, 1, 90, 90],
                [5, 2, 90, 90],
                [5, 3, 90, 90],
                [5, 4, 0, 90]
            ],
            ":": [
                [1, 0, 90, 180],
                [1, 1, 180, 90],
                [2, 0, 90, 0],
                [2, 1, 0, 90],
                [3, 0, 90, 180],
                [3, 1, 180, 90],
                [4, 0, 90, 0],
                [4, 1, 0, 90]
            ]
        };
        return map[key];
    },

    getRotation: function (selector) {
        return +document.querySelector(selector).style.transform.match(/\d+/g)[0]
    },

    moveTo: function (x, y, one, two) {
        /* move position, (x,y) to position(one,two) */
        var selector1 = '[row="' + x + '"][column="' + y + '"] .hand1',
            rotation1 = this.getRotation(selector1),
            revolutions1 = Math.floor(rotation1 / 360) + 1,
            newpos1 = (revolutions1 * 360) + one;
        document.querySelector(selector1).style.transform = "rotate(" + newpos1 + "deg)";

        var selector2 = '[row="' + x + '"][column="' + y + '"] .hand2',
            rotation2 = this.getRotation(selector2),
            revolutions2 = Math.floor(rotation2 / 360) + 1,
            newpos2 = (revolutions2 * 360) + two;
        document.querySelector(selector2).style.transform = "rotate(-" + newpos2 + "deg)"
    },

    tick: function () {
        /* compile and execute commands */

        this.getPositions().map(function (args) {
            this.moveTo.apply(this, args);
        }.bind(this))
    },

    checkTime: function () {
        if (this.time != this.getTime()) {
            this.tick();
        }
        this.time = this.getTime();
    },

    start: function () {
        setInterval(this.checkTime.bind(this), 1000);
    },

    initialize: function () {
        this.body = document.querySelector("body");
        this.width = this.body.offsetWidth;
        this.height = this.body.offsetHeight;

        this.unit = Math.min(Math.floor(this.width / this.blockWidth), Math.floor(this.height / this.blockHeight)) - 6;

        for (var row = 0; row < this.blockHeight; row++) {
            for (var column = 0; column < this.blockWidth; column++) {

                var unit = document.createElement("div");
                unit.className = "clock-container";
                unit.style.width = this.unit + 'px';
                unit.style.height = this.unit + 'px';
                unit.style.height = this.unit + 'px';
                unit.setAttribute('row', row);
                unit.setAttribute('column', column);
                unit.style.top = ((row * this.unit) + (row * 4)) + 'px';
                unit.style.left = ((column * this.unit) + (column * 4)) + 'px';
                this.body.appendChild(unit);

                var face = document.createElement('div');
                face.className = 'clock';
                unit.appendChild(face);

                var delayFactor = 1;
                var delay = ((Math.abs((this.blockHeight / 2) - row) / (this.blockHeight / 2)) * delayFactor) + ((Math.abs((this.blockWidth / 2) - column) / (this.blockWidth / 2)) * 3 * delayFactor);

                var hand1 = document.createElement('div');
                hand1.className = 'hand hand1';
                hand1.style.transitionDelay = delay + 's';
                hand1.style.transform = 'rotate(0deg)';
                face.appendChild(hand1);
                var hand2 = document.createElement('div');
                hand2.style.transitionDelay = delay + 's';
                hand2.style.transform = 'rotate(0deg)';
                hand2.className = 'hand hand2';
                face.appendChild(hand2);

            }
        }
        this.start();
    }
};

clockWall.initialize();