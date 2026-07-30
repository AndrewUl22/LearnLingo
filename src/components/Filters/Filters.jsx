import styles from "./Filters.module.css";

const Filters = ({ languages, levels, prices, filters, onChange }) => {
  const handleChange = (field) => (event) => {
    onChange({ ...filters, [field]: event.target.value });
  };

  return (
    <div className={styles.filters}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="language-filter">
          Language
        </label>
        <select
          id="language-filter"
          className={styles.select}
          value={filters.language}
          onChange={handleChange("language")}
        >
          <option value="">All languages</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="level-filter">
          Level
        </label>
        <select
          id="level-filter"
          className={styles.select}
          value={filters.level}
          onChange={handleChange("level")}
        >
          <option value="">All levels</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="price-filter">
          Price
        </label>
        <select
          id="price-filter"
          className={styles.select}
          value={filters.price}
          onChange={handleChange("price")}
        >
          <option value="">All prices</option>
          {prices.map((price) => (
            <option key={price} value={price}>
              {price}$ / hour
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
