import "@progress/kendo-theme-default/dist/all.css";
import testData from "../mock-data.json";
import { process } from "@progress/kendo-data-query";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Table = (props) => {
  /*
  const [dataState, setDataState] = useState({
    skip: 0,
    take: 25,
    sort: [],
    group: [],
  });
  */

  const dataState = props.tableState;

  const [dataResult, setDataResult] = useState(process(testData, dataState));
  const _export = useRef(null);

  const onDataStateChange = (event) => {
    setDataResult(process(testData, event.dataState));

    props.setTableState(event.dataState);

    /*  setDataState((prevState) => {
          const stateData = { ...prevState };
          stateData.group = event.dataState.group;
          stateData.skip = event.dataState.skip;
          stateData.take = event.dataState.take;
          stateData.filter = event.dataState.filter;
          if (dataState.sort.length > 1){
            stateData.sort = event.dataState.sort
          }
        });
        */
  };

  const exportExcel = (props) => {
    if (_export.current !== null) {
      console.log(dataResult);
      _export.current.save();
    }
  };
  return (
    <div style={{ margin: "10px 30px" }}>
      <Link to="/dud" className="btn btn-primary">
        Navigate To Dud Page
      </Link>
      <h1>Hello KendoReact!</h1>

      <ExcelExport data={dataResult.data} group={dataState.group} ref={_export}>
        <Grid
          style={{ maxHeight: "800px", width: "100%" }}
          data={dataResult}
          pageable={{
            buttonCount: 5,
            pageSizes: [25, 50, 100, testData.length],
          }}
          filterable={true}
          groupable={true}
          reorderable={true}
          sortable={{ mode: "multiple" }}
          {...dataState}
          //total={testData.length}
          onDataStateChange={onDataStateChange}
        >
          <GridToolbar>
            <button
              title="Export to Excel"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
              onClick={exportExcel}
            >
              Export to Excel
            </button>
          </GridToolbar>
          <GridColumn field="id" title="ID" width="90" filterable={false} />
          <GridColumn field="first_name" title="First Name" />
          <GridColumn field="last_name" title="Last Name" />
          <GridColumn field="email" title="Email Address" />
          <GridColumn field="gender" title="Gender" />
          {/*<GridColumn field="ip_address" />*/}
          <GridColumn field="Date" title="Hire Date" />
          <GridColumn field="Citizenship" title="Primary Citizenship" />
        </Grid>
      </ExcelExport>
    </div>
  );
};

export default Table;
