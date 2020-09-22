$(document).ready(function () {

    timer.block_after_expires = false;
    timer.sec =  24 * 60 * 60;

    if (GET['reset']) {
        timer.reset();
    } else {
        timer.init();
    }
});


timer = {
    endtime: '',
    block_after_expires: false,
    sec: 0,

    reset: function () {
        $.removeCookie("endtime");
        $.removeCookie("time_is_over");
        location.href = '/';
    },
    get_left_time: function () {
        if ($.cookie("endtime")) {
            endtime = $.cookie("endtime");
        } else {
            endtime = Date.parse(new Date()) + this.sec * 1000;
            $.cookie("endtime", endtime, {expires: 350});
        }
        this.endtime = endtime;
    },
    init: function () {
        this.get_left_time();
        time_is_over = false;
        if ($.cookie("endtime") != 'undefined') {
            time_left = this.get_calc_left_time();
            if (
                (time_left.days <= 0 && time_left.houwrs <= 0 && time_left.minutes <= 0 && time_left.seconds <= 0)
                || isNaN(time_left.total)
            ) {
                if (timer.block_after_expires==false){
                   timer.reset();
                 }
                time_is_over = true;
                if ($.cookie("time_is_over") != 1) {
                    $.cookie("time_is_over", 1, {expires: 350});
                    location.href = location.href;
                }
            }
        }
        if (time_is_over === false) {
            this.updateClock();
            this.timeinterval = setInterval(this.updateClock, 1000);
        }
    },



    get_calc_left_time: function () {
        var t = this.endtime - 1000 - Date.parse(new Date());
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        if (timer.block_after_expires){
            t = t - days * (1000 * 60 * 60 * 24);
        }
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    },

    updateClock: function () {
        actual_left_time  = timer.get_calc_left_time();
        var clock = document.getElementById('countdown');
        clock.querySelector('.hours').innerHTML= ('0' + actual_left_time.hours).slice(-2);
        clock.querySelector('.minutes').innerHTML = ('0' + actual_left_time.minutes).slice(-2);
        clock.querySelector('.seconds').innerHTML = ('0' + actual_left_time.seconds).slice(-2);
        if (actual_left_time.total <= 0) {
            if (timer.block_after_expires){
                $.cookie("time_is_over", 1, {expires: 350});
                clearInterval(this.timeinterval);
                location.href = location.href;
            }else{
                timer.reset();
            }

        }
    },


};

