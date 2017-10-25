
var expect = require('expect');

var {generateMessage} = require('./message.js');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'Some';
        var message = generateMessage(from, text);

        expect(message.createAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });

    });
});

