import { MDBDataTable } from "mdbreact";
import React from "react";
import TabPaneNew from "../../../components/UI/TabPane";
import { convert_date_from_timestamp } from "../../../utils/datetime";
import { ConvertIOStoDate } from "./ConvertStringToTime";
const TransportTable = (props) => {
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
        date_completed: convert_date_from_timestamp(order.updated_at),
        status: <span class="badge badge-success">Transported</span>,
        btn: (
          <div class="project-actions  text-center">
            <button
              class="btn btn-primary btn-sm"
              value={order.order_code }
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
        label: "Date order",
        field: "date",
        sort: "asc",
        width: 50,
      },
      {
        label: "Date success",
        field: "date_completed",
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

export default TransportTable;
