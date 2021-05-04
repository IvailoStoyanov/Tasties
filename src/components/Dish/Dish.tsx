// import { FaHeart, FaShareAlt } from 'react-icons/fa';

import styles from "./Dish.module.scss";
import Link from "next/link";

const Dish = ({ url, image, dishName, time, cosnt, availability}) => {
  return (
    <>
      <Link href={url}>
        <li className={styles.dish}>
          <img src={image} alt="Image of Icecream"></img>
          <div className={styles.textWrapper}>
            <h3>Soup</h3>
            <ul>
              <li>Time: 10 min</li>
              <li>$</li>
              <li className={styles.available}>Available</li>
            </ul>
          </div>
        </li>
      </Link>
      {/* <Link href={"/dishPage/iceCream"}>
        <li className={styles.dish}>
          <img src={"/images/iceCream.jpg"} alt="image of Cake"></img>
          <div className={styles.textWrapper}>
            <h3>Ice Cream</h3>
            <ul>
              <li>10 min</li>
              <li>$$</li>
              <li className={styles.partiallyAvailable}>Partially available</li>
            </ul>
          </div>
        </li>
      </Link>
      <Link href={"/dishPage/carrotCake"}>
        <li className={styles.dish}>
          <img src={"/images/carrotCake.jpg"} alt="image of Cake"></img>
          <div className={styles.textWrapper}>
            <h3>Carrot Cake</h3>
            <ul>
              <li>30 min</li>
              <li>$$$</li>
              <li className={styles.notAvailable}>Not available</li>
            </ul>
          </div>
        </li>
      </Link> */}
    </>
  );
};

export default Dish;
