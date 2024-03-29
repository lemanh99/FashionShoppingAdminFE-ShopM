import { MDBDataTable } from "mdbreact";
import React from "react";
import TabPaneNew from "../../../components/UI/TabPane";
import { convert_date_from_timestamp } from "../../../utils/datetime";
import { ConvertIOStoDate } from "./ConvertStringToTime";

const PendingTable = (props) => {
  const { listOrder, handleShow } = props;

  const rowTable = (orders) => {
    const all = [];
    let index = 0;
    for (let order of orders) {
      var element = {
        sr: ++index,
        invoice: order.order_code,
        customer: order.full_name,
        // total_products: order.productDetail.length,
        total_amount: order.payment_total,
        date: convert_date_from_timestamp(order.created_at),
        payment_status: order.payment_status_name,
        order_status: order.order_status_name,
        payment_method: order.payment_method,
        btn: (
          <div class="project-actions  text-center">
            <button
              class="btn btn-primary btn-sm"
              value={order.order_code}
              onClick={handleShow}
              style={{ marginRight: "5px" }}
            >
              <i class="fas fa-folder" style={{ marginRight: "4px" }}></i>
              View
            </button>

            {/* <button
                class="btn btn-danger btn-sm"
                value={order._id}
                // onClick={handleShowDelete}
                style={{ marginRight: "5px" }}
              >
                <i class="fas fa-trash" style={{ marginRight: "4px" }}></i>
                Cancel
              </button> */}
          </div>
        ),
      };
      all.push(element);

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
        label: "Total Price",
        field: "total_amount",
        sort: "asc",
        width: 50,
      },
      {
        label: "Date",
        field: "date",
        sort: "asc",
        width: 50,
      },
      {
        label: "Order status",
        field: "order_status",
        sort: "asc",
        width: 50,
      },
      {
        label: "Payment status",
        field: "payment_status",
        sort: "asc",
        width: 50,
      },
      {
        label: "Payment method",
        field: "payment_method",
        sort: "asc",
        width: 50,
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

export default PendingTable;
