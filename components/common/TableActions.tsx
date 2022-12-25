import React from 'react';
import styles from '../../styles/components/Table.module.scss';
import { RiEditFill } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import {
  DeleteButtonFunctionType,
  EditButtonFunctionType,
} from '../../utils/types/games';

type TableActionsType = {
  onEditClick: () => void;
  onDeleteClick: () => void;
};

const TableActions = ({ onEditClick, onDeleteClick }: TableActionsType) => {
  return (
    <>
      <button onClick={onEditClick} className={styles.tableActionsBtn}>
        <span className={styles.editAction}>
          <RiEditFill size={20} />
        </span>
      </button>
      <button onClick={onDeleteClick} className={styles.tableActionsBtn}>
        <span className={styles.deleteAction}>
          <MdDelete size={20} />
        </span>
      </button>
    </>
  );
};

export default TableActions;
