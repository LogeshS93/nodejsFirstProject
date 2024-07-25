let {customers} = require('../files/customers')

const getCustomers = (req,res)=>{
    try{
       const limit = req.query.limit;
       const ageLimit = req.query.age;
       const mandate = req.query.mandate;
       let finalCustomers = [...customers];
       if(limit){
            finalCustomers = finalCustomers.slice(0,Number(limit))
       }
       if(ageLimit){
            finalCustomers = finalCustomers.filter(
            (customer) => customer.custAge <= ageLimit
        )
       }
       if(String(mandate) === 'true'){
        finalCustomers = finalCustomers.map((customer) => {
            const {custName, custAge, custId} = customer
            return {custName, custAge, custId}
        }
        )
       }

       res.status(200).json({"status" : "success", "data" : finalCustomers})
       res.end()
    }
    catch(error){
        res.status(500).json({"status": "Failure", "Error" : "Internal Server Error", "data" : error})
    }
}

const getCustomersById = (req,res)=>{
    try{
       const custId = req.params.customerId;
       if(custId)
       {
        const custById = customers.find(
            (customer) => customer.custId === Number(custId)
        )
        if(custById){
            res.status(200).json({"status" : "success", "data" : custById})
            res.end()
        }
        else{
            res.status(200).json({"status" : "success", "data" : "Customer with this Id does not exist"})
            res.end() 
        }
        }
       }
    catch(error){
        res.status(500).json({"status": "Failure", "Error" : "Internal Server Error", "data" : error})
    }
}

const getCustomersByName = (req,res)=>{
    try{
        const custName = req.params.customerName;
        if(custName)
        {
         const custByName = customers.find(
             (customer) => customer.custName === String(custName)
         )
         if(custByName){
             res.status(200).json({"status" : "success", "data" : custByName})
             res.end()
         }
         else{
             res.status(200).json({"status" : "success", "data" : "Customer with this name does not exist"})
             res.end() 
         }
         }
        }
     catch(error){
         res.status(500).json({"status": "Failure", "Error" : "Internal Server Error", "data" : error})
     }
}

const postCustomerById = (req, res)=>{
    try{
        let id = req.params.customerId;
        const newCustomer = req.body;
        if(id){
            let existCustomerCheck = customers.find(
                (customer) => customer.custId === Number(id) || customer.custName === String(req.body.custName)
            )

            /*fetch(`http://localhost:8080/v1/api/customers/${id}`)
             .then((response) => response.json())
             .then((data) => {
                console.log(data);
                console.log(data.data.custName)
            })
             .catch((error) => console.log(error))

                async function makeRequest() {
                  try {
                    const response = await fetch(url, {
                      method: 'POST',
                      body: JSON.stringify(payload),
                      headers: {
                        'Content-Type': 'application/json'
                      }
                    });
                    const data = await response.json();
                    console.log(data);
                  } catch (error) {
                    console.error(error);
                  }
                }
             
             */


            if(!existCustomerCheck){
                newCustomer['custId'] = Number(id);
                customers.push(newCustomer);
                res.status(201).json({"status" : "success", "data" : "Created new customer successfully"})
                }
                else{
                    
                    res.status(400).json({"status" : "failure", "data" : "Customer already exist, try with new customer id and Name"})  
                }
        }
        else {
            res.status(400).json({"status" : "failure", "data" : "Customer id is mandatory to create new customer"}) 
        }

    }
    catch(error){
        res.status(400).json({"status": "Failure", "Error" : "Internal Server Error", "data" : error})
    }
}


const deleteCustomerById = (req, res)=>{
    try{
        let id = req.params.customerId;
        //const newCustomer = req.body;
        if(id){
            let existCustomerCheck = customers.findIndex(
                (customer) => customer.custId === Number(id)
            )
                customers.splice(existCustomerCheck,1)
                res.status(200).json({"status" : "success", "data" : "Deleted successfully"})
                }
                
        else {
            res.status(400).json({"status" : "failure", "data" : "Customer id is mandatory to delete new customer"}) 
        }

    }
    catch(error){
        res.status(400).json({"status": "Failure", "Error" : "Internal Server Error", "data" : error})
    }
}

module.exports = {getCustomers, getCustomersById, getCustomersByName, postCustomerById, deleteCustomerById}
