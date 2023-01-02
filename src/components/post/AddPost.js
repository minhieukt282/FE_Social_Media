import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {storage} from "../../firebase";
import {addPosts, getPosts} from "../../services/postServices";
import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";
import "./addPost.css";

export default function AddPost() {
    const dispatch = useDispatch();
    const [imageUrls, setImageUrls] = useState([]);
    const [img, setImg] = useState("");
    const imagesListRef = ref(storage, "images/");
    const [isCreatePost, setIsCreatePost] = useState(false)

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
        setIsCreatePost(!isCreatePost)
    }
    useEffect(()=>{
        dispatch(getPosts)
    },[isCreatePost])

    // console.log(isCreatePost, "adddddddddddddddd")

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
            <div className="row">
            </div>
            <div>
                <Formik initialValues={{
                    content: '',
                    img: imageUrls,
                    status: ''
                }} onSubmit={(values) => {
                    handleAddPost(values);
                }}>
                    <Form>
                        <div className={"post-group"}>
                            <div className="form-group">
                                <label style={{fontWeight: 400}} htmlFor="exampleInputPassword1">Bạn đang nghĩ
                                    gì?</label>
                                <Field as={'textarea'} style={{width: '100%'}} name={'content'}
                                       className={'form-control'}/>
                            </div>
                            <div className="form-group">
                                {/*<label htmlFor="exampleInputPassword1">Image</label>*/}
                                <input
                                    type="file" onChange={(event) => {
                                    setSubmitting(true)
                                    uploadFile(event.target.files[0])
                                }}/>
                                {/*bug here */}
                                <Field className="select" as="select" name="status">
                                    <option value='public'>Public</option>
                                    <option value='private'>Private</option>
                                    <option value='onlyFriend'>Only friend</option>
                                </Field>
                            </div>
                            <div className="form-group">
                                <button className="addPost" type="submit" disabled={submitting}>Share</button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
