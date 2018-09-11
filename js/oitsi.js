var trim_indent = true;
var line_number = false;
// enable highlight
$('pre code').each(function(i, block) {
    var texts = $(this).text().split('\n');
    // trim indent
    if (trim_indent){
        var tab = texts[0].match(/^\s{0,}/);
        if (tab) {
        var arr = [];
        texts.forEach(function(temp) {
            arr.push(temp.replace(tab, ''));
        });
        $(this).text(arr.join('\n'));
        }
    }
    // add line number
    if (line_number) {
        console.log("show line number in front-end");
        var lines = texts.length - 1;
        var $numbering = $('<ul/>').addClass('pre-numbering');
        $(this).addClass('has-numbering').parent().append($numbering);
        for (i = 1; i <= lines; i++) {
        $numbering.append($('<li/>').text(i));
        }
    }
    // hightlight
    hljs.highlightBlock(block);
})

// google analytics
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', ' UA-105609805-1', 'auto');
ga('send', 'pageview');