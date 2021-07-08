//getting the module setup in app.js and assigning a controller.
angular.module("ReservationCalendar")

.controller("CalendarController", CalendarController);

CalendarController.$inject = (["weekDays", "ReserveRoomService"]); //injecting that helps deal wtih minified code.
//good convention, don't exactly know how it works but have a slight idea.
function CalendarController(weekDays,ReserveRoomService)
{
  var calendar = this;

  calendar.currentMonth= 0;
  calendar.currentYear= "2020";
  calendar.currentDay = 13;
  // var initialDate = new Date(calendar.currentYear, calendar.currentMonth, calendar.currentDay);
  // ReserveRoomService.setDate(initialDate); //To setup a initially selected date
  calendar.weekDays =  weekDays;
  calendar.weeks = 5;
  calendar.paddedWeeksArr = [7 , 14, 21 , 28, 35 ];
  calendar.paddingDays = '';
  calendar.paddingDaysArr = [];
  calendar.NonPaddingDaysArr = [];
  calendar.daysInMonth = '';//initialized
  //assigned value in loadCalendarHelper function;

  calendar.goToPreviousMonth = function()
  {
    if(calendar.currentMonth == 0)
    {
      var year = Number(calendar.currentYear) - 1;
      loadCalendarHelper(11, year);
    }
    else
    {
      loadCalendarHelper( calendar.currentMonth - 1,calendar.currentYear);
    }

  };
  calendar.goToNextMonth =  function()
  {
    if(calendar.currentMonth == 11)
    {
      var year = Number(calendar.currentYear) + 1;
      loadCalendarHelper(0, year);
    }
    else
    {
      loadCalendarHelper( calendar.currentMonth + 1,calendar.currentYear);
    }

  };

  var loadCalendarHelper = function(monthArg, yearArg) //month: 0-11, year: "Year"
  {
    calendar.paddingDaysArr = [];
    calendar.paddingDays = 0;
    calendar.NonPaddingDaysArr = [];
    const dt = new Date();
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(yearArg, monthArg, 1);
    const daysInMonth = new Date(yearArg, monthArg + 1, 0).getDate();
    // 0th day as the third parameter gives the last day of the previous month.
    // That is the what we need to calculate total days in the current month.
    console.log(daysInMonth);
    console.log(firstDayOfMonth);

    const dateString =  firstDayOfMonth.toLocaleDateString('en-us',{
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    let dateStringArr = dateString.split(', ');

    calendar.month = dateStringArr[1].split(" ")[0];
    calendar.paddingDays = Number(weekDays.indexOf(dateStringArr[0]));

    calendar.daysInMonth = Number(daysInMonth);

    //dateString.split() gets the string separated by commas
    // to an array and gets the first element
    // today's wednesday so the paddingDays are 3, which are Sunday, Monday, Tuesday.

    for(let i = 0; i< calendar.paddingDays; i++)
    {
      calendar.paddingDaysArr.push(i);//used in ng-repeat loop to create empty padded days in first column
    }
    for(let i = 1; i <= 7 - calendar.paddingDays ; i++)
    {
      calendar.NonPaddingDaysArr.push(i); //used in ng-repeat loop to create days in first column
    }

    calendar.currentMonth = monthArg;
    calendar.currentYear = yearArg;

  }

  calendar.getDateByClick = function(element)
  {


    calendar.currentDay= element.target.innerHTML;

    //console.log(date);
    var passedDate = new Date(calendar.currentYear, calendar.currentMonth, calendar.currentDay);
    ReserveRoomService.setDate(passedDate);
    console.log(ReserveRoomService.getDate());

  }
  loadCalendarHelper(0,"2020");

}
