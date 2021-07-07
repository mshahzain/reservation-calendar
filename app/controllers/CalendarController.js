//getting the module setup in app.js and assigning a controller.
angular.module("ReservationCalendar")

.controller("CalendarController", CalendarController);

CalendarController.$inject = (["weekDays"]); //injecting that helps deal wtih minified code.
//good convention, don't exactly know how it works but have a slight idea.
function CalendarController(weekDays)
{
  var calendar = this;

  calendar.weekDays =  weekDays; 
  var loadCalendarHelper = function()
  {

    const dt = new Date();
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date("2020", month, 1);
    const daysInMonth = new Date("2020", month + 1, 0).getDate();
    // 0th day as the third parameter gives the last day of the previous month.
    // That is the what we need to calculate total days in the current month.
    console.log(daysInMonth);
    console.log(firstDayOfMonth);

    const dateString =  firstDayOfMonth.toLocaleDateString('en-us',{
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    const paddingDays = weekDays.indexOf(dateString.split(', ')[0]);

    //dateString.split() gets the string separated by commas
    // to an array and gets the first element
    // today's wednesday so the paddingDays are 3, which are Sunday, Monday, Tuesday.
    console.log(paddingDays);

    for(let i = 0; i < paddingDays + daysInMonth; i++)
    {

    }


  }

  loadCalendarHelper();

}
