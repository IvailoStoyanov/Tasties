// import { FaHeart, FaShareAlt } from 'react-icons/fa';

import { useRef, useState } from "react";

import styles from "./DishForm.module.scss";

const DishForm = ({ onSubmit }) => {
  const [imgSecureUrl, setImgSecureUrl] = useState("");
  const [imgToUpload, setImgToUpload] = useState({});
  const [imgName, setImgName] = useState("");
  const [cost, setCost] = useState("$");
  const [ingredients, setIngredients] = useState([]);
  const [ingrName, setIngrName] = useState("");

  const addIngredient = (event) => {
    event.preventDefault();
    if (ingrName.length > 2 && !ingredients.includes(ingrName)) {
      setIngredients([...ingredients, ingrName]);
      setIngrName("");
    }
  };

  const removeIngredient = (event) => {
    event.preventDefault();
    setIngredients(ingredients.filter((item) => item !== event.target.id));
  };

  const increaseCost = (event) => {
    event.preventDefault();
    cost.length < 3 ? setCost(cost.concat("$")) : null;
  };
  const decreaseCost = (event) => {
    event.preventDefault();
    cost.length > 1 ? setCost(cost.slice(0, -1)) : null;
  };

  const convertPageName = (name) => {
    const cammelCaseName = name
      .split(" ")
      .map((word, i) => {
        if (i === 0) {
          return word.charAt(0).toLowerCase() + word.slice(1);
        } else {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
      })
      .join("");

    return cammelCaseName;
  };

  async function uploadImage(event) {
    event.preventDefault()
    const formData = new FormData();
    formData.append("file", imgToUpload[0]);
    formData.append("upload_preset", "yminrbyz");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dsaz6niwp/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    setImgSecureUrl(data.secure_url);
  }

  const handleOnSubmit = (e) => {
    // uploadImage().then((res) => {
    //   // console.log(res);
      
    // })
    
    const { currentTarget } = e;
    const fields = Array.from(currentTarget.elements);
    const ingredients = [];
    let pageName = "";
    const data = {};

    fields.forEach((field: HTMLFormElement) => {
      if (!field.name) return;

      if (field.name === "name") {
        pageName = convertPageName(field.value);
      }
      if (field.name === "ingredient") {
        ingredients.push(field.value);
        data["neededIngredients"] = ingredients;
      }
      if (field.name === "image") {
        console.log(imgSecureUrl);
        
        data["image"] = imgSecureUrl.toString();
      } else {
        data[field.name] = field.value;
      }
    });

    data["availableIngredients"] = [];
    data["pageName"] = pageName;
    data["url"] = `/dishPage/${pageName}`;

    if (typeof onSubmit === "function") {
      onSubmit(data, e);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>Add new dish</h2>
      <form onSubmit={handleOnSubmit}>
        <div className={styles.inputWrapper}>
          <label htmlFor="name">Dish name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.dishName}
            required
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="cost">Cost:</label>
          <div className={styles.inputWrapper_costIncrementor}>
            <button onClick={decreaseCost}>
              <img src="/icons/arrowLeft.svg"></img>
            </button>
            <label htmlFor="text">{cost}</label>
            <input type="text" name="cost" value={cost} hidden readOnly />
            <button onClick={increaseCost}>
              <img src="/icons/arrowRight.svg"></img>
            </button>
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="time">Time:</label>
          <div className={styles.inputWrapper_time}>
            <input type="text" id="time" name="time" />
            <span>min</span>
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.inputWrapper_fileUploadInput}>
            <label htmlFor="image">Upload dish image</label>
            <span> {imgName}</span>
            <input
              required
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(event) => {
                setImgToUpload(event.currentTarget.files);
                //after upload is finished setImageDirectory
                setImgName(
                  event.currentTarget.files.length
                    ? event.currentTarget.files[0].name
                    : ""
                );
              }}
              ></input>
              <button onClick={uploadImage}>upload</button>
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="name">Ingredients:</label>
          <div className={styles.inputWrapper_addedIngredients}>
            {ingredients.map((name) => {
              return (
                <div key={`${name}Key`} className={styles.ingredient}>
                  <input value={name} name="ingredient" readOnly />
                  <button onClick={removeIngredient} id={name}>
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
          <div className={styles.inputWrapper_newIngredientWrapper}>
            <input
              type="text"
              placeholder="Ingredient name"
              value={ingrName}
              onChange={(e) => {
                setIngrName(e.target.value);
              }}
            />
            <button onClick={addIngredient}>Add</button>
          </div>
        </div>

        <button className={styles.submitButton} type="submit">
          Add dish
        </button>
      </form>
    </div>
  );
};

export default DishForm;
