angular.module("ReservationCalendar")

.controller("ReservationRoomController", ReservationRoomController);

ReservationRoomController.$inject = ["ReserveRoomService"];

function ReservationRoomController(ReserveRoomService)
{

  var reserveRoom = this;

  reserveRoom.nameSelectedInput = "";
  reserveRoom.nameSelectedArr=[];
  reserveRoom.date= "";
  reserveRoom.passingList=[];
  reserveRoom.check = false;  // true = cancel, false = confirm date// Serves as a toggle between cancel and confirm stay button.

  ReserveRoomService.getReservationDetails(); 

  reserveRoom.setReservationDetails = function()
  {
    if(reserveRoom.check)
    {
      console.log(reserveRoom.passingList);
      for(let i = 0; i < reserveRoom.passingList.length; i++)
      {
        var obj = reserveRoom.passingList[i];
        ReserveRoomService.setReservationDetails(obj, false);
        reserveRoom.tenantList= ReserveRoomService.getReservationDetails(); //Updating tenantList
      }
    }
    else
    {
      for(let i = 0; i < reserveRoom.date.length; i++) //reserveRoom.date has seleeccted dates
      {
        var myTimeStamp = Math.floor((reserveRoom.date[i].date.getTime() / 1000));
        var obj = {name: reserveRoom.nameSelectedInput.trim(), time: myTimeStamp};
        ReserveRoomService.setReservationDetails(obj, true);
        reserveRoom.tenantList = ReserveRoomService.getReservationDetails(); //Updating tenantList
      }
      reserveRoom.nameSelectedInput = ""; //resetting
    }
  };
  //Multi-function to get Tenants List as well as set the Tenant Name per Stay Date
    //
    //
    //

  reserveRoom.getReservationDetails = function() //for ng-click
  {
    reserveRoom.passingList = [];
    reserveRoom.check = false;
    reserveRoom.nameSelectedArr = []; //resetting
    //tenantList.reserved[i].time == our date??
    console.log(reserveRoom.date, "hahah");
    reserveRoom.tenantList = ReserveRoomService.getReservationDetails();
    for(let i = 0; i < reserveRoom.date.length; i++)
    {
      var timeStampStart = Math.floor(reserveRoom.date[i].date.getTime() / 1000);
      var timeStampEnd = timeStampStart + 86400; //86400 seconds in a day
      var nameSelectedInput = reserveRoom.nameSelectedInput;
      for (let j = 0; j < reserveRoom.tenantList.reserved.length; j++)
      {
        let selectedtenant = reserveRoom.tenantList.reserved[j];
        //had a problem where timeStamps weren't matching cus of difference in timeZones
        //fixed.!!!
        if(selectedtenant.time >= timeStampStart && selectedtenant.time <= timeStampEnd)
        {
          reserveRoom.check = true;
          if(!nameSelectedInput.trim().length) //checks if string is not only whitesapces or empty
          {
            reserveRoom.passingList.push({name:selectedtenant.tennantName , time: selectedtenant.time})
            reserveRoom.nameSelectedArr.push(selectedtenant.tennantName);
          }
          else
          {
            reserveRoom.nameSelectedArr.push(selectedtenant.tennantName);//Names from selectedDates
            reserveRoom.passingList.push({name: nameSelectedInput, time: selectedtenant.time});
          }
          reserveRoom.nameSelectedArr = new Set(reserveRoom.nameSelectedArr);//
          reserveRoom.nameSelectedArr = [...reserveRoom.nameSelectedArr];//removes dups //set into arr
        }
      }
    }
  }

  try
  {
      reserveRoom.date = ReserveRoomService.getDate();
  }
  catch (error)
  {
    reserveRoom.errorMsg = error.message;
    console.log(reserveRoom.errorMsg);
  }

}
