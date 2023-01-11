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
                <Form>
                    <div className={"postBottomFooter"}>
                        <div className="col-1">
                            <img src={img} alt="my avatar"
                                 className="postProfileImg"/>
                        </div>
                        <div className="col-8">
                            <Field style={{width: '100%'}} name={'comment'} className='form-control comment'/>
                        </div>
                        <div className="col-3">
                            <button className="addComment" type="submit">Send</button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default AddComment