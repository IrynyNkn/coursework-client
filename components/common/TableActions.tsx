import React from 'react';
import styles from "../../styles/components/Table.module.scss";
import {RiEditFill} from "react-icons/ri";
import {MdDelete} from "react-icons/md";



const TableActions = ({}) => {
  return (
    <>
      <button className={styles.tableActionsBtn}>
        <span className={styles.editAction}>
          <RiEditFill size={20} />
        </span>
      </button>
      <button className={styles.tableActionsBtn}>
        <span className={styles.deleteAction}>
          <MdDelete size={20}  />
        </span>
      </button>
    </>
  );
};

export default TableActions;