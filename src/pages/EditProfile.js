import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../store/user/selectors";
import { selectAllProduces } from "../store/produce/selectors";
import {
  editProducerProfile,
  fetchAllProduces,
} from "../store/produce/actions";
import Select from "react-select";
import "./EditProfile.css";

export default function EditProfile() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [name, setName] = useState(user.name);
  const [description, setDescription] = useState(user.description);
  const [website, setWebsite] = useState(user.website);
  const [phone, setPhone] = useState(user.phone);
  const [profileImg, setProfileImg] = useState(user.profileImg);
  const [location, setLocation] = useState(user.location);

  const allProduces = useSelector(selectAllProduces);

  const producesToSelect = allProduces.map((eachProduce) => {
    return { value: eachProduce.id, label: eachProduce.name };
  });

  const [selectedProduces, setSelectedProduces] = useState([]);

  const produceIdArray = selectedProduces.map((eachProduce) => {
    return eachProduce.value;
  });

  const submitChanges = (event) => {
    event.preventDefault();
    dispatch(
      editProducerProfile(
        name,
        description,
        website,
        phone,
        profileImg,
        location,
        produceIdArray
      )
    );
  };

  useEffect(() => {
    dispatch(fetchAllProduces());
  }, []);

  return (
    <div>
      <form onSubmit={submitChanges} className="form">
        <h1>Edit your producer profile</h1>

        <label>
          Name:
          <input
            type="text"
            value={name}
            placeholder="Your name or the name of your business"
            onChange={(input) => setName(input.target.value)}
            style={{ width: "100%" }}
          />
        </label>
        <label>
          Description:
          <textarea
            type="text"
            rows="3"
            value={description}
            placeholder="Describe your production"
            onChange={(input) => setDescription(input.target.value)}
            style={{ width: "100%" }}
          />
        </label>
        <label>
          Website:
          <input
            type="text"
            value={website}
            placeholder="Your website URL"
            onChange={(input) => setWebsite(input.target.value)}
            style={{ width: "100%" }}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            value={phone}
            placeholder="Your contact number"
            onChange={(input) => setPhone(input.target.value)}
            style={{ width: "100%" }}
          ></input>
        </label>

        <label>
          Location:
          <input
            type="text"
            value={location}
            placeholder="Where do you sell your products?"
            onChange={(input) => setLocation(input.target.value)}
            style={{ width: "100%" }}
          ></input>
        </label>

        <label>
          Profile image:
          <input
            type="text"
            value={profileImg}
            placeholder="Your profile image URL"
            onChange={(input) => setProfileImg(input.target.value)}
            style={{ width: "100%" }}
          ></input>
        </label>

        <label>
          Select your produces:
          <Select
            isMulti
            name="colors"
            onChange={(selectedProduces) =>
              setSelectedProduces(selectedProduces)
            }
            options={producesToSelect}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </label>

        <input
          type="submit"
          value="Save changes"
          className="submitButton"
          style={{ width: "25%", textAlign: "center" }}
        ></input>
      </form>{" "}
    </div>
  );
}
