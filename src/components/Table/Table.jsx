import React from "react";
import {
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  useGlobalFilter,
  useFilters,
} from "react-table";
import GlobalFillter from "../Fillter/GlobalFillter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAnglesLeft,
  faAngleRight,
  faAnglesRight,
  faAngleUp,
  faAngleDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import style from "./Table.module.scss";
function Table({ columns, data, search }) {
  const tableInstance = useTable(
    { columns, data, disableSortRemove: true, defaultCanSort: true },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    // Pagination
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;
  return (
    <div className={style.mainTable}>
      <div className={style.mainTable__card}>
        <div className={style.mainTable__filter}>
          <GlobalFillter filter={globalFilter} setFilter={setGlobalFilter} />
          {search && (
            <button
              onClick={() => {
                search();
              }}
              className={style.mainTable__search_btn}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          )}
        </div>
        <div className={style.responsiveTable}>
          <table {...getTableProps()} className={style.table}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps(
                    headerGroup.getSortByToggleProps
                  )}>
                  {headerGroup.headers.map((column) => {
                    return (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}>
                        {column.render("Header")}
                        <span className={style.sorted}>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FontAwesomeIcon
                                icon={faAngleUp}
                                className={style.sorted__icon}
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faAngleDown}
                                className={style.sorted__icon}
                              />
                            )
                          ) : (
                            ""
                          )}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      const textPosition =
                        cell.column.Header === "24h volume" ? "end" : "center";
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{ textAlign: textPosition }}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={style.pagination}>
          <div className={style.pagination__btn}>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              <FontAwesomeIcon icon={faAnglesLeft} />
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
          </div>
          <div className={style.pagination__lable}>
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
          </div>
          {/* <div className={style.pagination__gotoPage}>
            <span>
              | Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: "100px" }}
              />
            </span>{" "}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}>
              {[10, 15, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div> */}
          <div className={style.pagination__btn}>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>{" "}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}>
              <FontAwesomeIcon icon={faAnglesRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
