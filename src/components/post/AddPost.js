import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {storage} from "../../firebase";
import {addPosts} from "../../services/postServices";
import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";
import "./addPost.css";

export default function AddPost() {
    const dispatch = useDispatch();
    const [imageUrls, setImageUrls] = useState([]);
    const [img, setImg] = useState("");
    const imagesListRef = ref(storage, "images/");

    const users = useSelector(state => {
        return state;
    })

    const [submitting, setSubmitting] = useState(false)

    const handleAddPost = async (values) => {
        const data = {
            ...values,
            accountId: users.loginWed.accountId,
            img: img
        }
        await dispatch(addPosts(data))
    }

    const uploadFile = (imageUpload) => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((img) => {
                setImg(img)
                setSubmitting(false)
            });
        })
    };

    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((img) => {
                    setImageUrls((prev) => [...prev, img]);
                });
            });
        });
    }, []);

    return (
        <div>
            <div>
                <Formik initialValues={{
                    content: '',
                    img: imageUrls,
                    status: 'public'
                }} onSubmit={(values, {resetForm}) => {
                    let content = values.content.replace(/^\s+|\s+$/gm, '')
                    if ((img !== '' || values.content !== '') && content !== '') {
                        handleAddPost(values).then(() => {
                            resetForm()
                        });
                    } else {
                        resetForm()
                    }
                }}>
                    <Form>
                        <div className={"post-group"}>
                            <div className="form-group">
                                <Field as={'textarea'} style={{width: '100%', maxHeight: "20vh"}} name={'content'}
                                       className={'form-control'} placeholder={'What are you thinking?'}/>
                            </div>
                            <div className="d-flex justify-content-between">
                                <label htmlFor="file-upload" className="custom-file-upload mb-0">
                                    <i className="fas fa-camera"></i> Photo
                                    <input
                                        id="file-upload"
                                        type="file"
                                        onChange={(event) => {
                                            setSubmitting(true)
                                            uploadFile(event.target.files[0])
                                        }}/>
                                </label>
                                <div className={'d-flex justify-content-end'}>
                                    <Field className="form-control mr-2" as="select" name="status">
                                        <option value='public'>Public</option>
                                        <option value='private'>Private</option>
                                        <option value='onlyFriend'>Only friend</option>
                                    </Field>
                                    <button className="btn btn-primary" type="submit" disabled={submitting}>Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
