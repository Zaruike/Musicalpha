'use strict';
const config = require('./config.json');
const commandHelp = require('./help.js');
const tool = require('./tool.js');
const rp = require('request-promise');
const stripIndent = require('strip-indent');
const os = require('os');

module.exports = {
    'ban': ban,
    'choose': choose,
    'debug': debug,
    'help': help,
    'kick': kick,
    'prune': prune
}


function debug(msg, bot){

 let upTime = Math.round(os.uptime());
 let upTime1 = Math.round(process.uptime());
    console.log(upTime);
     let upTimeSeconds2 = upTime1;
        let upTimeOutput2 = "";
        if (upTime<60) {
            upTimeOutput2 = `${upTime1}s`;
        } else if (upTime1<3600) {
            upTimeOutput2 = `${Math.floor(upTime1/60)}m ${upTime1%60}s`;
        } else if (upTime1<86400) {
            upTimeOutput2 = `${Math.floor(upTime1/3600)}h ${Math.floor(upTime1%3600/60)}m ${upTime1%3600%60}s`;
        } else if (upTime1<604800) {
            upTimeOutput2 = `${Math.floor(upTime1/86400)}d ${Math.floor(upTime1%86400/3600)}h ${Math.floor(upTime1%86400%3600/60)}m ${upTime%86400%3600%60}s`;
        }
         let upTimeSeconds = upTime;
        let upTimeOutput = "";

        if (upTime<60) {
            upTimeOutput = `${upTime}s`;
        } else if (upTime<3600) {
            upTimeOutput = `${Math.floor(upTime/60)}m ${upTime%60}s`;
        } else if (upTime<86400) {
            upTimeOutput = `${Math.floor(upTime/3600)}h ${Math.floor(upTime%3600/60)}m ${upTime%3600%60}s`;
        } else if (upTime<604800) {
            upTimeOutput = `${Math.floor(upTime/86400)}d ${Math.floor(upTime%86400/3600)}h ${Math.floor(upTime%86400%3600/60)}m ${upTime%86400%3600%60}s`;
        }
let embed_fields = [{
                name: "System info:",
                value: `${process.platform}-${process.arch} with ${process.release.name} version ${process.version.slice(1)}`,
                inline: true
            },
            {
                name: "Process info: PID",
                value: `${process.pid}`,
                inline: true
            },
            {
                name: "Process memory usage:",
                value: `${Math.ceil(process.memoryUsage().heapTotal / 1000000)} MB`,
                inline: true
            },
            {
                name: "System memory usage:",
                value: `${Math.ceil((os.totalmem() - os.freemem()) / 1000000)} of ${Math.ceil(os.totalmem() / 1000000)} MB`,
                inline: true
            },
            {
                name: "Uptime bot:",
                value: `:clock12: ${upTimeOutput}`,
                inline: true
            },
            {
                name: "Uptime computer:",
                value: `:clock1230: ${upTimeOutput2}`,
                inline: true
            },{
                name: 'Lib',
                value: `**Discord.js**`
            }
        ];

        msg.channel.send({
            embed: {
                author: {
                    name: msg.author.username,
                    icon_url: msg.author.avatarUrl,
                    url:'http://google.fr'
                },
                color: 0x00FF00,
                fields: embed_fields
            }
        });
}

function help(msg) {
    let args = msg.content.split(/\s+/).slice(1);

    let helpStr;
    if (args.length == 1) { 
        if (args[0].charAt(0) == config.prefix) 
            args[0] = args[0].slice(1);
        helpStr = commandHelp[args[0]];
    }

    if (helpStr) 
        msg.channel.send(helpStr, {
            'code': 'css'
        });
    else 
        msg.channel.send(stripIndent(
            `
            [Help Menu]
               !help [command]

               #Utility
                  !music

            [] = optionnelle, <> = require, | = ou
            `
        ), {
            'code': 'css'
        });
}

function ban(msg) {
    if (!msg.member.hasPermission('BAN_MEMBERS')) {
        return msg.channel.send(`Vous n'avez pas la permissions de ban !`);
    }
    let memberToBan = msg.mentions.members.first();
    if (memberToBan && memberToBan.bannable && (msg.member.highestRole.calculatedPosition >
            memberToBan.highestRole.calculatedPosition || msg.guild.ownerID == msg.author.id)) {
      // options a definir !ban @player --reason la raison --days le nombre de jours par default 0
        let reason = tool.parseOptionArg('reason', msg.content);
        let days = parseInt(tool.parseOptionArg('days', msg.content));

        let banOptions = {
            days: days ? days : 0,
            reason: reason ? reason : 'none'
        };
        memberToBan.ban(banOptions);
    }
}

