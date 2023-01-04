import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";
import {useEffect, useState} from "react";
import {storage} from "../../firebase";
import {editPosts} from "../../services/postServices";


export default function EditPost() {
    const accountId = JSON.parse(localStorage.getItem("accountId"))
    const [open, setOpen] = React.useState(false);

    const [post, setPost] = useState({})
    const dispatch = useDispatch();
    const param = useParams();
    const posts = useSelector(state => {
        console.log(state)
        return state.posts.posts;
    });
    const postEdit = posts.postId





    const [imageUrls, setImageUrls] = useState([]);
    const [img, setImg] = useState("");
    const imagesListRef = ref(storage, "images/");
    const [submitting, setSubmitting] = useState(false)

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
            })
        })
    }, []);
    return (
        <React.Fragment>
            <Link
                color="neutral"
                style={{color: "white"}}
                className={'btn-primary'}
                onClick={() => setOpen(true)}
            >
                Edit Post
            </Link>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    style={{color: "black", width: 800, boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.75)'}}
                    aria-labelledby="basic-modal-dialog-title"
                    aria-describedby="basic-modal-dialog-description"
                    sx={{
                        borderRadius: 'md',
                        p: 3
                    }}
                >
                    <Typography
                        id="basic-modal-dialog-title"
                        component="h2"
                        level="inherit"
                        fontSize="1.25em"
                        mb="0.25em"
                    >
                        Edit Post
                    </Typography>
                    <Typography
                        id="basic-modal-dialog-description"
                        mt={0.5}
                        mb={2}
                        textColor="black"
                        textAlign={"center"}
                    >
                    </Typography>
                    <Formik
                        onSubmit={(values) => {
                        }}>
                        <Form>
                            <div className={"post-group"}>
                                <div className="form-group">
                                    {/*<label style={{fontWeight: 400}} htmlFor="exampleInputPassword1"></label>*/}
                                    <Field as={'textarea'} style={{width: '100%'}} name={'content'}
                                           className={'form-control'}/>
                                </div>

                                <div className="form-group">
                                    <label for="file-upload" className="custom-file-upload">
                                        <i class="fa fa-cloud-upload"></i>
                                        Custom Upload
                                        <input
                                            id="file-upload"
                                            type="file"
                                            onChange={(event) => {
                                                setSubmitting(true)
                                                uploadFile(event.target.files[0])
                                            }}/>
                                    </label>

                                    <Field className="select" as="select" name="status">
                                        <option value='public'>Public</option>
                                        <option value='private'>Private</option>
                                        <option value='onlyFriend'>Only friend</option>
                                    </Field>
                                    <button className="addPost" type="submit" disabled={submitting}>Edit</button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}