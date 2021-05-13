// import { FaHeart, FaShareAlt } from 'react-icons/fa';


import styles from "./Dish.module.scss";
import Link from "next/link";

const Dish = ({ url, image, dishName, time, cost, needed, available}) => {
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
                {needed === available ? <li className={styles.available}>Available</li> : ''} 
                {available < needed && needed * 0.6 <= available ? <li className={styles.partiallyAvailable}>Partially available</li> : ''}
                {needed * 0.6 > available ? <li className={styles.notAvailable}> Not available</li> : ''}
              </ul>
            </div>
          </li>
        </Link>
      </>
  );
};

export default Dish;
