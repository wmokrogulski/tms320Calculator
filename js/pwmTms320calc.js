const SYS_CLK = 150e6;
const MAX_16BIT = 65536;
const PRECISION = 0.1;

function calculateTbClk() {
    var hspclkdiv = parseFloat($('#hspclkdiv').val());
    var clkdiv = parseFloat($('#clkdiv').val());
    var tbclk = SYS_CLK / (hspclkdiv * clkdiv);
    if (tbclk > 1e6) {
        $('#tbclk-freq-unit').val('mhz');
        tbclk /= 1e6;
    } else if (tbclk > 1e3) {
        $('#tbclk-freq-unit').val('khz');
        tbclk /= 1e3;
    } else {
        $('#tbclk-freq-unit').val('hz');
    }
    $('#tbclk').val(tbclk)
    generateCode();
}

function calculateTbPrd() {
    var ctrmode = $('#ctrmode').val();
    var targetFreq = parseFloat($('#target-freq').val());
    var targetFreqUnit = $('#target-freq-unit').val();
    var tbclk = parseFloat($('#tbclk').val());
    var tbclkFreqUnit = $('#tbclk-freq-unit').val();
    var tbprd;
    var tbprdElem;
    var dutyElem;
    var tbprdRnd;
    console.log(targetFreqUnit);
    if (targetFreqUnit === 'mhz') {
        targetFreq *= 1e6;
    } else if (targetFreqUnit === 'khz') {
        targetFreq *= 1e3;
    }
    if (tbclkFreqUnit === 'mhz') {
        tbclk *= 1e6;
    } else if (tbclkFreqUnit === 'khz') {
        tbclk *= 1e3;
    }

    if (ctrmode === '2') {
        tbprd = tbclk / (2 * targetFreq);
    } else {
        tbprd = (tbclk / targetFreq) - 1;
    }
    tbprdRnd = Math.round(tbprd);
    tbprdElem = $('#tbprd');
    if (tbprd > MAX_16BIT) {
        alert('Calculated value is above maximum value! Try changing the time base.');
        tbprdElem.val('');
    } else {
        tbprdElem.val(tbprdRnd);
    }
    if (Math.abs(tbprd - tbprdRnd) > PRECISION) {
        tbprdElem.addClass('bg-warning');
        tbprdElem.attr({'data-bs-toggle': 'tooltip', 'title': 'Value is rounded.'});
    } else {
        tbprdElem.removeClass('bg-warning');
        tbprdElem.removeAttr('data-bs-toggle');
        tbprdElem.removeAttr('title');
    }
    dutyElem = $('#duty-card');
    if (tbprdElem.val() !== '') {
        dutyElem.show();
        generateCode();
    }
}

function calculateCmp() {
    var cmpElem = $('#cmp');
    var duty = parseFloat($('#duty').val());
    var tbprd = $('#tbprd').val();
    var cmp = Math.round(duty / 100 * tbprd);
    cmpElem.val(cmp)
    generateCode();
}


function changeCmpLabel() {
    var cmpChannel = $('#cmp-select').val();
    var cmpElem = $('#cmp-label');
    cmpElem.text(cmpChannel);
    generateCode();
}