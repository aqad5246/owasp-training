const fs = require('fs')

var log_file = fs.createWriteStream(__dirname + '/events.log', { flags: 'w' })

class Logger {
    log(log) {
        log_file.write(log + '\n')
    }
}

module.exports = new Logger()