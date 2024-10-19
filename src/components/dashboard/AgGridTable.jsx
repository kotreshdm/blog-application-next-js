"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "../../../node_modules/ag-grid-community/styles/ag-grid.css";
import "../../../node_modules/ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const MyTable = (props) => {
  const { data, columnDefs, paginationPageSize = 10 } = props;
  const onPaginationChanged = (params) => {
    if (props.updateLastGridPage) {
      const currentPage = params.api.paginationGetCurrentPage();
      props.updateLastGridPage(currentPage);
    }
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{ width: "100%", height: "520px" }}
        className={"ag-theme-quartz"}
      >
        <AgGridReact
          onPaginationChanged={onPaginationChanged}
          rowData={data}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          onGridReady={(params) => {
            params.api.paginationGoToPage(props.defaultPage || 0);
          }}
        />
      </div>
    </div>
  );
};

export default MyTable;
