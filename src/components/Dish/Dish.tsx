import { useEffect, useState } from 'react'

import styles from "./Dish.module.scss";
import Link from "next/link";

const Dish = ({ url, image, dishName, time, cost, needed, allAvailable}) => {
  const [available, setAvailable] = useState([]);

  const filterAvailable = () => {
    needed.filter(ing => {
      allAvailable.includes(ing);
    });

    return needed.filter(ing => {
      return allAvailable.includes(ing);
    });
  }
  
  useEffect(() => {
    setAvailable(filterAvailable);
  }, []);
  
  return (
      <>
        <Link href={url}>
          <li className={styles.dish}>
            <img src={image} alt="Image of Icecream"></img>
            <div className={styles.textWrapper}>
              <h3>{dishName}</h3>
              <ul>
                <li>Time: {time} min</li>
                <li>{cost}</li>
                {needed.length === available.length ? <li className={styles.available}>Available</li> : ''} 
                {available.length < needed.length && needed.length * 0.6 <= available.length ? <li className={styles.partiallyAvailable}>Partially available</li> : ''}
                {needed.length * 0.6 > available.length ? <li className={styles.notAvailable}> Not available</li> : ''}
              </ul>
            </div>
          </li>
        </Link>
      </>
  );
};

export default Dish;
