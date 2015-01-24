Rpd.noderenderer('core/sum-of-three', 'html', {
    always: function(bodyElm, inlets, outlets) {
        bodyElm.innerHTML = '∑ (' + (inlets.a || '?') + ', '
                                  + (inlets.b || '?') + ', '
                                  + (inlets.c || '?') + ') = ' + (outlets.sum || '?');
    }
});

Rpd.noderenderer('core/sum-of-three-with-body', 'html', function() {
    var sumContent;
    return {
        first: function(bodyElm, event) {
            var cValInput = document.createElement('input');
            cValInput.style.display = 'block';
            cValInput.type = 'number';
            cValInput.min = 0;
            cValInput.max = 10;
            event['inlet/add'].filter(function(inlet) { return inlet.alias == 'c' })
                              .onValue(function(inlet) {
                                  cValInput.value = 0;
                                  inlet.receive(0);
                                  Kefir.fromEvent(cValInput, 'change').onValue(function() {
                                      inlet.receive(cValInput.value);
                                  });
                              });
            bodyElm.appendChild(cValInput);
            sumContent = document.createElement('span');
            bodyElm.appendChild(sumContent);
            // TODO: return { c: valueOut }
        },
        always: function(bodyElm, inlets, outlets) {
            sumContent.innerHTML = sumContent.textContent =
                    '∑ (' + (inlets.a || '0') + ', '
                          + (inlets.b || '0') + ', '
                          + (inlets.c || '0') + ') = ' + (outlets.sum || '?');
        }
    };
});

Rpd.channelrenderer('core/number', 'html', {
    /* show: function(target, value) { }, */
    edit: function(target, inlet, valueIn) {
        var valInput = document.createElement('input');
        valInput.type = 'number';
        valueIn.onValue(function(val) {
            valInput.value = val;
        })
        Kefir.fromEvent(valInput, 'change').onValue(function() {
            inlet.receive(valInput.value);
        });
        target.appendChild(valInput);
        // TODO: return valueOut
    }
});
