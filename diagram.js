$(function(){
    sweetspot.init();
});

sweetspot = {
    init: function() {
        $('#reverse-link, #sweet-spot-outer').click(sweetspot.reverse);
        sweetspot.diagrams = $('.color-0');
        sweetspot.diagrams.click(sweetspot.tiles);
        $('#knob-inner, #knob-1, #knob-2').click(sweetspot.knob);

        sweetspot.rain();
    },
    rain: function() {
        var createDrop, makeRain, rain, diagram;

        diagram = $('#diagram');

        createDrop = function() {
            var drop = $('<div class="droplet" />')
                .clone()
                .appendTo(diagram)
                .css('left', (parseInt(Math.random() * 40, 10) + 30) + '%');
            setTimeout(function(){
                drop.remove();
            }, 1000);
        };

        makeRain = function() {
            var i = 0;
            for (; i < 25; i++) {
                setTimeout(createDrop, Math.random() * 700);
            }
        };

        rain = function() {
            var i = 0, delay;
            for (; i < 12; i++) {
                delay = i * 500;
                if (i === 1) {
                    setTimeout(function(){
                        $('.spin').removeClass('spun');
                    }, delay);
                }
                if (i === 11) {
                    setTimeout(function(){
                        $('.spin').addClass('spun');
                    }, delay);
                }
                if (i > 1) {
                    setTimeout(makeRain, delay);
                }
            }
        };

        rain();

        setInterval(function(){
            rain();
        }, 8000);
    },
    reverse: function() {
        var color = $('#sweet-spot-color, #knob-1 .dot');
        if (color.hasClass('reverse')) {
            color.removeClass('reverse');
        } else {
            color.addClass('reverse');
        }
        return false;
    },
    tiles: function() {
        sweetspot.diagrams.each(function(){
            this.className = 'color-' + ((parseInt(this.className.substr(6), 10) + 1) % 4);
        });
    },
    knob: function() {
        var knob1 = $('#knob-1'),
            knob2 = $('#knob-2');
        if (knob1.hasClass('hidden')) {
            knob2.addClass('hidden');
            knob1.removeClass('hidden');
        } else {
            knob1.addClass('hidden');
            knob2.removeClass('hidden');
        }
        return false;
    },
    toggle: function() {
        var sweet = $('#sweet-spot-outer'),
            toggle = $('#toggle');
        if (sweet.hasClass('hide-sweet-spot')) {
            sweet.removeClass('hide-sweet-spot');
            toggle.html('Hide');
        } else {
            sweet.addClass('hide-sweet-spot');
            toggle.html('Show');
        }
        return false;
    }
};