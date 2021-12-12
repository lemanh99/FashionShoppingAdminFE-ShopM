import { MDBDataTable } from "mdbreact";
import React from "react";
import TabPaneNew from "../../../components/UI/TabPane";
import { convert_date_from_timestamp } from "../../../utils/datetime";
import { ConvertIOStoDate } from "./ConvertStringToTime";
const CancelTable = (props) => {
  const { listOrder, listCustomer, handleShow } = props;
  const rowTable = (orders) => {
    const all = [];
    let index = 0;
    for (let order of orders) {
      var element = {
        sr: ++index,
        // invoice: order.order_code,
        customer: order.full_name,
        // total_products: order.productDetail.length,
        total_amount: order.payment_total,
        date: convert_date_from_timestamp(order.created_at),
        date_cancel: convert_date_from_timestamp(order.update_at),
        status: <span class="badge badge-danger">Cancelled</span>,
        payment_status:order.payment_status_name,
        payment_method:order.payment_method,
        btn: (
          <div class="project-actions  text-center">
            <button
              class="btn btn-primary btn-sm"
              value={order.order_code}
              onClick={handleShow}
              style={{ marginRight: "5px" }}
            >
              <i class="fas fa-folder" style={{ marginRight: '4px' }}></i>
              View
            </button>
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
      // {
      //   label: "Invoice",
      //   field: "invoice",
      //   sort: "asc",
      //   width: 200,
      // },
      {
        label: "Customer",
        field: "customer",
        sort: "asc",
        width: 200,
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
