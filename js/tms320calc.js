const SYS_CLK = 150e6;
const MAX_16BIT = 65536;

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
}
function calculateTbPrd(){
    var ctrmode=$('#ctrmode').val();
    var targetFreq=parseFloat($('#target-freq').val());
    var targetFreqUnit=$('#target-freq-unit').val();
    var tbclk=parseFloat($('#tbclk').val());
    var tbclkFreqUnit=$('#tbclk-freq-unit').val();
    var tbprd;
    console.log(targetFreqUnit);
    if(targetFreqUnit==='mhz'){
        targetFreq*=1e6;
    } else if(targetFreqUnit==='khz'){
        targetFreq*=1e3;
    }
    if(tbclkFreqUnit==='mhz'){
        tbclk*=1e6;
    } else if(tbclkFreqUnit==='khz'){
        tbclk*=1e3;
    }

    if(ctrmode==='up-down'){
        tbprd=tbclk/(2*targetFreq);
    } else{
        tbprd=(tbclk/targetFreq)-1;
    }
    tbprd=Math.round(tbprd);
    if(tbprd>MAX_16BIT){
        alert('Calculated value is above maximum value! Try changing the time base.');
        $('#tbprd').val('');
    } else{
        $('#tbprd').val(tbprd);
    }
}