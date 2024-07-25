const express = require ('express')
const router = express.Router()
const {getCustomers, getCustomersById, getCustomersByName, postCustomerById, deleteCustomerById} = require('../controllers/controller')

router.route('/customers').get(getCustomers)
router.route('/customers/:customerId').get(getCustomersById).post(postCustomerById).delete(deleteCustomerById)
router.route('/customers/:customerName/customerName').get(getCustomersByName)

module.exports = router