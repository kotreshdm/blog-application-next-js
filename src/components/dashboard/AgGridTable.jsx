"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "../../../node_modules/ag-grid-community/styles/ag-grid.css";
import "../../../node_modules/ag-grid-community/styles/ag-theme-quartz.css";
import React, { StrictMode, useState } from "react";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const MyTable = (props) => {
  const { data, columnDefs } = props;
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{ width: "100%", height: "520px" }}
        className={"ag-theme-quartz"}
      >
        <AgGridReact
          rowData={data}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default MyTable;
