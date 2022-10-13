import React, { useRef, useState } from "react";
import styles from "../../styles/components/Filters.module.scss";
import { FaFilter } from "react-icons/fa";
import { filterCategories } from "../../utils/consts";
import clickAwayListener from "../../utils/hooks/clickAwayListener";
import { FilterCategoriesType } from "../../utils/types/filter";

const Filters = () => {
  const [currentFilter, setCurrentFilter] =
    useState<FilterCategoriesType | null>(null);
  const filtersRef = useRef(null);
  clickAwayListener(filtersRef, !!currentFilter, () => setCurrentFilter(null));

  return (
    <section ref={filtersRef} className={styles.filterSection}>
      <div className={styles.container}>
        <div className={styles.label}>
          <FaFilter />
          <p>Filter By</p>
        </div>
        {filterCategories.map((category, idx) => {
          const isActive =
            currentFilter && currentFilter.label === category.label;
          return (
            <button
              key={idx}
              className={`${styles.filterButton} ${isActive && styles.active}`}
              onClick={() => setCurrentFilter(category)}
            >
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>
      <div
        className={`${styles.filtersModal} ${
          currentFilter ? styles.modalOpen : ""
        }`}
      >
        <p className={styles.tagsLabel}>Tags</p>
        <ul className={styles.tagContainer}>
          {currentFilter &&
            currentFilter.tags.map((filter, idx) => (
              <li key={idx} className={styles.tag}>
                {filter}
              </li>
            ))}
          {/*<li className={styles.tag}>Action</li>*/}
          {/*<li className={styles.tag}>Shutter</li>*/}
        </ul>
      </div>
    </section>
  );
};

export default Filters;
