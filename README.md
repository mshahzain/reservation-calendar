# reservation-calendar

### **Changes from given data**: 
* server.js - Changed the server timezone from Asia/Dubai to Asia Karachi.
* init-data - Removed duplicate tenants 

### **To run the Application:**

1) Make sure you have npm, and are currently in the main directory in **Command line**.
2) run `npm install` to install all the dependencies.
3) run `npm start` to start the server, Make sure the server is running, visually it will show `API server listening at http://localhost:3000`.
4) Open the project through a editor(I am using Atom) which has a `live-server`, in a preferably newer browser (i.e not IE) (I have tested on Chrome on Windows 10).
5) Without the `live-server`, the project won't be able to load directives that are in different html files due to restriction in cross-origin requests.


### **Steps to control the Application:**

#### 1) To change the month:

* Press the arrow like buttons on the left and right of `month` heading to change between months.

#### 2) To add and delete a tenant:

* Do not add on a date that is reserved, the server doesn't allow that, and is handled by the server.

* Select the dates in which a tenant will be added, by clicking on specific dates of calendar, you can also change the months and select other dates as well, Selected dates will be shown on the right of `Stay Date:` heading.

* Press the `Get Tenants List` button below the dates, this button sets the `Tenant List` below, as well as checks if there is a current booking on even one of the dates selected.

* If there exists a tenant on one of the selectedDates, the `Confirm Stay` view will get hidden, and `Cancel Entry` view will appear. The `Tenant(s)` linked with one of the dates will be displayed above the dates. Clicking on Cancel Entry will cancel reservation for each of the displayed date and respective tenants. After clicking on `Cancel Entry`, wait 2-4 seconds to have run the `https` calls, Then click on `Get Tenants List` button to see the new updated tenant list.

* Now that these tenants don't exist, the selected dates should be free to reserve. `Confirm Stay` view will be shown, where the button is activated only if dates are selected and `Tenant Name Input` is not empty or only whitespaces. After clicking on `Confirm Stay` button, wait 2-4 seconds to have run the `https` calls, Then click on `Get Tenants List` button to see the new updated tenant list.

#### 3) Filtering tenants:
*  A textBox near `Get Tenants` button will filter tenants by their name with what is inputted in the textBox.

### Limitations known to me:
* The reserved dates are only checked from 2010 to end of 2022. It shouldn't work after or before that respectively.
* Time zone is **hardcoded** in the `server.js` file. This application **should** produce bugs if ran from outside Pakistan. Change the timezone in server.js file. Lookup and find Moment.js Timezone locale of your own Time Zone and change the code at line 12 i.e `var locale = 'Asia/Karachi';` to one with your current Time Zone.
