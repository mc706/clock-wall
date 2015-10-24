var clockWall = {
    time: null,
    blockWidth: 29,
    blockHeight: 16,
    mode: 'time12',

    decode: function (string) {
        return JSON.parse(atob(string));
    },

    encode: function (obj) {
        return btoa(JSON.stringify(obj));
    },

    getUrlParameter: function (sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1];
            }
        }
        return false;
    },

    getTime: function (mode) {
        var date = new Date(),
            hours, minutes;
        switch (mode) {
            case "time24":
                hours = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
                minutes = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
                return hours + ":" + minutes;
                break;
            case "time12":
                hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
                minutes = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
                return hours + ":" + minutes;
                break;
            default:
                hours = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
                minutes = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
                return hours + ":" + minutes;
                break;
        }
    },

    checkCommandExists: function (commandList, x, y) {
        var coordinates = [];
        for (var i = 0; i < commandList.length; i++) {
            coordinates.push(commandList[i][0] + ',' + commandList[i][1])
        }
        return coordinates.indexOf(x + ',' + y) !== -1;
    },

    getPositions: function () {
        var commands, row, column;
        switch (this.mode) {
            case "time24":
                commands = this.getCharPositions(this.getTime(this.mode));
                for (row = 0; row < this.blockHeight; row++) {
                    for (column = 0; column < this.blockWidth; column++) {
                        if (!this.checkCommandExists(commands, row, column)) {
                            commands.push([row, column, 45, 135]);
                        }
                    }
                }
                break;
            case "time12":
                commands = this.getCharPositions(this.getTime(this.mode));
                for (row = 0; row < this.blockHeight; row++) {
                    for (column = 0; column < this.blockWidth; column++) {
                        if (!this.checkCommandExists(commands, row, column)) {
                            commands.push([row, column, 45, 135]);
                        }
                    }
                }
                break;
            case "test":
                commands = this.getCharPositions(this.getTime(this.mode));
                commands = commands.concat(this.getCharPositions("JKLMN", 9));
                for (row = 0; row < this.blockHeight; row++) {
                    for (column = 0; column < this.blockWidth; column++) {
                        if (!this.checkCommandExists(commands, row, column)) {
                            commands.push([row, column, 45, 135]);
                        }
                    }
                }

                break;
            default:
                commands = this.getCharPositions(this.getTime(this.mode));
                for (row = 0; row < this.blockHeight; row++) {
                    for (column = 0; column < this.blockWidth; column++) {
                        if (!this.checkCommandExists(commands, row, column)) {
                            commands.push([row, column, 45, 135]);
                        }
                    }
                }
                break;
        }
        return commands;
    },

    getCharPositions: function (string, offsetY) {
        var commands = [];
        var offsetX = 3,
            y = offsetY || 2;
        for (var i = 0; i < string.length; i++) {
            commands = commands.concat(this.getOffset(string[i], offsetX, y));
            if (string[i] === ":") {
                offsetX += 2
            } else if (string[i] === '1') {
                offsetX += 4
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
            "0": "W1swLDAsOTAsMTgwXSxbMCwxLDkwLDkwXSxbMCwyLDkwLDkwXSxbMCwzLDkwLDkwXSxbMCw0LDI3MCwxODBdLFsxLDAsMCwxODBdLFsxLDEsOTAsMTgwXSxbMSwyLDkwLDkwXSxbMSwzLDI3MCwxODBdLFsxLDQsMCwxODBdLFsyLDAsMCwxODBdLFsyLDEsMCwxODBdLFsyLDMsMCwxODBdLFsyLDQsMCwxODBdLFszLDAsMCwxODBdLFszLDEsMCwxODBdLFszLDMsMCwxODBdLFszLDQsMCwxODBdLFs0LDAsMCwxODBdLFs0LDEsOTAsMF0sWzQsMiw5MCw5MF0sWzQsMywwLDkwXSxbNCw0LDAsMTgwXSxbNSwwLDkwLDBdLFs1LDEsOTAsOTBdLFs1LDIsOTAsOTBdLFs1LDMsOTAsOTBdLFs1LDQsMCw5MF1d",
            "1": "W1swLDAsOTAsMTgwXSxbMCwxLDkwLDkwXSxbMCwyLDE4MCw5MF0sWzEsMCw5MCwwXSxbMSwxLDI3MCwxODBdLFsxLDIsMCwxODBdLFsyLDEsMCwxODBdLFsyLDIsMCwxODBdLFszLDEsMCwxODBdLFszLDIsMCwxODBdLFs0LDAsOTAsMTgwXSxbNCwxLDAsOTBdLFs0LDIsOTAsMF0sWzQsMywxODAsOTBdLFs1LDAsOTAsMF0sWzUsMSw5MCw5MF0sWzUsMiw5MCw5MF0sWzUsMywwLDkwXV0=",
            "2": "W1swLDAsOTAsMTgwXSxbMCwxLDkwLDkwXSxbMCwyLDkwLDkwXSxbMCwzLDkwLDkwXSxbMCw0LDI3MCwxODBdLFsxLDAsMCwyNzBdLFsxLDEsOTAsOTBdLFsxLDIsOTAsOTBdLFsxLDMsMjcwLDE4MF0sWzEsNCwwLDE4MF0sWzIsMCw5MCwxODBdLFsyLDEsOTAsOTBdLFsyLDIsOTAsOTBdLFsyLDMsMCw5MF0sWzIsNCwwLDE4MF0sWzMsMCwwLDE4MF0sWzMsMSw5MCwxODBdLFszLDIsOTAsOTBdLFszLDMsOTAsOTBdLFszLDQsMCw5MF0sWzQsMCwwLDE4MF0sWzQsMSw5MCwwXSxbNCwyLDkwLDkwXSxbNCwzLDkwLDkwXSxbNCw0LDE4MCw5MF0sWzUsMCw5MCwwXSxbNSwxLDkwLDkwXSxbNSwyLDkwLDkwXSxbNSwzLDkwLDkwXSxbNSw0LDAsOTBdXQ==",
            "3": "W1swLDAsOTAsMTgwXSxbMCwxLDkwLDkwXSxbMCwyLDkwLDkwXSxbMCwzLDkwLDkwXSxbMCw0LDI3MCwxODBdLFsxLDAsMCwyNzBdLFsxLDEsOTAsOTBdLFsxLDIsOTAsOTBdLFsxLDMsMjcwLDE4MF0sWzEsNCwwLDE4MF0sWzIsMCw5MCwxODBdLFsyLDEsOTAsOTBdLFsyLDIsOTAsOTBdLFsyLDMsMCw5MF0sWzIsNCwwLDE4MF0sWzMsMCwwLDI3MF0sWzMsMSw5MCw5MF0sWzMsMiw5MCw5MF0sWzMsMywyNzAsMTgwXSxbMyw0LDAsMTgwXSxbNCwwLDkwLDE4MF0sWzQsMSw5MCw5MF0sWzQsMiw5MCw5MF0sWzQsMywwLDkwXSxbNCw0LDAsMTgwXSxbNSwwLDkwLDBdLFs1LDEsOTAsOTBdLFs1LDIsOTAsOTBdLFs1LDMsOTAsOTBdLFs1LDQsMCw5MF1d",
            "4": "W1swLDAsOTAsMTgwXSxbMCwxLDE4MCw5MF0sWzAsMiw5MCwxODBdLFswLDMsMTgwLDkwXSxbMSwwLDE4MCwwXSxbMSwxLDE4MCwwXSxbMSwyLDE4MCwwXSxbMSwzLDAsMTgwXSxbMiwwLDAsMTgwXSxbMiwxLDkwLDBdLFsyLDIsMCw5MF0sWzIsMywwLDI3MF0sWzIsNCwxODAsOTBdLFszLDAsOTAsMF0sWzMsMSw5MCw5MF0sWzMsMiwxODAsOTBdLFszLDMsOTAsMTgwXSxbMyw0LDAsOTBdLFs0LDIsMTgwLDBdLFs0LDMsMCwxODBdLFs1LDIsOTAsMF0sWzUsMywwLDkwXV0=",
            "5": "W1swLDAsOTAsMTgwXSxbMCwxLDkwLDkwXSxbMCwyLDkwLDkwXSxbMCwzLDkwLDkwXSxbMCw0LDI3MCwxODBdLFsxLDAsMCwxODBdLFsxLDEsOTAsMTgwXSxbMSwyLDkwLDkwXSxbMSwzLDkwLDkwXSxbMSw0LDAsOTBdLFsyLDAsMCwxODBdLFsyLDEsOTAsMF0sWzIsMiw5MCw5MF0sWzIsMyw5MCw5MF0sWzIsNCwxODAsOTBdLFszLDAsOTAsMF0sWzMsMSw5MCw5MF0sWzMsMiw5MCw5MF0sWzMsMywxODAsOTBdLFszLDQsMCwxODBdLFs0LDAsOTAsMTgwXSxbNCwxLDkwLDkwXSxbNCwyLDkwLDkwXSxbNCwzLDAsOTBdLFs0LDQsMTgwLDBdLFs1LDAsOTAsMF0sWzUsMSw5MCw5MF0sWzUsMiw5MCw5MF0sWzUsMyw5MCw5MF0sWzUsNCwwLDkwXV0=",
            "6": "W1swLDAsOTAsMTgwXSxbMCwxLDkwLDkwXSxbMCwyLDkwLDkwXSxbMCwzLDkwLDkwXSxbMCw0LDI3MCwxODBdLFsxLDAsMCwxODBdLFsxLDEsOTAsMTgwXSxbMSwyLDkwLDkwXSxbMSwzLDkwLDkwXSxbMSw0LDAsOTBdLFsyLDAsMCwxODBdLFsyLDEsOTAsMF0sWzIsMiw5MCw5MF0sWzIsMyw5MCw5MF0sWzIsNCwxODAsOTBdLFszLDAsMCwxODBdLFszLDEsOTAsMTgwXSxbMywyLDkwLDkwXSxbMywzLDE4MCw5MF0sWzMsNCwwLDE4MF0sWzQsMCwwLDE4MF0sWzQsMSw5MCwwXSxbNCwyLDkwLDkwXSxbNCwzLDAsOTBdLFs0LDQsMTgwLDBdLFs1LDAsOTAsMF0sWzUsMSw5MCw5MF0sWzUsMiw5MCw5MF0sWzUsMyw5MCw5MF0sWzUsNCwwLDkwXV0=",
            "7": "W1swLDAsOTAsMTgwXSxbMCwxLDkwLDkwXSxbMCwyLDkwLDkwXSxbMCwzLDkwLDkwXSxbMCw0LDI3MCwxODBdLFsxLDAsMCwyNzBdLFsxLDEsOTAsOTBdLFsxLDIsOTAsOTBdLFsxLDMsMjcwLDEzNV0sWzEsNCwwLDEzNV0sWzIsMSw5MCwxODBdLFsyLDIsNDUsOTBdLFsyLDMsNDUsMjcwXSxbMiw0LDE4MCw5MF0sWzMsMSw5MCwwXSxbMywyLDE4MCw5MF0sWzMsMyw5MCwxODBdLFszLDQsMCw5MF0sWzQsMiwxODAsMF0sWzQsMywwLDE4MF0sWzUsMiw5MCwwXSxbNSwzLDAsOTBdXQ==",
            "8": "W1swLDAsOTAsMTgwXSxbMCwxLDkwLDkwXSxbMCwyLDkwLDkwXSxbMCwzLDkwLDkwXSxbMCw0LDI3MCwxODBdLFsxLDAsMCwxODBdLFsxLDEsOTAsMTgwXSxbMSwyLDkwLDkwXSxbMSwzLDI3MCwxODBdLFsxLDQsMCwxODBdLFsyLDAsMCwxODBdLFsyLDEsOTAsMF0sWzIsMiw5MCw5MF0sWzIsMywwLDkwXSxbMiw0LDAsMTgwXSxbMywwLDAsMTgwXSxbMywxLDkwLDE4MF0sWzMsMiw5MCw5MF0sWzMsMywxODAsOTBdLFszLDQsMCwxODBdLFs0LDAsMCwxODBdLFs0LDEsOTAsMF0sWzQsMiw5MCw5MF0sWzQsMywwLDkwXSxbNCw0LDAsMTgwXSxbNSwwLDkwLDBdLFs1LDEsOTAsOTBdLFs1LDIsOTAsOTBdLFs1LDMsOTAsOTBdLFs1LDQsMCw5MF1d",
            "9": "W1swLDAsOTAsMTgwXSxbMCwxLDkwLDkwXSxbMCwyLDkwLDkwXSxbMCwzLDkwLDkwXSxbMCw0LDI3MCwxODBdLFsxLDAsMCwxODBdLFsxLDEsOTAsMTgwXSxbMSwyLDkwLDkwXSxbMSwzLDE4MCw5MF0sWzEsNCwwLDE4MF0sWzIsMCwwLDE4MF0sWzIsMSw5MCwwXSxbMiwyLDkwLDkwXSxbMiwzLDAsOTBdLFsyLDQsMTgwLDBdLFszLDAsOTAsMF0sWzMsMSw5MCw5MF0sWzMsMiw5MCw5MF0sWzMsMywxODAsOTBdLFszLDQsMCwxODBdLFs0LDAsOTAsMTgwXSxbNCwxLDkwLDkwXSxbNCwyLDkwLDkwXSxbNCwzLDAsOTBdLFs0LDQsMTgwLDBdLFs1LDAsOTAsMF0sWzUsMSw5MCw5MF0sWzUsMiw5MCw5MF0sWzUsMyw5MCw5MF0sWzUsNCwwLDkwXV0=",
            ":": "W1sxLDAsOTAsMTgwXSxbMSwxLDE4MCw5MF0sWzIsMCw5MCwwXSxbMiwxLDAsOTBdLFszLDAsOTAsMTgwXSxbMywxLDE4MCw5MF0sWzQsMCw5MCwwXSxbNCwxLDAsOTBdXQ==",
            "A": "W1swLDAsOTAsMTgwXSxbMCwxLDkwLDkwXSxbMCwyLDkwLDkwXSxbMCwzLDkwLDkwXSxbMCw0LDI3MCwxODBdLFsxLDAsMCwxODBdLFsxLDEsOTAsMTgwXSxbMSwyLDkwLDkwXSxbMSwzLDI3MCwxODBdLFsxLDQsMCwxODBdLFsyLDAsMCwxODBdLFsyLDEsOTAsMF0sWzIsMiw5MCw5MF0sWzIsMywwLDkwXSxbMiw0LDAsMTgwXSxbMywwLDAsMTgwXSxbMywxLDkwLDE4MF0sWzMsMiw5MCw5MF0sWzMsMywxODAsOTBdLFszLDQsMCwxODBdLFs0LDAsMCwxODBdLFs0LDEsMTgwLDBdLFs0LDMsMCwxODBdLFs0LDQsMCwxODBdLFs1LDAsOTAsMF0sWzUsMSwwLDkwXSxbNSwzLDkwLDBdLFs1LDQsMCw5MF1d",
            "B": "W1swLDAsOTAsMTgwXSxbMCwxLDkwLDkwXSxbMCwyLDkwLDkwXSxbMCwzLDEzNSw5MF0sWzEsMCwwLDE4MF0sWzEsMSw5MCwxODBdLFsxLDIsOTAsOTBdLFsxLDMsMjcwLDE4MF0sWzEsNCwxODAsNDVdLFsyLDAsMCwxODBdLFsyLDEsOTAsMF0sWzIsMiw5MCw5MF0sWzIsMywwLDkwXSxbMiw0LDAsMTgwXSxbMywwLDAsMTgwXSxbMywxLDkwLDE4MF0sWzMsMiw5MCw5MF0sWzMsMywxODAsOTBdLFszLDQsMCwxODBdLFs0LDAsMCwxODBdLFs0LDEsOTAsMF0sWzQsMiw5MCw5MF0sWzQsMywwLDkwXSxbNCw0LDAsMTM1XSxbNSwwLDkwLDBdLFs1LDEsOTAsOTBdLFs1LDIsOTAsOTBdLFs1LDMsNDUsOTBdXQ==",
            "C": "W1swLDAsOTAsMTgwXSxbMCwxLDkwLDkwXSxbMCwyLDkwLDkwXSxbMCwzLDkwLDkwXSxbMCw0LDI3MCwxODBdLFsxLDAsMCwxODBdLFsxLDEsOTAsMTgwXSxbMSwyLDkwLDkwXSxbMSwzLDkwLDkwXSxbMSw0LDAsOTBdLFsyLDAsMCwxODBdLFsyLDEsMCwxODBdLFszLDAsMCwxODBdLFszLDEsMCwxODBdLFs0LDAsMCwxODBdLFs0LDEsOTAsMF0sWzQsMiw5MCw5MF0sWzQsMyw5MCw5MF0sWzQsNCwxODAsOTBdLFs1LDAsOTAsMF0sWzUsMSw5MCw5MF0sWzUsMiw5MCw5MF0sWzUsMyw5MCw5MF0sWzUsNCwwLDkwXV0=",
            "D": "W1swLDAsOTAsMTgwXSxbMCwxLDkwLDkwXSxbMCwyLDkwLDkwXSxbMCwzLDEzNSw5MF0sWzEsMCwwLDE4MF0sWzEsMSw5MCwxODBdLFsxLDIsOTAsOTBdLFsxLDMsMjcwLDE4MF0sWzEsNCwxODAsNDVdLFsyLDAsMCwxODBdLFsyLDEsMCwxODBdLFsyLDMsMCwxODBdLFsyLDQsMCwxODBdLFszLDAsMCwxODBdLFszLDEsMCwxODBdLFszLDMsMTgwLDBdLFszLDQsMCwxODBdLFs0LDAsMCwxODBdLFs0LDEsOTAsMF0sWzQsMiw5MCw5MF0sWzQsMywwLDkwXSxbNCw0LDAsMTM1XSxbNSwwLDkwLDBdLFs1LDEsOTAsOTBdLFs1LDIsOTAsOTBdLFs1LDMsNDUsOTBdXQ==",
            "E": "W1swLDAsOTAsMTgwXSxbMCwxLDkwLDkwXSxbMCwyLDkwLDkwXSxbMCwzLDkwLDkwXSxbMCw0LDI3MCwxODBdLFsxLDAsMCwxODBdLFsxLDEsOTAsMTgwXSxbMSwyLDkwLDkwXSxbMSwzLDkwLDkwXSxbMSw0LDAsOTBdLFsyLDAsMCwxODBdLFsyLDEsOTAsMF0sWzIsMiw5MCw5MF0sWzIsMywxODAsOTBdLFszLDAsMCwxODBdLFszLDEsOTAsMTgwXSxbMywyLDkwLDkwXSxbMywzLDAsOTBdLFs0LDAsMCwxODBdLFs0LDEsOTAsMF0sWzQsMiw5MCw5MF0sWzQsMyw5MCw5MF0sWzQsNCwxODAsOTBdLFs1LDAsOTAsMF0sWzUsMSw5MCw5MF0sWzUsMiw5MCw5MF0sWzUsMyw5MCw5MF0sWzUsNCwwLDkwXV0=",
            "F": [
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
                [2, 3, 180, 90],
                [3, 0, 0, 180],
                [3, 1, 90, 180],
                [3, 2, 90, 90],
                [3, 3, 0, 90],
                [4, 0, 0, 180],
                [4, 1, 180, 0],
                [5, 0, 90, 0],
                [5, 1, 0, 90]
            ],
            "G": [
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
                [2, 1, 0, 180],
                [2, 2, 90, 180],
                [2, 3, 90, 90],
                [2, 4, 180, 90],
                [3, 0, 0, 180],
                [3, 1, 0, 180],
                [3, 2, 90, 0],
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
            "H": [
                [0, 0, 90, 180],
                [0, 1, 180, 90],
                [0, 3, 90, 180],
                [0, 4, 180, 90],
                [1, 0, 0, 180],
                [1, 1, 0, 180],
                [1, 3, 0, 180],
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
                [4, 1, 180, 0],
                [4, 3, 0, 180],
                [4, 4, 180, 0],
                [5, 0, 90, 0],
                [5, 1, 0, 90],
                [5, 3, 90, 0],
                [5, 4, 0, 90]
            ],
            "J": [
                [0, 3, 90, 180],
                [0, 4, 180, 90],
                [1, 3, 0, 180],
                [1, 4, 0, 180],
                [2, 3, 0, 180],
                [2, 4, 0, 180],
                [3, 0, 90, 180],
                [3, 1, 180, 90],
                [3, 3, 0, 180],
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
            "K": [
                [0, 0, 90, 180],
                [0, 1, 180, 90],
                [1, 0, 0, 180],
                [1, 1, 0, 180],
                [1, 2, 90, 135],
                [1, 3, 270, 135],
                [2, 0, 0, 180],
                [2, 1, 45, 0],
                [3, 0, 0, 180],
                [3, 1, 135, 180],
                [3, 2, 135, 45],
                [4, 0, 0, 180],
                [4, 1, 180, 0],
                [4, 2, 135, 45],
                [4, 3, 135, 45],
                [5, 0, 90, 0],
                [5, 1, 0, 90],
                [5, 3, 90, 45],
                [5, 4, 270, 45]
            ],
            "L": [
                [0, 0, 90, 180],
                [0, 1, 180, 90],
                [1, 0, 0, 180],
                [1, 1, 0, 180],
                [2, 0, 0, 180],
                [2, 1, 0, 180],
                [3, 0, 0, 180],
                [3, 1, 0, 180],
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
            "M": [
                [0, 0, 90, 180],
                [0, 1, 135, 90],
                [0, 3, 90, 135],
                [0, 4, 180, 90],
                [1, 0, 0, 180],
                [1, 1, 135, 180],
                [1, 2, 45, 45],
                [1, 3, 180, 135],
                [1, 4, 0, 180],
                [2, 0, 0, 180],
                [2, 1, 0, 180],
                [2, 2, 45, 45],
                [2, 3, 0, 180],
                [2, 4, 0, 180],
                [3, 0, 0, 180],
                [3, 1, 0, 180],
                [3, 3, 180, 0],
                [3, 4, 0, 180],
                [4, 0, 0, 180],
                [4, 1, 180, 0],
                [4, 3, 0, 180],
                [4, 4, 180, 0],
                [5, 0, 90, 0],
                [5, 1, 0, 90],
                [5, 3, 90, 0],
                [5, 4, 0, 90]
            ],
            "N": [
                [0, 0, 90, 180],
                [0, 1, 135, 90],
                [0, 3, 90, 180],
                [0, 4, 180, 90],
                [1, 0, 0, 180],
                [1, 1, 135, 180],
                [1, 2, 135, 45],
                [1, 3, 180, 0],
                [1, 4, 0, 180],
                [2, 0, 0, 180],
                [2, 1, 0, 180],
                [2, 2, 135, 45],
                [2, 3, 0, 45],
                [2, 4, 0, 180],
                [3, 0, 0, 180],
                [3, 1, 0, 180],
                [3, 3, 180, 45],
                [3, 4, 0, 180],
                [4, 0, 0, 180],
                [4, 1, 180, 0],
                [4, 3, 0, 180],
                [4, 4, 180, 0],
                [5, 0, 90, 0],
                [5, 1, 0, 90],
                [5, 3, 90, 0],
                [5, 4, 0, 90]
            ],
            "O": [
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
                [2, 1, 0, 180],
                [2, 2, 90, 180],
                [2, 3, 90, 90],
                [2, 4, 180, 90],
                [3, 0, 0, 180],
                [3, 1, 0, 180],
                [3, 2, 90, 0],
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
        };
        if (typeof map[key] === "string") {
            return this.decode(map[key])
        } else if (typeof map[key] === 'object') {
            return map[key];
        }
    },

    getRotation: function (selector) {
        try {
            return +document.querySelector(selector).style.transform.match(/\d+/g)[0];
        }
        catch (err) {
            console.error(err, selector)
        }
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
        this.interval = setInterval(this.checkTime.bind(this), 1000);
    },

    stop: function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
    },

    destroy: function () {
        this.body.innerHTML = "";
    },

    resize: function () {
        this.stop();
        this.destroy();
        this.initialize();
        this.tick();
    },

    initialize: function () {
        this.body = document.querySelector("body");
        this.width = this.body.offsetWidth;
        this.height = this.body.offsetHeight;

        this.unit = Math.min(Math.floor(this.width / this.blockWidth), Math.floor(this.height / this.blockHeight)) - 2;

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
                var delay = ((Math.abs((this.blockHeight / 2) - row) / (this.blockHeight / 2)) * delayFactor * this.blockHeight / this.blockWidth) + ((Math.abs((this.blockWidth / 2) - column) / (this.blockWidth / 2)) * (this.blockWidth / this.blockWidth) * delayFactor);

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
        if (this.getUrlParameter('theme') === 'dark') {
            this.body.className = 'dark';
        }
        this.mode = this.getUrlParameter("mode") || "time24";
        this.start();
    }
};

clockWall.initialize();
window.addEventListener('resize', function () {
    clockWall.resize();
});
window.addEventListener('blur', function () {
    clockWall.stop();
});
window.addEventListener('focus', function () {
    clockWall.start();
});
