import { MDBDataTable } from "mdbreact";
import React from "react";
import TabPaneNew from "../../../components/UI/TabPane";
import { ConvertIOStoDate } from "./ConvertStringToTime";
const CancelTable = (props) => {
  const { listOrder, listCustomer, handleShow } = props;
  const rowTable = (orders) => {
    const all = [];
    let index = 0;
    for (let order of orders) {
      if (order.paymentStatus === "cancelled") {
        const customer = listCustomer.find(
          (customer) => customer._id === order.customerId
        );
        var element = {
          sr: ++index,
          invoice: order.codeBill,
          customer: customer
            ? customer.firstName + " " + customer.lastName
            : null,
          total_products: order.productDetail.length,
          total_amount: order.totalAmount,
          date: ConvertIOStoDate(order.createdAt),
          date_cancel:ConvertIOStoDate(order.updatedAt),
          status: <span class="badge badge-danger">Cancelled</span>,
          btn: (
            <div class="project-actions  text-center">
              <button
                class="btn btn-primary btn-sm"
                value={order._id}
                onClick={handleShow}
                style={{ marginRight: "5px" }}
              >
                <i class="fas fa-folder" style={{marginRight: '4px'}}></i>
                View
              </button>
            </div>
          ),
        };
        all.push(element);
      }
    }
    return all;
  };
  const data = {
    columns: [
      {
        label: "No.",
        field: "sr",
        sort: "asc",
        width: 150,
      },
      {
        label: "Invoice",
        field: "invoice",
        sort: "asc",
        width: 200,
      },
      {
        label: "Customer",
        field: "customer",
        sort: "asc",
        width: 200,
      },
      {
        label: "Total products",
        field: "total_products",
        sort: "asc",
        width: 50,
      },
      {
        label: "Total amount",
        field: "total_amount",
        sort: "asc",
        width: 50,
      },
      {
        label: "Order date",
        field: "date",
        sort: "asc",
        width: 50,
      },
      {
        label: "Cancelled date",
        field: "date_cancel",
        sort: "asc",
        width: 50,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 200,
      },
      {
        label: "",
        field: "btn",
        sort: "asc",
        width: 100,
      },
    ],
    rows: rowTable(listOrder),
  };
  return (
    <TabPaneNew>
      <MDBDataTable
        entries={5}
        // displayEntries={false}
        entriesOptions={[5, 10, 15, 20, 25, 50]}
        searching={false}
        striped
        bordered
        hover
        // barReverse
        noBottomColumns
        data={data}
      />
    </TabPaneNew>
  );
};

export default CancelTable;
