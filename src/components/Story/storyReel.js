import React from "react";
import "./storyReel.css"
import StoryElements from "./StoryElements";
import {useDispatch} from "react-redux";
import {Formik, Form, Field} from "formik";
import {Link} from "react-router-dom";

function storyReel(item) {
    const dispatch = useDispatch();
    const accountId = JSON.parse(localStorage.getItem("accountId"))
    const imgAvt = JSON.parse(localStorage.getItem("imgAvt"))


    return (<Form>

        <div className="storyReel">
            <StoryElements/>
            <StoryElements/>
            <StoryElements/>
            <StoryElements/>
            <StoryElements/>
        </div>
    </Form>)
}

export default storyReel()