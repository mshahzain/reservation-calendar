// Creating the main app module
angular.module("ReservationCalendar",[])
.constant("weekDays", ["Sunday","Monday","Tuesday","Wednesday", "Thursday", "Friday", "Saturday"])
.constant("directiveDirectory", "./app/directiveHtmlFiles/")
.service("ReserveRoomService", ReserveRoomService)
.directive("calendarHead", calendarHead)
.directive("calendarBody", calendarBody)
.directive('confirmStayView', confirmStayView)
.directive('cancelStayView', cancelStayView)
.directive('getTenantsView', getTenantsView)
;
// Good Convention - using camelCasing for directive names
// as it gets normalised in html format i.e for example:
// confirmStayView  = confirm-stay-view

ReserveRoomService.$inject = ["$http"]; //Injection to help with minified code.
calendarHead.$inject = ["directiveDirectory"];
calendarBody.$inject = ["directiveDirectory"];
confirmStayView.$inject = ["directiveDirectory"];
cancelStayView.$inject = ["directiveDirectory"];
getTenantsView.$inject = ["directiveDirectory"];

// scalability if (making new directive){inject directiveDirectory}
function ReserveRoomService($http)
{
  var service = this;
  var dateList = [];
  var tenantList = [];

  //helper functionn to check and delete if object{} in an array[]
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
  };

  service.setReservationDetails = function(obj, reserve)
  {
    $http({
      method:"POST",
      url: "http://localhost:3000/reserve/",
      data: { "tennantName" : obj.name, "time" : obj.time, "reserved" : reserve },
    }).then(
    function(success)
    {
      console.log(success.data);
    },
    function(error)
    {
      console.log(error);
    });
  };

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
      tenantList = response.data;
    }).catch(function(error){
      console.log(error);
    });
    return tenantList;
  }

  service.setDate = function(myDate)
  {

    var dateObj = {};
    var displayDateString = myDate.toLocaleDateString('en-us',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
       day: 'numeric',
     });

    dateObj["date"] = myDate;
    dateObj["short"] = displayDateString.split(", ")[1];

    if(containsDelObject(dateObj, dateList))
    {
      ///if contains, deletes object and new object not pushed
    }
    else
    {
      dateList.push(dateObj);
    }

  };

  service.getDate = function()
  {
    return dateList;
  };

};

function calendarHead(directiveDirectory)
{
  var ddo =
  {  //direct definition object
    templateUrl : directiveDirectory + 'calendarHead.html'
  };
  return ddo;
};

function calendarBody(directiveDirectory)
{
  var ddo =
  {  //direct definition object
    templateUrl : directiveDirectory + 'calendarBody.html'
  };
  return ddo;
};

function confirmStayView(directiveDirectory)
{
  var ddo =
  {  //direct definition object
    templateUrl : directiveDirectory + 'confirmStayView.html'
  };
  return ddo;
};

function cancelStayView(directiveDirectory)
{
  var ddo =
  {  //direct definition object
    templateUrl : directiveDirectory + 'cancelStayView.html'
  };
  return ddo;
};

function getTenantsView(directiveDirectory)
{
  var ddo =
  {  //direct definition object
    templateUrl : directiveDirectory + 'getTenantsView.html'
  };
  return ddo;
};
