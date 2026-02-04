import React, { useEffect, useState } from 'react'

export default function AllOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders', { credentials: 'include' })
        const data = await res.json()
        if (!mounted) return
        if (data.success) setOrders(data.data || [])
        else setError(data.message || 'Failed to load orders')
      } catch (err) {
        if (!mounted) return
        setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchOrders()
    return () => { mounted = false }
  }, [])

  if (loading) return <div>Loading orders...</div>
  if (error) return <div className="text-red-600">Error: {error}</div>

  if (!orders.length) return <div>No orders found.</div>

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div key={order._id} className="p-4 border rounded">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold">Order #{order._id}</div>
              <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="font-medium">Total: ${order.total?.toFixed(2)}</div>
              <div className="text-sm">Status: {order.paymentStatus}</div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {(order.items || []).slice(0,6).map((it, idx) => (
              <div key={idx} className="text-xs border p-1">
                <div className="font-semibold">{it.name}</div>
                <div>Qty: {it.qty}</div>
                <div>Price: ${it.price?.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
// import React from 'react'
// import { AiOutlineArrowRight } from 'react-icons/ai';
// import { Link } from 'react-router-dom';
// // import { Button, Table, TableCell, TableRow } from '@material-ui/core';
// // import MUIDataTable from "mui-datatables";

// const AllOrders = () => {

//   // const orders =[
//   //   {
//   //     _id:"4322fadfj3212312",
//   //     orderItems:[
//   //       {
//   //         name:"plain furniture",
//   //       },
//   //     ],
//   //     totalPrice:129,
//   //     orderStatus:"Processing",
//   //   },
//   // ];

//   // const columns = [
//   //   { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

//   //   {
//   //     field: "status",
//   //     headerName: "Status",
//   //     minWidth: 130,
//   //     flex: 0.7,
//   //     cellClassName: (params) => {
//   //       return params.getValue(params.id, "status") === "Delivered"
//   //         ? "greenColor"
//   //         : "redColor";
//   //     },
//   //   },
//   //   {
//   //     field: "itemsQty",
//   //     headerName: "Items Qty",
//   //     type: "number",
//   //     minWidth: 130,
//   //     flex: 0.7,
//   //   },

//   //   {
//   //     field: "total",
//   //     headerName: "Total",
//   //     type: "number",
//   //     minWidth: 130,
//   //     flex: 0.8,
//   //   },

//   //   {
//   //     field: " ",
//   //     flex: 1,
//   //     minWidth: 150,
//   //     headerName: "",
//   //     type: "number",
//   //     sortable: false,
//   //     renderCell: (params) => {
//   //       return (
//   //         <>
//   //           <Link >
//   //             <Button>
//   //               <AiOutlineArrowRight size={20} />
//   //             </Button>
//   //           </Link>
//   //         </>
//   //       );
//   //     },
//   //   },
//   // ];

//   // const row = [];
//   // orders && orders.forEach((item)=>{
//   //   row.push({
//   //     id: item._id,
//   //     itemsQty: item.orderItems.length,
//   //     total:"US$" + item.totalPrice,
//   //     status : item.orderStatus,

//   //   })
//   // })




//   const columns = ["Name", "Company", "City", "State"];

// const data = [
//  ["Joe James", "Test Corp", "Yonkers", "NY"],
//  ["John Walsh", "Test Corp", "Hartford", "CT"],
//  ["Bob Herm", "Test Corp", "Tampa", "FL"],
//  ["James Houston", "Test Corp", "Dallas", "TX"],
// ];

// const options = {
//   filterType: 'checkbox',
// };



//   return (
//     <div className='pl-8 pt-1'>
       

//        <MUIDataTable
//   title={"Employee List"}
//   data={data}
//   columns={columns}
//   options={options}
// />



   
    

//     </div>
//   )
// }

// export default AllOrders
