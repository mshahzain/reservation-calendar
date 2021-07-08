// Creating the main app module
angular.module("ReservationCalendar",[])
.constant("weekDays", ["Sunday","Monday","Tuesday","Wednesday", "Thursday", "Friday", "Saturday"])
.service("ReserveRoomService", function()
{
  var service = this;
  var dateList = [];

  function containsDelObject(obj, list)
  {

      var i;
      for (i = 0; i < list.length; i++)
      {
          if (list[i].short === obj.short)
          {
              list.splice(i,1);
              return true;
          }
      }
      return false;

  }
  service.setDate = function(myDate)
  {


    var dateObj = {};
    var displayDateString = myDate.toLocaleDateString('en-us',{
      weekday: 'long',
      year: 'numeric',
      month: 'short',
       day: 'numeric',
     });

    dateObj["date"] = myDate;
    dateObj["short"] = displayDateString.split(", ")[1];
    console.log(dateObj);

    if(containsDelObject(dateObj, dateList))
    {

    }
    else
    {
      dateList.push(dateObj);
    }

    // dateList.push(dateObj);
    // else{
    //   dateObj.push({date: date});
    // }
      //Date object basically
  }
  service.getDate = function()
  {
    return dateList;
  }
});