function kick(msg){
    if(!msg.member.hasPermisson('KICK_MEMBERS')){
        return msg.channel.send(`Vous n'avez pas la permissions de kick !`);
    }
    let memberToKick = msg.mentions.members.first();
    if (memberToKick && memberToKick.kickable && (msg.member.highestRole.calculatedPosition >
            memberToBan.highestRole.calculatedPosition || msg.guild.ownerID == msg.author.id)) {
        let reason = tool.parseOptionArg('reason', msg.content); // !ban @player --reason ce que vous le kick
        memberToKick.kick(reason ? reason : 'none');
    }
}

function choose(msg){
    let args = msg.content.split('|'); //!choose ce qie ke veux | le
    args[0] = args[0].slice(8);
    let choices  = args.filter(arg => {
        return arg.trim() != '';
    });

    if(choices.length >= 1){
        msg.channel.send(choices[tool.randint(choices.length)]);
    }
    else{
        msg.channel.send(`Merci de mettre plusieurs choix`)
    }
}

function prune(msg){
    if (!msg.member.hasPermissions('MANAGE_MESSAGES'))
        return msg.channel.send('Vous n\'avez pas la permissions de supprimer les messages ');
    let args = msg.content.split(/\s+/);
    let amount;
    if(args.length > 1){
        amount = parseInt(args[1]);
    }else {
        msg.content = '!help prune';
        return help(msg);
    }

    if(amount < 1 || amount > 500)
        return msg.channel.send(`Donner moi un montant de message a supprimer entre 1 et 500`);


    let options = tool.parseOptions(msg.content);

    let botOption = options.long.includes('bots');
    let userOption = options.long.includes('user');
    let filterOption = options.long.includes('filter');
    let silentOption = options.short.includes('s') || options.long.includes('silent');
    let pinOption = options.short.includes('p') || options.long.includes('pinned');

    let name;
    let nickname;
    let stringToFilter;
    if (amount) {
        try {
            if (userOption) {
                name = tool.parseOptionArg('user', msg.content);// !prune 10 --user
                if (!name)
                    throw 'args';
            }

            if (filterOption) {
                stringToFilter = tool.parseOptionArg('filter', msg.content);
                if (!stringToFilter)
                    throw 'args';
            }
            processAmount(amount, 0);
        } catch (err) {
            if (err.message == 'err')
                msg.channel.send(`Desoler, je ne peut pas supprimer vos message. `);
            else //err.message == 'args'
                msg.channel.send(`Syntax invalide. Faite ${tool.wrap('!help prune')}.`)
        }
    }
    function processAmount(amount, prunedAmount) {
        let fetchAmount;
        if (amount > 100)
            fetchAmount = 100;
        else if (amount > 1)
            fetchAmount = amount;
        else
            fetchAmount = 2; 

        msg.channel.fetchMessages({
            limit: fetchAmount,
            before: msg.id
        }).then(msgs => {
            if (amount == 1) 
                msgs.delete(msgs.lastKey());
            amount -= 100;

            if (options.long.length > 0 || options.short.length > 0) {
                msgs = msgs.filter(msg => {
                    if (msg.member.nickname) {
                        nickname = msg.member.nickname.toLowerCase();
                    }

                    let botPass = botOption ? msg.author.bot : true;
                    let userPass = userOption ? msg.author.username.toLowerCase() ==
                        name || nickname == name : true;
                    let filterPass = filterOption ? msg.content.toLowerCase()
                        .indexOf(stringToFilter) >= 0 : true;
                    let pinnedPass = pinOption ? !msg.pinned : true;

                    return botPass && userPass && filterPass &&
                        pinnedPass;
                });
            }

            if (msgs.size >= 2) {
                msg.channel.bulkDelete(msgs, true).then(deleted => {
                    nextCall(deleted.size);
                }).catch(() => {
                    //all messages that were to be bulk deleted are older than 2 weeks
                    nextCall(0);
                });
            } else if (msgs.size == 1) {
                msgs.first().delete().then(deleted => {
                    nextCall(1);
                });
            } else {
                nextCall(0);
            }
        }).catch(err => {
            throw 'err';
        });

        function nextCall(deletedSize) {
            prunedAmount += deletedSize;
            if (amount > 0) {
                setTimeout(() => {
                    processAmount(amount, prunedAmount);
                }, 1000);
            } else { 
                if (silentOption) {
                    msg.delete();
                } else {
                    msg.channel.send(`Nombres de  ${tool.wrap(prunedAmount)} messages supprimer.`);
                }
            }
        }
    }
}




