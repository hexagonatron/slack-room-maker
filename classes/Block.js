const { v4: uuidv4 } = require('uuid');

class Block {
    constructor(user){
        this.createdBy = user;
        this.blockArray = [];
        this.slowTeam = [];
        this.mediumTeam = [];
        this.fastTeam = [];
        this.id = uuidv4();
        this.rootBlock = this.createDefault(user.id);

    }

    createDefault() {
        const defaultBlock = [
            {
                "type": "section",
                "block_id": this.id,
                "text": {
                    "type": "mrkdwn",
                    "text": `*Which room would you like to be in?* Asked by <@${this.createdBy.id}>`
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": ":turtle: *Slow room*\nEverybody works off the same screen and writes code together."
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "emoji": true,
                        "text": "Choose"
                    },
                    "value": "slow"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": ":dog: *Medium room*\nEveryone writes their own code with input from TAs."
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "emoji": true,
                        "text": "Choose"
                    },
                    "value": "medium"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": ":racehorse: *Fast room*\nEveryone writes their own code and TAs rant about nothing in particular."
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "emoji": true,
                        "text": "Choose"
                    },
                    "value": "fast"
                }
            },
            {
                "type": "divider"
            }
        ]

        console.log(typeof defaultBlock);

        return defaultBlock;
    }

    toString() {

        const blocks = [...this.rootBlock];

        //Push seperator
        if (this.slowTeam.length || this.mediumTeam.length || this.fastTeam.length) {
            blocks.push({
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*Room assignments*"
                }
            })
            
            blocks.push({"type": "divider"});
        }

        if(this.slowTeam.length){
            const slowNames = this.getNamesString(this.slowTeam);

            blocks.push(this.makeTitleBlock(":turtle:*Slow Room*"));

            blocks.push(this.makeNamesBlock(slowNames));
        }

        if(this.mediumTeam.length){
            const medNames = this.getNamesString(this.mediumTeam);

            blocks.push(this.makeTitleBlock(":dog:*Medium Room*"));
            
            blocks.push(this.makeNamesBlock(medNames));
        }

        if(this.fastTeam.length){
            const fastNames = this.getNamesString(this.fastTeam);

            blocks.push(this.makeTitleBlock(":racehorse:*Fast Room*"))
            
            blocks.push(this.makeNamesBlock(fastNames));
        }

        return JSON.stringify(blocks);
    }

    addToRoom(user, room){
        this.removeFromRooms(user);

        switch (room) {
            case "slow":
                this.slowTeam.push(user);
                break;
            case "medium":
                this.mediumTeam.push(user);
                break;
            case "fast":
                this.fastTeam.push(user);
                break;
        }
    }

    removeFromRooms(newUser) {
        this.slowTeam = this.slowTeam.filter(user => user.id != newUser.id);
        this.mediumTeam = this.mediumTeam.filter(user => user.id != newUser.id);
        this.fastTeam = this.fastTeam.filter(user => user.id != newUser.id);
    }

    getNamesString (team) {
        const string = team.sort((a, b) => {
            const aStr = a.name.toUpperCase();
            const bStr = b.name.toUpperCase();

            return aStr<bStr? -1: aStr>bStr? 1: 0;
        }).map(user => `<@${user.id}>`).join('\n');
        return string;
    }

    makeNamesBlock(namesString) {
        return {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": namesString
            }
        }
    }

    makeTitleBlock(titleString) {
        return {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": titleString
            }
        }
    }


}

module.exports = Block;