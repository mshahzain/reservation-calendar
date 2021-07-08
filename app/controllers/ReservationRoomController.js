angular.module("ReservationCalendar")

.controller("ReservationRoomController", ReservationRoomController);

ReservationRoomController.$inject = ["ReserveRoomService"];

function ReservationRoomController(ReserveRoomService)
{

  var reserveRoom = this;
  reserveRoom.date= ""
  reserveRoom.f=""

  try
  {
      reserveRoom.date = ReserveRoomService.getDate();
  }
  catch (error)
  {
    reserveRoom.errorMsg = error.message;
    console.log(reserveRoom.errorMsg);
  }

  // var displayDateString = displayDate.toLocaleDateString('en-us',{
  //   weekday: 'long',
  //   year: 'numeric',
  //   month: 'short',
  //   day: 'numeric',
  // });

  // reserveRoom.displayDate = displayDateString.split(", ")[1];
  // console.log(reserveRoom.displayDate);

}
