// Creating the main app module
angular.module("ReservationCalendar",[])
.constant("weekDays", ["Sunday","Monday","Tuesday","Wednesday", "Thursday", "Friday", "Saturday"])
.service("ReserveRoomService", ["$http", function($http)
{
  var service = this;
  var dateList = [];
  var tenantList = [];
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
  service.setReservationDetails = function(obj, reserve)
  {
    $http({
      method:"POST",
      url: "http://localhost:3000/reserve/",
      data: { "tennantName" : obj.name, "time" : obj.time, "reserved" : reserve },
    }).then(function(success){

      console.log(success.data);

    },function(error)
    {
      console.log(error);
    });


  }
  service.getReservationDetails = function()
  {
    var startTimeStamp =  1262289661; //UnixTimeStamp -Start 0f 2010.
    var endTimeStamp = Math.floor(new Date("2023", 0, 1).getTime()/ 1000); //UnixendTimeStamp limited to end of 2022.
    console.log(endTimeStamp);
    $http({
      method: "GET",
      url: "http://localhost:3000/reserve/"+startTimeStamp+"/"+endTimeStamp
    }).then(function(response)
    {
      console.log(response.data);
      tenantList = response.data;
    }).catch(function(error){
      console.log(error);
    });
    return tenantList;
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
///if contains, deletes object and new object not pushed
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
}]);
