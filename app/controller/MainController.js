app.controller('MainController', ['$scope', $scope => {

    $scope.eventList = [];                      //store all events
    $scope.eventListOfSelectedDate = [];        //store events of selected date from calender
    $scope.UpcomingEventsList = [];             //store upcoming events

    $scope.eventId = 1;
    //$scope.selectEventForUpdate = {};
    $scope.selectedEvent = [];                  //list for store selected event
    $scope.successAlert = "";                   // for store alert message
    $scope.warningMsg = "";                     // for store warning message
    $scope.infoMsg = "";                        //for store information
    $scope.startDate = new Date();              //set current date for calender
    // $scope.enteredDate = new Date();
    $scope.CurrentDate = new Date();            //for get current date.

    /************************hard code event details******************************************/
    //Initiate hard code event list
    $scope.initEvents = () => {
        $scope.eventList.push({
            EventID: Date.now()+1, Name: "Test Event 1", Space: " -: ",
            Date: new Date("04/15/2020"),
            DisplayDate: new Date("04/15/2020").toLocaleDateString("en-Us"), complete: false
        });
        $scope.eventList.push({
            EventID: Date.now()+2, Name: "Test Event 2", Space: " -: ",
            Date: new Date("04/24/2020"),
            DisplayDate: new Date("04/24/2020").toLocaleDateString("en-Us"),complete: false
        });
        $scope.eventList.push({
            EventID: Date.now()+3, Name: "Test Event 3", Space: " -: ",
            Date: new Date("06/10/2020"),
            DisplayDate: new Date("06/10/2020").toLocaleDateString("en-Us"), complete: false
        });
    };

    /*********************Add events to list*********************************************/

    //for add events to list
    $scope.addEvent = () => {

        //let currentDate = new Date().toLocaleDateString("en-Us");
        //alert(currentDate + "----" + $scope.eventDate.toLocaleDateString("en-Us"));
        if($scope.CurrentDate < $scope.startDate) {
                $scope.eventList.push({
                EventID: Date.now(), Name: $scope.eventName, Space: " -: ",
                Date: $scope.startDate,
                DisplayDate: $scope.startDate.toLocaleDateString("en-Us"),
                complete: false
            });
            $scope.successAlert = "New Event Added Successfully!!";

            $scope.remindNextEvent();                 //call the remindNextEvent() for remind next event
            $scope.showUpcomingEventList();
        }else{
            $scope.warningMsg = "Please check the event date!!";
        }
    };

    /**************************************************************************/

    //for remove event from all event list
    // $scope.removeEvents = () => {
    //     let oldList = $scope.eventList;
    //     $scope.eventList = [];
    //     angular.forEach(oldList, (event) => {
    //         if (!event.complete) {
    //             $scope.eventList.push(event);
    //             $scope.warningMsg = "Please select the remove event!!";
    //
    //         } else {
    //             $scope.successAlert = "Event Removed Successfully!!";
    //             $scope.warningMsg = "";
    //         }
    //     });
    //      $scope.remindNextEvent();
    //      $scope.showUpcomingEventList();
    //     // $scope.removeEventsFromSelectedDate();
    // };


    /********************Update and delete events from all event list**********************************/

    //for select event details for fill update and delete dialog box
    $scope.selectEvent = (event) => {

        $scope.selectedEvent =[];
        // alert(event.Date);
        //console.log(event);
        $scope.selectedEvent = event;
        //$scope.selectEventListName = list;
    };

    //for update event details
    $scope.updateEventDetails = (updatedEventId) => {
        angular.forEach($scope.eventList, (event) => {
            if (event.EventID == updatedEventId) {
                event.Name = $scope.selectedEvent.Name;
                event.Date = $scope.selectedEvent.Date;
                event.DisplayDate = $scope.selectedEvent.Date.toLocaleDateString("en-Us");
            }
        });
        $scope.successAlert = "Event Updated Successfully!!";
        $scope.remindNextEvent();
        $scope.showUpcomingEventList();

    };

    //for delete events details from all events list.
    $scope.removeEventsFromList = () =>{
        //console.log("deleted" + $scope.selectedEvent+"list name:" +listName);
        $scope.eventList.splice($scope.eventList.indexOf($scope.selectedEvent),1);
        // $scope.eventListOfSelectedDate.splice($scope.eventListOfSelectedDate.indexOf($scope.selectedEvent));
        // $scope.UpcomingEventsList.splice($scope.UpcomingEventsList.indexOf($scope.selectedEvent));
        $scope.successAlert = "Event Removed Successfully!!";
        $scope.remindNextEvent();
        $scope.showUpcomingEventList();

    };


    /********************** For Alert messages*******************************************************/

    //for clear success alert
    $scope.clearSuccessAlert = () => {
        $scope.successAlert = "";
    }

    //for clear warning msg
    $scope.clearWarningAlert = () => {
        $scope.warningMsg = "";
    }

    //for clear warning msg
    $scope.clearInfoAlert = () => {
        $scope.infoMsg = "";
    }


    /***************************For selected date events*************************************************/


    // show events for selected dates
    $scope.showEventsOfSelectedDate = (selectedDate) => {
        //console.log(selectedDate);
        $scope.eventListOfSelectedDate = [];
        angular.forEach($scope.eventList, (event) => {
            //console.log("selected date:"+selectedDate.toLocaleDateString("en-Us")+"event date:"+event.DisplayDate)
            if (selectedDate.toLocaleDateString("en-Us") === event.DisplayDate) {
                //console.log("selected date:"+selectedDate.toLocaleDateString("en-Us")+"event date:"+event.DisplayDate);
                $scope.eventListOfSelectedDate.push({
                    EventID: event.EventID,
                    Name: event.Name,
                    Space: " -: ",
                    Date: event.Date,
                    DisplayDate: event.Date.toLocaleDateString("en-Us"),
                    complete: false
                });
            }
        });
    };

    /******************************************************************************/

    //for remove event from event list of selected date
    $scope.removeEventsFromSelectedDate = () => {

        let oldList = $scope.eventListOfSelectedDate;
        $scope.eventListOfSelectedDate = [];
        angular.forEach(oldList, (event) => {
            if (!event.complete) {
                $scope.eventListOfSelectedDate.push(event);
                $scope.warningMsg = "Please select the event";
            } else {
                $scope.successAlert = "Event Removed Successfully!!";
                $scope.warningMsg = "";
            }
        });

        // $scope.eventListOfSelectedDate.splice($scope.eventListOfSelectedDate.indexOf($scope.selectedEvent),1);
        // $scope.successAlert = "Event Removed Successfully!!";
        // $scope.remindNextEvent();
        // $scope.removeEventsFromUpcomingEvents();

    };

    /***************************For remind next event*****************************************************/

    //for remind next event
    $scope.remindNextEvent = () => {

        let smallestDate = $scope.CurrentDate;   //first, smallest date same as to current date
        let isFirstRound = true;
        angular.forEach($scope.eventList, (event) => {
            if ($scope.CurrentDate < event.Date) {
                if (isFirstRound || smallestDate > event.Date) {
                    smallestDate = event.Date;
                    isFirstRound = false;
                    $scope.listOfNextEvents = [];

                    $scope.listOfNextEvents.push({
                        EventID: event.EventID,
                        Name: event.Name,
                        Space: " -: ",
                        Date: event.Date,
                        DisplayDate: event.Date.toLocaleDateString("en-Us"),
                        complete: false
                    });
                }
            }
            // else{
            //     alert("No scheduled event for that day");
            // }
        })
    };

    /**************************For show upcoming events****************************************************/

    //for show upcoming events
    $scope.showUpcomingEventList = () => {
        $scope.UpcomingEventsList = [];

        angular.forEach($scope.eventList, (event) => {
            if ($scope.CurrentDate < event.Date) {
                $scope.UpcomingEventsList.push({
                    EventID: event.EventID,
                    Name: event.Name,
                    Space: " -: ",
                    Date: event.Date,
                    DisplayDate: event.Date.toLocaleDateString("en-Us"),
                    complete: false
                });

            } else {
                //console.log("Not a upcoming event");
            }
        });
    };

    /**************************************************************************/

    //for remove event from upcoming event list
    $scope.removeEventsFromUpcomingEvents = () => {

        let oldList = $scope.UpcomingEventsList;
        $scope.UpcomingEventsList = [];
        angular.forEach(oldList, (event) => {
            if (!event.complete) {
                $scope.UpcomingEventsList.push(event);
                $scope.warningMsg = "Please select the event";
            } else {
                $scope.successAlert = "Event Removed Successfully!!";
                $scope.warningMsg = "";
            }
        });

        // $scope.UpcomingEventsList.splice($scope.UpcomingEventsList.indexOf($scope.selectedEvent),1);
        // $scope.successAlert = "Event Removed Successfully!!";
    };

    /******************************For remove expire events*****************************************/

    //for disappears expire events from list
    $scope.removeExpireEventsFromList = () => {

        //alert("removed");
        $scope.successAlert = "";
        $scope.pastEventList = $scope.eventList;        //define new list and store events from eventList
        $scope.eventList = [];                           //empty the eventList
        //$scope.CurrentDate = new Date().toLocaleDateString("en-Us");
        angular.forEach($scope.pastEventList, (event) => {
            if ($scope.CurrentDate < event.Date) {
                $scope.infoMsg = "";
                $scope.eventList.push(event);
                $scope.infoMsg = "No more past events to be removed??";
            } else {
                $scope.successAlert = "Past Events Removed Successfully!!";
                $scope.infoMsg = "";
            }

        })

    };

    /****************************for call event in the initial statement*************************/
    $scope.initEvents();
    $scope.remindNextEvent();                 //call the remindNextEvent() for remind next event
    $scope.showUpcomingEventList();



}]);


