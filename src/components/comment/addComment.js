import {Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {addComments} from "../../services/commentService";
import React, {useState} from "react";


const AddComment = ({postPostId}) => {
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState(false)
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
                    <Field style={{width: '100%'}} name={'comment'}
                           className='form-control'/>
                    <button className="addComment" type="submit">Send</button>
                </Form>
            </Formik>
        </div>

    )
}

export default AddComment