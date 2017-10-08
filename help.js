const commands = module.exports = {
    'help': `
~help [command]
   Brings up the command page. Pass a command for further information.`,

    'choose': `
~choose <arg1> | [arg2] ...
   Randomly chooses between the provided choice(s).`,

    'prune': `
~prune <amount> [options]
   Prunes the last <amount> messages.

   Options:
      [--bots]            : Only prunes bot messages.
      [--user <name>]     : Only prunes messages by the specified user.
      [--filter <string>] : Only prunes messages with the specified string.

      [--pinned | -p]     : Also prunes pinned messages.
      [--silent | -s]     : Deletes command and doesn't display results.`,

    'role': `[Role Help]

~role give <role[,...]>  : Gives role(s).
~role take <role[,...]>  : Removes role(s).
~role modify <role>      : Modifies a role.

#Options
give|take
   [--bots]              : Only change roles for bots.
   [--users]             : Only change roles for users.
   [--user <user[,...]>] : Only change roles for specified users.

   [--inrole <role>]     : Change roles for everyone with the role.
   [--notinrole <role>]  : Change roles for everyone without the role.
   [--noroles]           : Change roles for everyone with no roles.

modify
   [--name <name>]       : Rename role.
   [--color <color>]     : Change role color. (6 digit HEX)`,

    'music': `
[Music Help]

~music | m <function>
   play <url> | <search> : Adds the song/playlist to the queue.
   skip                  : Skips the current song.
   pause                 : Pauses the song.
   resume                : Resumes the song.

   queue                 : Displays the song queue.
   purge                 : Clears the song queue.
   np                    : Displays the title of the current song.

   vol | v <0-100>       : Sets volume.

   join                  : Joins your voice channel.
   leave                 : Leaves voice channel.

Requires a #music text channel.`,

    'ban': `
~ban <mention> [options]
   Bans the mentioned user.
   You cannot ban users in a role higher.

   Options:
      [--days <number>]   : Deletes the message history of the user.
      [--reason <reason>] : Specifies a reason for banning the user.`,

    'kick': `
~kick <mention> [options]
   Kicks the mentioned user.
   You cannot kick users in a role higher.

   Options:
      [--reason <reason>] : Specifies a reason for kicking the user.`
}

