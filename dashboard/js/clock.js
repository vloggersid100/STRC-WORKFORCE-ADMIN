var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
ctx.lineWidth = 15;
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.font = '20px Trebuchet MS';
ctx.fillStyle = 'black';

/**
 * @closure
 */
var draw = (function () {
    var start = 1.5 * Math.PI; // Start circle from top
    var end = (2 * Math.PI) / 100; // One percent of circle

    /**
     * Draw percentage of a circle
     *
     * @param {number} r Radius
     * @param {number} p Percentage of circle
     * @param {string} c Stroke color
     * @return void
     */
    return function (r, p, c) {
        p = p || 100; // When time is '00' we show full circle
        ctx.strokeStyle = c;
        ctx.beginPath();
        ctx.arc(175, 175, r, start, p * end + start, false);
        ctx.stroke();
    };
}());

var clock = function () {
    requestAnimationFrame(clock);

    var date = new Date;
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    // Calculate percentage to be drawn
    var hp = 100 / 12 * (h % 12);
    var mp = 100 / 60 * m;
    var sp = 100 / 60 * s;
   // Ensure double digits
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    ctx.clearRect(0, 0, 350, 350);
    ctx.fillText(h + ':' + m + ':' + s, 175, 175);
    draw(75, hp, '#5b0a91');
    draw(100, mp, '#38d39f');
    draw(125, sp, 'black');
};

clock()