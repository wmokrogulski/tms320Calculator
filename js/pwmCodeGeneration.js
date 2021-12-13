function generateCode() {
    $('#code-card').show();
    clearCode();
    addCodeTitle();
    setCtrMode();
    setHspClkDiv();
    setClkDiv();
    setAction();
    setTbPrd();
    setCmp()
}

function getPwmChannel() {
    return parseInt($('#pwm-num').val());
}

function getCmpChannel() {
    return $('#cmp-select').val();
}

function clearCode() {
    var codeElem = $('#code');
    codeElem.text('');
}

function addCodeTitle() {
    var codeElem = $('#code');
    var title = 'Code Generation';
    var titleElem = $('<h4 class="card-title"></h4>').text(title);
    codeElem.append(titleElem);
}

function addCodeLine(code) {
    var codeElem = $('#code');
    codeLine = $('<code></code><br>').text(code);
    codeElem.append(codeLine);
}

function setCtrMode() {
    var pwmChannel = getPwmChannel();
    var ctrmode = $('#ctrmode').val();
    var code;
    code = 'EPwm' + pwmChannel + 'Regs.TBCTL.bit.CTRMODE = ' + ctrmode + ';';
    addCodeLine(code);

}

function setHspClkDiv() {
    var pwmChannel = getPwmChannel();
    var hspClkDiv = $('#hspclkdiv').val();
    var code;
    code = 'EPwm' + pwmChannel + 'Regs.TBCTL.bit.HSPCLKDIV = ' + hspClkDiv + ';';
    addCodeLine(code);
}

function setTbPrd() {
    var pwmChannel = getPwmChannel();
    var tbprd = $('#tbprd').val();
    if (tbprd === '') {
        return;
    }
    var code = 'EPwm' + pwmChannel + 'Regs.TBPRD = ' + tbprd + ';';
    addCodeLine(code);
}

function setClkDiv() {
    var pwmChannel = getPwmChannel();
    var clkdiv = $('#clkdiv').val();
    if (clkdiv === '') {
        return;
    }
    var code = 'EPwm' + pwmChannel + 'Regs.TBCTL.bit.CLKDIV = ' + clkdiv + ';';
    addCodeLine(code);
}

function setCmp() {
    var pwmChannel = getPwmChannel();
    var cmpChannel = getCmpChannel();
    var cmp = $('#cmp').val();
    if (cmp === '') {
        return;
    }
    var code = 'EPwm' + pwmChannel + 'Regs.';
    if (cmpChannel === 'CMPA') {
        code += 'CMPA.half.CMPA';
    } else {
        code += 'CMPB';
    }
    code += ' = ' + cmp + ';';
    addCodeLine(code);
}

function setAction() {
    var cmpChannel = getCmpChannel();
    var cmpLetter = cmpChannel.substr(cmpChannel.length - 1);
    var ctrmode = $('#ctrmode').val();
    var reg;
    switch (ctrmode) {
        case '0': // up
            reg = 'C' + cmpLetter + 'U';
            setAcqtlRegister(reg, 2);
            setAcqtlRegister('PRD', 1);
            break;
        case '1': // down
            reg = 'C' + cmpLetter + 'D';
            setAcqtlRegister(reg, 1);
            setAcqtlRegister('PRD', 2);
            break
        case '2': // updown
            reg = 'C' + cmpLetter + 'U';
            setAcqtlRegister(reg, 2);
            reg = 'C' + cmpLetter + 'D';
            setAcqtlRegister(reg, 1);
            break;
    }
}

function setAcqtlRegister(reg, val) {
    var pwmChannel = getPwmChannel();
    var cmpChannel = getCmpChannel();
    var cmpLetter = cmpChannel.substr(cmpChannel.length - 1);
    var code = 'EPwm' + pwmChannel + 'Regs.AQCTL' + cmpLetter + '.bit.' + reg + ' = ' + val + ';';
    addCodeLine(code);
}
