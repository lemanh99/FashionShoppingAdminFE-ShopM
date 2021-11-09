// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import WebDataRocks from "webdatarocks";
// // import { getListProduct } from "../../actions";
// import Layout from "../../components/Layout";
// import { dataJson } from "./dataJson";
// // import data from "./data";

// const Statistical = () => {
//   const products = useSelector((state) => state.product);
//   const [list, setList] = useState([]);
//   useEffect(() => {
//     setList(dataJson().orders);
//   })
//   useEffect(() => {
    
//     new WebDataRocks({
//       container: "#pivotContainer",
//       toolbar: true,
//       height: 580,
//       width: "100%",
//       report: {
//         dataSource: {
//           data: dataJson().orders,
//         },
//       },
//       slice: {
//         rows: [
//           {
//             uniq:'_id'
//         }
//         ],
//       },
//     });
//   }, []);
//   console.log(list);
//   return (
//     <Layout>
//       <div className="content" id="pivotContainer"></div>
//     </Layout>
//   );
// };

// export default Statistical;

const Statistical = ()=>{
  return null
}

export default Statistical;
