$(function(){
    $(document).on('touchstart click', '.time', function(e){
        e.stopPropagation(); //stops 'ghost clicks' (double clicking)
        rangeTouchDown()
    }).on('touchmove click', '.time', function(e){
        e.stopPropagation(); //stops 'ghost clicks' (double clicking)
        rangeMouseMove()
    }).on('touchend click', '.time', function(e){
        e.stopPropagation(); //stops 'ghost clicks' (double clicking)
        rangeMouseUp()
    });
});

$(document).on('touch', function () {

    const date = {"sun": 1, "mon": 2, "tue": 3, "wed": 4, "thu": 5, "fri": 6, "sat": 7};
    const week = {1: "sun", 2: "mon", 3: "tue", 4: "wed", 5: "thu", 6: "fri", 7: "sat"};

//Function to Mark box is selected
    function mark_check_box(id, status) {
        console.log($(".time").find('#' + id));
        return $(".time").find('#' + id).prop('checked', true);
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
        console.log(id);
        console.log(dayTime);
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

        if (id.slice(-2) === "pm") {
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
        let resDayTime = dayTimeStr.split(''); //0001, 1030
        let spot;
        let meridiem;


        for (let x = 0; x < resDayTime.length; x++) {
            if (resDayTime[x] !== '0') {
                spot = x;
                break;
            }
        }

        let dayTime = dayTimeStr.slice(spot, dayTimeStr.length);
        if (parseInt(dayTime) > 1220) {
            meridiem = "pm";
            if (dayTime.indexOf('5') > -1) {
                dayTime = (parseInt(dayTime) - 1220).toString();
            }
            else {
                dayTime = (parseInt(dayTime) - 1200).toString();
            }
        }
        else {
            dayTime = (parseInt(dayTime)).toString();
            meridiem = "am";
            if (dayTime.indexOf('5') > -1) {
                dayTime = (parseInt(dayTime) - 20).toString();
            }
        }

        if (dayTime.indexOf('3') === -1) {
            dayTime = dayTime / 100;
        }

        let originalId = strDay + dayTime + meridiem;
        return originalId;
    }

    // touch down
    function rangeTouchDown() {
        $('.selectionBox').show();
    }


})