import React from 'react';
import styles from "../../styles/components/Table.module.scss";
import TableActions from "./TableActions";

const Table = () => {
  return (
    <div>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th>
              #
            </th>
            <th>
              Title
            </th>
            <th>
              Genres
            </th>
            <th>
              Release Year
            </th>
            <th>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          <tr>
            <td>1</td>
            <td>Some title</td>
            <td>genre</td>
            <td>2020</td>
            <td>
              <TableActions />
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Some title</td>
            <td><span className={styles.chip}>genre</span><span className={styles.chip}>genre2</span></td>
            <td>2020</td>
            <td>
              <TableActions />
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Some title</td>
            <td>genre</td>
            <td>2020</td>
            <td>
              <TableActions />
            </td>
          </tr>
        </tbody>
        <tfoot>

        </tfoot>
      </table>
    </div>
  );
};

export default Table;