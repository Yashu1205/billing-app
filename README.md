#Overview
This is a billing app that can be used for creating bills for a business. It is created using  React and Redux. It has four modules: user, customer, product and bills.

##User module:
- Business owner can register providing their username, email,  business name and address. 
- They can login to the app using email and password.

##Customers module:
- After login, user can add new customer by providing customer name, mobile and email.
- The added customers information can be edited or deleted if no longer needed.

##Products Module:
- User can add new product by providing product name and price.
- The products can also be edited and deleted.

##Bills Module:
- A new bill can be generated for a customer by adding product and quantity.
- Multiple products can be added along with the quantity which can be incremented and decremented as per the requirements.
- Once the bill is generated, user can view the details as well as the bills can be downloaded.

###Additional features:
Searching and sorting functionality is available for customers, products and bills.

###Packages used: 
- axios 
- html2pdf.js
- luxon 
- reactstrap
- react-select 
- react-spinner 
- sweetalert2 
- validator
