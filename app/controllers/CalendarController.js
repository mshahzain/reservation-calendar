//getting the module setup in app.js and assigning a controller.
angular.module("ReservationCalendar")

.controller("CalendarController", CalendarController);

CalendarController.$inject = (["weekDays"]); //injecting that helps deal wtih minified code.
//good convention, don't exactly know how it works but have a slight idea.
function CalendarController(weekDays)
{
  var calendar = this;

  calendar.currentMonth='';
  calendar.currentYear='';
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
      month: 'short',
      day: 'numeric',
    });

    let dateStringArr = dateString.split(', ');
    console.log(dateStringArr);
    calendar.month = dateStringArr[1];
    calendar.paddingDays = Number(weekDays.indexOf(dateStringArr[0]));

    calendar.daysInMonth = Number(daysInMonth);

    //dateString.split() gets the string separated by commas
    // to an array and gets the first element
    // today's wednesday so the paddingDays are 3, which are Sunday, Monday, Tuesday.

    for(let i = 0; i< calendar.paddingDays; i++)
    {
      calendar.paddingDaysArr.push(i);
    }
    for(let i = 1; i <= 7 - calendar.paddingDays ; i++)
    {
      calendar.NonPaddingDaysArr.push(i);
    }

    calendar.currentMonth = monthArg;
    calendar.currentYear = yearArg;

  }
  loadCalendarHelper(6,"2020");

}
