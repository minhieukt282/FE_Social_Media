import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import {Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";
import {useEffect, useState} from "react";
import {storage} from "../../firebase";
import {editPosts, getPosts} from "../../services/postServices";
import {toast} from "react-toastify";


export default function EditPost({item, url}) {
    const [open, setOpen] = React.useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const [img, setImg] = useState("");
    const imagesListRef = ref(storage, "images/");
    const [submitting, setSubmitting] = useState(false)

    const dispatch = useDispatch();

    const handleEdit = async (values) => {
        let imgSent
        if (img !== "") {
            imgSent = img
        } else imgSent = values.img
        let data = {
            ...values,
            img: imgSent,
        };
        await dispatch(editPosts(data));
        await dispatch(getPosts())
        toast.success('Edit status done!', {
            position: toast.POSITION.BOTTOM_LEFT
        });
        setOpen(false);
    };

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
                style={{color: "black", textDecoration: "none"}}
                onClick={() => setOpen(true)}
            >
                Edit Post
            </Link>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    style={{color: "black", width: 800, boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.75)'}}
                    aria-labelledby="basic-modal-dialog-user"
                    aria-describedby="basic-modal-dialog-description"
                    sx={{
                        borderRadius: 'md',
                        p: 3
                    }}
                >
                    <Typography
                        id="basic-modal-dialog-user"
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
                        initialValues={
                            {
                                content: item.content,
                                img: item.img,
                                postId: item.postId,
                                status: item.status
                            }
                        }
                        onSubmit={(values) => {
                            handleEdit(values)
                        }}>
                        <Form>
                            <div className={"post-group"}>
                                <div className="form-group">
                                    <Field as={'textarea'} style={{width: '100%'}} name={'content'}
                                           className={'form-control'}/>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <label className="custom-file-upload mb-0">
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
                                        <button className="btn btn-primary" type="submit" disabled={submitting}>Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
