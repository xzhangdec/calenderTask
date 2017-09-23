var defaultTime;
var selectedTime;
const date = {"sun": 1, "mon": 2, "tue": 3, "wed": 4, "thu": 5, "fri": 6, "sat": 7};
const week = {1: "sun", 2: "mon", 3: "tue", 4: "wed", 5: "thu", 6: "fri", 7: "sat"};
var startTimeClicked = false;
var timeArr = [];
var timePeriod = {};
var finalPeriod;





$('.time').on('touchstart click', function(e) {
    //e.preventDefault(); //stops 'ghost clicks' (double clicking)
});

$('.time').on('touchmove click', function(e) {
    //e.preventDefault(); //stops 'ghost clicks' (double clicking)
});

$('.time').on('touchend click', function(e) {
    //e.preventDefault(); //stops 'ghost clicks' (double clicking)
});

$('.time').on('tap click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    //$(this).off('click');
    defaultTime = $(this).children().eq(0).attr('id');


    selectedTime = id_convert_to_Num(defaultTime);

    timeArr.push(selectedTime);

    //mark_check_box(defaultTime);

    $('.selectionBox').show();
});

$('#startTime').on('tap click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    mark_check_box(num_convert_to_id(selectedTime));
    startTimeClicked = true;
    if (timeArr.length === 1) {
        if ($(this).attr('id') in timePeriod) {
            alert('Start time already selected');
            $('.selectionBox').hide();
            remove_mark_box(num_convert_to_id(selectedTime));
            timeArr.pop();
            //timePeriod = {};
            return;
        } else {
            timePeriod[$(this).attr('id')] = selectedTime;
        }
    }

    timeArr = [];
    $('.selectionBox').hide();
});

$('#endTime').on('tap click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    //$(this).off('click');
    //e.preventDefault(); //stops 'ghost clicks' (double clicking)

    if (timeArr.length === 1) {
        if (!('endTime' in timePeriod) && !('startTime' in timePeriod)) {
            alert('Select start time first');
            $('.selectionBox').hide();
            remove_mark_box(num_convert_to_id(selectedTime));
            timeArr.pop();
            timePeriod = {};
            return;
        }

        if (selectedTime < timePeriod['startTime']) {
            alert('End time < Start Time, please select again');
            remove_mark_box(num_convert_to_id(timePeriod['startTime']));
            remove_mark_box(num_convert_to_id(selectedTime));
            $('.selectionBox').hide();
            timeArr.pop();
            timePeriod = {};
            return;
        }
        else {
            timePeriod[$(this).attr('id')] = selectedTime;
            finalPeriod = timePeriod;
            timePeriod = {};
        }
    }

    timeArr = [];

    $('.selectionBox').hide();
    let stime = finalPeriod['startTime'];
    let etime = finalPeriod['endTime'];
    a = num_convert_to_id(stime);
    b = num_convert_to_id(etime);

    for (let i = stime; i <= etime; i += 50) {
        if ( i%10000 === 2400 ) {
            i = ( parseInt(i/10000) + 1) *10000;
        }
        mark_check_box(num_convert_to_id(i));
    }
});

$('#cancel').on('tap click', function(e) {
    e.preventDefault(); //stops 'ghost clicks' (double clicking))
    //e.preventDefault();
    e.stopPropagation();
    //$(this).off('click');
    remove_mark_box(num_convert_to_id(timeArr[0]));
    timeArr = [];
    $('.selectionBox').hide();
});


//Function to Mark box is selected
function mark_check_box(id) {
    return $(".time").find('#' + id).prop('checked', true);
}

function remove_mark_box(id) {
    return $(".time").find('#' + id).prop('checked', false);
}

//Convert string Id to Num
function id_convert_to_Num(id) {
    let dayInWeek = id.slice(0, 3);
    let dateNum = date[dayInWeek];
    let dayTime = id.slice(3, -2);

    if (dayTime.length > 2) {
        dayTime = dayTime.slice(0, -2) + 50; // 730 => 750, 1130 => 1150
        id = id.slice(0, 3) + dayTime + id.slice(-2);
    }

    switch (dayTime.length) {
        case 1:
            dayTime = '0' + dayTime + '00';
            break;
        case 2:
            dayTime = dayTime + '00';
            break;
        case 3:
            dayTime = '0' + dayTime;
            break;
        default:
            dayTime = dayTime;
    }


    //Handle corner case
    if(dayTime.slice(0, 2) === "12")
    {
        if(id.slice(-2) == "am")
        {
            dayTime = dayTime.replace("12","00");
        }
    }
    else if(id.slice(-2) == "pm")
    {
        dayTime = (parseInt(dayTime) + 1200).toString();
    }

    let numTime = parseInt(dateNum + dayTime);

    return numTime;
}

//Convert num Id to original Id
function num_convert_to_id(num) {
    let strNum = num.toString();
    let strDay = week[strNum.slice(0, 1)]; //eg: sun, mon...
    let dayTimeStr = strNum.slice(1, 5);


    //handle corner case
    if (strNum % 10000 === 0 ) {
        return strDay + '12am';

    }
    if (strNum % 10000 === 50) {
        return strDay + '1230am';
    }

    var clock = parseInt(dayTimeStr.slice(0,2));
    var is_pm = false;

    if(clock === 12)
    {
        is_pm = true;
    }
    else if(clock > 12)
    {
        is_pm = true;
        clock = clock - 12;
    }

    if(dayTimeStr.slice(2,4) == "50")
    {
        clock = clock * 100 + 30;
    }

    if (is_pm)
    {
        return strDay + clock + "pm";
    }

    return strDay + clock + "am";
}


