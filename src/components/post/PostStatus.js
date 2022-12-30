import './postStatus.css'
import {Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getPosts} from "../../services/postServices";

export default function PostStatus() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts())
    }, [])

    const posts = useSelector(state => {
        return state.posts.posts
    })
    return (

            <div className="row">
                <div className="col-12">
                    <div className="col-4 ">
                        <Formik
                            // initialValues={{
                            //     title: '',
                            //     content: '',
                            //     time: new Date().toLocaleDateString(),
                            //     status: 'public'
                            // }}
                            // onSubmit={() => {
                            //
                            // }}
                            >
                            <Form>
                                <div className="contain-create-post">
                                    <div className="row">
                                        {/*<img src='' alt={users.displayName} className={'avatar-post'}/>*/}
                                        <div className={"row offset-1"}>
                                            <Link to={'/add-post'}
                                                  style={{textDecoration: 'none' ,height: "50px" , width:"300px" } }>
                                                <div className="up-status"
                                                     data-target="#exampleModal">
                                                    <p>Bạn đang nghĩ gì?</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>

    )
}