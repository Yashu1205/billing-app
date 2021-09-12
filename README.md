# BILLLING -APP
This is a billing app that can be used for creating bills for a business. The business owner can keep track of customers, products and sales details. It is created using  React and Redux. It has five modules: dashboard, user, customer, product and bills.

# Tech Stack
- JavaScript |ES6
- React JS,Redux and redux-thunk
- Git 

# Packages
- axios
- html2pdf
- moment
- react-google-charts
- reactstrap
- react-select
- react-spinner
- sweetalert2
- validator

# DEMO
- Live DEMO of the website is available here:[DEMO](https://fervent-northcutt-ef741e.netlify.app/)

# FEATURES
+ Authentication 
  - User registration and login
  - JWT is maintained for authentication
  - Private and protected routing is implemented
  - Custom form validation

+ Customer
  -  The logged in user can add customers by providing name, mobile number and email. 
  -  The customer details can be viewed as well as edited.
  -  The customer can also be deleted but it is not recommendable to delete a customer.
  -  Validation is implemented for customer add and edit. 
  
+ Product
  - The user can add products providing product name and price.
  - The product details can be edited.
  - The product can also be deleted but it is not advisable to delete product.
  - Validation is implemented for product add and edit.

+ Bills
  -  The user can create bill for a customer by providing date.
  -  The product can be selected from the dropdown one at a time and default quantity is set to 1.
  -  Once added to cart, user can add other products also.
  -  The product can be removed from the cart or the quantity can be incremented or decremented.
  -  Once the bill is generated, the bill can be downloaded as pdf.
  -  The generated bill can be viewed as well as deleted.
  -  Validation is implemented
   
+ Dashboard
  - All the total number of customers, products, purchases and total revenue is provided.
  - Top five customers for the week is listed  based on the purchase amount. 
  - Top five frequently bought products for the week is displayed.
  
+ Graph 
  -  Bar chart is implemented for showcasing last six months total sales.

# Contributors
  ### [YashodaBhattarai](https://github.com/Yashu1205)