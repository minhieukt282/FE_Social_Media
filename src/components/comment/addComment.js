import {Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {addComments} from "../../services/commentService";
import React from "react";
import {getPosts} from "../../services/postServices";

const AddComment = ({postPostId, img}) => {
    const dispatch = useDispatch();
    const handleAddComment = async (values) => {
        const data = {
            ...values,
            accountId: JSON.parse(localStorage.getItem("accountId")),
            img: JSON.parse(localStorage.getItem("imgAvt")),
            displayName: JSON.parse(localStorage.getItem("displayName")),
            postPostId: postPostId
        }
        if (data.comment !== '') {
            await dispatch(addComments(data))
            await dispatch(getPosts())
        }
    }
    return (
        <div>
            <Formik
                initialValues={{
                    comment: '',
                }}
                onSubmit={(values, {resetForm}) => {
                    handleAddComment(values).then(() => {
                        resetForm()
                    })
                }}>
                <Form className={'form-inline'}>
                        <div className="col-md-2 col-lg-1 p-0 text-right">
                            <img src={img} id="addCommentAvt" alt="my avatar"
                                 className="postProfileImg"/>
                        </div>
                        <div className="col-md-7 col-lg-9">
                            <Field as={'textarea'} rows={1} style={{width: '100%'}} name={'comment'}
                                   className={'form-control'}/>
                        </div>
                        <div className="col-md-3 col-lg-2 p-0">
                            <button className="btn btn-primary btn-block" type="submit">Send</button>
                        </div>
                </Form>
            </Formik>
        </div>
    )
}

export default AddComment
