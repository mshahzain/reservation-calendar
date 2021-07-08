angular.module("ReservationCalendar")

.controller("ReservationRoomController", ReservationRoomController);

ReservationRoomController.$inject = ["ReserveRoomService"];

function ReservationRoomController(ReserveRoomService)
{

  var reserveRoom = this;
  reserveRoom.nameSelectedInput = "";
  reserveRoom.nameSelectedArr=[];
  reserveRoom.date= "";
  reserveRoom.showingList=[];
  reserveRoom.check = false;  // true = cancel, false = conffirm date Serves as a toggle between cancel and confirm stay button.
  ReserveRoomService.getReservationDetails();

  reserveRoom.setReservationDetails = function()
  {
    if(reserveRoom.check)
    {
      console.log(reserveRoom.showingList);
      for(let i = 0; i < reserveRoom.showingList.length; i++)
      {
        var obj = reserveRoom.showingList[i];
        console.log(obj);
        ReserveRoomService.setReservationDetails(obj, false);
      }
    }
    else {

    }
  }


  reserveRoom.getReservationDetails = function() //for ng-click
  {
    reserveRoom.showingList = [];
    reserveRoom.check = false;
    reserveRoom.nameSelectedArr = []; //resetting
    //tenantList.reserved[i].time == our date??
    console.log(reserveRoom.date, "hahah");
    reserveRoom.tenantList = ReserveRoomService.getReservationDetails();
    for(let i = 0; i < reserveRoom.date.length; i++)
    {

      var timeStampStart = Math.floor(reserveRoom.date[i].date.getTime() / 1000);
      var timeStampEnd = timeStampStart + 86400; //86400 seconds in a day
      //console.log(timeStampStart + "" +timeStampEnd);
      var nameSelectedInput = reserveRoom.nameSelectedInput;
      for (let j = 0; j < reserveRoom.tenantList.reserved.length; j++)
      {
        let selectedtenant = reserveRoom.tenantList.reserved[j];
        //console.log(selectedtenant.time, "selectedtenanttime");
        if(selectedtenant.time > timeStampStart && selectedtenant.time < timeStampEnd)
        {
          //console.log("inisde time loop");
          reserveRoom.check = true;
          if(!nameSelectedInput.trim().length) //checks if string is not only whitesapces or empty
          {
            reserveRoom.showingList.push({name:selectedtenant.tennantName , time: selectedtenant.time})
            reserveRoom.nameSelectedArr.push(selectedtenant.tennantName);
          }
          else if (nameSelectedInput == selectedtenant.tennantName)
          {
            reserveRoom.nameSelectedArr.push(selectedtenant.tennantName);//Names from selectedDates
            reserveRoom.showingList.push({tennantName: nameSelectedInput, time: selectedtenant.time});
          }
          reserveRoom.nameSelectedArr = new Set(reserveRoom.nameSelectedArr);//
          reserveRoom.nameSelectedArr = [...reserveRoom.nameSelectedArr];//removes dups //set into arr

        }
      }
    }
    console.log(reserveRoom.showingList);
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
